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

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      router.push('/protected/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const useDemoCredentials = () => {
    setEmail('demo@school.edu')
    setPassword('Demo@123')
    setError(null)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative bg-white dark:bg-gray-900 shadow-lg rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-800">
        
        <CardHeader className="pb-4 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            Sign in to your school management account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null) }}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-cyan-500 dark:focus:border-cyan-400 transition-all"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null) }}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-cyan-500 dark:focus:border-cyan-400 pr-10 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors p-1"
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                <p className="flex items-center text-xs sm:text-sm text-red-600 dark:text-red-400 gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </p>
              </div>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={useDemoCredentials}
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium"
                disabled={isLoading}
              >
                Try demo credentials
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600 hover:from-cyan-600 hover:to-teal-600 dark:hover:from-cyan-700 dark:hover:to-teal-700 text-white font-semibold flex items-center justify-center gap-2 py-2.5 sm:py-3 text-sm sm:text-base transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="hidden sm:inline">Signing in...</span>
                  <span className="sm:hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Sign In</span>
                </>
              )}
            </Button>

            <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
              Don't have an account?{' '}
              <Link 
                href="/auth/sign-up" 
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline font-medium transition-colors"
              >
                Create account
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}