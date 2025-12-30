import { Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import EditorTabs from '@/components/EditorTabs';
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
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');

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
    }, 500);

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
      {/* Sakura Background - Always enabled */}
      <SakuraBackground enabled={true} petalCount={30} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="glass border-b border-border/50 sticky top-0 z-20">
          <div className="container mx-auto px-3 xl:px-4 py-3 xl:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 xl:gap-3">
                <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                  <Code2 className="w-5 h-5 xl:w-6 xl:h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl xl:text-2xl font-bold gradient-text">Busya</h1>
                  <p className="text-xs text-muted-foreground hidden xl:block">Code Editor</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="glass border-border/50 text-xs xl:text-sm"
                >
                  Reset Code
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Editor Layout */}
        <main className="flex-1 container mx-auto px-2 xl:px-4 py-3 xl:py-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-6 h-[calc(100vh-100px)] xl:h-[calc(100vh-140px)]">
            {/* Left Side - Tabbed Code Editor */}
            <div className="flex flex-col h-full min-h-0">
              <div className="glass-strong rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Tabs */}
                <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
                
                {/* Single Editor Container */}
                <div className="flex-1 monaco-editor-container">
                  {activeTab === 'html' && (
                    <CodeEditor
                      language="html"
                      value={code.html}
                      onChange={handleCodeChange('html')}
                      label="HTML"
                    />
                  )}
                  {activeTab === 'css' && (
                    <CodeEditor
                      language="css"
                      value={code.css}
                      onChange={handleCodeChange('css')}
                      label="CSS"
                    />
                  )}
                  {activeTab === 'javascript' && (
                    <CodeEditor
                      language="javascript"
                      value={code.javascript}
                      onChange={handleCodeChange('javascript')}
                      label="JavaScript"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Live Preview */}
            <div className="h-full min-h-[400px] xl:min-h-0">
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
