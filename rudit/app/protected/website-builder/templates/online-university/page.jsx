'use client'

import { useState } from 'react'
import { Heart, BookOpen, Globe, MonitorPlay, Menu, X } from 'lucide-react'
// CORRECTED IMPORT PATH
import Editable from '../../Editable'

export default function OnlineUniversityTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#courses', text: 'Courses' },
    { href: '#about', text: 'About Us' },
    { href: '#how-it-works', text: 'How it Works' },
    { href: '#faq', text: 'FAQ' },
  ]

  return (
    <div className="bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <Editable tag="div" initialContent="Online University" className="text-xl font-bold text-gray-800" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => (
                <Editable key={link.text} tag="a" href={link.href} initialContent={link.text} className="text-gray-600 hover:text-indigo-600 transition-colors" />
              ))}
              <Editable tag="button" initialContent="Sign In" className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-all" />
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
                    <Editable tag="a" href={link.href} initialContent={link.text} className="block text-gray-600 hover:text-indigo-600 transition-colors" onClick={() => setIsMenuOpen(false)} />
                  </li>
                ))}
                <li>
                  <Editable tag="button" initialContent="Sign In" className="w-full bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-all" />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-indigo-50 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <Editable tag="h1" initialContent="Flexible Learning, Limitless Possibilities" className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight" />
          <Editable tag="p" initialContent="Earn a degree from anywhere in the world. Our online platform offers a flexible and accessible learning experience." className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto" />
          <Editable tag="button" initialContent="Explore Courses" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-transform transform hover:scale-105" />
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-5 rounded-full mb-4">
                <Globe className="w-10 h-10 text-indigo-600" />
              </div>
              <Editable tag="h3" initialContent="World-Class Faculty" className="text-xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Learn from industry experts and renowned academics." className="text-gray-600" />
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-5 rounded-full mb-4">
                <MonitorPlay className="w-10 h-10 text-indigo-600" />
              </div>
              <Editable tag="h3" initialContent="Flexible Learning" className="text-xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Study at your own pace, on your own schedule." className="text-gray-600" />
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-5 rounded-full mb-4">
                <BookOpen className="w-10 h-10 text-indigo-600" />
              </div>
              <Editable tag="h3" initialContent="Comprehensive Curriculum" className="text-xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="A wide range of courses to meet your career goals." className="text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <Editable tag="h2" initialContent="How It Works" className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12" />
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-lg text-gray-700 leading-relaxed">
              <Editable tag="p" initialContent='<strong class="text-indigo-600">1. Browse Courses:</strong> Find the right program for you from our extensive catalog.' className="mb-6" />
              <Editable tag="p" initialContent='<strong class="text-indigo-600">2. Enroll Online:</strong> Our simple enrollment process will get you started in minutes.' className="mb-6" />
              <Editable tag="p" initialContent='<strong class="text-indigo-600">3. Start Learning:</strong> Access course materials, lectures, and assignments through our intuitive online platform.' />
            </div>
            <Editable tag="img" initialContent='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Students learning online" className="w-full h-80 object-cover rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="faq" className="bg-indigo-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <Editable tag="h2" initialContent="Ready to Start Your Learning Journey?" className="text-3xl md:text-4xl font-bold mb-6" />
          <Editable tag="p" initialContent="Join thousands of students who are achieving their goals with Online University." className="text-lg mb-8 max-w-2xl mx-auto" />
          <Editable tag="button" initialContent="Enroll Now" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-10">
        <div className="container mx-auto px-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
        </div>
      </footer>
    </div>
  )
}
