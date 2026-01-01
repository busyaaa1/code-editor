import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface DialogData {
  type: 'alert' | 'confirm' | 'prompt';
  message: string;
  defaultValue?: string;
  id: string;
}

interface CustomDialogProps {
  dialog: DialogData | null;
  onClose: (result: string | boolean | null) => void;
}

export default function CustomDialog({ dialog, onClose }: CustomDialogProps) {
  const [inputValue, setInputValue] = useState(dialog?.defaultValue || '');

  if (!dialog) return null;

  const handleConfirm = () => {
    if (dialog.type === 'prompt') {
      onClose(inputValue);
    } else {
      onClose(true);
    }
  };

  const handleCancel = () => {
    if (dialog.type === 'prompt') {
      onClose(null);
    } else {
      onClose(false);
    }
  };

  const handleAlertOk = () => {
    onClose(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-strong rounded-2xl p-6 max-w-md w-full border border-border/50 shadow-2xl glow-primary">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {dialog.type === 'alert' && 'Message'}
              {dialog.type === 'confirm' && 'Confirm'}
              {dialog.type === 'prompt' && 'Input Required'}
            </h3>
            <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
              {dialog.message}
            </p>
          </div>
        </div>

        {dialog.type === 'prompt' && (
          <div className="mb-4">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConfirm();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
              className="w-full"
              autoFocus
              placeholder="Enter value..."
            />
          </div>
        )}

        <div className="flex gap-2 justify-end">
          {dialog.type === 'alert' ? (
            <Button
              onClick={handleAlertOk}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              OK
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-border/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                OK
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
