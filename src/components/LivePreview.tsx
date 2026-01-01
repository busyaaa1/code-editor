import { AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { ConsoleMessage } from './ConsolePanel';
import type { DialogData } from './CustomDialog';

interface LivePreviewProps {
  html: string;
  css: string;
  javascript: string;
  onConsoleMessage?: (message: ConsoleMessage) => void;
  onDialogRequest?: (dialog: DialogData) => Promise<string | boolean | null>;
  executionKey?: number; // Used to trigger re-execution
}

export default function LivePreview({ 
  html, 
  css, 
  javascript, 
  onConsoleMessage,
  onDialogRequest,
  executionKey = 0
}: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.source !== 'busya-preview') return;

      const { type, data } = event.data;

      if (type === 'console' && onConsoleMessage) {
        onConsoleMessage({
          id: `${Date.now()}-${Math.random()}`,
          type: data.level,
          message: data.message,
          timestamp: Date.now()
        });
      } else if (type === 'dialog' && onDialogRequest) {
        const dialogId = data.id;
        const result = await onDialogRequest({
          type: data.dialogType,
          message: data.message,
          defaultValue: data.defaultValue,
          id: dialogId
        });

        // Send result back to iframe
        iframeRef.current?.contentWindow?.postMessage({
          source: 'busya-parent',
          type: 'dialog-response',
          id: dialogId,
          result
        }, '*');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onConsoleMessage, onDialogRequest]);

  // Update iframe content only when executionKey changes (manual execution)
  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (!doc) return;

    // Create the complete HTML document
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 16px;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    (function() {
      // Console capture
      const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error
      };

      function sendConsoleMessage(level, args) {
        const message = args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');

        window.parent.postMessage({
          source: 'busya-preview',
          type: 'console',
          data: { level, message }
        }, '*');
      }

      console.log = function(...args) {
        originalConsole.log.apply(console, args);
        sendConsoleMessage('log', args);
      };

      console.warn = function(...args) {
        originalConsole.warn.apply(console, args);
        sendConsoleMessage('warn', args);
      };

      console.error = function(...args) {
        originalConsole.error.apply(console, args);
        sendConsoleMessage('error', args);
      };

      // Dialog support
      const dialogResolvers = new Map();
      let dialogCounter = 0;

      function createDialog(dialogType, message, defaultValue) {
        return new Promise((resolve) => {
          const dialogId = 'dialog-' + (dialogCounter++);
          dialogResolvers.set(dialogId, resolve);

          window.parent.postMessage({
            source: 'busya-preview',
            type: 'dialog',
            data: { dialogType, message, defaultValue, id: dialogId }
          }, '*');
        });
      }

      // Listen for dialog responses
      window.addEventListener('message', (event) => {
        if (event.data?.source === 'busya-parent' && event.data?.type === 'dialog-response') {
          const resolver = dialogResolvers.get(event.data.id);
          if (resolver) {
            resolver(event.data.result);
            dialogResolvers.delete(event.data.id);
          }
        }
      });

      // Override dialog functions
      window.alert = function(message) {
        createDialog('alert', String(message || ''));
      };

      window.confirm = function(message) {
        return createDialog('confirm', String(message || ''));
      };

      window.prompt = function(message, defaultValue) {
        return createDialog('prompt', String(message || ''), defaultValue || '');
      };

      // Wrap user code in try-catch for error handling
      // This ensures HTML/CSS still render even if JS fails
      try {
        ${javascript}
      } catch (error) {
        console.error('Runtime Error: ' + error.message);
        // Display friendly error message in preview
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'background: rgba(255, 182, 193, 0.1); border: 1px solid rgba(255, 182, 193, 0.3); border-radius: 8px; padding: 16px; margin: 16px 0; color: #ffb6c1; font-family: monospace;';
        errorDiv.innerHTML = '<strong>✨ Gentle Hint:</strong> ' + error.message;
        document.body.appendChild(errorDiv);
      }
    })();
  </script>
</body>
</html>`;

    // Write to iframe
    doc.open();
    doc.write(fullHTML);
    doc.close();
  }, [html, css, javascript, executionKey]); // Only re-execute when executionKey changes

  return (
    <Card className="glass-strong rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <Badge 
          variant="outline" 
          className="bg-success/20 text-success-foreground border-success/30 font-mono text-xs uppercase tracking-wider"
        >
          Live Preview
        </Badge>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3 h-3" />
          <span>Click Run to execute</span>
        </div>
      </div>
      <div className="flex-1 bg-white">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          sandbox="allow-scripts allow-modals"
          className="w-full h-full border-0"
        />
      </div>
    </Card>
  );
}
