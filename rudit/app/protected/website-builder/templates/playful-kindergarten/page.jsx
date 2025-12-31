'use client'

import { useState } from 'react'
import { Heart, Sun, Star, Moon, Menu, X } from 'lucide-react'
// CORRECTED IMPORT PATH
import Editable from '../../Editable'


export default function PlayfulKindergartenTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#', text: 'Home' },
    { href: '#about', text: 'About Us' },
    { href: '#program', text: 'Our Program' },
    { href: '#enroll', text: 'Enroll' },
    { href: '#contact', text: 'Contact' },
  ]

  return (
    <div className="bg-yellow-50 font-serif">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Editable tag="div" initialContent="Playful Kindergarten" className="text-2xl md:text-3xl font-bold text-orange-500" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-lg text-gray-700">
              {navLinks.map(link => (
                <Editable key={link.text} tag="a" href={link.href} initialContent={link.text} className="hover:text-orange-500 transition-colors" />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
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
                    <Editable tag="a" href={link.href} initialContent={link.text} className="block hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)} />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-orange-400 text-white py-20 md:py-24 text-center relative overflow-hidden">
        <Sun className="absolute -top-8 -left-8 w-24 h-24 md:w-32 md:h-32 text-yellow-300 opacity-50" />
        <Moon className="absolute -bottom-12 -right-8 w-24 h-24 md:w-32 md:h-32 text-blue-300 opacity-50 transform rotate-45" />
        <div className="container mx-auto px-6">
          <Editable tag="h1" initialContent="Where Little Stars Shine Bright" className="text-4xl md:text-6xl font-extrabold mb-4" />
          <Editable tag="p" initialContent="A Fun and Nurturing Place to Grow" className="text-xl md:text-2xl mb-8" />
          <Editable tag="button" initialContent="Join the Fun!" className="bg-white text-orange-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-100 transition-transform transform hover:scale-105" />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Welcome to Our Wonderland!" className="text-3xl md:text-4xl font-bold text-green-600 mb-8" />
          <Editable tag="p" initialContent="At Playful Kindergarten, we believe that learning should be a joyful adventure. Our play-based curriculum encourages curiosity, creativity, and social development. Our dedicated teachers create a warm and supportive environment where every child can thrive." className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" />
        </div>
      </section>

      {/* Our Program Section */}
      <section id="program" className="bg-green-100 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Daily Adventures" className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Star className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <Editable tag="h3" initialContent="Creative Play" className="text-2xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Arts, crafts, and imaginative games to spark creativity." className="text-gray-600" />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Sun className="w-16 h-16 mx-auto text-orange-400 mb-4" />
              <Editable tag="h3" initialContent="Outdoor Fun" className="text-2xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Exploring nature and developing motor skills in our playground." className="text-gray-600" />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Moon className="w-16 h-16 mx-auto text-blue-400 mb-4" />
              <Editable tag="h3" initialContent="Story Time" className="text-2xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Engaging stories and songs to build language skills." className="text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section id="enroll" className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Come and Play With Us!" className="text-3xl md:text-4xl font-bold text-red-500 mb-8" />
          <Editable tag="p" initialContent="We have a few spots left for the upcoming term. Contact us to schedule a visit and see our happy school in action." className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8" />
          <Editable tag="button" initialContent="Enroll Today" className="bg-red-500 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-red-600 transition-transform transform hover:scale-105" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-purple-200 py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Get in Touch" className="text-3xl md:text-4xl font-bold text-purple-700 mb-8" />
          <Editable tag="p" initialContent="1 Fun Street, Joyville, Nigeria" className="text-lg text-gray-800" />
          <Editable tag="p" initialContent="Email: hello@playfulkindergarten.edu.ng" className="text-lg text-gray-800" />
          <Editable tag="p" initialContent="Phone: +234 111 222 3333" className="text-lg text-gray-800" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
        </div>
      </footer>
    </div>
  )
}
