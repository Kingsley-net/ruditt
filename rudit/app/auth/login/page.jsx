import { LoginForm } from '@/components/login-form'
import Image from 'next/image'

export default function Page() {
  return (
    <div
      className="
        min-h-screen w-full
        bg-white dark:bg-[#0B1220]
        flex items-center justify-center
        px-6 py-16
        transition-colors
      "
    >
      {/* Subtle background accents */}
      

      {/* Login container */}
      <div className="relative z-10 w-full max-w-2xl text-gray-300">
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
          
          <h1 className="text-3xl font-bold mb-2 text-white dark:text-slate-400 ">
            Sign in to your account
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Access your school dashboard and manage everything in one place.
          </p>
        </div>


        {/* Form */}
        <LoginForm />

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Rudit. Smart School Infrastructure for Africa.
        </p>
      </div>
    </div>
  )
}
