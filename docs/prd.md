# Busya Code Editor Requirements Document\n
## 1. Application Overview

### 1.1 Application Name
\nBusya Code Editor

### 1.2 Application Description

A modern web-based online code editor inspired by CodePen and Codedex, designed as a safe, aesthetic, and cozy coding space. This editor supports HTML, CSS, and JavaScript with real-time preview, intelligent code suggestions, and a strong focus on emotional design and developer experience.
\n## 2. Core Features\n
### 2.1 Code Editor

- Support HTML, CSS, and JavaScript editing
- Syntax highlighting for all three languages
- Autocompletion functionality:
  - HTML tags and attributes
  - CSS properties and values
  - Basic JavaScript keywords
- Inline error hints with friendly, non-aggressive tone
- Powered by Monaco Editor (VS Code engine) or equivalent\n- Code formatting support
- Line highlighting

### 2.2 Live Preview

- Split-screen layout: left side for code editor, right side for live preview
- Automatic preview updates on code change
- Sandboxed iframe implementation for security

### 2.3 Resizable Live Preview Panel

- Implement a draggable resize handle between code editor area and live preview area
- User can resize the preview by dragging the divider
- Resizing must feel smooth and responsive
- The chosen size should persist during the session
- Mobile device handling:\n  - Disable drag resizing on mobile devices
  - Use a stacked layout instead
- Optional enhancement: Add a Fullscreen Preview toggle button
  - Expands preview to full screen
  - Allows returning back to editor

### 2.4 Local Persistence (Autosave)

- Automatically save HTML, CSS, and JS code to LocalStorage
- Restore code from LocalStorage on page reload
- Autosave must be silent with no notifications or buttons\n- Use debounce mechanism to avoid excessive writes and optimize performance

### 2.5 Download Files Feature (ZIP Export)

- Add a Download Files button
- Use JSZip library (client-side) to create ZIP archive
- Download logic:\n  - HTML file is REQUIRED
    - If HTML content is empty or only whitespace/comments, show a friendly error notification and do NOT download anything
  - CSS file: Include in ZIP only if it contains actual code (not empty or whitespace)
  - JS file: Include in ZIP only if it contains actual code (not empty or whitespace)
- File linking logic:\n  - Dynamically modify index.html to include `<link rel=\"stylesheet\" href=\"style.css\">` inside the `<head>` tag
  - Dynamically add `<script src=\"script.js\"></script>` before the closing `</body>` tag
  - If user provides full HTML document structure, use regex or string replacement to insert these tags
  - If user provides only a snippet (no `<html>` or `<head>` tags), wrap the content in a standard HTML5 boilerplate before adding the links
- Output filename: busya-project.zip
- Standard filenames inside ZIP:\n  - index.html
  - style.css (if included)
  - script.js (if included)
- Implementation must be strictly frontend-only\n- Code style: Clean, modular JavaScript function (e.g., downloadAsZip()), modern ES6+ with comments

### 2.6 JavaScript Console Panel

- Add a console panel BELOW the live preview
- Capture and display:
  - console.log
  - console.warn
  - console.error
- Console messages must appear in real time
- Display messages clearly with different visual styles per level
- Add a Clear Console button
- Console must NOT crash the editor if user JS throws errors

### 2.7 Dialog Support (alert / confirm / prompt)

- Fix the issue where alert(), confirm(), and prompt() do not work
- Dialogs must work inside the iframe preview\n- Maintain iframe sandbox security\n- If direct browser dialogs are not allowed, implement a custom dialog system that:
  - Mimics alert / confirm / prompt behavior
  - Appears visually as part of the editor UI
  - Does NOT block the main application

### 2.8 Animated Background

- Sakura petals floating animation\n- Features: slow falling motion, slight horizontal drift, depth/parallax effect
- Performance-optimized with toggle on/off option

## 3. Design Style

### 3.1 Theme & Color Palette\n\n- Dark mode only with soft pinks, sakura pink, and rose gradients as dominant colors
- Accent glows and subtle neon highlights in pink and purple tones\n
### 3.2 Visual Design Language

- Liquid Glass / Glassmorphism aesthetic:
  - Frosted glass panels with backdrop blur\n  - Soft gradient borders with subtle noise texture
  - Rounded corners throughout the interface
  - Smooth transitions and micro-interactions

### 3.3 Typography

- Clean, modern monospace font for code display
- Soft UI font for interface elements and labels
\n### 3.4 UX Philosophy

- Friendly and calming interface design
- Error messages presented as gentle hints using soft pinks and purples instead of harsh reds
- Beginner-friendly experience without compromising functionality

## 4. Technical Requirements

### 4.1 Technology Stack

- Frontend-only web application
- Modern web standards (ES6+, CSS variables)
- Modular and maintainable code structure
- JSZip library for ZIP archive creation

### 4.2 Performance Optimization

- Efficient animation loops for sakura petals
- Optimized blur effects usage
- Responsive layout (desktop-first, tablet-friendly)
- Stable performance on mobile devices

### 4.3 Code Quality

- Clear separation of concerns (HTML / CSS / JS)\n- Readable, maintainable, and scalable codebase\n
## 5. Constraints

- Do NOT change existing UI design, color system, or theme
- Do NOT remove sakura animation
- Do NOT introduce backend logic
- Do NOT use external APIs
- Keep performance stable, especially on mobile devices
- Do NOT break mobile layout when implementing resizable preview