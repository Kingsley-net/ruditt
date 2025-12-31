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
  AlertCircle,
  ExternalLink
} from 'lucide-react'

const supabase = createClient()

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

export default function SettingsPage() {
    const [username, setUsername] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [school, setSchool] = useState(null)
    const [schoolName, setSchoolName] = useState('')
    const [schoolSlug, setSchoolSlug] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [slugError, setSlugError] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
      async function loadInitialData() {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            setUsername(user?.user_metadata?.name || '');
            setUserEmail(user?.email || '');
    
            const { data, error } = await supabase
              .from('schools')
              .select('id, name, slug, status') // Fetch status
              .eq('user_id', user.id)
              .single();
    
            if (data) {
              setSchool(data);
              setSchoolName(data.name);
              setSchoolSlug(data.slug);
            } else if (error && error.code !== 'PGRST116') {
              console.error("Error fetching school:", error);
              setError("Could not load school data.");
            }
        } else {
            setError("You must be logged in to view this page.");
        }
        setIsLoading(false);
      }
    
      loadInitialData();
    }, []);

  const handleSlugChange = (e) => {
    const value = e.target.value
        .toLowerCase() 
        .replace(/\s+/g, '-') 
        .replace(/[^a-z0-9-]/g, '');
    setSchoolSlug(value)
    if (value.length < 3) {
        setSlugError("URL slug must be at least 3 characters long.");
    } else {
        setSlugError('');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        alert("You must be logged in to save.");
        return;
    }

    if (slugError || schoolSlug.length < 3) {
        alert("Please fix the errors before saving.");
        return;
    }

    setIsLoading(true);
    setError(null);

    const schoolData = {
      name: schoolName,
      slug: schoolSlug,
      user_id: user.id,
    };

    let result;
    if (school) {
      result = await supabase.from('schools').update(schoolData).eq('id', school.id).select('*, status').single();
    } else {
      // For new schools, set status to draft and add placeholder content
      schoolData.status = 'draft';
      schoolData.html_content = '<div><h2>Your site is almost ready!</h2><p>Go to the Website Builder to choose a template and publish your page.</p></div>';
      result = await supabase.from('schools').insert(schoolData).select('*, status').single();
    }

    setIsLoading(false);

    if (result.error) {
        console.error("Error saving school:", result.error);
        setError(result.error.message || "An unknown error occurred.");
    } else if (result.data) {
        setSchool(result.data);
        setSchoolName(result.data.name)
        setSchoolSlug(result.data.slug)
        setIsEditing(false);
        alert("School profile saved successfully!");
    } else {
        setError("The operation did not return the expected data. This might be due to a Row Level Security (RLS) policy.");
    }
  };

  const avatarLetter = (username || userEmail || 'U').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex text-gray-800 dark:text-slate-200">

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-800/60 border-r dark:border-slate-700 flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b dark:border-slate-700">
          <Image src="/logo.png" alt="Ruditt" width={32} height={32} />
          <span className="font-bold text-cyan-600 dark:text-cyan-500 text-lg">Ruditt</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
            <Link href="/protected/dashboard"><SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" /></Link>
            <Link href="/protected/students"><SidebarItem icon={<Users size={18} />} label="Students" /></Link>
            <Link href="/protected/teachers"><SidebarItem icon={<GraduationCap size={18} />} label="Teachers" /></Link>
            <Link href="/protected/messaging"><SidebarItem icon={<MessageSquare size={18} />} label="Messaging" /></Link>
            <Link href="/protected/website-builder"><SidebarItem icon={<Globe size={18} />} label="Website Builder" /></Link>
            <Link href="/protected/settings"><SidebarItem icon={<Settings size={18} />} label="Settings" active/></Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b dark:border-slate-700 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600 dark:text-slate-300" onClick={() => setMobileOpen(true)}><Menu /></button>
            <div className="flex md:hidden items-center gap-2">
                <Image src="/logo.png" alt="Ruditt" width={28} height={28} />
                <span className="font-bold text-cyan-600 dark:text-cyan-500">Ruditt</span>
            </div>
            <div className="hidden md:flex items-center gap-2 border border-gray-300 dark:border-slate-600 rounded-lg px-3 h-10 w-96 bg-gray-100 dark:bg-slate-700/50">
                <Search size={16} className="text-gray-400 dark:text-slate-400" />
                <input type="search" placeholder="Search" className="w-full bg-transparent outline-none text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-1.5">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{avatarLetter}</div>
                <div className="hidden sm:block leading-tight">
                    <p className="text-sm font-semibold">{username || 'Admin User'}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{userEmail}</p>
                </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="w-64 bg-white dark:bg-slate-800 h-full p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Ruditt" width={28} height={28} />
                        <span className="font-bold text-cyan-600 dark:text-cyan-500">Ruditt</span>
                    </div>
                    <button onClick={() => setMobileOpen(false)} className="text-gray-500 dark:text-slate-400">✕</button>
                </div>
                <nav className="space-y-3 text-sm">
                    <Link href="/protected/dashboard"><SidebarItem label="Dashboard" /></Link>
                    <Link href="/protected/students"><SidebarItem label="Students" /></Link>
                    <Link href="/protected/teachers"><SidebarItem label="Teachers" /></Link>
                    <Link href="/protected/messaging"><SidebarItem label="Messaging" /></Link>
                    <Link href="/protected/website-builder"><SidebarItem label="Website Builder" /></Link>
                    <Link href="/protected/settings"><SidebarItem label="Settings" active/></Link>
                </nav>
            </div>
          </div>
        )}

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

            <div className="bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">School Profile</h2>

                {isLoading ? (
                    <div className="text-center py-8"><p>Loading...</p></div>
                ) : error ? (
                    <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertCircle size={20} />
                            <span className="font-semibold">Error</span>
                        </div>
                        <p className="text-sm">{error}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSave}>
                        {!school && !isEditing && (
                             <div className="text-center p-8 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                                <p className="text-lg text-gray-600 dark:text-slate-300 mb-4">You haven't created a school profile yet. Create one to get started.</p>
                                <button 
                                    type="button"
                                    onClick={() => setIsEditing(true)} 
                                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Create Profile
                                </button>
                            </div>
                        )}

                        {(isEditing || school) && (
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">School Name</label>
                                    <input 
                                        type="text" 
                                        id="schoolName"
                                        value={schoolName}
                                        onChange={(e) => setSchoolName(e.target.value)}
                                        className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g., Bright Future Academy"
                                        required
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="schoolSlug" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">School URL</label>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 px-3 py-3 bg-gray-100 dark:bg-slate-700/50 border border-r-0 border-gray-300 dark:border-slate-600 rounded-l-lg">https://ruditt.vercel.app/app/sites/</span>
                                        <input 
                                            type="text" 
                                            id="schoolSlug"
                                            value={schoolSlug}
                                            onChange={handleSlugChange}
                                            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-r-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="your-school-name"
                                            required
                                            minLength="3"
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    {slugError && <p className="text-sm text-red-500 mt-2">{slugError}</p>}
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">This will be your school's public website address. Use only lowercase letters, numbers, and hyphens.</p>
                                </div>

                                {school && !isEditing && (
                                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                        <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200 mb-2">Website Status</h3>
                                        {school.status === 'published' ? (
                                            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                                                <p className="font-semibold text-green-800 dark:text-green-300">Published</p>
                                                <div className="mt-2 text-sm">
                                                    <span className="text-gray-600 dark:text-slate-300">Your site is live at: </span>
                                                    <Link href={`https://ruditt.vercel.app/app/sites/${school.slug}`} target="_blank" className="text-blue-600 dark:text-blue-500 hover:underline inline-flex items-center gap-1 font-medium">
                                                        ruditt.vercel.app/app/sites/{school.slug}
                                                        <ExternalLink size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
                                                <p className="font-semibold text-yellow-800 dark:text-yellow-300">Draft</p>
                                                <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">
                                                    Your site is not yet public. Go to the <Link href="/protected/website-builder" className="underline font-medium">Website Builder</Link> to publish your site.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                                    {isEditing ? (
                                        <>
                                            <button type="button" onClick={() => { setIsEditing(false); setSchoolName(school?.name || ''); setSchoolSlug(school?.slug || ''); setSlugError(''); setError(null); }} className="text-gray-600 dark:text-slate-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700">Cancel</button>
                                            <button type="submit" className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 font-semibold disabled:bg-gray-400" disabled={isLoading || !!slugError}>{isLoading ? 'Saving...' : 'Save Profile'}</button>
                                        </>
                                    ) : (
                                        <button type="button" onClick={() => setIsEditing(true)} className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 font-semibold">Edit Profile</button>
                                    )}
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
      </main>
    </div>
  </div>
  );
}
