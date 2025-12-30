import { AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface LivePreviewProps {
  html: string;
  css: string;
  javascript: string;
}

export default function LivePreview({ html, css, javascript }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Create the complete HTML document
    const document = `
      <!DOCTYPE html>
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
          // Wrap user code in try-catch for friendly error handling
          try {
            ${javascript}
          } catch (error) {
            console.error('✨ Oops! There seems to be a small issue:', error.message);
            document.body.innerHTML += '<div style="background: rgba(255, 182, 193, 0.1); border: 1px solid rgba(255, 182, 193, 0.3); border-radius: 8px; padding: 16px; margin: 16px 0; color: #ffb6c1; font-family: monospace;"><strong>✨ Gentle Hint:</strong> ' + error.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;

    // Write to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(document);
      iframeDoc.close();
    }
  }, [html, css, javascript]);

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
          <span>Updates automatically</span>
        </div>
      </div>
      <div className="flex-1 bg-white">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          sandbox="allow-scripts"
          className="w-full h-full border-0"
        />
      </div>
    </Card>
  );
}
