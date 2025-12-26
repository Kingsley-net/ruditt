'use client'

import { Heart } from 'lucide-react'
import Editable from '@/app/protected/website-builder/Editable'


export default function ModernAcademyTemplate() {
  return (
    <div className="bg-slate-900 text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-slate-900/80 backdrop-blur-md z-10">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Editable tag="div" initialContent="Modern Academy" className="text-3xl font-bold tracking-wider" />
          <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
            <Editable tag="a" href="#" initialContent="Home" className="hover:text-teal-400 transition-colors" />
            <Editable tag="a" href="#" initialContent="Our Vision" className="hover:text-teal-400 transition-colors" />
            <Editable tag="a" href="#" initialContent="Programs" className="hover:text-teal-400 transition-colors" />
            <Editable tag="a" href="#" initialContent="Admissions" className="hover:text-teal-400 transition-colors" />
            <Editable tag="a" href="#" initialContent="Contact" className="hover:text-teal-400 transition-colors" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center -mt-16 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
        <div className="text-center bg-black/50 p-12 rounded-lg">
          <Editable tag="h1" initialContent="Shaping the Future" className="text-6xl font-extrabold mb-4" />
          <Editable tag="p" initialContent="Innovative Education for the Next Generation" className="text-xl mb-8" />
          <Editable tag="button" initialContent="Explore Programs" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition-colors" />
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Vision" className="text-4xl font-bold text-center mb-12 text-teal-400" />
          <Editable tag="p" initialContent="At Modern Academy, we are committed to providing a transformative learning experience. We leverage technology and project-based learning to equip students with the skills they need to thrive in a rapidly changing world. Our curriculum is designed to foster creativity, critical thinking, and collaboration." className="text-slate-300 leading-relaxed max-w-4xl mx-auto text-center text-lg" />
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Programs" className="text-4xl font-bold text-center mb-12 text-teal-400" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-800">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <Editable tag="h3" initialContent="STEM & Robotics" className="text-2xl font-bold mb-3" />
              <Editable tag="p" initialContent="Hands-on learning with cutting-edge technology." className="text-slate-600" />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <Editable tag="h3" initialContent="Digital Arts & Media" className="text-2xl font-bold mb-3" />
              <Editable tag="p" initialContent="Unleash creativity through digital storytelling and design." className="text-slate-600" />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <Editable tag="h3" initialContent="Entrepreneurship" className="text-2xl font-bold mb-3" />
              <Editable tag="p" initialContent="Develop business acumen and launch your own ventures." className="text-slate-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Join the Innovators" className="text-4xl font-bold mb-6" />
          <Editable tag="p" initialContent="We are looking for passionate and curious minds to join our community. Learn more about our admissions process and start your journey with us." className="text-lg mb-8 max-w-2xl mx-auto" />
          <Editable tag="button" initialContent="Apply Now" className="bg-white text-teal-600 font-bold py-3 px-8 rounded-lg hover:bg-slate-200 transition-colors" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Get in Touch" className="text-4xl font-bold text-center mb-12 text-teal-400" />
          <Editable tag="p" initialContent="Innovation Hub, Tech City, Nigeria" className="mb-4 text-lg" />
          <Editable tag="p" initialContent="Email: admissions@modernacademy.edu.ng" className="mb-4 text-lg" />
          <Editable tag="p" initialContent="Phone: +234 987 654 3210" className="text-lg" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-6">
      <div className="container mx-auto text-center text-slate-400">
        <p>© 2026 Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
        </div>
      </footer>
    </div>
  )
}
