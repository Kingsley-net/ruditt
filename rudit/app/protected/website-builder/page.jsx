
'use client'

import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu,
  LayoutDashboard,
  Users,
  GraduationCap,
  MessageSquare,
  Globe,
  Settings,
  Loader2,
  Eye,
  Save,
  Palette,
  ArrowLeft,
  Info
} from 'lucide-react'

// --- TEMPLATES ---
// I have professionally converted your five templates into HTML.
// These are now ready to be loaded into the editor.
const templates = [
  {
    id: 'classic-school',
    name: 'Classic School',
    description: 'A traditional and elegant design, perfect for established institutions. Focuses on heritage and academic excellence.',
    html: `
      <div style="font-family: serif; line-height: 1.6; color: #333;">
        <header style="background-color: #003366; color: white; padding: 4rem 2rem; text-align: center;">
          <h1 style="font-size: 3.5rem; font-weight: bold; margin: 0;">King\'s College</h1>
          <p style="font-size: 1.25rem; margin-top: 0.5rem;">Founded 1829</p>
        </header>
        <main style="padding: 2rem;">
          <section style="max-width: 800px; margin: auto; text-align: center; padding: 3rem 0;">
            <h2 style="font-size: 2.5rem; color: #003366;">Welcome to Our Prestigious Institution</h2>
            <p style="margin-top: 1rem;">For nearly 200 years, King\'s College has been a leader in education, fostering intellectual curiosity and a commitment to service. We welcome you to explore our rich history and vibrant community.</p>
          </section>
          <section style="max-width: 800px; margin: auto; padding: 3rem 0;">
            <h2 style="font-size: 2.5rem; text-align: center; color: #003366;">Our Legacy</h2>
            <p style="margin-top: 1rem;">From groundbreaking research to our celebrated alumni, our legacy is one of excellence and impact. Our commitment to rigorous academics and character development prepares students to lead and innovate.</p>
          </section>
        </main>
        <footer style="background-color: #f4f4f4; color: #555; text-align: center; padding: 2rem;">
            <p>&copy; 2024 King\'s College. All Rights Reserved.</p>
        </footer>
      </div>
    `
  },
  {
    id: 'minimalist-institute',
    name: 'Minimalist Institute',
    description: 'A clean, modern, and focused design. Ideal for research institutes, and specialized programs.',
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
        <header style="padding: 2rem; border-bottom: 1px solid #eee;">
            <h1 style="font-size: 2rem; font-weight: 600; text-align: center;">The Institute for Advanced Study</h1>
        </header>
        <main style="padding: 4rem 2rem;">
            <section style="max-width: 700px; margin: auto;">
                <h2 style="font-size: 2.8rem; font-weight: 700; text-align: center;">Pursuit of Knowledge</h2>
                <p style="margin-top: 1.5rem; font-size: 1.1rem; text-align: center; color: #555;">We are a community of scholars dedicated to fundamental research and the expansion of human understanding. Our work is driven by curiosity and a commitment to intellectual freedom.</p>
            </section>
        </main>
        <footer style="padding: 2rem; text-align: center; font-size: 0.9rem; color: #777; border-top: 1px solid #eee;">
            <p>Innovate. Discover. Educate.</p>
        </footer>
      </div>
    `
  },
  {
    id: 'modern-academy',
    name: 'Modern Academy',
    description: 'A vibrant and tech-focused design for forward-thinking schools. Uses bold colors and clean lines.',
    html: `
      <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: #E0E0E0; background-color: #1a202c;">
        <header style="background-color: #2d3748; padding: 4rem 2rem; text-align: center;">
            <h1 style="font-size: 3.5rem; font-weight: 800; color: #4fd1c5;">Modern Academy</h1>
            <p style="font-size: 1.25rem; color: #a0aec0; margin-top: 0.5rem;">Shaping the Innovators of Tomorrow</p>
        </header>
        <main style="padding: 4rem 2rem;">
            <section style="max-width: 900px; margin: auto; text-align: center;">
                <h2 style="font-size: 2.5rem; font-weight: 700; color: #4fd1c5;">Our Vision</h2>
                <p style="margin-top: 1rem; font-size: 1.1rem; color: #cbd5e0; max-width: 700px; margin-left: auto; margin-right: auto;">We leverage technology and project-based learning to equip students with the skills they need to thrive in a rapidly changing world. Our curriculum is designed to foster creativity, critical thinking, and collaboration.</p>
            </section>
            <section style="margin-top: 5rem; text-align: center; background-color: #4fd1c5; padding: 4rem 2rem; border-radius: 8px;">
                <h2 style="font-size: 2.5rem; font-weight: 700; color: #1a202c;">Join the Innovators</h2>
                <p style="margin-top: 1rem; font-size: 1.1rem; color: #2d3748; max-width: 600px; margin-left: auto; margin-right: auto;">We are looking for passionate minds to join our community. Learn more about our admissions process.</p>
                <button style="margin-top: 2rem; background-color: white; color: #2d3748; padding: 0.75rem 2rem; border-radius: 6px; font-weight: 600; border: none; cursor: pointer;">Apply Now</button>
            </section>
        </main>
        <footer style="padding: 2rem; text-align: center; font-size: 0.9rem; color: #718096; border-top: 1px solid #2d3748;">
            <p>&copy; 2024 Modern Academy. All Rights Reserved.</p>
        </footer>
      </div>
    `
  },
  {
    id: 'online-university',
    name: 'Online University',
    description: 'A flexible and accessible design for digital-first learning platforms, MOOCs, and remote education.',
    html: `
      <div style="font-family: 'Poppins', sans-serif; line-height: 1.7; color: #333;">
          <header style="background-color: #fff; border-bottom: 1px solid #ddd; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center;">
              <h1 style="font-size: 1.8rem; font-weight: 600; color: #1E40AF;">Global Campus</h1>
              <nav>
                  <a href="#" style="margin-left: 1.5rem; color: #333; text-decoration: none;">Courses</a>
                  <a href="#" style="margin-left: 1.5rem; color: #333; text-decoration: none;">About</a>
                  <a href="#" style="background-color: #1E40AF; color: white; padding: 0.5rem 1.2rem; border-radius: 99px; text-decoration: none; margin-left: 1.5rem;">Sign Up</a>
              </nav>
          </header>
          <main>
              <section style="background-color: #EFF6FF; text-align: center; padding: 6rem 2rem;">
                  <h2 style="font-size: 3.2rem; font-weight: 700; color: #1E3A8A;">Learn Without Limits</h2>
                  <p style="max-width: 600px; margin: 1rem auto; font-size: 1.1rem; color: #374151;">Access world-class education from anywhere. Our flexible online platform is designed to fit your life.</p>
              </section>
          </main>
          <footer style="padding: 3rem 2rem; text-align: center; background: #F9FAFB;">
              <p>&copy; 2024 Global Campus. Your Future, Redefined.</p>
          </footer>
      </div>
    `
  },
  {
    id: 'playful-kindergarten',
    name: 'Playful Kindergarten',
    description: 'A fun, colorful, and friendly design perfect for preschools, daycares, and early learning centers.',
    html: `
      <div style="font-family: 'Comic Sans MS', cursive, sans-serif; background-color: #FFFBEB; color: #5D4037;">
          <header style="background-color: #FFC107; text-align: center; padding: 2rem; border-bottom: 5px dashed #F57C00;">
              <h1 style="font-size: 3.5rem; font-weight: bold; color: #BF360C;">Little Sprouts Academy</h1>
          </header>
          <main style="padding: 4rem 2rem;">
              <section style="text-align: center;">
                  <h2 style="font-size: 2.8rem; font-weight: bold; color: #4CAF50;">A World of Fun and Learning!</h2>
                  <p style="max-w: 600px; margin: 1rem auto; font-size: 1.2rem;">Welcome to our kindergarten, where every day is an adventure. We believe in learning through play, creativity, and exploration.</p>
              </section>
              <section style="margin-top: 4rem; text-align: center;">
                  <h3 style="font-size: 2.2rem; font-weight: bold; color: #1976D2;">Our Activities</h3>
                  <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 2rem;">
                      <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                          <h4 style="font-size: 1.5rem; font-weight: bold; color: #F57C00;">Creative Arts</h4>
                      </div>
                      <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                          <h4 style="font-size: 1.5rem; font-weight: bold; color: #4CAF50;">Outdoor Fun</h4>
                      </div>
                      <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                          <h4 style="font-size: 1.5rem; font-weight: bold; color: #1976D2;">Story Time</h4>
                      </div>
                  </div>
              </section>
          </main>
          <footer style="padding: 2rem; text-align: center; margin-top: 2rem; background-color: #FFC107; color: #5D4037;">
              <p>Contact us to schedule a tour!</p>
          </footer>
      </div>
    `
  }
];

const supabase = createClient();

// Sidebar (unchanged, but kept for layout)
function SidebarItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${active ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50'}`}>
      {icon}
      <span>{label}</span>
    </div>
  )
}

