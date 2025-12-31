'use client'

import { useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
// CORRECTED IMPORT PATH
import Editable from '../../Editable'

export default function ModernAcademyTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#', text: 'Home' },
    { href: '#vision', text: 'Our Vision' },
    { href: '#programs', text: 'Programs' },
    { href: '#admissions', text: 'Admissions' },
    { href: '#contact', text: 'Contact' },
  ]

  return (
    <div className="bg-slate-900 text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Editable tag="div" initialContent="Modern Academy" className="text-2xl md:text-3xl font-bold tracking-wider" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest">
              {navLinks.map(link => (
                <Editable key={link.text} tag="a" href={link.href} initialContent={link.text} className="hover:text-teal-400 transition-colors" />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-slate-700">
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.text}>
                    <Editable tag="a" href={link.href} initialContent={link.text} className="block hover:text-teal-400 transition-colors" onClick={() => setIsMenuOpen(false)} />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <Editable
        tag="section"
        id="home"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
        className="min-h-screen flex items-center justify-center bg-cover bg-center -mt-20"
      >
        <div className="text-center bg-black/60 p-8 md:p-12 rounded-lg max-w-3xl mx-4">
          <Editable tag="h1" initialContent="Shaping the Future" className="text-4xl md:text-6xl font-extrabold mb-4" />
          <Editable tag="p" initialContent="Innovative Education for the Next Generation" className="text-lg md:text-xl mb-8" />
          <Editable tag="button" initialContent="Explore Programs" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105" />
        </div>
      </Editable>

      {/* Our Vision Section */}
      <section id="vision" className="py-16 md:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Vision" className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-400" />
          <Editable tag="p" initialContent="At Modern Academy, we are committed to providing a transformative learning experience. We leverage technology and project-based learning to equip students with the skills they need to thrive in a rapidly changing world. Our curriculum is designed to foster creativity, critical thinking, and collaboration." className="text-slate-300 leading-relaxed max-w-4xl mx-auto text-center text-lg" />
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Programs" className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-400" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-800">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Editable tag="h3" initialContent="STEM & Robotics" className="text-2xl font-bold mb-3" />
              <Editable tag="p" initialContent="Hands-on learning with cutting-edge technology." className="text-slate-600" />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Editable tag="h3" initialContent="Digital Arts & Media" className="text-2xl font-bold mb-3" />
              <Editable tag="p" initialContent="Unleash creativity through digital storytelling and design." className="text-slate-600" />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Editable tag="h3" initialContent="Entrepreneurship" className="text-2xl font-bold mb-3" />
              <Editable tag="p" initialContent="Develop business acumen and launch your own ventures." className="text-slate-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="bg-teal-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Join the Innovators" className="text-3xl md:text-4xl font-bold mb-6" />
          <Editable tag="p" initialContent="We are looking for passionate and curious minds to join our community. Learn more about our admissions process and start your journey with us." className="text-lg max-w-3xl mx-auto mb-8" />
          <Editable tag="button" initialContent="Apply Now" className="bg-white text-teal-600 font-bold py-3 px-8 rounded-lg hover:bg-slate-200 transition-colors" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Get in Touch" className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-400" />
          <Editable tag="p" initialContent="Innovation Hub, Tech City, Nigeria" className="mb-4 text-lg" />
          <Editable tag="p" initialContent="Email: admissions@modernacademy.edu.ng" className="mb-4 text-lg" />
          <Editable tag="p" initialContent="Phone: +234 987 654 3210" className="text-lg" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-700">
        <div className="container mx-auto text-center text-slate-400">
          <p>© {new Date().getFullYear()} Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
        </div>
      </footer>
    </div>
  )
}
