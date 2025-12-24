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
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
      })
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      )
      const data = await response.json()
      if (data.address) {
        const loc = [data.address.city, data.address.state, data.address.country].filter(Boolean).join(', ')
        setLocation(loc)
      }
    } catch (error) {
      setError("Could not detect location. Please enter it manually.")
    } finally {
      setIsDetectingLocation(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    if (passwordStrength < 3) {
        setError("Please use a stronger password")
        return
    }

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
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

      if (signUpError) throw signUpError
      router.push('/auth/sign-up-success')

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
  ]

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Join our platform and start managing your school efficiently
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* --- Personal Information --- */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-600" />
                  Personal Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input id="name" type="text" placeholder="Enter your full name" required value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500" disabled={isLoading} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500" disabled={isLoading} />
                </div>
              </div>

              {/* --- School Information --- */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <School className="w-5 h-5 text-cyan-600" />
                  School Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="text-sm font-medium text-gray-700">School Name *</Label>
                  <Input id="schoolName" type="text" placeholder="Enter your school name" required value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500" disabled={isLoading} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfStudents" className="text-sm font-medium text-gray-700">Number of Students (Optional)</Label>
                  <div className="relative">
                    <Input id="numberOfStudents" type="number" min="1" placeholder="e.g., 150" value={numberOfStudents} onChange={(e) => setNumberOfStudents(e.target.value)} className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 pl-10" disabled={isLoading} />
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location (Optional)</Label>
                    <button type="button" onClick={detectLocation} disabled={isDetectingLocation} className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                      {isDetectingLocation ? <><Loader2 className="w-3 h-3 animate-spin" />Detecting...</> : 'Auto-detect'}
                    </button>
                  </div>
                  <div className="relative">
                    <Input id="location" type="text" placeholder="e.g., City, Country" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 pl-10" disabled={isLoading} />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* --- Account Security --- */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Account Security</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password *</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 pr-10" disabled={isLoading} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" disabled={isLoading}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {password && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full"><div className={cn("h-full rounded-full", passwordStrength <= 2 ? "bg-red-500" : passwordStrength <= 3 ? "bg-yellow-500" : "bg-green-500")} style={{ width: `${(passwordStrength / 5) * 100}%` }} /></div>
                        <span className={cn("text-xs font-medium", passwordStrength <= 2 ? "text-red-600" : passwordStrength <= 3 ? "text-yellow-600" : "text-green-600")}>
                          {['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][passwordStrength - 1]}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                        {passwordRequirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2">
                            {req.met ? <Check className="w-3.5 h-3.5 text-green-600" /> : <X className="w-3.5 h-3.5 text-gray-400" />}
                            <span className={cn("text-xs", req.met ? "text-gray-700" : "text-gray-500")}>{req.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password *</Label>
                  <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500" disabled={isLoading} />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-100 border border-red-200 p-3">
                  <p className="text-sm text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {error}
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold" disabled={isLoading}>
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Creating Account...</> : 'Create School Account'}
              </Button>

              <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-cyan-600 hover:underline font-medium">Log in</Link>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
