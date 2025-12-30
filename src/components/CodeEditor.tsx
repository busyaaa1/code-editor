import Editor from '@monaco-editor/react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface CodeEditorProps {
  language: 'html' | 'css' | 'javascript';
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function CodeEditor({ language, value, onChange, label }: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const getLanguageColor = () => {
    switch (language) {
      case 'html':
        return 'bg-error/20 text-error-foreground border-error/30';
      case 'css':
        return 'bg-primary/20 text-primary-foreground border-primary/30';
      case 'javascript':
        return 'bg-warning/20 text-warning-foreground border-warning/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="glass-strong rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <Badge 
          variant="outline" 
          className={`${getLanguageColor()} font-mono text-xs uppercase tracking-wider`}
        >
          {label}
        </Badge>
      </div>
      <div className="flex-1 monaco-editor-container">
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
              other: true,
              comments: false,
              strings: true
            },
            acceptSuggestionOnEnter: 'on',
            snippetSuggestions: 'inline',
            formatOnPaste: true,
            formatOnType: true,
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
            fontLigatures: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
          }}
        />
      </div>
    </Card>
  );
}
