# Busya Code Editor - New Features Documentation

## Overview
This document describes the new features added to Busya Code Editor v3.0, including file download, console panel, and dialog support.

---

## 🎯 New Features

### 1. Download Files Feature

**Location:** Header toolbar (Download button)

**Functionality:**
- Downloads your code as individual files
- Files are named according to web standards:
  - `index.html` - HTML file
  - `style.css` - CSS file (only if not empty)
  - `script.js` - JavaScript file (only if not empty)

**Validation:**
- HTML file is **required** - you cannot download if HTML is empty
- CSS and JS files are **optional** - only downloaded if they contain actual code
- Empty files (whitespace/comments only) are not downloaded

**User Experience:**
- Click "Download" button in header
- If HTML is empty, you'll see a friendly error message
- On success, files download automatically
- Toast notification confirms successful download

**Code Example:**
```typescript
// Validates HTML is not empty
if (isCodeEmpty(code.html)) {
  toast({
    title: "HTML Required",
    description: "Please add some HTML code before downloading.",
    variant: "destructive"
  });
  return;
}

// Downloads only non-empty files
if (!isCodeEmpty(code.css)) {
  // Download CSS file
}
```

---

### 2. Autosave (Enhanced)

**Functionality:**
- Automatically saves your code to browser's LocalStorage
- Restores your code when you reload the page
- **Silent operation** - no notifications or buttons

**Technical Details:**
- Debounce delay: 500ms (saves after you stop typing for 0.5 seconds)
- Storage key: `busya-code-editor`
- Saves all three code sections: HTML, CSS, JavaScript

**Benefits:**
- Never lose your work
- No manual save button needed
- Works offline
- Persists across browser sessions

**Code Example:**
```typescript
// Autosave with debounce
useEffect(() => {
  const timeoutId = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
  }, 500);

  return () => clearTimeout(timeoutId);
}, [code]);
```

---

### 3. JavaScript Console Panel

**Location:** Below the live preview panel

**Functionality:**
- Captures and displays console output from your JavaScript code
- Supports three message types:
  - `console.log()` - Info messages (gray)
  - `console.warn()` - Warning messages (yellow)
  - `console.error()` - Error messages (red)

**Features:**
- **Real-time display** - messages appear instantly
- **Message counter** - shows total number of messages
- **Clear button** - removes all messages
- **Scrollable** - handles large amounts of output
- **Object formatting** - displays objects as formatted JSON

**Visual Design:**
- Glassmorphism card matching Busya theme
- Color-coded messages with icons
- Monospace font for code readability
- Border-left accent for message type

**Usage Example:**
```javascript
// These will appear in the console panel
console.log('Hello, Busya!');
console.warn('This is a warning');
console.error('This is an error');

// Objects are formatted nicely
console.log({ name: 'Busya', version: '3.0' });
```

**Technical Implementation:**
- Intercepts console methods in iframe
- Uses postMessage to send messages to parent
- Does not interfere with browser's DevTools console
- Handles errors gracefully without crashing

---

### 4. Dialog Support (alert/confirm/prompt)

