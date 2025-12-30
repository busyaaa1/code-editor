# Busya Code Editor ✨

A modern, cozy web-based code editor with a beautiful sakura theme. Write HTML, CSS, and JavaScript with live preview, intelligent code suggestions, and a calming aesthetic.

## ✨ Features

- **Monaco Editor Integration**: Powered by VS Code's editor engine
- **Live Preview**: Real-time preview of your code in a split-screen layout
- **Syntax Highlighting**: Full support for HTML, CSS, and JavaScript
- **Intelligent Autocompletion**: Smart code suggestions as you type
- **Code Formatting**: Built-in code formatting support
- **Local Persistence**: Your code is automatically saved to LocalStorage
- **Sakura Animation**: Beautiful falling sakura petals (can be toggled on/off)
- **Glassmorphism UI**: Modern frosted glass aesthetic with soft pink gradients
- **Friendly Error Messages**: Gentle, non-aggressive error hints in soft colors
- **Dark Mode Only**: Optimized for a cozy, eye-friendly coding experience

## 🎨 Design Philosophy

Busya is designed to be a safe, aesthetic, and cozy coding space. Instead of harsh red error messages, we use soft pinks and purples. The glassmorphism design with sakura petals creates a calming environment perfect for learning and creating.

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev -- --host 127.0.0.1
```

### Usage

1. Open the application in your browser
2. Write HTML, CSS, and JavaScript in the left panels
3. See your changes live in the preview panel on the right
4. Your code is automatically saved to LocalStorage
5. Toggle sakura animation on/off using the button in the header
6. Click "Reset Code" to restore default example code

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Editor**: Monaco Editor (VS Code engine)
- **Styling**: Tailwind CSS with custom sakura theme
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Storage**: LocalStorage (no backend required)

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeEditor.tsx          # Monaco editor wrapper
│   ├── LivePreview.tsx         # Sandboxed iframe preview
│   ├── SakuraBackground.tsx    # Animated sakura petals
│   └── ui/                     # shadcn/ui components
├── pages/
│   └── EditorPage.tsx          # Main editor page
├── index.css                   # Sakura theme design system
└── routes.tsx                  # Route configuration
```

## 🎨 Color Palette

The Busya theme uses a carefully crafted sakura-inspired color palette:

- **Primary**: Sakura Pink (#ff69b4)
- **Secondary**: Rose (#d946a6)
- **Background**: Deep Purple (#1a0f1f)
- **Accent**: Soft Pink with low saturation
- **Error**: Friendly soft pink (not harsh red)
- **Success**: Soft mint
- **Warning**: Soft peach

## 🌸 Features in Detail

### Monaco Editor
- Full VS Code editing experience
- Syntax highlighting for HTML, CSS, JavaScript
- IntelliSense autocompletion
- Code formatting on paste and type
- Smooth cursor animations
- Font ligatures support

### Live Preview
- Sandboxed iframe for security
- Automatic updates on code change
- Friendly error handling with visual feedback
- Isolated execution environment

### Sakura Animation
- 30 animated petals by default
- Randomized fall patterns and speeds
- Depth effect with varying sizes and opacity
- Performance-optimized
- Can be toggled on/off

### LocalStorage Persistence
- Automatic saving with debounce
- Survives page refreshes
- No login required
- Reset option available

## 🔧 Development

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## 📝 License

© 2025 Busya Code Editor

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

---

Made with 💖 and 🌸 by the Busya team
