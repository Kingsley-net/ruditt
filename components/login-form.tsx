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
import { useState, useEffect, ComponentPropsWithoutRef, useRef, useCallback } from 'react'
import { Eye, EyeOff, AlertCircle, LogIn, Mic, Sparkles } from 'lucide-react'

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const FIELD_ORDER = [
  'email',
  'password',
  'submit'
];

export function LoginForm({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const router = useRouter()

  const inputRefs = useRef<Record<string, any>>({});
  const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speak('Welcome back. Please sign in to your account.');
  }, []);

  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speak("Sorry, your browser does not support voice recognition.");
      setError("Voice recognition is not supported by your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    speak('Please say your password.');

    recognition.onresult = (event: any) => {
      const spokenPassword = event.results[0][0].transcript.trim().replace(/\s/g, '');
      setPassword(spokenPassword);
      speak("Password captured.");
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setError(`Error occurred in recognition: ${event.error}`);
      speak("Sorry, I could not recognize your password. Please try again.");
      setIsListening(false);
    };

    recognition.start();
  }

  const handleLogin = async (e: React.FormEvent) => {
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
    } catch (err: any) {
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

  const triggerAdvance = useCallback((currentFieldId: string, delay: number = 4000) => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    const currentIndex = FIELD_ORDER.indexOf(currentFieldId);
    if (currentIndex !== -1 && currentIndex < FIELD_ORDER.length - 1) {
      autoAdvanceTimer.current = setTimeout(() => {
        const nextFieldId = FIELD_ORDER[currentIndex + 1];
        const nextInput = inputRefs.current[nextFieldId];
        if (nextInput) {
          nextInput.focus();
        }
      }, delay);
    }
  }, []);

  const handleFocus = (fieldId: string) => {
    setActiveVoiceField(fieldId);
    const prompts: Record<string, string> = {
      email: "Please enter your email address.",
      password: "Please enter your password. You can also use the voice input button to speak your password.",
      submit: "You are all done. You can now submit the form."
    };
    if (prompts[fieldId]) speak(prompts[fieldId]);
  };

  const onUserTyping = (fieldId: string, valueSetter: (v: any) => void, val: any) => {
    valueSetter(val);
    if (val.length > 1) triggerAdvance(fieldId, 5000);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const target = e.target as HTMLElement;
      const focusedFieldId = target.dataset.fieldid || (target.tagName === 'INPUT' ? (target as HTMLInputElement).name : undefined);

      if (focusedFieldId) {
        const currentIndex = FIELD_ORDER.indexOf(focusedFieldId);
        if (currentIndex !== -1 && currentIndex < FIELD_ORDER.length - 1) {
          const nextFieldId = FIELD_ORDER[currentIndex + 1];
          const nextInput = inputRefs.current[nextFieldId];
          if (nextInput) {
            nextInput.focus();
          }
        } else if (focusedFieldId === 'submit') {
          handleLogin(e as any);
        }
      }
    }
  }, [triggerAdvance, handleLogin]);

  const getHighlightRing = (id: string) =>
    activeVoiceField === id
      ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50/30 dark:bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800";

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative bg-white dark:bg-gray-900 shadow-lg rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-800">
        
        <CardHeader className="pb-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4 uppercase tracking-widest">
            <Sparkles size={14} /> Guided Experience
          </div>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            Sign in to your school management account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="space-y-5 sm:space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                ref={el => inputRefs.current.email = el}
                value={email}
                onChange={(e) => onUserTyping('email', setEmail, e.target.value)}
                onFocus={() => handleFocus('email')}
                data-fieldid="email"
                className={cn("transition-all", getHighlightRing('email'))}
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
                  ref={el => inputRefs.current.password = el}
                  value={password}
                  onChange={(e) => onUserTyping('password', setPassword, e.target.value)}
                  onFocus={() => handleFocus('password')}
                  data-fieldid="password"
                  className={cn("pr-20 transition-all", getHighlightRing('password'))}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={handleListen}
                  className={`absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 p-1 ${isListening ? 'text-cyan-500' : ''}`}
                  disabled={isLoading || isListening}
                  aria-label="Speak your password"
                >
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
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
              ref={el => inputRefs.current.submit = el}
              onFocus={() => handleFocus('submit')}
              data-fieldid="submit"
              className={cn("w-full bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600 hover:from-cyan-600 hover:to-teal-600 dark:hover:from-cyan-700 dark:hover:to-teal-700 text-white font-semibold flex items-center justify-center gap-2 py-2.5 sm:py-3 text-sm sm:text-base transition-all", {
                'bg-blue-600 dark:bg-blue-500': activeVoiceField === 'submit'
              })}
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
