# Busya Code Editor - Changelog

## Version 2.0 - UI/UX Improvements (2025-12-30)

### 🎯 Major Features

#### Chrome-Style Tab Interface
- **NEW:** EditorTabs component with HTML, CSS, and JS tabs
- **CHANGED:** Single editor view instead of stacked editors
- **DESIGN:** White tab labels with sakura-pink active indicator
- **UX:** Fixed tabs (cannot be closed, reordered, or removed)

#### Mobile Optimizations
- **IMPROVED:** Vertical stacking layout for mobile devices
- **PERFORMANCE:** Reduced sakura petal count (30 → 15 on mobile)
- **PERFORMANCE:** Reduced blur effects (12px/20px → 6px/10px)
- **PERFORMANCE:** Reduced glow intensity by 50% on mobile
- **PERFORMANCE:** Disabled hover effects on touch devices
- **UX:** Responsive padding and spacing

#### Sakura Mode
- **CHANGED:** Sakura animation always enabled
- **REMOVED:** Sakura toggle button
- **IMPROVED:** Dynamic petal count based on screen size

### 📝 Detailed Changes

#### New Files
- `src/components/EditorTabs.tsx` - Chrome-style tab component

#### Modified Files
- `src/components/CodeEditor.tsx`
  - Removed Card and Badge wrapper
  - Simplified to pure Monaco editor
  - Removed language-specific color badges
  
- `src/components/SakuraBackground.tsx`
  - Added dynamic petal count adjustment
  - Added resize listener for responsive behavior
  - Reduced petal count on mobile devices
  
- `src/pages/EditorPage.tsx`
  - Integrated EditorTabs component
  - Implemented tab switching logic
  - Removed Sakura toggle button
  - Improved responsive padding and spacing
  - Added mobile-specific height calculations
  
- `src/index.css`
  - Added mobile optimization media queries
  - Reduced blur effects on mobile
  - Reduced glow effects on mobile
  - Added touch device hover effect disabling
  - Optimized sakura petal styling for mobile

### 🎨 Design Changes

#### Layout
- **Desktop:** Side-by-side editor and preview with tabs
- **Mobile:** Vertical stack (tabs → editor → preview)
- **Spacing:** Responsive padding (px-2/px-3 on mobile, px-4 on desktop)

#### Typography
- **Mobile:** Smaller header text (text-xl vs text-2xl)
- **Mobile:** Hidden subtitle for space efficiency

#### Visual Effects
- **Desktop:** Full blur, glow, and shadow effects
- **Mobile:** Reduced effects for performance

### 📊 Performance Metrics

| Metric | Before | After (Desktop) | After (Mobile) |
|--------|--------|-----------------|----------------|
| Sakura Petals | 30 | 30 | 15 |
| Blur Strength | 12px/20px | 12px/20px | 6px/10px |
| Glow Intensity | 100% | 100% | 50% |
| Hover Effects | Yes | Yes | No |

### 🐛 Bug Fixes
- Fixed cross-origin iframe SecurityError in LivePreview component
- Changed from contentDocument.write() to srcDoc attribute

### ✅ Quality Assurance
- All modified files pass biome linter
- No TypeScript errors in application code
- Consistent code formatting
- Proper component cleanup on unmount

### 🔄 Breaking Changes
- **REMOVED:** Sakura toggle button (always enabled now)
- **CHANGED:** Editor layout from stacked to tabbed

### 📱 Browser Support
- Desktop: Chrome, Firefox, Safari, Edge (latest versions)
- Mobile: iOS Safari, Chrome Mobile, Samsung Internet
- Touch devices: Optimized hover effect handling

### 🚀 Upgrade Notes
No action required. All changes are backward compatible with existing localStorage data.

---

## Version 1.0 - Initial Release

### Features
- Monaco Editor integration
- HTML, CSS, JavaScript support
- Live preview with sandboxed iframe
- LocalStorage persistence
- Sakura-themed dark mode
- Glassmorphism UI
- Animated sakura petals
- Friendly error messages

---

**Full Documentation:** See IMPROVEMENTS.md for detailed technical information.
