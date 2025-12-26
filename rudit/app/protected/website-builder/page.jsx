'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu,
  Search,
  LayoutDashboard,
  Users,
  GraduationCap,
  MessageSquare,
  Globe,
  Settings,
} from 'lucide-react'

import ClassicSchoolTemplate from './templates/classic-school/page'
import ModernAcademyTemplate from './templates/modern-academy/page'
import PlayfulKindergartenTemplate from './templates/playful-kindergarten/page'
import OnlineUniversityTemplate from './templates/online-university/page'
import MinimalistInstituteTemplate from './templates/minimalist-institute/page'

const supabase = createClient()

const templates = {
  'Classic School': <ClassicSchoolTemplate />,
  'Modern Academy': <ModernAcademyTemplate />,
  'Playful Kindergarten': <PlayfulKindergartenTemplate />,
  'Online University': <OnlineUniversityTemplate />,
  'Minimalist Institute': <MinimalistInstituteTemplate />,
};


export default function WebsiteBuilderPage() {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const { data } = await supabase.auth.getUser()
    const user = data?.user

    setUsername(user?.user_metadata?.name || '')
    setUserEmail(user?.email || '')
  }

  const avatarLetter = (username || userEmail || 'U').charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex text-gray-800 dark:text-slate-200">

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-800/60 border-r dark:border-slate-700 flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b dark:border-slate-700">
          <Image src="/logo.png" alt="Rudit" width={32} height={32} />
          <span className="font-bold text-cyan-600 dark:text-cyan-500 text-lg">Rudit</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <Link href="/protected/dashboard"><SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" /></Link>
          <Link href="/protected/students"><SidebarItem icon={<Users size={18} />} label="Students" /></Link>
          <Link href="/protected/teachers"><SidebarItem icon={<GraduationCap size={18} />} label="Teachers" /></Link>
          <Link href="/protected/messaging"><SidebarItem icon={<MessageSquare size={18} />} label="Messaging" /></Link>
          <Link href="/protected/website-builder"><SidebarItem icon={<Globe size={18} />} label="Website Builder" active/></Link>
          <Link href="/protected/settings"><SidebarItem icon={<Settings size={18} />} label="Settings" /></Link>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* ================= HEADER ================= */}
        <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b dark:border-slate-700 flex items-center justify-between px-4 md:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-600 dark:text-slate-300"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>

            {/* Mobile Logo */}
            <div className="flex md:hidden items-center gap-2">
              <Image src="/logo.png" alt="Rudit" width={28} height={28} />
              <span className="font-bold text-cyan-600 dark:text-cyan-500">Rudit</span>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center gap-2 border border-gray-300 dark:border-slate-600 rounded-lg px-3 h-10 w-96 bg-gray-100 dark:bg-slate-700/50">
              <Search size={16} className="text-gray-400 dark:text-slate-400" />
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-1.5">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {avatarLetter}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                  {username || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{userEmail}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= MOBILE SIDEBAR ================= */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="w-64 bg-white dark:bg-slate-800 h-full p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Rudit" width={28} height={28} />
                  <span className="font-bold text-cyan-600 dark:text-cyan-500">Rudit</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-gray-500 dark:text-slate-400">✕</button>
              </div>

              <nav className="space-y-3 text-sm">
                <Link href="/protected/dashboard"><SidebarItem label="Dashboard" /></Link>
                <Link href="/protected/students"><SidebarItem label="Students" /></Link>
                <Link href="/protected/teachers"><SidebarItem label="Teachers" /></Link>
                <Link href="/protected/messaging"><SidebarItem label="Messaging" /></Link>
                <Link href="/protected/website-builder"><SidebarItem label="Website Builder" active/></Link>
                <Link href="/protected/settings"><SidebarItem label="Settings" /></Link>
              </nav>
            </div>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        <main className="flex-1 p-6">
          {selectedTemplate ? (
            <div>
              <button onClick={() => setSelectedTemplate(null)} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mb-4">
                &larr; Back to Templates
              </button>
              <div className="border rounded-lg overflow-hidden">
                {templates[selectedTemplate]}
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Website Builder</h1>
              <p className="text-gray-600 dark:text-slate-400 mt-1">
                Choose a template to start building your school's website.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {Object.keys(templates).map(name => (
                  <TemplateCard 
                    key={name} 
                    name={name} 
                    onSelect={setSelectedTemplate}
                    preview={templates[name]}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function SidebarItem({ icon, label, active }) {
    return (
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
          active
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50'
        }`}
      >
        {icon}
        <span>{label}</span>
      </div>
    )
  }

  function TemplateCard({ name, onSelect, preview }) {
    return (
      <div className="bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex flex-col h-[400px]">
        <div className="flex-grow overflow-hidden rounded-lg border dark:border-slate-700">
          <div className="transform scale-[0.25] origin-top-left w-[1280px] h-[1600px]">
              {preview}
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-4">{name}</p>
        <button onClick={() => onSelect(name)} className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Edit</button>
      </div>
    )
  }
