import { navigationItems } from "@/lib/navigation";
import { BookOpen, BarChart3, FileText, Home, Menu, Table, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const iconMap = {
  Home,
  BookOpen,
  FileText,
  BarChart3,
  Table,
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-amber-900/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
              <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Siga o Dinheiro
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-amber-400 hover:bg-amber-900/20 transition-all">
                  {getIcon(item.icon)}
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-amber-900/20 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-amber-400" />
            ) : (
              <Menu className="w-6 h-6 text-amber-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-amber-400 hover:bg-amber-900/20 transition-all"
                >
                  {getIcon(item.icon)}
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
