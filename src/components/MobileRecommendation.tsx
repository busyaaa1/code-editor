import { Code2, Monitor } from 'lucide-react';
import SakuraBackground from '@/components/SakuraBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function MobileRecommendation() {
  const handleRequestDesktop = () => {
    // Show instructions for enabling desktop mode
    alert(
      'To enable desktop mode:\n\n' +
      '• Chrome/Edge: Tap menu (⋮) → Check "Desktop site"\n' +
      '• Safari: Tap aA → "Request Desktop Website"\n' +
      '• Firefox: Tap menu (⋮) → Check "Desktop site"\n\n' +
      'Then reload the page.'
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Sakura Animation Background */}
      <SakuraBackground enabled={true} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="glass-strong max-w-md w-full p-8 rounded-3xl border-border/50">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative glass rounded-2xl p-6 border border-border/50">
                <Code2 className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-4 gradient-text">
            Busya Code Editor
          </h1>

          {/* Message */}
          <div className="space-y-4 text-center mb-8">
            <p className="text-lg text-foreground/90">
              ✨ Welcome to Busya! ✨
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Busya Code Editor is designed for desktop and laptop computers to provide the best coding experience.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              For a comfortable and fully-featured experience, please access Busya from a PC or laptop.
            </p>
          </div>

          {/* Desktop Icon */}
          <div className="flex justify-center mb-6">
            <div className="glass rounded-xl p-4 border border-border/30">
              <Monitor className="w-12 h-12 text-primary/70" />
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleRequestDesktop}
            className="w-full glass border-border/50 hover:border-primary/50 transition-all"
            variant="outline"
            size="lg"
          >
            <Monitor className="w-5 h-5 mr-2" />
            Request Desktop Site
          </Button>

          {/* Additional Info */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            Tip: Enable "Desktop site" in your mobile browser settings
          </p>
        </Card>
      </div>
    </div>
  );
}
