import { AlertCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'warn' | 'error';
  message: string;
  timestamp: number;
}

interface ConsolePanelProps {
  messages: ConsoleMessage[];
  onClear: () => void;
}

export default function ConsolePanel({ messages, onClear }: ConsolePanelProps) {
  const getMessageIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-error" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Info className="w-4 h-4 text-foreground" />;
    }
  };

  const getMessageStyle = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return 'text-error border-l-error bg-error/5';
      case 'warn':
        return 'text-warning border-l-warning bg-warning/5';
      default:
        return 'text-foreground border-l-muted-foreground bg-muted/20';
    }
  };

  return (
    <Card className="glass-strong rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className="bg-muted/20 text-foreground border-border/30 font-mono text-xs uppercase tracking-wider"
          >
            Console
          </Badge>
          <span className="text-xs text-muted-foreground">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-8 px-2 text-xs"
          disabled={messages.length === 0}
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Clear
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-card/50 p-2 font-mono text-xs">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Console output will appear here</p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 p-2 rounded border-l-2 ${getMessageStyle(msg.type)}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getMessageIcon(msg.type)}
                </div>
                <div className="flex-1 break-words whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
