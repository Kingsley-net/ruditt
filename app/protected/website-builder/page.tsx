'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Node } from '@tiptap/core'
import { 
  Globe, 
  Layout, 
  Loader2, 
  ArrowLeft, 
  X, 
  School, 
  Smartphone, 
  Monitor, 
  Zap, 
  CheckCircle2 
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Logic remains identical as requested
const GlobalStyleExtension = Node.create({
  name: 'div',
  group: 'block',
  content: 'block*',
  parseHTML() { return [{ tag: 'div' }] },
  renderHTML({ HTMLAttributes }) { return ['div', HTMLAttributes, 0] },
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => (attributes.style ? { style: attributes.style } : {}),
      },
    }
  },
})

const TEMPLATES = [
  {
    id: 'elite-modern',
    name: 'Elite Modern',
    preview: 'Premium design with gradient hero',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1e293b;">
        <header style="padding: 20px clamp(20px, 4vw, 60px); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 12px;">
            {schoolLogo}
            <span style="font-weight: 800; font-size: 20px;">{schoolName}</span>
          </div>
          <nav style="display: none; md:display: flex; gap: 30px; font-weight: 600; font-size: 15px;">
            <a href="#home" style="color: #1e293b;">Home</a>
            <a href="#about" style="color: #475569;">About</a>
            <a href="#admission" style="color: #475569;">Admission</a>
            <a href="#contact" style="color: #475569;">Contact Us</a>
          </nav>
          <a href="/login" style="display: none; md:display: block; background-color: {primaryColor}; color: white; padding: 10px 20px; border-radius: 9999px; text-decoration: none; font-weight: 700;">Portal Login</a>
        </header>

        <div id="home" style="background: linear-gradient(135deg, {primaryColor} 0%, {secondaryColor} 100%); color: white; padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); text-align: center; position: relative; overflow: hidden;">
          <div style="position: relative; z-index: 10;">
            <h1 style="font-size: clamp(32px, 8vw, 64px); font-weight: 900; margin: 0 0 clamp(20px, 4vw, 30px) 0; line-height: 1.1; letter-spacing: -2px;">
              Shaping Tomorrow's<br/>Leaders Today
            </h1>
            <p style="font-size: clamp(16px, 3vw, 22px); margin: 0 auto clamp(30px, 6vw, 50px); max-width: 700px; opacity: 0.95; line-height: 1.6;">
              Join a community where excellence meets innovation. Our world-class education prepares students for success in an ever-changing world.
            </p>
            <a href="#admission" style="background: white; color: {primaryColor}; padding: clamp(12px, 3vw, 18px) clamp(25px, 6vw, 45px); border-radius: 50px; text-decoration: none; font-weight: 700; font-size: clamp(14px, 2.5vw, 18px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); transition: transform 0.3s;">
              Apply Now
            </a>
          </div>
        </div>

        <div id="about" style="padding: 80px 20px; text-align: center;"><h2>About Us</h2><p>Learn more about our school's history and mission.</p></div>

        <div id="admission" style="padding: 80px 20px; background-color: #f8fafc; text-align: center;"><h2>Admissions</h2><p>Find out how to enroll your child at our school.</p></div>

        <div id="contact" style="padding: 80px 20px; text-align: center;"><h2>Contact Us</h2><p>Get in touch with our team.</p></div>
      </div>
    `
  },
]

export default function WebsiteBuilder() {
  const [mounted, setMounted] = useState(false)
  const [school, setSchool] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [published, setPublished] = useState(false)
  const [colorPalette, setColorPalette] = useState<string[]>([])
  const [isColorLoading, setIsColorLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const supabase = createClient()
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { HTMLAttributes: { style: '' } } }),
      GlobalStyleExtension,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none min-h-[800px] p-0 md:p-0 bg-white selection:bg-cyan-100',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    setMounted(true)
    fetchData()
  }, [editor])

  useEffect(() => {
    if (school?.logo_url) {
      extractColors(school.logo_url)
    } else {
      setIsColorLoading(false)
    }
  }, [school])

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('school_id, schools(*)')
      .eq('id', user.id)
      .single()

    if (profile?.schools) {
      const s = profile.schools as any
      setSchool(s)
      setPublished(s.is_published)
      if (editor && s.html_content) {
        editor.commands.setContent(s.html_content)
      } else if (editor) {
        setShowLibrary(true)
      }
    }
  }

  async function extractColors(imageUrl: string) {
    setIsColorLoading(true);
    try {
      const response = await fetch(`/api/get-colors?imageUrl=${encodeURIComponent(imageUrl)}`);
      const { palette } = await response.json();
      setColorPalette(palette);
    } catch (error) {
      console.error('Error extracting colors:', error);
    } finally {
      setIsColorLoading(false);
    }
  }

  async function handlePublish() {
    if (!editor || !school) return
    setIsSaving(true)
    const { error } = await supabase
      .from('schools')
      .update({ html_content: editor.getHTML(), is_published: true })
      .eq('id', school.id)

    setIsSaving(false)
    if (!error) {
      setPublished(true)
      alert("Published! Congrats your site is live.")
      router.refresh()
    }
  }

  function handleBack() {
    router.push('/protected/dashboard')
  }
  
  const primaryColor = colorPalette[0] || '#06B6D4';
  const secondaryColor = colorPalette[1] || '#0891B2';

  const schoolLogoHtml = school?.logo_url 
    ? `<img src="${school.logo_url}" alt="School Logo" style="height: 40px; width: 40px; border-radius: 8px; object-fit: contain;" />`
    : `<div style="width: 40px; height: 40px; background-color: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v-4a2 2 0 1 0-4 0v4"></path><path d="m18 18 4-4"></path><path d="m6 18-4-4"></path><path d="M12 2v8"></path><path d="M5.2 7.5h13.6"></path><path d="M8 22v-6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V22"></path></svg></div>`;

  const processedTemplates = TEMPLATES.map(template => ({
    ...template,
    html: template.html
      .replace(/{primaryColor}/g, primaryColor)
      .replace(/{secondaryColor}/g, secondaryColor)
      .replace(/{schoolName}/g, school?.name || 'Your School')
      .replace(/{schoolLogo}/g, schoolLogoHtml)
  }));

  if (!mounted || isColorLoading) return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin" />
        </div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Loading Builder</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans selection:bg-cyan-100">
      {/* World-Class Floating Header */}
      <nav className="fixed top-4 inset-x-4 h-20 bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[2rem] z-[60] px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={handleBack}
            className="p-3 hover:bg-slate-100 rounded-2xl transition-all group"
          >
            <ArrowLeft size={20} className="text-slate-900 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 hidden md:block" />

          <div className="hidden sm:block">
            <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">
              {school?.name || "Rudit Builder"}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
               <Zap size={10} className="text-amber-500 fill-amber-500" /> Web Editor v2.0
            </p>
          </div>
        </div>

        {/* Viewport Switcher */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
           <button 
             onClick={() => setViewMode('desktop')}
             className={`p-2.5 rounded-xl transition-all ${viewMode === 'desktop' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
           >
             <Monitor size={18} />
           </button>
           <button 
             onClick={() => setViewMode('mobile')}
             className={`p-2.5 rounded-xl transition-all ${viewMode === 'mobile' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
           >
             <Smartphone size={18} />
           </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowLibrary(true)} 
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 shadow-sm transition-all"
          >
            <Layout size={18} />
            <span className="hidden md:inline">Templates</span>
          </button>
          
          <button 
            onClick={handlePublish} 
            disabled={isSaving} 
            className="flex items-center gap-2 px-6 py-3 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            style={{ backgroundColor: primaryColor, boxShadow: `0 10px 25px -5px ${primaryColor}66` }}
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : (published ? <CheckCircle2 size={18} /> : <Globe size={18} />)}
            <span className="text-sm">{published ? "Update Live Site" : "Publish Site"}</span>
          </button>
        </div>
      </nav>

      {/* Editor Canvas Container */}
      <main className="pt-32 pb-20 px-4 md:px-10 flex justify-center">
        <div 
          className={`transition-all duration-700 ease-in-out bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden border-[12px] border-slate-900/5 ${
            viewMode === 'mobile' ? 'max-w-[400px]' : 'max-w-7xl w-full'
          }`}
        >
          {/* Browser-style Top Bar */}
          <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-2">
             <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-200" />
             </div>
             <div className="mx-auto bg-white border border-slate-200 rounded-md px-4 py-0.5 text-[10px] text-slate-400 font-medium">
                {school?.slug || 'your-school'}.rudit.com
             </div>
          </div>

          <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
            <EditorContent editor={editor} />
          </div>
        </div>
      </main>

      {/* Template Library Modal - Refined */}
      {showLibrary && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowLibrary(false)} />
          
          <div className="bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-10 flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Design Library</h2>
                <p className="text-slate-400 font-medium text-sm mt-1">Select a foundation for your school's digital presence.</p>
              </div>
              <button 
                onClick={() => setShowLibrary(false)}
                className="p-4 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400 hover:text-slate-900" />
              </button>
            </div>

            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto flex-1 bg-slate-50/50">
              {processedTemplates.map(t => (
                <div 
                  key={t.id} 
                  onClick={() => { 
                    if (editor) editor.commands.setContent(t.html); 
                    setShowLibrary(false); 
                  }} 
                  className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 hover:border-transparent hover:ring-4 hover:ring-cyan-500/20 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="h-64 overflow-hidden relative border-b border-slate-100 bg-slate-50">
                    <div className="scale-[0.4] origin-top-left w-[250%]" dangerouslySetInnerHTML={{ __html: t.html }} />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center">
                       <div className="bg-white px-6 py-3 rounded-2xl shadow-xl font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Use This Template
                       </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                        <h3 className="font-black text-xl text-slate-900 tracking-tight">{t.name}</h3>
                        <div className="flex gap-1">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor }} />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-slate-400 mt-2">{t.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .tiptap-editor { outline: none !important; }
      `}</style>
    </div>
  )
}