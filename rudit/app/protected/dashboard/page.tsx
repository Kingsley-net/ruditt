'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image' 
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  GraduationCap,
  MessageSquare,
  Globe,
  Settings,
  Lock,
  School
} from 'lucide-react'

const supabase = createClient()

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [school, setSchool] = useState<any>(null)
  const [isPublished, setIsPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)

      // Fetch profile and the associated school data (including logo_url)
      const { data: profile } = await supabase
        .from('profiles')
        .select(`full_name, schools ( id, name, slug, logo_url, is_published )`)
        .eq('id', user.id)
        .single()

      if (profile && profile.schools) {
        const schoolData = profile.schools as any
        setSchool(schoolData)
        setIsPublished(schoolData.is_published)
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const avatarLetter = (user?.email || 'U').charAt(0).toUpperCase()
  const isLocked = !isPublished

  // Sidebar Content Component
  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b dark:border-slate-700">
        <div className="flex items-center gap-3">
          {/* DYNAMIC LOGO SECTION - Using regular img tag for compatibility */}
          <div className="relative w-8 h-8 flex-shrink-0">
            {school?.logo_url ? (
              <img
                src={school.logo_url} 
                alt="School Logo" 
                className="object-contain rounded-md h-full w-full"
              />
            ) : (
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-md flex items-center justify-center">
                <School size={18} className="text-cyan-600 dark:text-cyan-400" />
              </div>
            )}
          </div>
          
          <span className="font-bold text-cyan-600 dark:text-cyan-500 text-lg truncate">
            {school?.name || "Ruditt"}
          </span>
        </div>
        <button className="md:hidden p-1 text-gray-500" onClick={() => setMobileOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 text-sm overflow-y-auto">
        <Link href="/protected/dashboard" onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
        </Link>
        <Link href={isLocked ? "#" : "/protected/students"} onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<Users size={18} />} label="Students" locked={isLocked} />
        </Link>
        <Link href={isLocked ? "#" : "/protected/teachers"} onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<GraduationCap size={18} />} label="Teachers" locked={isLocked} />
        </Link>
        <Link href={isLocked ? "#" : "/protected/messaging"} onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<MessageSquare size={18} />} label="Messaging" locked={isLocked} />
        </Link>
        <div className="pt-4 pb-2"><p className="text-[10px] uppercase font-bold text-gray-400 px-3 tracking-widest">Builder</p></div>
        <Link href="/protected/website-builder" onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<Globe size={18} />} label="Website Builder" />
        </Link>
        <Link href="/protected/settings" onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </Link>
      </nav>

      {isLocked && (
        <div className="m-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-1">
            <Lock size={14} /><span className="text-xs font-bold">Locked</span>
          </div>
          <p className="text-[10px] text-amber-600/80 dark:text-amber-400/80">Publish website to unlock features.</p>
        </div>
      )}
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex text-gray-800 dark:text-slate-200">
      
      {/* MOBILE SIDEBAR DRAWER */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <aside className={`absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <SidebarContent />
        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 flex-col fixed h-full z-50">
        <SidebarContent />
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 md:ml-64 flex flex-col w-full min-w-0">
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3">
             <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg" onClick={() => setMobileOpen(true)}><Menu /></button>
             <h1 className="font-semibold text-base md:text-lg">Control Center</h1>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-2 md:px-3 py-1.5 rounded-full">
            <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold">{avatarLetter}</div>
            <span className="text-xs font-medium hidden sm:block truncate max-w-[150px]">{user?.email}</span>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-6 md:mb-10">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Hello, {school?.name || "Admin"}</h1>
              <p className="text-sm md:text-base text-gray-500 mt-2">
                {isLocked ? "Your school is in private mode." : "Your portal is live."}
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <MetricCard title="Active Students" value={isLocked ? "Locked" : "0"} locked={isLocked} />
              <MetricCard title="Staff Members" value={isLocked ? "Locked" : "0"} locked={isLocked} />
              <MetricCard title="Website Status" value={isPublished ? "Published" : "Draft"} color={isPublished ? "text-green-500" : "text-amber-500"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active, locked }: any) {
  return (
    <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : locked ? 'opacity-40 cursor-not-allowed' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer'}`}>
      <div className="flex items-center gap-3">{icon}<span className="font-medium">{label}</span></div>
      {locked && <Lock size={12} />}
    </div>
  )
}

function MetricCard({ title, value, locked, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border dark:border-slate-800 shadow-sm">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</p>
      <p className={`text-2xl md:text-3xl font-bold mt-2 ${color || (locked ? "text-gray-300" : "text-gray-900 dark:text-white")}`}>{value}</p>
    </div>
  )
}
