'use client'

import { ArrowRight } from 'lucide-react'
import Editable from '@/app/protected/website-builder/Editable'


export default function ProgramCard({ title, description }) {
  return (
    <div className="border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
      <Editable tag="h3" initialContent={title} className="text-2xl font-bold mb-4" />
      <Editable tag="p" initialContent={description} className="text-gray-600 mb-6" />
      <Editable tag="a" href="#" initialContent='Learn More' className="flex items-center font-semibold group">
        Learn More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Editable>
    </div>
  )
}
