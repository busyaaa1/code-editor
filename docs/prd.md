# Busya Code Editor Requirements Document

## 1. Application Overview

### 1.1 Application Name\n
Busya Code Editor

### 1.2 Application Description

A modern web-based online code editor inspired by CodePen and Codedex, designed as a safe, aesthetic, and cozy coding space. This editor supports HTML, CSS, and JavaScript with real-time preview, intelligent code suggestions, and a strong focus on emotional design and developer experience.
\n## 2. Core Features\n
### 2.1 Code Editor\n
- Support HTML, CSS, and JavaScript editing
- Syntax highlighting for all three languages
- Autocompletion functionality:\n  - HTML tags and attributes\n  - CSS properties and values\n  - Basic JavaScript keywords
- Inline error hints with friendly, non-aggressive tone
- Powered by Monaco Editor (VS Code engine) or equivalent
- Code formatting support
- Line highlighting
\n### 2.2 Live Preview
\n- Split-screen layout: left side for code editor, right side for live preview
- Automatic preview updates on code change
- Sandboxed iframe implementation for security\n
### 2.3 Local Persistence (Autosave)

- Automatically save HTML, CSS, and JS code to LocalStorage
- Restore code from LocalStorage on page reload
- Autosave must be silent with no notifications or buttons
- Use debounce mechanism to avoid excessive writes and optimize performance

### 2.4 Download Files Feature

- Add a Download Files button
- Download logic:\n  - HTML file is REQUIRED\n    - If HTML content is empty or only whitespace/comments, show a friendly error and do NOT download anything\n  - CSS file: Download only if it contains actual code (not empty or whitespace)
  - JS file: Download only if it contains actual code (not empty or whitespace)
- Download files individually (not zipped)
- Standard filenames:\n  - index.html
  - style.css
  - script.js

### 2.5 JavaScript Console Panel

- Add a console panel BELOW the live preview
- Capture and display:\n  - console.log
  - console.warn
  - console.error
- Console messages must appear in real time
- Display messages clearly with different visual styles per level
- Add a Clear Console button
- Console must NOT crash the editor if user JS throws errors

### 2.6 Dialog Support (alert / confirm / prompt)

- Fix the issue where alert(), confirm(), and prompt() do not work\n- Dialogs must work inside the iframe preview
- Maintain iframe sandbox security
- If direct browser dialogs are not allowed, implement a custom dialog system that:
  - Mimics alert / confirm / prompt behavior
  - Appears visually as part of the editor UI
  - Does NOT block the main application

### 2.7 Animated Background

- Sakura petals floating animation
- Features: slow falling motion, slight horizontal drift, depth/parallax effect\n- Performance-optimized with toggle on/off option

## 3. Design Style

### 3.1 Theme & Color Palette
\n- Dark mode only with soft pinks, sakura pink, and rose gradients as dominant colors
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

### 4.2 Performance Optimization

- Efficient animation loops for sakura petals
- Optimized blur effects usage
- Responsive layout (desktop-first, tablet-friendly)
- Stable performance on mobile devices

### 4.3 Code Quality\n
- Clear separation of concerns (HTML / CSS / JS)
- Readable, maintainable, and scalable codebase

## 5. Constraints

- Do NOT change existing UI design, color system, or theme
- Do NOT remove sakura animation
- Do NOT introduce backend logic
- Do NOT use external APIs
- Keep performance stable, especially on mobile devices