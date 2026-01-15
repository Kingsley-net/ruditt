
'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
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
  School,
  Loader,
  ChevronRight,
  Volume2
} from 'lucide-react'
import { speak } from '@/lib/speech';
import { selectBestContrastColor } from '@/lib/colorUtils';

const supabase = createClient()

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [school, setSchool] = useState<any>(null)
  const [isPublished, setIsPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [primaryColor, setPrimaryColor] = useState('#06B6D4');
  const mainContentRef = useRef<HTMLElement>(null);
  const isLocked = !isPublished;

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (school?.logo_url) {
      extractColors(school.logo_url);
    }
  }, [school?.logo_url]);

  useEffect(() => {
    if (colorPalette.length > 0) {
      const bestColor = selectBestContrastColor(colorPalette, '#FFFFFF', 3.0);
      setPrimaryColor(bestColor || '#06B6D4');
    }
  }, [colorPalette]);

  useEffect(() => {
    if (!isLoading && school && isLocked) {
      const schoolName = school.name || "Admin";
      const message = `Welcome to your dashboard, ${schoolName}. Your dashboard is locked. You will need to create a website. Go to the website builder, edit, and publish your site.`
      speak(message);
    }
  }, [isLoading, school, isLocked]);


  async function fetchUserData() {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)

      const { data: profile } = await supabase
        .from('profiles')
        .select(`*, schools(*)`)
        .eq('id', user.id)
        .single()

      if (profile && profile.schools) {
        const schoolData = Array.isArray(profile.schools) ? profile.schools[0] : profile.schools;
        if (schoolData) {
            setSchool(schoolData);
            setIsPublished(schoolData.is_published);
        }
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  async function extractColors(imageUrl: string) {
    try {
      const response = await fetch(`/api/get-colors?imageUrl=${encodeURIComponent(imageUrl)}`);
      const { palette } = await response.json();
      setColorPalette(palette);
    } catch (error) {
      console.error('Error extracting colors:', error);
    }
  }

  const readPageContent = () => {
    if (mainContentRef.current) {
      const text = mainContentRef.current.innerText;
      speak(text);
    }
  };

  const avatarLetter = (user?.email || 'U').charAt(0).toUpperCase()

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-xl">
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            {school?.logo_url ? (
              <img src={school.logo_url} alt="Logo" className="object-contain rounded-xl h-full w-full border border-white/50 shadow-sm" />
            ) : (
              <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                <School size={20} style={{ color: primaryColor }} />
              </div>
            )}
          </div>
          <span className="font-bold text-lg tracking-tight truncate uppercase" style={{ color: primaryColor }}>
            {school?.name || "Ruditt"}
          </span>
        </div>
        <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg" onClick={() => setMobileOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <Link href="/protected/dashboard" onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active primaryColor={primaryColor} />
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
        
        <div className="pt-6 pb-2">
            <p className="text-[10px] uppercase font-black text-slate-400 px-4 tracking-[0.2em]">Builder</p>
        </div>
        
        <Link href="/protected/website-builder" onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<Globe size={18} />} label="Website Builder" />
        </Link>
        
        <Link href="/protected/settings" onClick={() => setMobileOpen(false)}>
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </Link>
      </nav>

      {isLocked && (
        <div className="m-6 p-4 bg-slate-900 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2 text-white mb-1">
            <Lock size={12} className="text-amber-400" /><span className="text-[11px] font-bold uppercase tracking-wider">Locked</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">Publish website to unlock all platform features.</p>
        </div>
      )}
    </div>
  )

  if (isLoading) return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
      <Loader className="animate-spin text-cyan-500" size={48} />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900">
      
      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ${mobileOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500 ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} />
        <aside className={`absolute left-0 top-0 bottom-0 w-80 bg-white transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <SidebarContent />
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200/60 flex-col fixed h-full z-50">
        <SidebarContent />
      </aside>

      <div className="flex-1 md:ml-72 flex flex-col w-full min-w-0">
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
             <button className="md:hidden p-2.5 hover:bg-slate-100 rounded-xl" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
             <h1 className="font-bold text-lg tracking-tight">Control Center</h1>
          </div>

          <div className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full border border-slate-200/60 bg-white/50 shadow-sm">
            <button onClick={readPageContent} className="p-2.5 hover:bg-slate-100 rounded-xl">
              <Volume2 size={20} />
            </button>
            <span className="text-xs font-semibold text-slate-600 hidden sm:block truncate max-w-[150px]">{user?.email}</span>
            <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-xs font-black shadow-inner" style={{ backgroundColor: primaryColor }}>{avatarLetter}</div>
          </div>
        </header>

        <main ref={mainContentRef} className="p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hello, {school?.name || "Admin"}</h1>
              <p className="text-slate-500 mt-2 font-medium">
                {isLocked ? "Your school is in private mode." : "Your portal is live."}
              </p>
            </header>
          
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard title="Active Students" value={isLocked ? "Locked" : "0"} locked={isLocked} primary={primaryColor} />
              <MetricCard title="Staff Members" value={isLocked ? "Locked" : "0"} locked={isLocked} primary={primaryColor} />
              <MetricCard title="Website Status" value={isPublished ? "Published" : "Draft"} color={isPublished ? "text-green-600" : "text-amber-600"} primary={primaryColor} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active, locked, primaryColor }: any) {
  const activeStyle = active ? { 
    backgroundColor: primaryColor,
    boxShadow: `0 10px 20px -5px ${primaryColor}44` 
  } : {}

  return (
    <div 
      className={`group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
        active ? 'text-white' : locked ? 'opacity-30 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
      }`}
      style={activeStyle}
    >
      <div className="flex items-center gap-3.5">
        <span className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>{icon}</span>
        <span className="font-bold text-[13px] tracking-wide">{label}</span>
      </div>
      {locked ? <Lock size={12} /> : active ? <div className="w-1.5 h-1.5 rounded-full bg-white" /> : <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />}
    </div>
  )
}

function MetricCard({ title, value, locked, color, primary }: any) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity" style={{ color: primary }}>
        <LayoutDashboard size={40} />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">{title}</p>
      <p className={`text-4xl font-black tracking-tighter ${color || (locked ? "text-slate-200" : "text-slate-900")}`}>{value}</p>
    </div>
  )
}
