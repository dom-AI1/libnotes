import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, type ThemeMode } from '../contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: 'light', label: 'Light', icon: Sun },
    { mode: 'dark', label: 'Dark', icon: Moon },
    { mode: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] text-[#24332D] dark:text-[#E8EEE9] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] transition-colors flex items-center justify-center cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#486B54] dark:focus-visible:ring-[#A8C5AD]"
        title={`Theme: ${theme} (${resolvedTheme})`}
        aria-label="Select theme mode"
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 text-[#A8C5AD]" />
        ) : (
          <Sun className="w-4 h-4 text-[#486B54]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setTheme(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#E5EDE5] dark:bg-[#2D3A32] text-[#24332D] dark:text-[#E8EEE9] font-semibold'
                    : 'text-[#647168] dark:text-[#B2BDB5] hover:bg-[#F4F5F2] dark:hover:bg-[#1F2622] hover:text-[#24332D] dark:hover:text-[#E8EEE9]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#486B54] dark:text-[#A8C5AD]' : ''}`} />
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#486B54] dark:bg-[#A8C5AD]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
