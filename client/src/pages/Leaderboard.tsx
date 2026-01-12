import { useNewsletter } from '@/contexts/NewsletterContext';
import { useContent } from '@/contexts/ContentContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const { getTopVoted } = useNewsletter();
  const { temas, artigos } = useContent();

  const topVoted = getTopVoted(undefined, 10);

  const getItemDetails = (itemId: string, itemType: string) => {
    if (itemType === 'tema') {
      return temas.find(t => t.id === itemId);
    } else if (itemType === 'artigo') {
      return artigos.find(a => a.id === itemId);
    }
    return null;
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-amber-400 font-bold">{position + 1}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-400">Leaderboard de Votação</h1>
          </div>
          <p className="text-gray-300">Os artigos e temas mais votados pela comunidade</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {topVoted.length === 0 ? (
          <Card className="bg-card text-card-foreground p-8 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhum voto ainda. Comece votando em seus artigos favoritos!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {topVoted.map((vote, index) => {
              const item = getItemDetails(vote.itemId, vote.itemType);
              if (!item) return null;

              return (
                <Card
                  key={vote.id}
                  className="bg-card text-card-foreground p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getMedalIcon(index)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-amber-400">
                            {'titulo' in item ? item.titulo : 'Sem título'}
                          </h3>
                          <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-700 mt-2">
                            {vote.itemType}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-amber-400">{vote.voteCount}</div>
                          <div className="text-xs text-muted-foreground">votos</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {'descricao' in item ? item.descricao : 'resumo' in item ? item.resumo : 'Sem descrição'}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-amber-900/20 border border-amber-700/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-amber-400 mb-4">Como funciona o Leaderboard?</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>✓ Cada voto em um artigo ou tema aumenta sua posição no ranking</li>
            <li>✓ O leaderboard é atualizado em tempo real conforme novos votos chegam</li>
            <li>✓ Os top 3 recebem medalhas especiais (Ouro, Prata, Bronze)</li>
            <li>✓ Compartilhe seus artigos favoritos para que mais pessoas votem neles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
