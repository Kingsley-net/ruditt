'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

export default function Editable({
  tag: Tag = 'p',
  initialContent,
  className,
  ...props
}) {
  const [content, setContent] = useState(initialContent)
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (isEditing && elementRef.current) {
      elementRef.current.focus()
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(elementRef.current)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }, [isEditing])

  const handleBlur = (e) => {
    setContent(e.currentTarget.textContent)
    setIsEditing(false)
  }
  
  const handleDelete = () => {
      setContent('');
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative editable-wrapper"
    >
      <Tag
        ref={elementRef}
        contentEditable={isEditing}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
        className={`${className} ${
          isEditing ? 'outline-none ring-2 ring-blue-500 ring-offset-2' : ''
        } ${!content ? 'p-2 border border-dashed border-gray-400 text-gray-400' : ''}`}
        {...props}
      >
        {content || (isEditing ? '' : 'Empty')}
      </Tag>
      {isHovered && !isEditing && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 flex gap-1 z-10">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </div>
  )
}
