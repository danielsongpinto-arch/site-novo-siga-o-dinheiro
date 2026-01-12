import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 bg-amber-900/20 border-amber-700/30 hover:bg-amber-900/40"
        >
          {theme === 'light' && <Sun className="w-4 h-4 text-amber-400" />}
          {theme === 'dark' && <Moon className="w-4 h-4 text-amber-400" />}
          {theme === 'system' && <Monitor className="w-4 h-4 text-amber-400" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/95 border-amber-700/30">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="cursor-pointer text-gray-300 hover:text-amber-400 hover:bg-amber-900/20"
        >
          <Sun className="w-4 h-4 mr-2" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="cursor-pointer text-gray-300 hover:text-amber-400 hover:bg-amber-900/20"
        >
          <Moon className="w-4 h-4 mr-2" />
          <span>Escuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="cursor-pointer text-gray-300 hover:text-amber-400 hover:bg-amber-900/20"
        >
          <Monitor className="w-4 h-4 mr-2" />
          <span>Automático</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
