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
import { useState } from 'react'
import { Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      // First check if user exists in our users table (not just auth)
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle()

      // User doesn't exist in our database
      if (profileError && profileError.code === 'PGRST116') {
        throw new Error('No account found with this email. Please sign up first.')
      }

      if (profileError) {
        console.error('Error checking user profile:', profileError)
      }

      // If user profile exists but no auth record, they need to complete setup
      if (userProfile && !userProfile.auth_user_id) {
        throw new Error('Your account setup is incomplete. Please contact support.')
      }

      // Try to sign in
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        // Check specific error cases
        if (signInError.message.includes('Invalid login credentials')) {
          // Check if user exists but password is wrong
          if (userProfile) {
            throw new Error('Invalid password. Please check your password and try again.')
          } else {
            throw new Error('No account found with this email. Please sign up first.')
          }
        }
        
        if (signInError.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email address before logging in. Check your inbox for the confirmation email.')
        }
        
        // Check for rate limiting
        if (signInError.message.includes('rate limit')) {
          throw new Error('Too many attempts. Please try again in a few minutes.')
        }
        
        throw signInError
      }

      // Update last login time if successful
      if (authData.user && userProfile) {
        await supabase
          .from('users')
          .update({ 
            updated_at: new Date().toISOString(),
            last_login: new Date().toISOString()
          })
          .eq('id', userProfile.id)
          .select()
      }

      // Success - redirect to dashboard
      router.push('/dashboard')
      router.refresh() // Refresh to update auth state
      
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  // Demo credentials function
  const useDemoCredentials = () => {
    setEmail('demo@school.edu')
    setPassword('Demo@123')
    setError(null)
  }

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
              Welcome Back
            </CardTitle>
            <CardDescription className="text-white/70">
              Sign in to your school management account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white/90">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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

                {/* Password field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-white/90">
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
                </div>

                {/* Error message */}
                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                    <p className="text-sm text-red-400 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {error}
                    </p>
                    {error.includes('No account found') && (
                      <Link
                        href="/auth/sign-up"
                        className="block mt-2 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
                      >
                        Click here to create an account
                      </Link>
                    )}
                    {error.includes('Email not confirmed') && (
                      <button
                        type="button"
                        onClick={() => {
                          // Resend confirmation email
                          // You can implement this if needed
                        }}
                        className="block mt-2 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
                      >
                        Resend confirmation email
                      </button>
                    )}
                  </div>
                )}

                {/* Demo credentials button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={useDemoCredentials}
                    className="text-xs text-white/50 hover:text-white/70 transition-colors"
                  >
                    Try demo credentials
                  </button>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium flex items-center justify-center gap-2"
                  disabled={isLoading}  
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </div>

              {/* Sign up link */}
              <div className="text-center text-sm text-white/60 pt-4 border-t border-white/10">
                Don't have an account?{' '}
                <Link
                  href="/auth/sign-up"
                  className="text-white hover:text-white/90 underline underline-offset-4 transition-colors"
                >
                  Create account
                </Link>
              </div>

              {/* Security notice */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <p className="text-xs text-white/40 text-center">
                  🔒 Your login is secured with 256-bit SSL encryption
                </p>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}