import { Code2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import LivePreview from '@/components/LivePreview';
import SakuraBackground from '@/components/SakuraBackground';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'busya-code-editor';

interface EditorState {
  html: string;
  css: string;
  javascript: string;
}

const defaultCode: EditorState = {
  html: `<div class="container">
  <h1>Welcome to Busya! ✨</h1>
  <p>Start coding and see your changes live!</p>
  <button id="myButton">Click me!</button>
</div>`,
  css: `.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #ff69b4;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

button {
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}`,
  javascript: `document.getElementById('myButton').addEventListener('click', () => {
  alert('Hello from Busya! 🌸');
});`
};

export default function EditorPage() {
  const [code, setCode] = useState<EditorState>(defaultCode);
  const [sakuraEnabled, setSakuraEnabled] = useState(true);

  // Load code from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCode(parsed);
      } catch (error) {
        console.error('Failed to load saved code:', error);
      }
    }
  }, []);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
    }, 500); // Debounce saves

    return () => clearTimeout(timeoutId);
  }, [code]);

  const handleCodeChange = (language: keyof EditorState) => (value: string) => {
    setCode(prev => ({ ...prev, [language]: value }));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to the default code? This cannot be undone.')) {
      setCode(defaultCode);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Sakura Background */}
      <SakuraBackground enabled={sakuraEnabled} petalCount={30} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="glass border-b border-border/50 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                  <Code2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">Busya</h1>
                  <p className="text-xs text-muted-foreground">Code Editor</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSakuraEnabled(!sakuraEnabled)}
                  className="glass border-border/50"
                >
                  <Sparkles className={`w-4 h-4 mr-2 ${sakuraEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  {sakuraEnabled ? 'Sakura On' : 'Sakura Off'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="glass border-border/50"
                >
                  Reset Code
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Editor Layout */}
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
            {/* Left Side - Code Editors */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 min-h-0">
                <CodeEditor
                  language="html"
                  value={code.html}
                  onChange={handleCodeChange('html')}
                  label="HTML"
                />
              </div>
              <div className="flex-1 min-h-0">
                <CodeEditor
                  language="css"
                  value={code.css}
                  onChange={handleCodeChange('css')}
                  label="CSS"
                />
              </div>
              <div className="flex-1 min-h-0">
                <CodeEditor
                  language="javascript"
                  value={code.javascript}
                  onChange={handleCodeChange('javascript')}
                  label="JavaScript"
                />
              </div>
            </div>

            {/* Right Side - Live Preview */}
            <div className="h-full">
              <LivePreview
                html={code.html}
                css={code.css}
                javascript={code.javascript}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
