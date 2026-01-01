import { GripVertical } from 'lucide-react';
import { useState } from 'react';

interface ResizeHandleProps {
  onResize: (deltaX: number) => void;
  disabled?: boolean;
}

export default function ResizeHandle({ onResize, disabled = false }: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      onResize(deltaX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  if (disabled) {
    return null;
  }

  return (
    <div
      className={`
        hidden xl:flex
        w-1 
        cursor-col-resize 
        items-center 
        justify-center 
        relative
        group
        hover:bg-primary/20
        transition-colors
        ${isDragging ? 'bg-primary/30' : 'bg-border/50'}
      `}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`
          absolute 
          inset-y-0 
          -left-1 
          -right-1 
          flex 
          items-center 
          justify-center
        `}
      >
        <div
          className={`
            flex 
            items-center 
            justify-center 
            w-6 
            h-12 
            rounded-lg 
            glass
            border 
            border-border/50
            opacity-0
            group-hover:opacity-100
            transition-opacity
            ${isDragging ? 'opacity-100' : ''}
          `}
        >
          <GripVertical className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
