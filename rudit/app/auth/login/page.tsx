import { LoginForm } from '@/components/login-form'


export default function Page() {
  return (
    <div className="flex min-h-svh w-full bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 min-h-screen  items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm/>
      </div>
    </div>
  )
}
