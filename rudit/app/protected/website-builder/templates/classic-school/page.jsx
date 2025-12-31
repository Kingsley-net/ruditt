'use client'

import { useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
// CORRECTED IMPORT PATH
import Editable from '../../Editable'

export default function ClassicSchoolTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#admissions', text: 'Admissions' },
    { href: '#academics', text: 'Academics' },
    { href: '#contact', text: 'Contact' },
  ]

  return (
    <div className="bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Editable tag="img" initialContent='/logo.png' alt="Classic School Logo" className="h-12" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => (
                <Editable key={link.text} tag="a" href={link.href} initialContent={link.text} className="text-gray-700 hover:text-blue-800 transition-colors" />
              ))}
               <Editable tag="a" href="#" initialContent="Login" className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition-all" />
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
                    <Editable tag="a" href={link.href} initialContent={link.text} className="block text-gray-700 hover:text-blue-800 transition-colors" onClick={() => setIsMenuOpen(false)} />
                  </li>
                ))}
                 <li>
                  <Editable tag="a" href="#" initialContent="Login" className="w-full text-center bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition-all" />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-blue-700 text-white py-20 md:py-32">
        <div className="container mx-auto text-center px-6">
          <Editable tag="h1" initialContent="Welcome to Classic School" className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight" />
          <Editable tag="p" initialContent="A Tradition of Excellence" className="text-lg md:text-xl mb-8" />
          <Editable tag="button" initialContent="Learn More" className="bg-white text-blue-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105" />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="About Us" className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800" />
          <Editable tag="p" initialContent="Founded in 1950, Classic School has been providing quality education for over 70 years. Our mission is to foster a love of learning and to prepare students for success in all aspects of life. We believe in a holistic approach to education, combining rigorous academics with a strong emphasis on character development." className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center md:text-lg" />
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Admissions" className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800" />
          <Editable tag="p" initialContent="We are now accepting applications for the upcoming school year. Visit our admissions page to learn more about the application process and to schedule a tour of our campus." className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center md:text-lg" />
          <div className="text-center mt-10">
            <Editable tag="button" initialContent="Apply Now" className="bg-blue-800 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-900 transition-transform transform hover:scale-105" />
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Academics" className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Editable tag="h3" initialContent="Primary School" className="text-2xl font-bold mb-4 text-blue-800" />
              <Editable tag="p" initialContent="A nurturing environment for young learners to build a strong foundation." className="text-gray-700" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Editable tag="h3" initialContent="Secondary School" className="text-2xl font-bold mb-4 text-blue-800" />
              <Editable tag="p" initialContent="A challenging curriculum to prepare students for higher education." className="text-gray-700" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Editable tag="h3" initialContent="Extracurriculars" className="text-2xl font-bold mb-4 text-blue-800" />
              <Editable tag="p" initialContent="A wide range of activities to explore interests and develop talents." className="text-gray-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Contact Us" className="text-3xl md:text-4xl font-bold text-center mb-12" />
          <div className="max-w-xl mx-auto text-center">
            <Editable tag="p" initialContent="123 School Lane, Education City, Nigeria" className="mb-4 text-lg" />
            <Editable tag="p" initialContent="Email: info@classicschool.edu.ng" className="mb-4 text-lg" />
            <Editable tag="p" initialContent="Phone: +234 123 456 7890" className="text-lg"/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
        </div>
      </footer>
    </div>
  )
}
