'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu, Search, LayoutDashboard, Users, GraduationCap,
  MessageSquare, Globe, Settings, X, Save, ExternalLink, Loader2
} from 'lucide-react'

const supabase = createClient()

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [school, setSchool] = useState<any>(null)
  const [schoolName, setSchoolName] = useState('')
  const [schoolSlug, setSchoolSlug] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInitialData()
  }, [])

  async function fetchInitialData() {
    setIsLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      setUser(user)
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('admin_id', user.id)
        .single()

      if (data) {
        setSchool(data)
        setSchoolName(data.name)
        setSchoolSlug(data.slug)
      }
    }
    setIsLoading(false)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    setSchoolSlug(value)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !school) return

    setIsSaving(true)
    setError(null)

    const { error: updateError } = await supabase
      .from('schools')
      .update({
        name: schoolName,
        slug: schoolSlug,
      })
      .eq('id', school.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      alert("Settings updated successfully!")
    }
    setIsSaving(false)
  }

  const avatarLetter = (user?.email || 'U').charAt(0).toUpperCase()

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Rudit" width={32} height={32} />
          <span className="font-bold text-cyan-600 text-lg">Ruditt</span>
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen(false)}><X size={20} /></button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        <Link href="/protected/dashboard"><SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" /></Link>
        <Link href="/protected/students"><SidebarItem icon={<Users size={18} />} label="Students" /></Link>
        <Link href="/protected/teachers"><SidebarItem icon={<GraduationCap size={18} />} label="Teachers" /></Link>
        <Link href="/protected/website-builder"><SidebarItem icon={<Globe size={18} />} label="Website Builder" /></Link>
        <Link href="/protected/settings"><SidebarItem icon={<Settings size={18} />} label="Settings" active /></Link>
      </nav>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex text-gray-800 dark:text-slate-200">
      
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 flex-col fixed h-full">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b dark:border-slate-800 flex items-center justify-between px-6 sticky top-0">
          <button className="md:hidden" onClick={() => setMobileOpen(true)}><Menu /></button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">{avatarLetter}</div>
             <span className="text-xs hidden sm:block">{user?.email}</span>
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">School Settings</h1>
            <p className="text-gray-500">Manage your school identity and public URL</p>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 text-cyan-600"><Loader2 className="animate-spin" /> Loading settings...</div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border dark:border-slate-800 shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400">School Name</label>
                <input 
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter school name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Public URL Slug</label>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-3 rounded-xl border dark:border-slate-700">
                  <span className="text-gray-400">rudit.com</span>
                  <input 
                    value={schoolSlug}
                    onChange={handleSlugChange}
                    className="bg-transparent outline-none w-full"
                    placeholder="my-school"
                    required
                  />
                </div>
                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Globe size={12}/> Your school will be live at rudit.com{schoolSlug}
                </p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Save Changes
                </button>

                {/* FIXED NEXT.JS LINK COMPONENT */}
                {schoolSlug && (
                  <Link 
                    href={`/sites/${schoolSlug}`}
                    target="_blank"
                    className="flex items-center gap-2 text-cyan-600 font-medium hover:underline text-sm"
                  >
                    View Live Site <ExternalLink size={14} />
                  </Link>
                )}
              </div>
            </form>
          )}
          </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${active ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer'}`}>
      {icon}<span>{label}</span>
    </div>
  )
}
