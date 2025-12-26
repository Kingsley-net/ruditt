'use client'

import { Heart, BookOpen, Globe, MonitorPlay } from 'lucide-react'
import Editable from '@/app/protected/website-builder/Editable'


export default function OnlineUniversityTemplate() {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-8 py-5 flex justify-between items-center">
          <Editable tag="div" initialContent="Online University" className="text-xl font-bold text-gray-800" />
          <nav className="hidden md:flex items-center space-x-6">
            <Editable tag="a" href="#" initialContent="Courses" className="text-gray-600 hover:text-indigo-600" />
            <Editable tag="a" href="#" initialContent="About Us" className="text-gray-600 hover:text-indigo-600" />
            <Editable tag="a" href="#" initialContent="How it Works" className="text-gray-600 hover:text-indigo-600" />
            <Editable tag="a" href="#" initialContent="FAQ" className="text-gray-600 hover:text-indigo-600" />
            <Editable tag="button" initialContent="Sign In" className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-indigo-50 py-24">
        <div className="container mx-auto px-8 text-center">
          <Editable tag="h1" initialContent="Flexible Learning, Limitless Possibilities" className="text-5xl font-extrabold text-gray-900 mb-4" />
          <Editable tag="p" initialContent="Earn a degree from anywhere in the world. Our online platform offers a flexible and accessible learning experience." className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto" />
          <Editable tag="button" initialContent="Explore Courses" className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-8">
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
      <section className="bg-white py-20">
        <div className="container mx-auto px-8">
          <Editable tag="h2" initialContent="How It Works" className="text-4xl font-bold text-center text-gray-900 mb-12" />
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-lg text-gray-700 leading-relaxed">
              <Editable tag="p" initialContent='<strong class="text-indigo-600">1. Browse Courses:</strong> Find the right program for you from our extensive catalog.' className="mb-6" />
              <Editable tag="p" initialContent='<strong class="text-indigo-600">2. Enroll Online:</strong> Our simple enrollment process will get you started in minutes.' className="mb-6" />
              <Editable tag="p" initialContent='<strong class="text-indigo-600">3. Start Learning:</strong> Access course materials, lectures, and assignments through our intuitive online platform.' />
            </div>
            <div className="bg-gray-200 h-80 rounded-lg shadow-md"></div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-8 text-center">
          <Editable tag="h2" initialContent="Ready to Start Your Learning Journey?" className="text-4xl font-bold mb-6" />
          <Editable tag="p" initialContent="Join thousands of students who are achieving their goals with Online University." className="text-lg mb-8 max-w-2xl mx-auto" />
          <Editable tag="button" initialContent="Enroll Now" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-200" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-10">
        <div className="container mx-auto px-8 text-center text-gray-400">
        <p>© 2026 Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
        </div>
      </footer>
    </div>
  )
}
