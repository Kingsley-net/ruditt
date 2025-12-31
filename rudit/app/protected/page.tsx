import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '@/components/logout-button' // ensure this is client component

export default async function ProtectedPage() {
  // 1. Create Supabase server client
  const supabase = await createClient()

  // 2. Get user info
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    // Redirect if not logged in
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen w-full items-center justify-center gap-2">
      <div className="flex justify-between items-center">
        <p>
          Hello <span>{user.user_metadata?.name || 'User'}</span>
        </p>
        <LogoutButton />
      </div>
    </div>
  )
}
