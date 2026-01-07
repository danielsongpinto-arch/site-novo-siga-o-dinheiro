import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Tag } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { useContent, Artigo } from "@/contexts/ContentContext";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para gerenciar artigos educativos
 * - Upload de documentos para adicionar novos artigos
 * - Filtros avançados, categorias e paginação
 */

const CATEGORIAS_ARTIGO = [
  "Análise Econômica",
  "Documentos Históricos",
  "Operações Militares",
  "Impacto Social",
  "Recuperação de Bens",
];

const ITEMS_PER_PAGE = 10;

export default function Artigos() {
  const { artigos, addArtigo, removeArtigo } = useContent();
  const [novoArtigo, setNovoArtigo] = useState({
    titulo: "",
    autor: "",
    resumo: "",
    categoria: CATEGORIAS_ARTIGO[0],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    searchTerm: string;
    dateFrom?: string;
    dateTo?: string;
    type?: string;
  }>({
    searchTerm: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Aplicar filtros
  const filteredArtigos = useMemo(() => {
    let result = artigos;

    if (filters.searchTerm) {
      result = result.filter(
        (a) =>
          a.titulo.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          a.resumo.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          a.autor.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.type) {
      result = result.filter((a) => a.categoria === filters.type);
    }

    if (filters.dateFrom) {
      result = result.filter((a) => a.dataAdicionado >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      result = result.filter((a) => a.dataAdicionado <= filters.dateTo!);
    }

    return result;
  }, [artigos, filters]);

  // Paginação
  const totalPages = Math.ceil(filteredArtigos.length / ITEMS_PER_PAGE);
  const paginatedArtigos = filteredArtigos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAdicionarArtigo = () => {
    if (novoArtigo.titulo.trim() && novoArtigo.autor.trim() && novoArtigo.resumo.trim()) {
      const artigo: Artigo = {
        id: Date.now().toString(),
        titulo: novoArtigo.titulo,
        autor: novoArtigo.autor,
        resumo: novoArtigo.resumo,
        conteudo: novoArtigo.resumo,
        categoria: novoArtigo.categoria,
        dataAdicionado: new Date().toISOString().split("T")[0],
      };
      addArtigo(artigo);
      setNovoArtigo({
        titulo: "",
        autor: "",
        resumo: "",
        categoria: CATEGORIAS_ARTIGO[0],
      });
      setCurrentPage(1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const artigo: Artigo = {
          id: Date.now().toString(),
          titulo: file.name.replace(/\.[^/.]+$/, ""),
          autor: "Importado",
          resumo: `Importado de: ${file.name}`,
          conteudo: content,
          categoria: CATEGORIAS_ARTIGO[0],
          dataAdicionado: new Date().toISOString().split("T")[0],
        };
        addArtigo(artigo);
        setCurrentPage(1);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-900/30 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            Artigos
          </h1>
          <p className="text-gray-300 text-lg">
            Leia artigos e análises sobre o sistema financeiro de saque nazista
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Upload Section */}
          <Card className="bg-card border-amber-900/30 mb-12">
            <CardHeader>
              <CardTitle className="text-amber-400">Adicionar Novo Artigo</CardTitle>
              <CardDescription className="text-gray-400">
                Adicione artigos manualmente ou faça upload de documentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Manual Input */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título do Artigo
                    </label>
                    <input
                      type="text"
                      value={novoArtigo.titulo}
                      onChange={(e) => setNovoArtigo({ ...novoArtigo, titulo: e.target.value })}
                      placeholder="Ex: A Economia de Guerra Nazista"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Autor
                    </label>
                    <input
                      type="text"
                      value={novoArtigo.autor}
                      onChange={(e) => setNovoArtigo({ ...novoArtigo, autor: e.target.value })}
                      placeholder="Ex: Dr. João Silva"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resumo
                    </label>
                    <textarea
                      value={novoArtigo.resumo}
                      onChange={(e) => setNovoArtigo({ ...novoArtigo, resumo: e.target.value })}
                      placeholder="Escreva um resumo do artigo..."
                      rows={3}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Categoria
                    </label>
                    <select
                      value={novoArtigo.categoria}
                      onChange={(e) => setNovoArtigo({ ...novoArtigo, categoria: e.target.value })}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {CATEGORIAS_ARTIGO.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button
                  onClick={handleAdicionarArtigo}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                >
                  Adicionar Artigo
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-gray-400">ou</span>
                </div>
              </div>

              {/* File Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-900/50 rounded-lg p-8 text-center cursor-pointer hover:border-amber-400/50 hover:bg-amber-900/10 transition-all"
              >
                <Upload className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <p className="text-gray-300 font-medium mb-1">Clique para fazer upload</p>
                <p className="text-gray-500 text-sm">ou arraste um arquivo aqui</p>
                <p className="text-gray-600 text-xs mt-2">Suporta: TXT, PDF, DOCX</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <FilterBar
            onFilter={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
            types={CATEGORIAS_ARTIGO}
          />

          {/* Artigos List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                Artigos Adicionados
              </h2>
              <span className="text-sm text-gray-400">
                {filteredArtigos.length} artigo{filteredArtigos.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredArtigos.length === 0 ? (
              <Card className="bg-card border-amber-900/30">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-400">
                    {artigos.length === 0
                      ? "Nenhum artigo adicionado ainda. Comece adicionando um!"
                      : "Nenhum artigo encontrado com esses filtros."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-4">
                  {paginatedArtigos.map((artigo) => (
                    <Card key={artigo.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {artigo.categoria && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-900/20 border border-amber-900/50 rounded text-xs text-amber-400">
                                  <Tag className="w-3 h-3" />
                                  {artigo.categoria}
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-amber-400">{artigo.titulo}</CardTitle>
                            <CardDescription className="text-gray-400 mt-1">
                              Por {artigo.autor}
                            </CardDescription>
                          </div>
                          <button
                            onClick={() => removeArtigo(artigo.id)}
                            className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5 text-red-400" />
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-3">{artigo.resumo}</p>
                        <p className="text-sm text-gray-400">Adicionado em: {artigo.dataAdicionado}</p>
                      </CardContent>
                    </Card>
                  ))}
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
        </div>
      </section>
    </div>
  );
}
