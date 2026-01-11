import { useRecommendations } from '@/contexts/RecommendationsContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

export default function Recomendacoes() {
  const { getRecommendations } = useRecommendations();
  const recommendations = getRecommendations(10);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-400">Recomendações Personalizadas</h1>
          </div>
          <p className="text-gray-300">Conteúdo selecionado especialmente para você baseado no seu histórico de visualizações</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {recommendations.length === 0 ? (
          <Card className="bg-card text-card-foreground p-8 text-center">
            <p className="text-lg text-muted-foreground">
              Explore mais conteúdo para receber recomendações personalizadas!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <Card key={`${rec.type}-${rec.id}`} className="bg-card text-card-foreground p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-amber-400 mb-2">{rec.title}</h3>
                    <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-700">
                      {rec.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-400">{Math.round(rec.score)}</div>
                    <div className="text-xs text-muted-foreground">pontos</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground italic">
                  💡 {rec.reason}
                </p>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-amber-900/20 border border-amber-700/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-amber-400 mb-4">Como funcionam as recomendações?</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>✓ Analisamos os temas e artigos que você visualiza</li>
            <li>✓ Identificamos suas categorias de interesse</li>
            <li>✓ Sugerimos conteúdo relacionado que você ainda não viu</li>
            <li>✓ Aumentamos a relevância com base em seus favoritos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
