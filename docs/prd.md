# Online Code Editor Requirements Document

## 1. Application Overview

### 1.1 Application Name

Busya Code Editor

### 1.2 Application Description

A modern web-based online code editor inspired by CodePen and Codedex, designed as a safe, aesthetic, and cozy coding space. This editor supports HTML, CSS, and JavaScript with real-time preview, intelligent code suggestions, and a strong focus on emotional design and developer experience.

## 2. Core Features\n

### 2.1 Code Editor

- Support HTML, CSS, and JavaScript editing
- Syntax highlighting for all three languages
- Autocompletion functionality:\n  - HTML tags and attributes\n  - CSS properties and values\n  - Basic JavaScript keywords
- Inline error hints with friendly, non-aggressive tone
- Powered by Monaco Editor (VS Code engine) or equivalent
- Code formatting support
- Line highlighting
  \n### 2.2 Live Preview
- Split-screen layout: left side for code editor, right side for live preview
- Automatic preview updates on code change
- Sandboxed iframe implementation for security
  \n### 2.3 Local Persistence
- Automatic code saving using LocalStorage
- No login required for MVP

### 2.4 Animated Background

- Sakura petals floating animation
- Features: slow falling motion, slight horizontal drift, depth/parallax effect
- Performance-optimized with toggle on/off option

## 3. Design Style

### 3.1 Theme & Color Palette

- Dark mode only with soft pinks, sakura pink, and rose gradients as dominant colors
- Accent glows and subtle neon highlights in pink and purple tones
  \n### 3.2 Visual Design Language
- Liquid Glass / Glassmorphism aesthetic:\n  - Frosted glass panels with backdrop blur
  - Soft gradient borders with subtle noise texture
  - Rounded corners throughout the interface
  - Smooth transitions and micro-interactions
    \n### 3.3 Typography
- Clean, modern monospace font for code display
- Soft UI font for interface elements and labels

### 3.4 UX Philosophy

- Friendly and calming interface design
- Error messages presented as gentle hints using soft pinks and purples instead of harsh reds
- Beginner-friendly experience without compromising functionality

## 4. Technical Requirements

### 4.1 Technology Stack

- Frontend-only web application
- Modern web standards (ES6+, CSS variables)
- Modular and maintainable code structure
  \n### 4.2 Performance Optimization
- Efficient animation loops for sakura petals
- Optimized blur effects usage
- Responsive layout (desktop-first, tablet-friendly)\n

### 4.3 Code Quality

- Clear separation of concerns (HTML / CSS / JS)
- Readable, maintainable, and scalable codebase
