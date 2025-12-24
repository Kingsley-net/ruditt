'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Users, GraduationCap, Wallet } from 'lucide-react'

const supabase = createClient()

export default function DashboardPage() {
  const [username, setUsername] = useState('')
  const [userMail, setUserMail] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const { data } = await supabase.auth.getUser()
    const user = data?.user

    setUsername(user?.user_metadata?.name || 'Admin')
    setUserMail(user?.email || '')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <Image src="/logo.png" alt="Rudit" width={40} height={40} />
          <span className="font-bold text-cyan-600 text-lg">Rudit</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <SidebarLink label="Dashboard" />
          <SidebarLink label="Student" />
          <SidebarLink label="Teacher" />
          <SidebarLink label="Classes & Subject" />
          <SidebarLink label="Attendance" />
          <SidebarLink label="Fees & Payment" />
          <SidebarLink label="Messaging" />
          <SidebarLink label="Website Builder" />
          <SidebarLink label="Settings" />
        </nav>
      </aside>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="h-16 flex justify-between items-center px-4 border-b">
            <span className="font-bold text-cyan-600">Rudit</span>
            <button onClick={() => setMobileOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="p-4 space-y-3">
            <SidebarLink label="Dashboard" />
            <SidebarLink label="Student" />
            <SidebarLink label="Teacher" />
            <SidebarLink label="Messaging" />
            <SidebarLink label="Website Builder" />
            <SidebarLink label="Settings" />
          </nav>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <main className="flex-1">
        {/* -------- TOP BAR -------- */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>

            <input
              type="search"
              placeholder="Search..."
              className="hidden md:block w-96 h-10 px-4 rounded-lg border text-sm"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-lg px-3 py-1">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              AU
            </div>
            <div className="text-sm">
              <p className="font-medium">Admin User</p>
              <p className="text-gray-500">{userMail}</p>
            </div>
          </div>
        </header>

        {/* -------- DASHBOARD BODY -------- */}
        <section className="p-4 md:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {username}. Here’s what’s happening today.
            </p>
          </div>

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<Users />} label="Total Students" value="12,750" />
            <StatCard icon={<GraduationCap />} label="Total Teachers" value="250" />
            <StatCard label="Attendance Rate" value="92.5%" />
            <StatCard icon={<Wallet />} label="Revenue This Month" value="₦42m" />
          </div>

          {/* ===== CONTENT GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
              <h2 className="font-semibold mb-4">
                Student Distribution by Class
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                Chart goes here
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h2 className="font-semibold mb-4">Academic Calendar</h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                Calendar goes here
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ================= REUSABLE ================= */

function SidebarLink({ label }) {
  return (
    <Link
      href="#"
      className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
    >
      {label}
    </Link>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}
