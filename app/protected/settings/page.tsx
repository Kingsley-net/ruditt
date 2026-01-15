
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Settings, 
  Globe, 
  Shield, 
  Palette, 
  Bell, 
  Upload, 
  Save, 
  Loader,
  ArrowLeft,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

const supabase = createClient()

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [school, setSchool] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [colorPalette, setColorPalette] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  useEffect(() => { fetchSettingsData() }, [])
  
  useEffect(() => { 
    if (school?.logo_url) { extractColors(school.logo_url) } 
  }, [school])

  async function fetchSettingsData() {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)

      const { data: profile } = await supabase
        .from('profiles')
        .select(`*, schools (*)`)
        .eq('id', user.id)
        .single()

      if (profile?.schools) {
        setSchool(profile.schools)
        if (profile.schools.theme_color) {
          setSelectedColor(profile.schools.theme_color)
        }
      }
    } catch (err) { console.error(err) } 
    finally { setIsLoading(false) }
  }

  async function extractColors(imageUrl: string) {
    try {
      const response = await fetch('/api/update-and-check-contrast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json();
      const { color } = data;
      
      if(color) {
        setColorPalette([color])
        setSelectedColor(color)
      }
    } catch (error) { 
      console.error('Failed to extract colors:', error);
    }
  }

  async function handleSaveColor() {
    if (!selectedColor || !school) return
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('schools')
        .update({ theme_color: selectedColor })
        .eq('id', school.id)
      if (error) throw error
    } catch (error) {
      console.error('Error saving color:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const primary = selectedColor || colorPalette[0] || '#06B6D4';

  if (isLoading) return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
      <Loader className="animate-spin text-slate-300" size={40} />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      <header className="h-24 bg-white/70 backdrop-blur-md border-b border-slate-200/50 flex items-center sticky top-0 z-40 px-6 md:px-12">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/protected/dashboard" className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-900">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-black tracking-tight">Settings</h1>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Configuration & Identity</p>
            </div>
          </div>
          
          <button 
            onClick={handleSaveColor}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            style={{ backgroundColor: primary, boxShadow: `0 8px 20px -6px ${primary}66` }}
          >
            {isSaving ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      </header>

      <main className="p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm" style={{ color: primary }}>
                <Palette size={16} />
              </div>
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-500">School Identity</h2>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="p-8 md:p-10 space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-slate-100">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-colors group-hover:border-slate-300">
                      {school?.logo_url ? (
                        <img src={school.logo_url} alt="Logo" className="w-full h-full object-contain p-4" />
                      ) : (
                  <p></p>
                      )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-white border border-slate-200 shadow-xl rounded-2xl hover:bg-slate-50 transition-colors text-slate-600">
                      <Upload size={18} />
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-lg">School Logo</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-sm">
                      This logo will appear on your dashboard, website, and student reports. Transparent PNG recommended.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Brand Color</h3>
                  <div className="flex gap-2">
                    {colorPalette.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-4 ${selectedColor === color ? 'border-blue-500' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingsInput label="School Name" defaultValue={school?.name} placeholder="e.g. Ruditt Academy" />
                  <SettingsInput label="Official Slug" defaultValue={school?.slug} placeholder="ruditt-academy" prefix="ruditt.com/" />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-sm" style={{ color: primary }}>
                <Globe size={16} />
              </div>
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-500">Public Presence</h2>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="font-bold text-lg">Publish School Website</h3>
                  {school?.is_published && <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase tracking-tighter">Live</span>}
                </div>
                <p className="text-sm text-slate-400">Make your portal and registration forms accessible to the public.</p>
              </div>
              
              <div 
                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${school?.is_published ? '' : 'bg-slate-200'}`}
                style={school?.is_published ? { backgroundColor: primary } : {}}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${school?.is_published ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          </section>

          <section className="pt-8">
            <div className="bg-red-50/50 rounded-[2.5rem] border border-red-100 p-8 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-red-900">Close Institution</h3>
                <p className="text-sm text-red-600/70">Permanently delete all school data and students.</p>
              </div>
              <button className="px-4 py-2 text-red-600 font-bold text-sm hover:bg-red-100 rounded-xl transition-colors">
                Delete School
              </button>
            </div>
          </section>
        </div>
      </main>

      <div className="fixed -bottom-24 -left-24 w-96 h-96 opacity-[0.03] pointer-events-none rounded-full" style={{ backgroundColor: primary, filter: 'blur(80px)' }} />
    </div>
  )
}

function SettingsInput({ label, defaultValue, placeholder, prefix }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] ml-1">{label}</label>
      <div className="relative group">
        {prefix && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm border-r border-slate-200 pr-3">
            {prefix}
          </div>
        )}
        <input 
          type="text" 
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 ${prefix ? 'pl-32' : 'pl-5'} pr-5 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-slate-500/5 focus:bg-white transition-all`}
        />
      </div>
    </div>
  )
}
