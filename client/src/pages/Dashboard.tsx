import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useContent } from "@/contexts/ContentContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useComments } from "@/contexts/CommentsContext";
import { BookOpen, FileText, BarChart3, Table2, Heart, MessageCircle } from "lucide-react";
import { useMemo } from "react";

/**
 * Design Philosophy: Dark Historical Archive
 * - Dashboard com estatísticas e análises
 * - Gráficos interativos mostrando distribuição de conteúdo
 * - Informações sobre favoritos e comentários
 */

const COLORS = ["#d4af37", "#8b6f47", "#5a4a3a", "#3d3d3d"];

export default function Dashboard() {
  const { temas, artigos, graficos, tabelas } = useContent();
  const { favorites } = useFavorites();
  const { comments } = useComments();

  // Dados para gráfico de distribuição
  const distributionData = useMemo(() => [
    { name: "Temas", value: temas.length, icon: BookOpen },
    { name: "Artigos", value: artigos.length, icon: FileText },
    { name: "Gráficos", value: graficos.length, icon: BarChart3 },
    { name: "Tabelas", value: tabelas.length, icon: Table2 },
  ], [temas, artigos, graficos, tabelas]);

  // Dados para gráfico de categorias
  const categoryData = useMemo(() => {
    const allItems = [
      ...temas.map((t) => t.categoria || "Sem categoria"),
      ...artigos.map((a) => a.categoria || "Sem categoria"),
      ...graficos.map((g) => g.tipo || "Sem tipo"),
      ...tabelas.map((t) => t.categoria || "Sem categoria"),
    ];

    const categoryCount: Record<string, number> = {};
    allItems.forEach((cat) => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [temas, artigos, graficos, tabelas]);

  // Dados para gráfico de favoritos
  const favoritesData = useMemo(() => {
    const typeCount: Record<string, number> = {
      Tema: 0,
      Artigo: 0,
      Gráfico: 0,
      Tabela: 0,
    };

    favorites.forEach((fav) => {
      if (fav.type === "tema") typeCount["Tema"]++;
      else if (fav.type === "artigo") typeCount["Artigo"]++;
      else if (fav.type === "grafico") typeCount["Gráfico"]++;
      else if (fav.type === "tabela") typeCount["Tabela"]++;
    });

    return Object.entries(typeCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [favorites]);

  // Dados para gráfico de comentários
  const commentsData = useMemo(() => {
    const typeCount: Record<string, number> = {
      Tema: 0,
      Artigo: 0,
      Gráfico: 0,
      Tabela: 0,
    };

    comments.forEach((comment) => {
      if (comment.itemType === "tema") typeCount["Tema"]++;
      else if (comment.itemType === "artigo") typeCount["Artigo"]++;
      else if (comment.itemType === "grafico") typeCount["Gráfico"]++;
      else if (comment.itemType === "tabela") typeCount["Tabela"]++;
    });

    return Object.entries(typeCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [comments]);

  const totalItems = temas.length + artigos.length + graficos.length + tabelas.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-900/30 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Estatísticas e análises do conteúdo
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Cards de Resumo */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card border-amber-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total de Itens</p>
                    <p className="text-3xl font-bold text-amber-400 mt-2">{totalItems}</p>
                  </div>
                  <div className="p-3 bg-amber-900/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-amber-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Favoritos</p>
                    <p className="text-3xl font-bold text-red-400 mt-2">{favorites.length}</p>
                  </div>
                  <div className="p-3 bg-red-900/20 rounded-lg">
                    <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-amber-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Comentários</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">{comments.length}</p>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-amber-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Categorias</p>
                    <p className="text-3xl font-bold text-purple-400 mt-2">{categoryData.length}</p>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Distribuição de Conteúdo */}
            <Card className="bg-card border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">Distribuição de Conteúdo</CardTitle>
                <CardDescription className="text-gray-400">
                  Quantidade de itens por tipo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Favoritos por Tipo */}
            <Card className="bg-card border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">Favoritos por Tipo</CardTitle>
                <CardDescription className="text-gray-400">
                  Distribuição de itens favoritos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={favoritesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8b6f47" />
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#d4af37" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Mais Gráficos */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Comentários por Tipo */}
            <Card className="bg-card border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">Comentários por Tipo</CardTitle>
                <CardDescription className="text-gray-400">
                  Distribuição de discussões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={commentsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8b6f47" />
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b6f47" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Categorias */}
            <Card className="bg-card border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">Conteúdo por Categoria</CardTitle>
                <CardDescription className="text-gray-400">
                  Distribuição de itens por categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryData.map((cat, index) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-gray-300">{cat.name}</span>
                      </div>
                      <span className="font-semibold text-amber-400">{cat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
