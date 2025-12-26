'use client'

import { Heart, Sun, Star, Moon } from 'lucide-react'
import Editable from '@/app/protected/website-builder/Editable'


export default function PlayfulKindergartenTemplate() {
  return (
    <div className="bg-yellow-50 font-serif">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Editable tag="div" initialContent="Playful Kindergarten" className="text-3xl font-bold text-orange-500" />
          <nav className="space-x-6 text-lg text-gray-700">
            <Editable tag="a" href="#" initialContent="Home" className="hover:text-orange-500" />
            <Editable tag="a" href="#" initialContent="About Us" className="hover:text-orange-500" />
            <Editable tag="a" href="#" initialContent="Our Program" className="hover:text-orange-500" />
            <Editable tag="a" href="#" initialContent="Enroll" className="hover:text-orange-500" />
            <Editable tag="a" href="#" initialContent="Contact" className="hover:text-orange-500" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-orange-400 text-white py-24 text-center relative overflow-hidden">
        <Sun className="absolute -top-8 -left-8 w-32 h-32 text-yellow-300 opacity-50" />
        <Moon className="absolute -bottom-12 -right-8 w-32 h-32 text-blue-300 opacity-50 transform rotate-45" />
        <Editable tag="h1" initialContent="Where Little Stars Shine Bright" className="text-6xl font-extrabold mb-4" />
        <Editable tag="p" initialContent="A Fun and Nurturing Place to Grow" className="text-2xl mb-8" />
        <Editable tag="button" initialContent="Join the Fun!" className="bg-white text-orange-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-100" />
      </section>

      {/* About Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Welcome to Our Wonderland!" className="text-4xl font-bold text-green-600 mb-8" />
          <Editable tag="p" initialContent="At Playful Kindergarten, we believe that learning should be a joyful adventure. Our play-based curriculum encourages curiosity, creativity, and social development. Our dedicated teachers create a warm and supportive environment where every child can thrive." className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto" />
        </div>
      </section>

      {/* Our Program Section */}
      <section className="bg-green-100 py-20">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Daily Adventures" className="text-4xl font-bold text-center text-purple-600 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Star className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <Editable tag="h3" initialContent="Creative Play" className="text-2xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Arts, crafts, and imaginative games to spark creativity." className="text-gray-600" />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Sun className="w-16 h-16 mx-auto text-orange-400 mb-4" />
              <Editable tag="h3" initialContent="Outdoor Fun" className="text-2xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Exploring nature and developing motor skills in our playground." className="text-gray-600" />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Moon className="w-16 h-16 mx-auto text-blue-400 mb-4" />
              <Editable tag="h3" initialContent="Story Time" className="text-2xl font-bold text-gray-800 mb-2" />
              <Editable tag="p" initialContent="Engaging stories and songs to build language skills." className="text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Come and Play With Us!" className="text-4xl font-bold text-red-500 mb-8" />
          <Editable tag="p" initialContent="We have a few spots left for the upcoming term. Contact us to schedule a visit and see our happy school in action." className="text-xl text-gray-700 max-w-2xl mx-auto mb-8" />
          <Editable tag="button" initialContent="Enroll Today" className="bg-red-500 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-red-600" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-purple-200 py-20">
        <div className="container mx-auto px-6 text-center">
          <Editable tag="h2" initialContent="Get in Touch" className="text-4xl font-bold text-purple-700 mb-8" />
          <Editable tag="p" initialContent="1 Fun Street, Joyville, Nigeria" className="text-lg text-gray-800" />
          <Editable tag="p" initialContent="Email: hello@playfulkindergarten.edu.ng" className="text-lg text-gray-800" />
          <Editable tag="p" initialContent="Phone: +234 111 222 3333" className="text-lg text-gray-800" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="container mx-auto text-center text-gray-600">
        <p>© 2026 Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
        </div>
      </footer>
    </div>
  )
}
