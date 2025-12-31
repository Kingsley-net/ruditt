'use client'

import { ArrowRight } from 'lucide-react'
import Editable from '@/app/protected/website-builder/Editable'


export default function JournalEntry({title, date}){
    return (
        <div className="border-b border-gray-200 pb-8">
            <Editable tag="p" initialContent={date} className="text-sm text-gray-500 mb-2" />
            <Editable tag="h3" initialContent={title} className="text-2xl font-bold mb-4" />
            <Editable tag="a" href="#" initialContent='Read More' className="flex items-center font-semibold group">
                Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Editable>
        </div>
    )
}
