import { cn } from '@/lib/utils';

interface EditorTab {
  id: 'html' | 'css' | 'javascript';
  label: string;
  icon?: string;
}

interface EditorTabsProps {
  activeTab: 'html' | 'css' | 'javascript';
  onTabChange: (tab: 'html' | 'css' | 'javascript') => void;
}

const tabs: EditorTab[] = [
  { id: 'html', label: 'HTML', icon: '📄' },
  { id: 'css', label: 'CSS', icon: '🎨' },
  { id: 'javascript', label: 'JS', icon: '⚡' }
];

export default function EditorTabs({ activeTab, onTabChange }: EditorTabsProps) {
  return (
    <div className="flex items-center gap-1 bg-card/50 border-b border-border/50 px-2 py-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative px-4 py-2 rounded-t-lg transition-all duration-200',
            'text-sm font-medium tracking-wide',
            'hover:bg-accent/30',
            activeTab === tab.id
              ? 'bg-card text-white border-b-2 border-primary'
              : 'text-white/70 hover:text-white'
          )}
        >
          <span className="flex items-center gap-2">
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            <span className="text-white">{tab.label}</span>
          </span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
