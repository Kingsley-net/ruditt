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
import { Eye, EyeOff, User, School, Users, MapPin, Loader2, Check, X, AlertCircle, Upload } from 'lucide-react'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [numberOfStudents, setNumberOfStudents] = useState('')
  const [location, setLocation] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  
  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()

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
    if (password !== confirmPassword) return setError("Passwords don't match");
    if (passwordStrength < 3) return setError("Please use a stronger password");
  
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
  
    try {
      // 1. AUTH SIGN UP
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { full_name: name.trim(), role: 'admin' }
        },
      })
  
      if (signUpError) throw signUpError
      if (!authData.user) throw new Error("Signup failed")

      // 2. LOGO UPLOAD (Optional)
      let logoUrl = null
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop()
        const fileName = `${authData.user.id}-${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, logoFile)
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName)
          logoUrl = publicUrl
        }
      }
  
      // 3. CREATE SCHOOL
      const generatedSlug = schoolName.trim().toLowerCase().replace(/\s+/g, '-')
      const { data: newSchool, error: schoolError } = await supabase
        .from('schools')
        .insert([
          { 
            name: schoolName.trim(), 
            slug: generatedSlug,
            admin_id: authData.user.id,
            logo_url: logoUrl,
          
          }
        ])
        .select().single()
  
      if (schoolError) throw schoolError
  
      // 4. UPDATE PROFILE
      await supabase.from('profiles').update({ school_id: newSchool.id }).eq('id', authData.user.id)
  
      router.push('/auth/sign-up-success')
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative bg-white dark:bg-gray-900 shadow-lg rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Join our platform and start managing your school
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <User size={14} className="sm:size-4" /> 
                <span>Admin Details</span>
              </h3>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Full Name
                </Label>
                <Input 
                  id="name"
                  placeholder="John Doe" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  disabled={isLoading}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="admin@school.com" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled={isLoading}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* School Info */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <School size={14} className="sm:size-4" />
                <span>School Details</span>
              </h3>
              <div className="space-y-2">
                <Label htmlFor="schoolName" className="text-gray-700 dark:text-gray-300">
                  School Name
                </Label>
                <Input 
                  id="schoolName"
                  placeholder="Green Valley Academy" 
                  required 
                  value={schoolName} 
                  onChange={(e) => setSchoolName(e.target.value)} 
                  disabled={isLoading}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  School Logo
                </Label>
                <label className="flex flex-col sm:flex-row items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg md:rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 border-gray-300 dark:border-gray-700 transition-colors">
                  <Upload size={18} className="text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px] text-center">
                    {logoFile ? logoFile.name : 'Upload Logo (Optional)'}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    disabled={isLoading}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="students" className="text-gray-700 dark:text-gray-300">
                    Students (Optional)
                  </Label>
                  <Input 
                    id="students"
                    placeholder="500" 
                    type="number" 
                    value={numberOfStudents} 
                    onChange={(e) => setNumberOfStudents(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                    Location (Optional)
                  </Label>
                  <div className="relative">
                    <Input 
                      id="location"
                      placeholder="City, Country" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 pr-10"
                    />
                    <button 
                      type="button" 
                      onClick={detectLocation} 
                      disabled={isDetectingLocation}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 disabled:opacity-50 p-1"
                      aria-label="Detect location"
                    >
                      {isDetectingLocation ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <MapPin size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-gray-500 dark:text-gray-400">
                Security
              </h3>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 pr-10"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Strength Meter */}
                <div className="flex gap-1 h-1.5 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                      key={s} 
                      className={`h-full flex-1 rounded-full transition-colors ${
                        passwordStrength >= s 
                          ? 'bg-cyan-500 dark:bg-cyan-400' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {passwordStrength < 3 ? 'Weak password' : 
                   passwordStrength < 4 ? 'Good password' : 
                   'Strong password'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                  Confirm Password
                </Label>
                <Input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2 border border-red-200 dark:border-red-800">
                <AlertCircle size={16} /> 
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 h-11 sm:h-12 text-base sm:text-lg font-bold transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 size-4 sm:size-5" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}