**Functionality:**
- Enables `alert()`, `confirm()`, and `prompt()` in your JavaScript code
- Custom dialog UI matching Busya's sakura theme
- Non-blocking implementation (doesn't freeze the editor)

**Dialog Types:**

#### Alert
```javascript
alert('Hello from Busya! 🌸');
```
- Shows a message with an OK button
- Returns when user clicks OK

#### Confirm
```javascript
const result = confirm('Do you like Busya?');
console.log(result); // true or false
```
- Shows a message with OK and Cancel buttons
- Returns `true` if OK clicked, `false` if Cancel clicked

#### Prompt
```javascript
const name = prompt('What is your name?', 'Guest');
console.log(name); // user input or null
```
- Shows a message with an input field
- Returns user input as string, or `null` if cancelled
- Supports default value

**Visual Design:**
- Glassmorphism modal with backdrop blur
- Sakura-pink accent color
- Smooth animations
- Keyboard support (Enter to confirm, Escape to cancel)

**Technical Implementation:**
- Custom dialog component (not browser native)
- postMessage communication between iframe and parent
- Promise-based for async/await support
- Sandbox-safe (works with `allow-modals`)

**Code Example:**
```javascript
// Alert example
document.getElementById('alertBtn').addEventListener('click', () => {
  alert('Hello from Busya! 🌸');
});

// Confirm example
document.getElementById('confirmBtn').addEventListener('click', () => {
  const result = confirm('Do you like Busya?');
  console.log('Confirm result:', result);
});

// Prompt example
document.getElementById('promptBtn').addEventListener('click', () => {
  const name = prompt('What is your name?', 'Guest');
  console.log('Your name is:', name);
});
```

---

## 🎨 Design Consistency

All new features maintain Busya's aesthetic:
- ✅ Sakura pink theme preserved
- ✅ Glassmorphism design language
- ✅ Smooth animations and transitions
- ✅ Responsive on mobile devices
- ✅ Consistent typography and spacing

---

## 📱 Mobile Optimization

**Console Panel:**
- Height: 192px (h-48) on mobile, 256px (h-64) on desktop
- Scrollable content
- Touch-friendly buttons

**Download Button:**
- Responsive text (hidden on small screens, icon only)
- Touch-friendly size

**Dialogs:**
- Centered on screen
- Responsive width (max-w-md)
- Touch-friendly buttons

---

## 🔧 Technical Architecture

### Component Structure
```
EditorPage
├── SakuraBackground (always enabled)
├── CustomDialog (modal overlay)
├── Header
│   ├── Logo
│   ├── Download Button
│   └── Reset Button
└── Main
    ├── Left: Code Editor (tabbed)
    └── Right: Preview + Console
        ├── LivePreview (iframe)
        └── ConsolePanel
```

### Message Flow (Console)
```
iframe (user code)
  → console.log/warn/error
  → postMessage to parent
  → EditorPage receives message
  → Updates consoleMessages state
  → ConsolePanel re-renders
```

### Message Flow (Dialogs)
```
iframe (user code)
  → alert/confirm/prompt
  → postMessage to parent
  → EditorPage shows CustomDialog
  → User interacts with dialog
  → postMessage back to iframe
  → Promise resolves in user code
```

---

## 🚀 Usage Guide

### Getting Started
1. Open Busya Code Editor
2. Write your HTML, CSS, and JavaScript
3. See live preview automatically
4. Check console output below preview
5. Test dialogs with alert/confirm/prompt
6. Download your files when ready

### Best Practices
- Use console.log() for debugging
- Test dialogs before downloading
- HTML is required for download
- Code auto-saves every 0.5 seconds
- Clear console regularly for readability

### Keyboard Shortcuts
- **Dialog Confirm:** Enter
- **Dialog Cancel:** Escape
- **Tab Switching:** Click tabs (no keyboard shortcut yet)

---

## 🐛 Error Handling

**Console Panel:**
- Catches all JavaScript errors
- Displays friendly error messages
- Does not crash the editor
- Shows errors in red with error icon

**Download:**
- Validates HTML before download
- Shows toast notification on error
- Prevents download if HTML is empty

**Dialogs:**
- Handles null/undefined gracefully
- Converts all values to strings
- Returns null on cancel (prompt)
- Returns false on cancel (confirm)

---

## 📊 Performance

**Console:**
- Efficient message batching
- No performance impact on user code
- Handles thousands of messages
- Scrollable for large outputs

**Dialogs:**
- Non-blocking (async)
- No UI freeze
- Fast postMessage communication
- Minimal memory footprint

**Autosave:**
- Debounced to reduce writes
- LocalStorage is fast
- No network requests
- No performance impact

---

## 🔒 Security

**Iframe Sandbox:**
- `allow-scripts` - enables JavaScript
- `allow-modals` - enables custom dialogs
- No `allow-same-origin` - prevents access to parent
- No `allow-forms` - prevents form submission

**postMessage:**
- Validates message source
- Type-safe message handling
- No eval() or dangerous code execution

**LocalStorage:**
- Client-side only
- No server communication
- User data stays in browser

---

## 📝 API Reference

### ConsoleMessage Interface
```typescript
interface ConsoleMessage {
  id: string;           // Unique identifier
  type: 'log' | 'warn' | 'error';
  message: string;      // Formatted message
  timestamp: number;    // Unix timestamp
}
```

### DialogData Interface
```typescript
interface DialogData {
  type: 'alert' | 'confirm' | 'prompt';
  message: string;      // Dialog message
  defaultValue?: string; // For prompt only
  id: string;           // Unique identifier
}
```

### EditorState Interface
```typescript
interface EditorState {
  html: string;
  css: string;
  javascript: string;
}
```

---

## 🎓 Examples

### Example 1: Console Logging
```javascript
// Log different types of messages
console.log('Starting application...');
console.warn('This feature is experimental');
console.error('Failed to load resource');

// Log objects
const user = { name: 'Alice', age: 25 };
console.log('User data:', user);
```

### Example 2: Interactive Dialogs
```javascript
// Get user input
const name = prompt('Enter your name:', 'Anonymous');

if (name) {
  // Confirm action
  const proceed = confirm(`Welcome ${name}! Continue?`);
  
  if (proceed) {
    alert(`Hello ${name}! Welcome to Busya! 🌸`);
  }
}
```

### Example 3: Error Handling
```javascript
try {
  // Some code that might fail
  const result = riskyOperation();
  console.log('Success:', result);
} catch (error) {
  console.error('Operation failed:', error.message);
  alert('An error occurred. Check the console.');
}
```

---

## 🔄 Version History

### v3.0 (Current)
- ✅ Download files feature
- ✅ Console panel
- ✅ Dialog support (alert/confirm/prompt)
- ✅ Enhanced autosave

### v2.0
- Chrome-style tabs
- Mobile optimizations
- Always-on sakura mode

### v1.0
- Monaco Editor integration
- Live preview
- Basic autosave
- Sakura theme

---

## 📞 Support

For issues or questions:
1. Check console panel for error messages
2. Try resetting to default code
3. Clear browser cache and reload
4. Check browser console (F12) for system errors

---

**Enjoy coding with Busya! 🌸✨**
