# Task: Improve Busya Code Editor UI/UX with Tabs and Mobile Optimizations

## Plan
- [x] Step 1: Create Tab Component
  - [x] Build Chrome-style tab interface with HTML, CSS, JS tabs
  - [x] Implement tab switching logic (only one editor visible at a time)
  - [x] Style tabs with white labels and sakura-pink active indicator
  - [x] Make tabs fixed (no close, reorder, or remove)
- [x] Step 2: Refactor Editor Layout
  - [x] Replace stacked editors with single editor container
  - [x] Increase editor container size for spacious feel
  - [x] Implement tab-based editor switching
- [x] Step 3: Mobile Responsiveness
  - [x] Add vertical stacking for mobile (tabs → editor → preview)
  - [x] Reduce padding and spacing on mobile
  - [x] Ensure no horizontal overflow
  - [x] Test text and button readability
- [x] Step 4: Sakura Mode Behavior
  - [x] Remove sakura toggle button on desktop
  - [x] Keep sakura always enabled on desktop
  - [x] Reduce sakura animation intensity on mobile
- [x] Step 5: Mobile Performance Optimizations
  - [x] Add media queries for mobile-only optimizations
  - [x] Reduce blur strength in glassmorphism on mobile
  - [x] Reduce glow and shadow intensity on mobile
  - [x] Disable hover effects on touch devices
- [x] Step 6: Validation
  - [x] Run linter and fix issues
  - [x] Test on desktop and mobile viewports

## Notes
- Do NOT change color system or HSL variables ✅
- Do NOT remove sakura animation entirely ✅
- Focus on layout, tabs, and performance optimizations ✅
- Tabs must be Chrome-style with white labels ✅
- Active tab gets sakura-pink highlight ✅

## Implementation Summary
- Created EditorTabs component with Chrome-style tabs (HTML, CSS, JS)
- Refactored EditorPage to use tab-based switching instead of stacked editors
- Simplified CodeEditor component (removed redundant header)
- Added mobile-specific CSS optimizations in index.css
- Reduced sakura petal count on mobile (30 → 15)
- Reduced blur, glow, and shadow effects on mobile
- Disabled hover effects on touch devices
- Removed Sakura toggle button (always enabled)
- Improved spacing and padding for mobile devices
- All changes pass biome linter
