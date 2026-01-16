import { Code2, Download, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import ConsolePanel, { type ConsoleMessage } from '@/components/ConsolePanel';
import CustomDialog, { type DialogData } from '@/components/CustomDialog';
import EditorTabs from '@/components/EditorTabs';
import LivePreview from '@/components/LivePreview';
import MobileRecommendation from '@/components/MobileRecommendation';
import ResizeHandle from '@/components/ResizeHandle';
import SakuraBackground from '@/components/SakuraBackground';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/useIsMobile';
import { downloadAsZip } from '@/utils/zipExport';

const STORAGE_KEY = 'busya-code-editor';
const PANEL_SIZE_KEY = 'busya-panel-size';
const DEFAULT_EDITOR_WIDTH = 50; // percentage

interface EditorState {
  html: string;
  css: string;
  javascript: string;
}

const defaultCode: EditorState = {
  html: `<div class="container">
  <h1>Welcome to Busya! ✨</h1>
  <p>Start coding and see your changes live!</p>
  <div class="button-group">
    <button id="alertBtn">Alert</button>
    <button id="confirmBtn">Confirm</button>
    <button id="promptBtn">Prompt</button>
    <button id="consoleBtn">Console</button>
  </div>
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

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
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
  javascript: `// Alert demo
document.getElementById('alertBtn').addEventListener('click', () => {
  alert('Hello from Busya! 🌸');
});

// Confirm demo
document.getElementById('confirmBtn').addEventListener('click', () => {
  const result = confirm('Do you like Busya?');
  console.log('Confirm result:', result);
});

// Prompt demo
document.getElementById('promptBtn').addEventListener('click', () => {
  const name = prompt('What is your name?', 'Guest');
  console.log('Your name is:', name);
});

// Console demo
document.getElementById('consoleBtn').addEventListener('click', () => {
  console.log('This is a log message');
  console.warn('This is a warning message');
  console.error('This is an error message');
});

console.log('Welcome to Busya Code Editor! 🌸');`
};

export default function EditorPage() {
  // Check if mobile device
  const isMobile = useIsMobile();

  // Draft state - code being edited (not executed)
  const [code, setCode] = useState<EditorState>(defaultCode);
  
  // Runtime state - code that is actually executed in the iframe
  const [runtimeCode, setRuntimeCode] = useState<EditorState>(defaultCode);
  
  // Execution key - increments on each Run to trigger re-execution
  const [executionKey, setExecutionKey] = useState(0);
  
  // Panel sizing state
  const [editorWidth, setEditorWidth] = useState(DEFAULT_EDITOR_WIDTH);
  
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [currentDialog, setCurrentDialog] = useState<DialogData | null>(null);
  const [dialogResolver, setDialogResolver] = useState<((value: string | boolean | null) => void) | null>(null);
  const { toast } = useToast();

  // If mobile, show recommendation screen instead
  if (isMobile) {
    return <MobileRecommendation />;
  }

  // Load code from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCode(parsed);
        // Also set as runtime code on initial load
        setRuntimeCode(parsed);
      } catch (error) {
        console.error('Failed to load saved code:', error);
      }
    }

    // Load saved panel size
    const savedSize = localStorage.getItem(PANEL_SIZE_KEY);
    if (savedSize) {
      const size = Number.parseFloat(savedSize);
      if (size >= 20 && size <= 80) {
        setEditorWidth(size);
      }
    }
  }, []);

  // Save draft code to localStorage whenever it changes (autosave with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [code]);

  const handleCodeChange = (language: keyof EditorState) => (value: string) => {
    // Update draft state only - does not trigger execution
    setCode(prev => ({ ...prev, [language]: value }));
  };

  const handleResize = (deltaX: number) => {
    const container = document.querySelector('main');
    if (!container) return;

    const containerWidth = container.clientWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    
    setEditorWidth(prev => {
      const newWidth = prev + deltaPercent;
      // Constrain between 20% and 80%
      const constrainedWidth = Math.max(20, Math.min(80, newWidth));
      
      // Save to localStorage
      localStorage.setItem(PANEL_SIZE_KEY, constrainedWidth.toString());
      
      return constrainedWidth;
    });
  };

  const handleRun = () => {
    // Clear console before each run
    setConsoleMessages([]);
    
    // Update runtime state with current draft code
    setRuntimeCode(code);
    
    // Increment execution key to trigger re-execution
    setExecutionKey(prev => prev + 1);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to the default code? This cannot be undone.')) {
      setCode(defaultCode);
      setRuntimeCode(defaultCode);
      localStorage.removeItem(STORAGE_KEY);
      setConsoleMessages([]);
      setExecutionKey(prev => prev + 1);
    }
  };

  const handleConsoleMessage = (message: ConsoleMessage) => {
    setConsoleMessages(prev => [...prev, message]);
  };

  const handleClearConsole = () => {
    setConsoleMessages([]);
  };

  const handleDialogRequest = (dialog: DialogData): Promise<string | boolean | null> => {
    return new Promise((resolve) => {
      setCurrentDialog(dialog);
      setDialogResolver(() => resolve);
    });
  };

  const handleDialogClose = (result: string | boolean | null) => {
    if (dialogResolver) {
      dialogResolver(result);
      setDialogResolver(null);
    }
    setCurrentDialog(null);
  };

  const handleDownload = async () => {
    try {
      // Use the ZIP export utility
      await downloadAsZip({
        html: code.html,
        css: code.css,
        javascript: code.javascript
      });

      // Show success toast
      toast({
        title: "Project Downloaded",
        description: "Your Busya project has been downloaded as a ZIP file!",
      });
    } catch (error) {
      // Show friendly error toast
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Unable to download project. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Sakura Background - Always enabled */}
      <SakuraBackground enabled={true} petalCount={30} />

      {/* Custom Dialog */}
      <CustomDialog dialog={currentDialog} onClose={handleDialogClose} />

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
                  onClick={handleRun}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs xl:text-sm"
                  size="sm"
                >
                  <Play className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
                  Run
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="glass border-border/50 text-xs xl:text-sm"
                >
                  <Download className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="glass border-border/50 text-xs xl:text-sm"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Editor Layout */}
        <main className="flex-1 container mx-auto px-2 xl:px-4 py-3 xl:py-6">
          <div className="flex flex-col xl:flex-row gap-3 xl:gap-0 h-[calc(100vh-100px)] xl:h-[calc(100vh-140px)]">
            {/* Left Side - Tabbed Code Editor */}
            <div 
              className="flex flex-col h-full min-h-0"
              style={{ 
                width: `${editorWidth}%`
              }}
            >
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

            {/* Resize Handle - Desktop Only */}
            <ResizeHandle onResize={handleResize} />

            {/* Right Side - Live Preview and Console */}
            <div 
              className="flex flex-col h-full gap-3 xl:gap-4 min-h-[400px] xl:min-h-0"
              style={{ 
                width: `${100 - editorWidth}%`
              }}
            >
              {/* Live Preview */}
              <div className="flex-1 min-h-0">
                <LivePreview
                  html={runtimeCode.html}
                  css={runtimeCode.css}
                  javascript={runtimeCode.javascript}
                  onConsoleMessage={handleConsoleMessage}
                  onDialogRequest={handleDialogRequest}
                  executionKey={executionKey}
                />
              </div>
              
              {/* Console Panel */}
              <div className="h-48 xl:h-64">
                <ConsolePanel 
                  messages={consoleMessages}
                  onClear={handleClearConsole}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
