import { useComments } from '@/contexts/CommentsContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useBadges } from '@/contexts/BadgesContext';
import { useNewsletter } from '@/contexts/NewsletterContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BadgesDisplay from '@/components/BadgesDisplay';
import { User, MessageSquare, Heart, Trophy, Mail, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Perfil() {
  const [copied, setCopied] = useState(false);
  const userId = 'meu-perfil';
  const { comments } = useComments();
  const { favorites } = useFavorites();
  const { getBadgesDesbloqueados } = useBadges();
  const { subscribers } = useNewsletter();

  const userComments = comments.length;
  const userFavorites = favorites.length;
  const userBadges = getBadgesDesbloqueados().length;
  const isNewsletter = subscribers.some(s => s.email); // Verificar se inscrito

  const stats = [
    {
      label: 'Comentários',
      valor: userComments,
      icone: <MessageSquare className="w-6 h-6" />,
      cor: 'text-blue-400',
    },
    {
      label: 'Favoritos',
      valor: userFavorites,
      icone: <Heart className="w-6 h-6" />,
      cor: 'text-red-400',
    },
    {
      label: 'Conquistas',
      valor: userBadges,
      icone: <Trophy className="w-6 h-6" />,
      cor: 'text-amber-400',
    },
    {
      label: 'Newsletter',
      valor: isNewsletter ? 'Inscrito' : 'Não inscrito',
      icone: <Mail className="w-6 h-6" />,
      cor: 'text-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-amber-600/30 rounded-full flex items-center justify-center border border-amber-600">
              <User className="w-8 h-8 text-amber-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-amber-400">Meu Perfil</h1>
              <p className="text-gray-300">Acompanhe sua atividade e conquistas</p>
            </div>
            <Button
              onClick={() => {
                const url = `${window.location.origin}/perfil-publico/${userId}`;
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 bg-amber-900/30 hover:bg-amber-900/50 border border-amber-700/50 text-amber-400"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Compartilhar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card text-card-foreground p-6 border-amber-700/30">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.cor}`}>{stat.icone}</div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-amber-400">{stat.valor}</p>
            </Card>
          ))}
        </div>

        {/* Badges Section */}
        <Card className="bg-card text-card-foreground p-8 border-amber-700/30 mb-12">
          <BadgesDisplay />
        </Card>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Comments */}
          <Card className="bg-card text-card-foreground p-6 border-amber-700/30">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Atividade Recente</h3>
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum comentário ainda</p>
            ) : (
              <div className="space-y-3">
                {comments.slice(-5).reverse().map((comment) => (
                  <div key={comment.id} className="pb-3 border-b border-amber-700/20 last:border-0">
                    <p className="text-sm text-gray-300 line-clamp-2">{comment.conteudo}</p>
                    <p className="text-xs text-muted-foreground mt-1">{comment.dataCriacao}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Favorites Summary */}
          <Card className="bg-card text-card-foreground p-6 border-amber-700/30">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Favoritos</h3>
            {favorites.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum favorito ainda</p>
            ) : (
              <div className="space-y-3">
                {favorites.slice(-5).map((fav) => (
                  <div key={fav.id} className="pb-3 border-b border-amber-700/20 last:border-0">
                    <p className="text-sm text-gray-300 line-clamp-1">{fav.titulo}</p>
                    <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-700 text-xs mt-1">
                      Favorito
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="bg-amber-900/20 border border-amber-700/30 p-6 mt-12">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">💡 Dicas para Desbloquear Mais Conquistas</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✓ Deixe comentários em artigos que você achar interessantes</li>
            <li>✓ Vote em seus artigos favoritos para ajudá-los a subir no Leaderboard</li>
            <li>✓ Adicione itens aos favoritos para marcar o que você quer ler depois</li>
            <li>✓ Explore todas as páginas do site para desbloquear a badge "Explorador"</li>
            <li>✓ Inscreva-se na newsletter para receber atualizações</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
