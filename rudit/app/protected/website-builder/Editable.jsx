'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Edit } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'

// A robust, production-ready editable component for React.
export default function Editable({ tag: Tag, initialContent, children, ...props }) {
  
  // Determine the mode based on the presence of children.
  // React.Children.count is the canonical way to check for children.
  const isWrapper = React.Children.count(children) > 0;
  
  // --- Mode 1: Wrapper ---
  // If the component has children, it should act as a simple wrapper.
  // It renders the children inside the specified Tag and passes down any other props.
  // It will NOT have any editing functionality in this mode.
  if (isWrapper) {
    // Dev warning for misuse.
    if (initialContent) {
      console.warn(
        `[Editable Component] Warning: Component received both 'initialContent' and 'children'. It is rendering as a wrapper. The 'initialContent' prop will be ignored.`
      );
    }
    return <Tag {...props}>{children}</Tag>;
  }

  // --- Mode 2: Editor ---
  // If the component has NO children, it acts as an inline editor.
  
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent || '');
  const elementRef = useRef(null);

  useEffect(() => {
    // Sync state if the initialContent prop changes from outside.
    if (initialContent !== content) {
      setContent(initialContent || '');
    }
  }, [initialContent]);

  const handleBlur = () => {
    setIsEditing(false);
    if (elementRef.current) {
      setContent(elementRef.current.innerHTML);
    }
  };
  
  const activateEditMode = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    // Use timeout to allow the component to re-render before focusing.
    setTimeout(() => elementRef.current?.focus(), 0);
  };

  // Special case for images
  if (Tag === 'img') {
    const handleImageEdit = () => {
      const newSrc = prompt('Enter new image URL:', content);
      if (newSrc) {
        setContent(newSrc);
      }
    };
    
    // The 'children' prop is invalid for <img> tags.
    // We also don't use dangerouslySetInnerHTML for them.
    return (
      <div className="relative editable-wrapper group">
        <img src={content} {...props} />
        <button
          onClick={handleImageEdit}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit image"
        >
          <Edit size={16} />
        </button>
      </div>
    );
  }

  // Default case for text-based elements
  return (
    <div className="relative editable-wrapper group">
      <Tag
        ref={elementRef}
        contentEditable={isEditing}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        {...props} // The 'children' prop should NOT be in here.
      />
      {!isEditing && (
        <button
          onClick={activateEditMode}
          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Edit content"
        >
          <Edit size={14} />
        </button>
      )}
    </div>
  );
}
