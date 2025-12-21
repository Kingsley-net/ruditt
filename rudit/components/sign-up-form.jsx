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
import {
  Eye,
  EyeOff,
  User,
  School,
  Users,
  MapPin,
  Loader2,
  Check,
  X,
  AlertCircle,
} from 'lucide-react'

export function SignUpForm({ className, ...props }) {
  /* -------------------- STATE (UNCHANGED) -------------------- */
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [numberOfStudents, setNumberOfStudents] = useState('')
  const [location, setLocation] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const router = useRouter()

  /* -------------------- PASSWORD STRENGTH (UNCHANGED) -------------------- */
  useEffect(() => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }, [password])

  /* -------------------- LOCATION (UNCHANGED) -------------------- */
  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      return
    }

    setIsDetectingLocation(true)
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      )
      const data = await res.json()

      if (data?.address) {
        setLocation(
          [data.address.city, data.address.state, data.address.country]
            .filter(Boolean)
            .join(', ')
        )
      }
    } catch {
      setError('Could not auto-detect location')
    } finally {
      setIsDetectingLocation(false)
    }
  }

  /* -------------------- SUBMIT (UNCHANGED) -------------------- */
  const handleSignUp = async (e) => {
    e.preventDefault()
    const supabase = createClient()

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            school_name: schoolName,
            number_of_students: numberOfStudents || null,
            location: location || null,
          },
        },
      })

      if (error) throw error
      router.push(`/auth/confirmation?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  /* -------------------- UI -------------------- */
  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Card className="w-full max-w-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1220] shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            Create your school account
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Set up your school infrastructure in minutes
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-8">

            {/* PERSONAL */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal details
              </h3>

              <div className="space-y-2">
                <Label>Full name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label>Email address</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </section>

            {/* SCHOOL */}
            <section className="space-y-4 pt-6 border-t">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                <School className="w-4 h-4" />
                School details
              </h3>

              <div className="space-y-2">
                <Label>School name</Label>
                <Input value={schoolName} onChange={e => setSchoolName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label>Number of students</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="number"
                    className="pl-9"
                    value={numberOfStudents}
                    onChange={e => setNumberOfStudents(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Location</Label>
                  <button
                    type="button"
                    onClick={detectLocation}
                    className="text-xs text-cyan-600 hover:underline"
                  >
                    {isDetectingLocation ? 'Detecting…' : 'Auto-detect'}
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    className="pl-9"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* SECURITY */}
            <section className="space-y-4 pt-6 border-t">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Security
              </h3>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Confirm password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </section>

            {/* ERROR */}
            {error && (
              <div className="flex gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                {error}
              </div>
            )}

            {/* CTA */}
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account…
                </span>
              ) : (
                'Create account'
              )}
            </Button>

            <p className="text-sm text-center text-slate-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-cyan-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
