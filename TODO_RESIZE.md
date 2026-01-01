# Task: Add Resizable Live Preview Panel

## Plan
- [x] Step 1: Create ResizeHandle Component
  - [x] Build draggable resize handle
  - [x] Add visual feedback on hover/drag
  - [x] Style to match Busya theme
- [x] Step 2: Implement Resize Logic
  - [x] Add state for panel widths
  - [x] Implement mouse drag handlers
  - [x] Calculate new widths on drag
  - [x] Add smooth resizing
- [x] Step 3: Add Persistence
  - [x] Save panel size to localStorage
  - [x] Restore size on page load
  - [x] Handle edge cases
- [x] Step 4: Mobile Handling
  - [x] Detect mobile devices
  - [x] Disable resize on mobile
  - [x] Keep stacked layout on mobile
- [x] Step 5: Optional Fullscreen Toggle
  - [x] Add fullscreen button
  - [x] Implement fullscreen mode
  - [x] Add exit fullscreen
- [x] Step 6: Validation
  - [x] Test resizing on desktop
  - [x] Test mobile layout
  - [x] Test persistence
  - [x] Run linter

## Implementation Summary

### 1. ResizeHandle Component ✅
- Created draggable resize handle with GripVertical icon
- Added hover and drag visual feedback
- Styled with glassmorphism to match Busya theme
- Hidden on mobile (xl:flex - only shows on desktop)
- Smooth transitions and cursor changes

### 2. Resize Logic ✅
- Added `editorWidth` state (percentage-based)
- Implemented `handleResize` function with delta calculation
- Constrained width between 20% and 80%
- Smooth, responsive resizing experience
- Uses percentage-based widths for flexibility

### 3. Persistence ✅
- Saves panel size to localStorage (`busya-panel-size`)
- Restores size on page load
- Validates saved size (20-80% range)
- Falls back to default (50%) if invalid

### 4. Mobile Handling ✅
- ResizeHandle hidden on mobile (xl:flex)
- Stacked layout on mobile (flex-col)
- Side-by-side on desktop (xl:flex-row)
- Width set to 100% on mobile
- No resize functionality on mobile

### 5. Fullscreen Toggle ✅
- Added `isFullscreen` state
- Fullscreen button on desktop (top-right of preview)
- Fullscreen button on mobile (above preview)
- Exit fullscreen button in fullscreen mode
- Shows preview + console in fullscreen

### 6. Layout Changes ✅
- Changed from grid to flex layout
- Dynamic width based on `editorWidth` state
- Resize handle between editor and preview
- Conditional rendering for fullscreen mode
- Preserved mobile stacked layout

## Technical Details

### State Management
```typescript
const [editorWidth, setEditorWidth] = useState(DEFAULT_EDITOR_WIDTH); // 50%
const [isFullscreen, setIsFullscreen] = useState(false);
```

### Resize Handler
```typescript
const handleResize = (deltaX: number) => {
  const containerWidth = container.clientWidth;
  const deltaPercent = (deltaX / containerWidth) * 100;
  const newWidth = Math.max(20, Math.min(80, prev + deltaPercent));
  localStorage.setItem(PANEL_SIZE_KEY, newWidth.toString());
  return newWidth;
};
```

### Layout Structure
```
Normal Mode:
├─ Editor Panel (editorWidth%)
├─ Resize Handle (desktop only)
└─ Preview Panel (100 - editorWidth%)

Fullscreen Mode:
├─ Header (title + exit button)
├─ Preview (flex-1)
└─ Console (h-64)
```

## Notes
- ✅ Do NOT change existing design, colors, or theme
- ✅ Do NOT remove sakura animation
- ✅ Do NOT break mobile layout
- ✅ Disable drag on mobile (stacked layout)
- ✅ Fullscreen toggle implemented
- ✅ Smooth resizing experience
- ✅ Persistence working
