import { useRoute } from 'wouter';
import { Card } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { useContent } from '@/contexts/ContentContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useComments } from '@/contexts/CommentsContext';
import { useBadges } from '@/contexts/BadgesContext';
import BadgesDisplay from '@/components/BadgesDisplay';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function PerfilPublico() {
  const [match, params] = useRoute('/perfil-publico/:userId');
  const { favorites } = useFavorites();
  const { comments } = useComments();
  const { badges } = useBadges();
  const [copied, setCopied] = useState(false);

  // Extrair ID do usuário da URL (ex: /perfil-publico/user123)
  const userId = match ? (params as any)?.userId || 'usuario-anonimo' : 'usuario-anonimo';

  // Simular dados do usuário (em produção, viria de um backend)
  const userData = {
    id: userId,
    nome: `Usuário ${userId}`,
    descricao: 'Entusiasta de história e análise financeira',
    dataJuncao: new Date().toLocaleDateString('pt-BR'),
    favoritos: favorites.length,
    comentarios: comments.length,
    badges: badges.filter(b => b.desbloqueado).length,
  };

  const handleShare = () => {
    const url = `${window.location.origin}/perfil-publico/${userId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSocial = (platform: string) => {
    const url = `${window.location.origin}/perfil-publico/${userId}`;
    const text = `Confira meu perfil no Siga o Dinheiro!`;
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header do Perfil */}
        <div className="bg-gradient-to-r from-amber-900/30 to-red-900/30 rounded-lg p-8 mb-8 border border-amber-700/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-amber-400 mb-2">{userData.nome}</h1>
              <p className="text-gray-400">{userData.descricao}</p>
              <p className="text-sm text-gray-500 mt-2">Membro desde {userData.dataJuncao}</p>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-amber-900/30 hover:bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-400 transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Link'}
            </button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-black/50 border-amber-700/30 p-4">
              <p className="text-gray-400 text-sm mb-1">Favoritos</p>
              <p className="text-2xl font-bold text-amber-400">{userData.favoritos}</p>
            </Card>
            <Card className="bg-black/50 border-amber-700/30 p-4">
              <p className="text-gray-400 text-sm mb-1">Comentários</p>
              <p className="text-2xl font-bold text-amber-400">{userData.comentarios}</p>
            </Card>
            <Card className="bg-black/50 border-amber-700/30 p-4">
              <p className="text-gray-400 text-sm mb-1">Badges</p>
              <p className="text-2xl font-bold text-amber-400">{userData.badges}</p>
            </Card>
          </div>
        </div>

        {/* Badges */}
        <Card className="bg-black/50 border-amber-700/30 p-6 mb-8">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Conquistas</h2>
          <BadgesDisplay />
        </Card>

        {/* Botões de Compartilhamento Social */}
        <Card className="bg-black/50 border-amber-700/30 p-6 mb-8">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Compartilhar Perfil</h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleShareSocial('twitter')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50 rounded-lg text-blue-400 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={() => handleShareSocial('facebook')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50 rounded-lg text-blue-400 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Facebook
            </button>
            <button
              onClick={() => handleShareSocial('linkedin')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/50 rounded-lg text-blue-400 transition-all"
            >
              <Share2 className="w-4 h-4" />
              LinkedIn
            </button>
          </div>
        </Card>

        {/* Informações Adicionais */}
        <Card className="bg-black/50 border-amber-700/30 p-6">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Sobre Este Perfil</h2>
          <p className="text-gray-400 mb-4">
            Este é um perfil público no Siga o Dinheiro. Os usuários podem compartilhar seus perfis para mostrar suas contribuições e conquistas na comunidade.
          </p>
          <p className="text-gray-500 text-sm">
            URL do Perfil: {window.location.origin}/perfil-publico/{userId}
          </p>
        </Card>
      </div>
    </div>
  );
}
