import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Heart, FileText, BarChart3, Table2, BookOpen } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useState, useMemo } from "react";
import Pagination from "@/components/Pagination";

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para visualizar todos os itens marcados como favoritos
 * - Filtro por tipo de item
 * - Paginação para melhor organização
 */

const ITEMS_PER_PAGE = 10;

const typeConfig = {
  tema: { icon: BookOpen, label: "Tema", color: "text-blue-400" },
  artigo: { icon: FileText, label: "Artigo", color: "text-purple-400" },
  grafico: { icon: BarChart3, label: "Gráfico", color: "text-green-400" },
  tabela: { icon: Table2, label: "Tabela", color: "text-orange-400" },
};

export default function Favoritos() {
  const { favorites, removeFavorite } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filtrar por tipo
  const filteredFavorites = useMemo(() => {
    if (!selectedType) return favorites;
    return favorites.filter((f) => f.type === selectedType);
  }, [favorites, selectedType]);

  // Paginação
  const totalPages = Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE);
  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-900/30 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-400 fill-red-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meus Favoritos
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Acesse rapidamente seus itens favoritos
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {favorites.length === 0 ? (
            <Card className="bg-card border-amber-900/30">
              <CardContent className="py-16 text-center">
                <Heart className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 text-lg">Nenhum favorito adicionado ainda</p>
                <p className="text-gray-500 text-sm mt-2">
                  Clique no ícone de coração em qualquer item para adicioná-lo aos favoritos
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Filtros por Tipo */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => {
                    setSelectedType(null);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === null
                      ? "bg-amber-600 text-black"
                      : "bg-amber-900/20 text-amber-400 hover:bg-amber-900/30"
                  }`}
                >
                  Todos ({favorites.length})
                </button>

                {Object.entries(typeConfig).map(([type, config]) => {
                  const Icon = config.icon;
                  const count = favorites.filter((f) => f.type === type).length;
                  if (count === 0) return null;

                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                        selectedType === type
                          ? "bg-amber-600 text-black"
                          : "bg-amber-900/20 text-amber-400 hover:bg-amber-900/30"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {config.label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Lista de Favoritos */}
              <div className="space-y-4">
                {paginatedFavorites.length === 0 ? (
                  <Card className="bg-card border-amber-900/30">
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-400">Nenhum favorito nesta categoria</p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="grid gap-4">
                      {paginatedFavorites.map((favorite) => {
                        const config = typeConfig[favorite.type as keyof typeof typeConfig];
                        const Icon = config.icon;

                        return (
                          <Card
                            key={`${favorite.id}-${favorite.type}`}
                            className="bg-card border-amber-900/30 hover:border-amber-400/50 hover:shadow-lg transition-all"
                          >
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 bg-amber-900/20 border border-amber-900/50 rounded text-xs ${config.color}`}>
                                      <Icon className="w-3 h-3" />
                                      {config.label}
                                    </span>
                                  </div>
                                  <CardTitle className="text-amber-400">{favorite.titulo}</CardTitle>
                                  <CardDescription className="text-gray-400">{favorite.descricao}</CardDescription>
                                </div>
                                <button
                                  onClick={() => removeFavorite(favorite.id, favorite.type)}
                                  className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                                  title="Remover dos favoritos"
                                >
                                  <X className="w-5 h-5 text-red-400" />
                                </button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-400">Adicionado em: {favorite.dataAdicionado}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Paginação */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
