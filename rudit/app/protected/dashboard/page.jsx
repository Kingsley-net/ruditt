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

const supabase = createClient()

export default function DashboardPage() {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

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
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden md:flex w-64 bg-white border-r flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <Image src="/logo.png" alt="Rudit" width={32} height={32} />
          <span className="font-bold text-cyan-600 text-lg">Rudit</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <SidebarItem icon={<Users size={18} />} label="Students" />
          <SidebarItem icon={<GraduationCap size={18} />} label="Teachers" />
          <SidebarItem icon={<MessageSquare size={18} />} label="Messaging" />
          <SidebarItem icon={<Globe size={18} />} label="Website Builder" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* ================= HEADER ================= */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>

            {/* Mobile Logo */}
            <div className="flex md:hidden items-center gap-2">
              <Image src="/logo.png" alt="Rudit" width={28} height={28} />
              <span className="font-bold text-cyan-600">Rudit</span>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center gap-2 border rounded-lg px-3 h-10 w-96">
              <Search size={16} className="text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border rounded-xl px-3 py-1.5">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {avatarLetter}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold">
                  {username || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= MOBILE SIDEBAR ================= */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
            <div className="w-64 bg-white h-full p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Rudit" width={28} height={28} />
                  <span className="font-bold text-cyan-600">Rudit</span>
                </div>
                <button onClick={() => setMobileOpen(false)}>✕</button>
              </div>

              <nav className="space-y-3 text-sm">
                <SidebarItem label="Dashboard" />
                <SidebarItem label="Students" />
                <SidebarItem label="Teachers" />
                <SidebarItem label="Messaging" />
                <SidebarItem label="Website Builder" />
                <SidebarItem label="Settings" />
              </nav>
            </div>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back{username && `, ${username}`}! Here’s what’s happening today.
          </p>

          {/* === METRIC CARDS (REAL DATA GOES HERE) === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <MetricCard title="Total Students" value="12,750" />
            <MetricCard title="Total Teachers" value="250" />
            <MetricCard title="Attendance Rate" value="92.5%" />
            <MetricCard title="Revenue This Month" value="₦42m" />
          </div>

          {/* Next sections: charts, calendar, notice board */}
        </main>
      </div>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}
