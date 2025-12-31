'use client'

import { useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
// CORRECTED IMPORT PATH
import Editable from '../../Editable'
import ProgramCard from './ProgramCard'
import JournalEntry from './JournalEntry'

export default function MinimalistInstituteTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#about', text: 'About' },
    { href: '#programs', text: 'Programs' },
    { href: '#journal', text: 'Journal' },
    { href: '#contact', text: 'Contact' },
  ]

  return (
    <div className="bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 md:px-10 py-5">
          <div className="flex justify-between items-center">
            <Editable tag="div" initialContent="MINIMALIST INSTITUTE" className="text-base md:text-lg font-semibold tracking-widest" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10 text-sm tracking-wider">
              {navLinks.map(link => (
                <Editable key={link.text} tag="a" href={link.href} initialContent={link.text} className="hover:text-gray-500 transition-colors" />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.text}>
                    <Editable tag="a" href={link.href} initialContent={link.text} className="block hover:text-gray-500 transition-colors" onClick={() => setIsMenuOpen(false)} />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-10">
          <Editable tag="h1" initialContent="Clarity in Education" className="text-4xl md:text-7xl font-bold max-w-4xl leading-tight" />
          <Editable tag="p" initialContent="A focused approach to learning, designed for the modern student." className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Editable tag="h2" initialContent="Our Philosophy" className="text-3xl md:text-4xl font-bold mb-6" />
              <Editable tag="p" initialContent="We believe in the power of simplicity. Our curriculum is stripped of the non-essentials, focusing on core concepts and practical skills. We provide a learning environment that is calm, focused, and conducive to deep thinking." className="text-lg text-gray-700 leading-relaxed" />
            </div>
            <Editable tag="img" initialContent='https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Minimalist workspace" className="w-full h-96 object-cover" />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <Editable tag="h2" initialContent="Our Programs" className="text-3xl md:text-4xl font-bold text-center mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ProgramCard title="Design Foundations" description="Master the principles of visual communication." />
            <ProgramCard title="Creative Coding" description="Explore the intersection of art and technology." />
            <ProgramCard title="Critical Thinking" description="Develop the skills to analyze and evaluate information." />
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section id="journal" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 md:px-10">
          <Editable tag="h2" initialContent="From Our Journal" className="text-3xl md:text-4xl font-bold text-center mb-16" />
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
             <JournalEntry title="The Art of Subtraction" date="October 10, 2023" />
             <JournalEntry title="Finding Focus in a Distracted World" date="September 28, 2023" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-10 text-center">
           <Editable tag="h2" initialContent="Inquire Within" className="text-3xl md:text-4xl font-bold mb-6" />
           <Editable tag="p" initialContent="For questions about our programs and admissions." className="text-lg text-gray-600 mb-8" />
           <Editable tag="a" href="mailto:contact@minimalistinstitute.edu.ng" initialContent="contact@minimalistinstitute.edu.ng" className="text-xl md:text-2xl font-semibold hover:underline" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
          <Editable tag="p" initialContent="The Minimalist Institute" />
        </div>
      </footer>
    </div>
  )
}
