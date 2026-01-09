import { useContent } from "@/contexts/ContentContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useComments } from "@/contexts/CommentsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Heart, MessageCircle, Eye } from "lucide-react";
import { useMemo } from "react";

/**
 * Design Philosophy: Dark Historical Archive
 * - Página de Trending mostrando itens mais populares
 * - Baseado em visualizações, comentários e favoritos
 */

export default function Trending() {
  const { temas, artigos, graficos, tabelas } = useContent();
  const { favorites } = useFavorites();
  const { comments } = useComments();

  // Calcular pontuação de popularidade
  const calculateScore = (itemId: string) => {
    const favCount = favorites.filter((f: any) => f.id === itemId).length;
    const commentCount = comments.filter((c: any) => c.itemId === itemId).length;
    // Simulando visualizações (em um app real, seria rastreado)
    const views = Math.floor(Math.random() * 1000);
    return favCount * 3 + commentCount * 2 + views * 0.1;
  };

  // Combinar todos os itens com score
  const trendingItems = useMemo(() => {
    const allItems = [
      ...temas.map((t) => ({
        id: t.id,
        titulo: t.titulo,
        tipo: "Tema",
        descricao: t.descricao,
        score: calculateScore(t.id),
      })),
      ...artigos.map((a) => ({
        id: a.id,
        titulo: a.titulo,
        tipo: "Artigo",
        descricao: a.resumo,
        score: calculateScore(a.id),
      })),
      ...graficos.map((g) => ({
        id: g.id,
        titulo: g.titulo,
        tipo: "Gráfico",
        descricao: g.descricao,
        score: calculateScore(g.id),
      })),
      ...tabelas.map((t) => ({
        id: t.id,
        titulo: t.titulo,
        tipo: "Tabela",
        descricao: t.descricao,
        score: calculateScore(t.id),
      })),
    ];

    return allItems.sort((a, b) => b.score - a.score).slice(0, 20);
  }, [temas, artigos, graficos, tabelas, favorites, comments]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-900/30 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trending
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Os conteúdos mais populares desta semana
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {trendingItems.length === 0 ? (
            <Card className="bg-card border-amber-900/30">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">Nenhum conteúdo popular ainda. Comece a adicionar!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {trendingItems.map((item, index) => (
                <Card key={item.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-amber-400 w-8 h-8 flex items-center justify-center bg-amber-900/20 rounded-full">
                            #{index + 1}
                          </span>
                          <span className="px-3 py-1 bg-amber-900/20 text-amber-400 rounded-full text-xs font-semibold">
                            {item.tipo}
                          </span>
                        </div>
                        <CardTitle className="text-amber-400 text-xl">
                          {item.titulo}
                        </CardTitle>
                        <CardDescription className="text-gray-400 mt-2">
                          {item.descricao}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{favorites.filter((f: any) => f.id === item.id).length} Favoritos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                        <span>{comments.filter((c: any) => c.itemId === item.id).length} Comentários</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-green-400" />
                        <span>{Math.floor(item.score * 10)} Pontos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
