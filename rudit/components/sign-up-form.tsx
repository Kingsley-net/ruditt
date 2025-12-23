'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Eye, EyeOff, User, School, Users, MapPin, Loader2, Check, X, AlertCircle } from 'lucide-react'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [numberOfStudents, setNumberOfStudents] = useState('')
  const [location, setLocation] = useState('')
  
  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }, [password])

  // Auto-detect location
  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setIsDetectingLocation(true)
    setError(null)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 60000,
        })
      })

      // Reverse geocoding to get location name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      )
      
      const data = await response.json()
      
      if (data.address) {
        const locationParts = []
        if (data.address.city) locationParts.push(data.address.city)
        if (data.address.state) locationParts.push(data.address.state)
        if (data.address.country) locationParts.push(data.address.country)
        
        if (locationParts.length > 0) {
          setLocation(locationParts.join(', '))
        }
      }
    } catch (error) {
      console.error('Error detecting location:', error)
      setError("Could not detect your location automatically. Please enter it manually.")
    } finally {
      setIsDetectingLocation(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    if (!name.trim() || !email.trim() || !schoolName.trim() || !password || !confirmPassword) {
      setError("Please fill in all required fields")
      return
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    
    if (passwordStrength < 2) {
      setError("Please use a stronger password")
      return
    }
    
    if (numberOfStudents && parseInt(numberOfStudents) < 1) {
      setError("Number of students must be at least 1")
      return
    }

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      // Check if user already exists in auth system
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing user:', checkError)
      }

      if (existingUser) {
        throw new Error('This email is already registered. Please use a different email or try logging in.')
      }

      // Sign up with Supabase Auth - user_metadata will be passed to the database trigger
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name: name.trim(),
            school_name: schoolName.trim(),
            number_of_students: numberOfStudents ? parseInt(numberOfStudents) : null,
            location: location.trim() || null
          }
        },
      })

      if (signUpError) {
        // Check for specific errors
        if (signUpError.message.includes('already registered') || 
            signUpError.message.includes('User already registered') ||
            signUpError.code === 'user_already_exists') {
          throw new Error('This email is already registered. Please use a different email or try logging in.')
        }
        
        if (signUpError.message.includes('password')) {
          throw new Error('Please use a stronger password with at least 6 characters')
        }
        
        throw signUpError
      }

      // Check if email confirmation is required
      if (authData?.user?.identities?.length === 0) {
        throw new Error('This email is already registered. Please use a different email or try logging in.')
      }

      // Check if the user profile was created in the database
      if (authData.user) {
        // Wait a moment for the database trigger to execute
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Verify the user profile was created
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', authData.user.id)
          .maybeSingle()

        if (profileError) {
          console.error('Error checking user profile:', profileError)
        }
        
        if (!userProfile) {
          console.warn('User profile not created automatically, creating manually...')
          // Fallback: Create user profile manually
          const { error: manualCreateError } = await supabase
            .from('users')
            .insert({
              auth_user_id: authData.user.id,
              email: authData.user.email,
              name: name.trim(),
              school_name: schoolName.trim(),
              number_of_students: numberOfStudents ? parseInt(numberOfStudents) : null,
              location: location.trim() || null
            })

          if (manualCreateError) {
            console.error('Error creating user profile manually:', manualCreateError)
            // Still continue since auth was successful
          }
        }
      }

      // Success - redirect to confirmation page
      router.push('/auth/sin-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  // Password requirements checklist
  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
  ]

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-50" />
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-white/5 rounded-tl-xl" />
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-white/5 rounded-tr-xl" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-white/5 rounded-bl-xl" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-white/5 rounded-br-xl" />
        
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-white/70">
              Join our platform and start managing your school efficiently
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                
                {/* Name field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-white/90">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setError(null)
                    }}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 transition-colors"
                    disabled={isLoading}
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white/90">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError(null)
                    }}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 transition-colors"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* School Information Section */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <School className="w-5 h-5" />
                  School Information
                </h3>
                
                {/* School Name */}
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="text-sm font-medium text-white/90">
                    School Name *
                  </Label>
                  <Input
                    id="schoolName"
                    type="text"
                    placeholder="Enter your school name"
                    required
                    value={schoolName}
                    onChange={(e) => {
                      setSchoolName(e.target.value)
                      setError(null)
                    }}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 transition-colors"
                    disabled={isLoading}
                  />
                </div>

                {/* Number of Students */}
                <div className="space-y-2">
                  <Label htmlFor="numberOfStudents" className="text-sm font-medium text-white/90">
                    Number of Students (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="numberOfStudents"
                      type="number"
                      min="1"
                      placeholder="e.g., 150"
                      value={numberOfStudents}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '' || parseInt(value) >= 1) {
                          setNumberOfStudents(value)
                          setError(null)
                        }
                      }}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 transition-colors pl-10"
                      disabled={isLoading}
                    />
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>
                  <p className="text-xs text-white/40">Approximate number of students in your school</p>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location" className="text-sm font-medium text-white/90">
                      Location (Optional)
                    </Label>
                    <button
                      type="button"
                      onClick={detectLocation}
                      disabled={isDetectingLocation}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                    >
                      {isDetectingLocation ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Detecting...
                        </>
                      ) : (
                        'Auto-detect'
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g., City, Country"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value)
                        setError(null)
                      }}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 transition-colors pl-10"
                      disabled={isLoading}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>
                </div>
              </div>

              {/* Account Security Section */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white">Account Security</h3>
                
                {/* Password field with strength indicator */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-white/90">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError(null)
                      }}
                      placeholder="Create a strong password"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 transition-colors pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full transition-all duration-300",
                                passwordStrength <= 2 && "bg-red-500",
                                passwordStrength === 3 && "bg-yellow-500",
                                passwordStrength >= 4 && "bg-green-500"
                              )}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                          <span className={cn(
                            "text-xs font-medium",
                            passwordStrength <= 2 && "text-red-400",
                            passwordStrength === 3 && "text-yellow-400",
                            passwordStrength >= 4 && "text-green-400"
                          )}>
                            {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Fair' : 'Strong'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Password requirements checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {passwordRequirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {req.met ? (
                              <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-white/30" />
                            )}
                            <span className={cn(
                              "text-xs",
                              req.met ? "text-green-400" : "text-white/40"
                            )}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-white/90">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setError(null)
                    }}
                    placeholder="Confirm your password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:bg-white/10 transition-colors"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                  <p className="text-sm text-red-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {error}
                  </p>
                  {error.includes('already registered') && (
                    <Link
                      href="/auth/login"
                      className="block mt-2 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    >
                      Click here to login instead
                    </Link>
                  )}
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  'Create School Account'
                )}
              </Button>

              {/* Terms notice */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-white/60 text-center">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </Link>
                  . No checkbox required - creating your account means you accept our terms.
                </p>
              </div>

              {/* Login link */}
              <div className="text-center text-sm text-white/60 pt-4">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-white hover:text-white/90 underline underline-offset-4 transition-colors"
                >
                  Log in
                </Link>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
