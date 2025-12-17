import { SignUpForm } from '@/components/sign-up-form'
import Image from 'next/image'
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ">
      <div className="w-full max-w-sm">
        <img src='/rudit-logo.png' alt='Rudit Logo' className="h-20 w-auto mx-auto mb-6" />
        <SignUpForm/>
      </div>
    </div>
  )
}
