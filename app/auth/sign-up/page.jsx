import { SignUpForm } from '@/components/sign-up-form'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="
      min-h-screen w-full
      bg-white dark:bg-[#0B1220]
      flex items-center justify-center
      
      transition-colors
    ">
      {/* Background texture (subtle, serious) */}
     
      {/* Onboarding container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo + context */}
        <div className="text-center mb-10">
          <Image
            src="/logo.png"
            alt="Rudit"
            width={60}
            height={60}
            className="mx-auto mb-2"
            priority
          />
<h1 className='text-cyan-500 mb-4 font-bold text-lg'>Rudit</h1>
          <h1 className="text-3xl font-bold mb-2">
            Create your school account
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Set up your school infrastructure and start managing everything
            from one platform.
          </p>
        </div>

        {/* Form */}
        <SignUpForm />

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Rudit. Smart School Infrastructure for Africa.
        </p>
      </div>
    </div>
  )
}
