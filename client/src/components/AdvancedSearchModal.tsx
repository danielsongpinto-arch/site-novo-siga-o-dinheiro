import { useState, useMemo } from "react";
import { X, Search, FileText, BookOpen, BarChart3, Table2 } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { Link } from "wouter";

interface SearchResult {
  id: string;
  type: "tema" | "artigo" | "grafico" | "tabela";
  titulo: string;
  descricao: string;
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const typeConfig = {
  tema: { icon: BookOpen, label: "Tema", color: "text-blue-400" },
  artigo: { icon: FileText, label: "Artigo", color: "text-purple-400" },
  grafico: { icon: BarChart3, label: "Gráfico", color: "text-green-400" },
  tabela: { icon: Table2, label: "Tabela", color: "text-orange-400" },
};

export default function AdvancedSearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: AdvancedSearchModalProps) {
  const { temas, artigos, graficos, tabelas } = useContent();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(
    new Set(["tema", "artigo", "grafico", "tabela"])
  );

  // Combinar todos os itens
  const allItems: SearchResult[] = [
    ...temas.map((t) => ({
      id: t.id,
      type: "tema" as const,
      titulo: t.titulo,
      descricao: t.descricao,
    })),
    ...artigos.map((a) => ({
      id: a.id,
      type: "artigo" as const,
      titulo: a.titulo,
      descricao: a.resumo,
    })),
    ...graficos.map((g) => ({
      id: g.id,
      type: "grafico" as const,
      titulo: g.titulo,
      descricao: g.descricao,
    })),
    ...tabelas.map((t) => ({
      id: t.id,
      type: "tabela" as const,
      titulo: t.titulo,
      descricao: t.descricao,
    })),
  ];

  // Filtrar resultados
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allItems
      .filter(
        (item) =>
          selectedTypes.has(item.type) &&
          (item.titulo.toLowerCase().includes(query) ||
            item.descricao.toLowerCase().includes(query))
      )
      .slice(0, 20); // Limitar a 20 resultados
  }, [searchQuery, selectedTypes, allItems]);

  // Agrupar resultados por tipo
  const groupedResults = useMemo(() => {
    const grouped: Record<string, SearchResult[]> = {};
    searchResults.forEach((result) => {
      if (!grouped[result.type]) {
        grouped[result.type] = [];
      }
      grouped[result.type].push(result);
    });
    return grouped;
  }, [searchResults]);

  const toggleType = (type: string) => {
    const newTypes = new Set(selectedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setSelectedTypes(newTypes);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-card border border-amber-900/30 rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-amber-900/30">
            <h2 className="text-xl font-bold text-amber-400">Busca Global Avançada</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-900/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-amber-400" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-amber-900/30">
            <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
              <Search className="w-5 h-5 text-amber-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise em temas, artigos, gráficos e tabelas..."
                className="flex-1 bg-transparent text-foreground placeholder-gray-500 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 p-4 border-b border-amber-900/30">
            {Object.entries(typeConfig).map(([type, config]) => {
              const Icon = config.icon;
              const count = allItems.filter((i) => i.type === type).length;
              if (count === 0) return null;

              return (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    selectedTypes.has(type)
                      ? "bg-amber-600 text-black"
                      : "bg-amber-900/20 text-amber-400 hover:bg-amber-900/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </button>
              );
            })}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <div className="p-8 text-center text-gray-400">
                Digite algo para começar a buscar
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                Nenhum resultado encontrado para "{searchQuery}"
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {Object.entries(groupedResults).map(([type, results]) => {
                  const config = typeConfig[type as keyof typeof typeConfig];
                  const Icon = config.icon;

                  return (
                    <div key={type}>
                      <h3 className={`text-sm font-semibold ${config.color} mb-2`}>
                        {config.label} ({results.length})
                      </h3>
                      <div className="space-y-2">
                        {results.map((result) => (
                          <Link
                            key={`${result.id}-${result.type}`}
                            href={
                              result.type === "tema"
                                ? `/temas/${result.id}`
                                : `/${result.type === "artigo" ? "artigos" : result.type === "grafico" ? "graficos" : "tabelas"}`
                            }
                            onClick={onClose}
                            className="block p-3 rounded-lg bg-amber-900/10 hover:bg-amber-900/20 border border-amber-900/20 hover:border-amber-900/50 transition-all cursor-pointer"
                          >
                            <div className="flex items-start gap-2">
                              <Icon className={`w-4 h-4 mt-1 ${config.color}`} />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-amber-400 truncate">
                                  {result.titulo}
                                </p>
                                <p className="text-sm text-gray-400 truncate">
                                  {result.descricao}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {searchResults.length > 0 && (
            <div className="p-4 border-t border-amber-900/30 text-sm text-gray-400">
              {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} encontrado{searchResults.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
