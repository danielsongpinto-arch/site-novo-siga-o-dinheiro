import { useContent } from "@/contexts/ContentContext";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/**
 * Design Philosophy: Dark Historical Archive
 * - Barra de busca global que pesquisa em todos os conteúdos
 * - Exibe resultados em tempo real
 */

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { searchContent } = useContent();

  const results = query.trim() ? searchContent(query) : { temas: [], artigos: [], graficos: [], tabelas: [] };
  const totalResults = results.temas.length + results.artigos.length + results.graficos.length + results.tabelas.length;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-lg focus-within:ring-2 focus-within:ring-amber-400">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar temas, artigos, gráficos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="flex-1 bg-transparent outline-none text-foreground placeholder-gray-500 text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="p-1 hover:bg-amber-900/20 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-amber-900/30 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {totalResults === 0 ? (
            <div className="p-4 text-center text-gray-400">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : (
            <div>
              {/* Temas */}
              {results.temas.length > 0 && (
                <div className="border-b border-amber-900/30">
                  <div className="px-4 py-2 text-xs font-semibold text-amber-400 bg-black/20">
                    TEMAS ({results.temas.length})
                  </div>
                  {results.temas.map((tema) => (
                    <Link
                      key={tema.id}
                      href={`/temas/${tema.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="block px-4 py-2 text-sm text-gray-300 hover:bg-amber-900/20 transition-colors">
                        {tema.titulo}
                      </a>
                    </Link>
                  ))}
                </div>
              )}

              {/* Artigos */}
              {results.artigos.length > 0 && (
                <div className="border-b border-amber-900/30">
                  <div className="px-4 py-2 text-xs font-semibold text-amber-400 bg-black/20">
                    ARTIGOS ({results.artigos.length})
                  </div>
                  {results.artigos.map((artigo) => (
                    <Link
                      key={artigo.id}
                      href={`/artigos/${artigo.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="block px-4 py-2 text-sm text-gray-300 hover:bg-amber-900/20 transition-colors">
                        {artigo.titulo}
                      </a>
                    </Link>
                  ))}
                </div>
              )}

              {/* Gráficos */}
              {results.graficos.length > 0 && (
                <div className="border-b border-amber-900/30">
                  <div className="px-4 py-2 text-xs font-semibold text-amber-400 bg-black/20">
                    GRÁFICOS ({results.graficos.length})
                  </div>
                  {results.graficos.map((grafico) => (
                    <Link
                      key={grafico.id}
                      href={`/graficos/${grafico.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="block px-4 py-2 text-sm text-gray-300 hover:bg-amber-900/20 transition-colors">
                        {grafico.titulo}
                      </a>
                    </Link>
                  ))}
                </div>
              )}

              {/* Tabelas */}
              {results.tabelas.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-amber-400 bg-black/20">
                    TABELAS ({results.tabelas.length})
                  </div>
                  {results.tabelas.map((tabela) => (
                    <Link
                      key={tabela.id}
                      href={`/tabelas/${tabela.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="block px-4 py-2 text-sm text-gray-300 hover:bg-amber-900/20 transition-colors">
                        {tabela.titulo}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
