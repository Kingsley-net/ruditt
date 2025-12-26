'use client'

import { Heart } from 'lucide-react'
import Editable from '@/app/protected/website-builder/Editable'

import ProgramCard from './ProgramCard'
import JournalEntry from './JournalEntry'

export default function MinimalistInstituteTemplate() {
  return (
    <div className="bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-10 py-6 flex justify-between items-center">
          <Editable tag="div" initialContent="MINIMALIST INSTITUTE" className="text-lg font-semibold tracking-widest" />
          <nav className="hidden md:flex space-x-10 text-sm tracking-wider">
            <Editable tag="a" href="#" initialContent="About" className="hover:text-gray-500" />
            <Editable tag="a" href="#" initialContent="Programs" className="hover:text-gray-500" />
            <Editable tag="a" href="#" initialContent="Journal" className="hover:text-gray-500" />
            <Editable tag="a" href="#" initialContent="Contact" className="hover:text-gray-500" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32">
        <div className="container mx-auto px-10">
          <Editable tag="h1" initialContent="Clarity in Education" className="text-7xl font-bold max-w-4xl leading-tight" />
          <Editable tag="p" initialContent="A focused approach to learning, designed for the modern student." className="text-xl text-gray-600 mt-6 max-w-2xl" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Editable tag="h2" initialContent="Our Philosophy" className="text-4xl font-bold mb-6" />
              <Editable tag="p" initialContent="We believe in the power of simplicity. Our curriculum is stripped of the non-essentials, focusing on core concepts and practical skills. We provide a learning environment that is calm, focused, and conducive to deep thinking." className="text-lg text-gray-700 leading-relaxed" />
            </div>
            <div className="bg-gray-200 h-96"></div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24">
        <div className="container mx-auto px-10">
          <Editable tag="h2" initialContent="Our Programs" className="text-4xl font-bold text-center mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ProgramCard title="Design Foundations" description="Master the principles of visual communication." />
            <ProgramCard title="Creative Coding" description="Explore the intersection of art and technology." />
            <ProgramCard title="Critical Thinking" description="Develop the skills to analyze and evaluate information." />
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-10">
          <Editable tag="h2" initialContent="From Our Journal" className="text-4xl font-bold text-center mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <JournalEntry title="The Art of Subtraction" date="October 10, 2023" />
             <JournalEntry title="Finding Focus in a Distracted World" date="September 28, 2023" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32">
        <div className="container mx-auto px-10 text-center">
           <Editable tag="h2" initialContent="Inquire Within" className="text-4xl font-bold mb-6" />
           <Editable tag="p" initialContent="For questions about our programs and admissions." className="text-lg text-gray-600 mb-8" />
           <Editable tag="a" href="mailto:contact@minimalistinstitute.edu.ng" initialContent="contact@minimalistinstitute.edu.ng" className="text-2xl font-semibold hover:underline" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-10 flex justify-between items-center text-sm text-gray-500">
          <p>© 2026 Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
          <Editable tag="p" initialContent="The Minimalist Institute" />
        </div>
      </footer>
    </div>
  )
}
