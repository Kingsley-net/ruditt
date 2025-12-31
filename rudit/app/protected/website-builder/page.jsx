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
  Loader2,
  Eye,
  Save
} from 'lucide-react'

const supabase = createClient();

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

export default function WebsiteBuilderPage() {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [template, setTemplate] = useState('template1');

  useEffect(() => {
    async function loadInitialData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUsername(user?.user_metadata?.name || '');
        setUserEmail(user?.email || '');

        const { data: schoolData, error } = await supabase
          .from('schools')
          .select('id, name, slug, html_content, status')
          .eq('user_id', user.id)
          .single();

        if (schoolData) {
          setSchool(schoolData);
          if (schoolData.html_content) {
            // A real app would parse the content to determine the template
            // For now, we just load the content
          }
        } else if (error && error.code !== 'PGRST116') {
          console.error("Error fetching school:", error);
        }
      }
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  const handlePublish = async () => {
    if (!school) {
        alert("Action Required: Cannot publish because no school is linked to your account. Please go to 'Settings' to create your school profile first.");
        return;
    }

    const isConfirmed = confirm(
        `You are about to publish the website for "${school.name}".\n\n` +
        `This will make it live at:\nhttps://ruditt.vercel.app/app/sites/${school.slug}\n\n` +
        `Are you sure you want to continue?`
    );

    if (!isConfirmed) {
        return;
    }

    setIsPublishing(true);

    const websiteContent = document.getElementById('website-content')?.innerHTML;
    if (!websiteContent) {
        alert("Error: Could not find website content to publish.");
        setIsPublishing(false);
        return;
    }

    const { data, error } = await supabase
        .from('schools')
        .update({ 
            html_content: websiteContent,
            status: 'published'
        })
        .eq('id', school.id)
        .select()
        .single();

    setIsPublishing(false);

    if (error) {
        console.error("Error publishing:", error);
        alert(`Error: ${error.message}`);
    } else {
        setSchool(data);
        alert("Your website has been published successfully!");
    }
  };

  const avatarLetter = (username || userEmail || 'U').charAt(0).toUpperCase();

  const renderTemplate = () => {
    const content = school?.html_content || `
      <div class="bg-blue-600 text-white text-center py-20">
        <h1 class="text-5xl font-bold">Welcome to Our School</h1>
        <p class="mt-4 text-xl">A place for learning and growth</p>
      </div>
      <div class="p-10">
        <h2 class="text-3xl font-bold text-center">About Us</h2>
        <p class="mt-4 max-w-2xl mx-auto text-gray-600">Edit this text to tell your story.</p>
      </div>
    `;
    return <div id="website-content" contentEditable="true" dangerouslySetInnerHTML={{ __html: content }} />
  };

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
            <Link href="/protected/website-builder"><SidebarItem icon={<Globe size={18} />} label="Website Builder" active/></Link>
            <Link href="/protected/settings"><SidebarItem icon={<Settings size={18} />} label="Settings" /></Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b dark:border-slate-700 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600 dark:text-slate-300" onClick={() => setMobileOpen(true)}><Menu /></button>
            <div className="flex items-center">
                <h1 className="text-xl font-semibold">Website Builder</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {school && (
                <Link href={`https://ruditt.vercel.app/app/sites/${school.slug}`} target="_blank" className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <Eye size={16} />
                    <span>Preview</span>
                </Link>
             )}
            <button 
                onClick={handlePublish}
                disabled={isPublishing || isLoading || !school}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isPublishing ? <Loader2 size={18} className="animate-spin"/> : <Save size={18} />}
                <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
            </button>
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
                    <Link href="/protected/website-builder"><SidebarItem label="Website Builder" active /></Link>
                    <Link href="/protected/settings"><SidebarItem label="Settings" /></Link>
                </nav>
            </div>
          </div>
        )}

      <main className="flex-1 bg-gray-200 dark:bg-slate-900/50 p-4">
        {isLoading ? (
            <div className="text-center py-20"><Loader2 className="mx-auto animate-spin" /></div>
        ) : !school ? (
            <div className="text-center bg-white dark:bg-slate-800 max-w-lg mx-auto p-10 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Create Your School Profile</h2>
                <p className="text-gray-600 dark:text-slate-300 mb-6">You need to create a school profile before you can build a website. This will determine your school's public URL.</p>
                <Link href="/protected/settings" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 font-semibold">Go to Settings</Link>
            </div>
        ) : (
            <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
                 {renderTemplate()}
            </div>
        )}
      </main>
    </div>
  </div>
  );
}
