import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  className?: string;
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Botões de compartilhamento para redes sociais
 * - Suporte para Facebook, Twitter, LinkedIn, Email e cópia de link
 */

export default function ShareButtons({
  title,
  url = typeof window !== "undefined" ? window.location.href : "",
  description = "Confira este conteúdo no Siga o Dinheiro",
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
  };

  const buttons = [
    {
      name: "Facebook",
      icon: Facebook,
      link: shareLinks.facebook,
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: shareLinks.twitter,
      color: "hover:text-sky-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: shareLinks.linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      icon: Mail,
      link: shareLinks.email,
      color: "hover:text-amber-400",
    },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <Share2 className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-400">Compartilhar:</span>
      </div>

      <div className="flex gap-2">
        {buttons.map((button) => {
          const Icon = button.icon;
          return (
            <a
              key={button.name}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              title={`Compartilhar no ${button.name}`}
              className={`p-2 rounded-lg bg-amber-900/10 border border-amber-900/30 transition-all ${button.color} hover:bg-amber-900/20 hover:border-amber-900/50`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}

        {/* Botão de Copiar Link */}
        <button
          onClick={handleCopyLink}
          title="Copiar link"
          className={`p-2 rounded-lg bg-amber-900/10 border border-amber-900/30 transition-all ${
            copied ? "text-green-400 border-green-400/50" : "hover:text-amber-400 hover:bg-amber-900/20 hover:border-amber-900/50"
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
