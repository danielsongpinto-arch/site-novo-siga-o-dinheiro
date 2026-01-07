import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Download, Tag } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { useContent, Tabela } from "@/contexts/ContentContext";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { useExport } from "@/hooks/useExport";

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para gerenciar tabelas de dados
 * - Upload de arquivos CSV para adicionar novas tabelas
 * - Filtros avançados, categorias e paginação
 */

const CATEGORIAS_TABELA = [
  "Dados Econômicos",
  "Estatísticas Militares",
  "Países Ocupados",
  "Recursos Saqueados",
  "Cronologia",
];

const ITEMS_PER_PAGE = 10;

export default function Tabelas() {
  const { tabelas, addTabela, removeTabela } = useContent();
  const { exportTableToCSV } = useExport();
  const [novaTabela, setNovaTabela] = useState({
    titulo: "",
    descricao: "",
    categoria: CATEGORIAS_TABELA[0],
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
  const filteredTabelas = useMemo(() => {
    let result = tabelas;

    if (filters.searchTerm) {
      result = result.filter(
        (t) =>
          t.titulo.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          t.descricao.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.type) {
      result = result.filter((t) => t.categoria === filters.type);
    }

    if (filters.dateFrom) {
      result = result.filter((t) => t.dataAdicionado >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      result = result.filter((t) => t.dataAdicionado <= filters.dateTo!);
    }

    return result;
  }, [tabelas, filters]);

  // Paginação
  const totalPages = Math.ceil(filteredTabelas.length / ITEMS_PER_PAGE);
  const paginatedTabelas = filteredTabelas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAdicionarTabela = () => {
    if (novaTabela.titulo.trim() && novaTabela.descricao.trim()) {
      const tabela: Tabela = {
        id: Date.now().toString(),
        titulo: novaTabela.titulo,
        descricao: novaTabela.descricao,
        categoria: novaTabela.categoria,
        colunas: ["Coluna 1", "Coluna 2", "Coluna 3"],
        dados: [["Dado 1", "Dado 2", "Dado 3"]],
        dataAdicionado: new Date().toISOString().split("T")[0],
      };
      addTabela(tabela);
      setNovaTabela({
        titulo: "",
        descricao: "",
        categoria: CATEGORIAS_TABELA[0],
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
        const linhas = content.split("\n").filter((l) => l.trim());
        const colunas = linhas[0]?.split(",") || [];
        const dados = linhas.slice(1).map((l) => l.split(","));

        const tabela: Tabela = {
          id: Date.now().toString(),
          titulo: file.name.replace(/\.[^/.]+$/, ""),
          descricao: `Importado de: ${file.name}`,
          categoria: CATEGORIAS_TABELA[0],
          colunas,
          dados,
          dataAdicionado: new Date().toISOString().split("T")[0],
        };
        addTabela(tabela);
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
            Tabelas
          </h1>
          <p className="text-gray-300 text-lg">
            Explore dados e estatísticas sobre o sistema financeiro de saque nazista
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Upload Section */}
          <Card className="bg-card border-amber-900/30 mb-12">
            <CardHeader>
              <CardTitle className="text-amber-400">Adicionar Nova Tabela</CardTitle>
              <CardDescription className="text-gray-400">
                Adicione tabelas manualmente ou faça upload de arquivos CSV
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Manual Input */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título da Tabela
                    </label>
                    <input
                      type="text"
                      value={novaTabela.titulo}
                      onChange={(e) => setNovaTabela({ ...novaTabela, titulo: e.target.value })}
                      placeholder="Ex: Ouro Saqueado por País"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Categoria
                    </label>
                    <select
                      value={novaTabela.categoria}
                      onChange={(e) => setNovaTabela({ ...novaTabela, categoria: e.target.value })}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {CATEGORIAS_TABELA.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={novaTabela.descricao}
                    onChange={(e) => setNovaTabela({ ...novaTabela, descricao: e.target.value })}
                    placeholder="Descreva o conteúdo da tabela..."
                    rows={3}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <Button
                  onClick={handleAdicionarTabela}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                >
                  Adicionar Tabela
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
                <p className="text-gray-600 text-xs mt-2">Suporta: CSV</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
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
            types={CATEGORIAS_TABELA}
          />

          {/* Tabelas List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                Tabelas Adicionadas
              </h2>
              <span className="text-sm text-gray-400">
                {filteredTabelas.length} tabela{filteredTabelas.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredTabelas.length === 0 ? (
              <Card className="bg-card border-amber-900/30">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-400">
                    {tabelas.length === 0
                      ? "Nenhuma tabela adicionada ainda. Comece adicionando uma!"
                      : "Nenhuma tabela encontrada com esses filtros."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-4">
                  {paginatedTabelas.map((tabela) => (
                    <Card key={tabela.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {tabela.categoria && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-900/20 border border-amber-900/50 rounded text-xs text-amber-400">
                                  <Tag className="w-3 h-3" />
                                  {tabela.categoria}
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-amber-400">{tabela.titulo}</CardTitle>
                            <CardDescription className="text-gray-400">{tabela.descricao}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => exportTableToCSV(tabela.titulo, tabela.colunas, tabela.dados)}
                              className="p-2 hover:bg-amber-900/20 rounded-lg transition-colors"
                              title="Baixar como CSV"
                            >
                              <Download className="w-5 h-5 text-amber-400" />
                            </button>
                            <button
                              onClick={() => removeTabela(tabela.id)}
                              className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-amber-900/30">
                                {tabela.colunas.map((col, i) => (
                                  <th key={i} className="text-left py-2 px-2 text-amber-400 font-semibold">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tabela.dados.slice(0, 3).map((linha, i) => (
                                <tr key={i} className="border-b border-amber-900/20 hover:bg-amber-900/10">
                                  {linha.map((cel, j) => (
                                    <td key={j} className="py-2 px-2 text-gray-300">
                                      {cel}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {tabela.dados.length > 3 && (
                            <p className="text-xs text-gray-400 mt-2">
                              ... e mais {tabela.dados.length - 3} linha{tabela.dados.length - 3 !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-3">Adicionado em: {tabela.dataAdicionado}</p>
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