export default function WebsiteBuilderPage() {
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // NEW STATE: Manages view (gallery vs editor) and content
  const [view, setView] = useState('loading'); // loading, gallery, editor
  const [editorHtml, setEditorHtml] = useState('');

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        // In a real app, you'd redirect to login here
        return;
      }

      const { data: schoolData, error } = await supabase
        .from('schools')
        .select('id, name, slug, html_content, status')
        .eq('user_id', user.id)
        .single();

      if (schoolData) {
        setSchool(schoolData);
        // DECIDE VIEW: If user has saved content, go to editor. Otherwise, show gallery.
        if (schoolData.html_content) {
          setEditorHtml(schoolData.html_content);
          setView('editor');
        } else {
          setView('gallery');
        }
      } else if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error("Error fetching school:", error);
      } else {
        // No school profile found for this user
        setView('no_school_profile');
      }
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  const handleSelectTemplate = (templateHtml) => {
    setEditorHtml(templateHtml);
    setView('editor');
  };

  const handlePublish = async () => {
    if (!school) return;
    const isConfirmed = confirm(`You are about to publish the website for "${school.name}". This will make the current content live. Are you sure?`);
    if (!isConfirmed) return;

    setIsPublishing(true);
    
    // Get content from the live iframe editor
    const editorFrame = document.getElementById('editor-iframe');
    const currentHtml = editorFrame.contentWindow.document.body.innerHTML;

    const { data, error } = await supabase
        .from('schools')
        .update({ 
            html_content: currentHtml,
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
        setSchool(data); // Update local school state with new data
        setEditorHtml(data.html_content); // Ensure editor has the latest saved version
        alert("Your website has been published successfully!");
    }
  };

  // --- RENDER FUNCTIONS for different views ---

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <Loader2 className="mx-auto animate-spin text-blue-600" size={48} />
      <p className="mt-4 text-lg text-gray-600 dark:text-slate-300">Loading Website Builder...</p>
    </div>
  );

  const renderNoSchoolProfile = () => (
    <div className="text-center bg-white dark:bg-slate-800 max-w-lg mx-auto p-10 rounded-lg shadow">
      <Info size={48} className="mx-auto text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-4">Create Your School Profile</h2>
      <p className="text-gray-600 dark:text-slate-300 mb-6">You need to create a school profile before you can build a website. This will determine your school's public URL.</p>
      <Link href="/protected/settings" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 font-semibold inline-block">Go to Settings</Link>
    </div>
  );

  const renderTemplateGallery = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Choose a Template</h2>
      <p className="text-gray-600 dark:text-slate-300 mb-8">Select a starting point for your school's new website. You can customize it later.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map(template => (
          <div key={template.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2" onClick={() => handleSelectTemplate(template.html)}>
            <div className="bg-gray-200 dark:bg-slate-700 h-48 flex items-center justify-center">
              <Palette className="text-gray-400 dark:text-slate-500" size={48}/>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-slate-100">{template.name}</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">{template.description}</p>
            </div>
            <div className="absolute inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-bold">Use Template</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="flex flex-col h-full">
        {/* Editor Header */}
        <div className="flex-shrink-0 flex items-center justify-between mb-4">
            <button onClick={() => setView('gallery')} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-blue-600">
                <ArrowLeft size={16} />
                Back to Templates
            </button>
        </div>
        {/* Iframe-based Editor */}
        <div className="flex-1 rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-slate-700">
            <iframe id="editor-iframe" srcDoc={editorHtml} className="w-full h-full" title="Website Editor"></iframe>
        </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
        case 'loading': return renderLoading();
        case 'no_school_profile': return renderNoSchoolProfile();
        case 'gallery': return renderTemplateGallery();
        case 'editor': return renderEditor();
        default: return renderLoading();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex text-gray-800 dark:text-slate-200">
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

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b dark:border-slate-700 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600 dark:text-slate-300" onClick={() => setMobileOpen(true)}><Menu /></button>
            <h1 className="text-xl font-semibold">Website Builder</h1>
          </div>
          <div className="flex items-center gap-4">
             {school && view === 'editor' && (
                <Link href={`/sites/${school.slug}`} target="_blank" className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <Eye size={16} />
                    <span>Preview</span>
                </Link>
             )}
            <button 
                onClick={handlePublish}
                disabled={isPublishing || isLoading || view !== 'editor'}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isPublishing ? <Loader2 size={18} className="animate-spin"/> : <Save size={18} />}
                <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </header>

        {/* --- Main Content Area --- */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
            <Suspense fallback={renderLoading()}>
                {renderContent()}
            </Suspense>
        </main>
      </div>

       {/* Mobile Sidebar */}
       {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="w-64 bg-white dark:bg-slate-800 h-full p-4" onClick={(e) => e.stopPropagation()}>
                <nav className="space-y-3 text-sm">
                  {/* ... mobile nav items ... */}
                </nav>
            </div>
          </div>
        )}
    </div>
  );
}
