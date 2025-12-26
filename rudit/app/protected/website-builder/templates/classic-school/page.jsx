'use client'

import { Heart } from 'lucide-react'
import Editable from '@/app/protected/website-builder/Editable'


export default function ClassicSchoolTemplate() {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Editable tag="div" initialContent="Classic School" className="text-2xl font-bold text-blue-800" />
          <nav>
            <Editable tag="a" href="#" initialContent="Home" className="text-gray-700 hover:text-blue-800 mx-4" />
            <Editable tag="a" href="#" initialContent="About" className="text-gray-700 hover:text-blue-800 mx-4" />
            <Editable tag="a" href="#" initialContent="Admissions" className="text-gray-700 hover:text-blue-800 mx-4" />
            <Editable tag="a" href="#" initialContent="Academics" className="text-gray-700 hover:text-blue-800 mx-4" />
            <Editable tag="a" href="#" initialContent="Contact" className="text-gray-700 hover:text-blue-800 mx-4" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto text-center">
          <Editable tag="h1" initialContent="Welcome to Classic School" className="text-5xl font-bold mb-4" />
          <Editable tag="p" initialContent="A Tradition of Excellence" className="text-xl mb-8" />
          <Editable tag="button" initialContent="Learn More" className="bg-white text-blue-800 font-bold py-2 px-6 rounded-full hover:bg-gray-200" />
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="About Us" className="text-3xl font-bold text-center mb-8" />
          <Editable tag="p" initialContent="Founded in 1950, Classic School has been providing quality education for over 70 years. Our mission is to foster a love of learning and to prepare students for success in all aspects of life. We believe in a holistic approach to education, combining rigorous academics with a strong emphasis on character development." className="text-gray-700 leading-relaxed max-w-3xl mx-auto" />
        </div>
      </section>

      {/* Admissions Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Admissions" className="text-3xl font-bold text-center mb-8" />
          <Editable tag="p" initialContent="We are now accepting applications for the upcoming school year. Visit our admissions page to learn more about the application process and to schedule a tour of our campus." className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center" />
          <div className="text-center mt-8">
            <Editable tag="button" initialContent="Apply Now" className="bg-blue-800 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-900" />
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Our Academics" className="text-3xl font-bold text-center mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Editable tag="h3" initialContent="Primary School" className="text-xl font-bold mb-2" />
              <Editable tag="p" initialContent="A nurturing environment for young learners to build a strong foundation." className="text-gray-700" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Editable tag="h3" initialContent="Secondary School" className="text-xl font-bold mb-2" />
              <Editable tag="p" initialContent="A challenging curriculum to prepare students for higher education." className="text-gray-700" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Editable tag="h3" initialContent="Extracurriculars" className="text-xl font-bold mb-2" />
              <Editable tag="p" initialContent="A wide range of activities to explore interests and develop talents." className="text-gray-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-6">
          <Editable tag="h2" initialContent="Contact Us" className="text-3xl font-bold text-center mb-8" />
          <div className="max-w-xl mx-auto text-center">
            <Editable tag="p" initialContent="123 School Lane, Education City, Nigeria" className="mb-4" />
            <Editable tag="p" initialContent="Email: info@classicschool.edu.ng" className="mb-4" />
            <Editable tag="p" initialContent="Phone: +234 123 456 7890" />
          </div>
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
