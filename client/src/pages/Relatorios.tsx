import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, X, CheckCircle2, Circle } from "lucide-react";
import { useContent, Tema, Artigo, Grafico, Tabela } from "@/contexts/ContentContext";
import { usePDFReport } from "@/hooks/usePDFReport";
import { useState } from "react";

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para criar relatórios personalizados
 * - Seleção de múltiplos itens de diferentes seções
 * - Geração de PDF com conteúdo selecionado
 */

interface SelectedItem {
  id: string;
  type: "tema" | "artigo" | "grafico" | "tabela";
  titulo: string;
  data: Tema | Artigo | Grafico | Tabela;
}

export default function Relatorios() {
  const { temas, artigos, graficos, tabelas } = useContent();
  const { generateReport } = usePDFReport();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [reportTitle, setReportTitle] = useState("Relatório - Siga o Dinheiro");

  const toggleItem = (id: string, type: string, titulo: string, data: any) => {
    const exists = selectedItems.find((item) => item.id === id && item.type === type);
    if (exists) {
      setSelectedItems(selectedItems.filter((item) => !(item.id === id && item.type === type)));
    } else {
      setSelectedItems([
        ...selectedItems,
        { id, type: type as any, titulo, data },
      ]);
    }
  };

  const isSelected = (id: string, type: string) => {
    return selectedItems.some((item) => item.id === id && item.type === type);
  };

  const handleGenerateReport = () => {
    if (selectedItems.length === 0) {
      alert("Selecione pelo menos um item para gerar o relatório");
      return;
    }
    generateReport(selectedItems, reportTitle);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-900/30 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
              Gerar Relatório
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Crie relatórios personalizados combinando temas, artigos, gráficos e tabelas
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Seleção de Itens */}
            <div className="lg:col-span-2 space-y-6">
              {/* Temas */}
              {temas.length > 0 && (
                <Card className="bg-card border-amber-900/30">
                  <CardHeader>
                    <CardTitle className="text-amber-400">Temas</CardTitle>
                    <CardDescription className="text-gray-400">
                      {temas.length} tema{temas.length !== 1 ? "s" : ""} disponível{temas.length !== 1 ? "is" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {temas.map((tema) => (
                      <button
                        key={tema.id}
                        onClick={() => toggleItem(tema.id, "tema", tema.titulo, tema)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isSelected(tema.id, "tema")
                            ? "bg-blue-900/20 border-blue-400/50"
                            : "bg-amber-900/10 border-amber-900/30 hover:border-amber-900/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isSelected(tema.id, "tema") ? (
                            <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-amber-400 truncate">{tema.titulo}</p>
                            <p className="text-sm text-gray-400 truncate">{tema.descricao}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Artigos */}
              {artigos.length > 0 && (
                <Card className="bg-card border-amber-900/30">
                  <CardHeader>
                    <CardTitle className="text-amber-400">Artigos</CardTitle>
                    <CardDescription className="text-gray-400">
                      {artigos.length} artigo{artigos.length !== 1 ? "s" : ""} disponível{artigos.length !== 1 ? "is" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {artigos.map((artigo) => (
                      <button
                        key={artigo.id}
                        onClick={() => toggleItem(artigo.id, "artigo", artigo.titulo, artigo)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isSelected(artigo.id, "artigo")
                            ? "bg-purple-900/20 border-purple-400/50"
                            : "bg-amber-900/10 border-amber-900/30 hover:border-amber-900/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isSelected(artigo.id, "artigo") ? (
                            <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-amber-400 truncate">{artigo.titulo}</p>
                            <p className="text-sm text-gray-400 truncate">Por {artigo.autor}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Gráficos */}
              {graficos.length > 0 && (
                <Card className="bg-card border-amber-900/30">
                  <CardHeader>
                    <CardTitle className="text-amber-400">Gráficos</CardTitle>
                    <CardDescription className="text-gray-400">
                      {graficos.length} gráfico{graficos.length !== 1 ? "s" : ""} disponível{graficos.length !== 1 ? "is" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {graficos.map((grafico) => (
                      <button
                        key={grafico.id}
                        onClick={() => toggleItem(grafico.id, "grafico", grafico.titulo, grafico)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isSelected(grafico.id, "grafico")
                            ? "bg-green-900/20 border-green-400/50"
                            : "bg-amber-900/10 border-amber-900/30 hover:border-amber-900/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isSelected(grafico.id, "grafico") ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-amber-400 truncate">{grafico.titulo}</p>
                            <p className="text-sm text-gray-400 truncate">{grafico.descricao}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Tabelas */}
              {tabelas.length > 0 && (
                <Card className="bg-card border-amber-900/30">
                  <CardHeader>
                    <CardTitle className="text-amber-400">Tabelas</CardTitle>
                    <CardDescription className="text-gray-400">
                      {tabelas.length} tabela{tabelas.length !== 1 ? "s" : ""} disponível{tabelas.length !== 1 ? "is" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {tabelas.map((tabela) => (
                      <button
                        key={tabela.id}
                        onClick={() => toggleItem(tabela.id, "tabela", tabela.titulo, tabela)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isSelected(tabela.id, "tabela")
                            ? "bg-orange-900/20 border-orange-400/50"
                            : "bg-amber-900/10 border-amber-900/30 hover:border-amber-900/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isSelected(tabela.id, "tabela") ? (
                            <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-amber-400 truncate">{tabela.titulo}</p>
                            <p className="text-sm text-gray-400 truncate">{tabela.descricao}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Painel de Geração */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-amber-900/30 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-amber-400">Gerar Relatório</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Título do Relatório */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título do Relatório
                    </label>
                    <input
                      type="text"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                  </div>

                  {/* Resumo de Seleção */}
                  <div className="bg-amber-900/10 border border-amber-900/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-amber-400 mb-2">
                      Itens Selecionados: {selectedItems.length}
                    </p>
                    <div className="space-y-1 text-xs text-gray-400">
                      {selectedItems.length === 0 ? (
                        <p>Nenhum item selecionado</p>
                      ) : (
                        selectedItems.map((item) => (
                          <p key={`${item.id}-${item.type}`}>
                            • {item.titulo.substring(0, 25)}...
                          </p>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleGenerateReport}
                      disabled={selectedItems.length === 0}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Gerar PDF
                    </Button>
                    {selectedItems.length > 0 && (
                      <Button
                        onClick={clearSelection}
                        variant="outline"
                        className="w-full"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Limpar Seleção
                      </Button>
                    )}
                  </div>

                  {/* Dica */}
                  <div className="text-xs text-gray-400 p-2 bg-amber-900/10 rounded border border-amber-900/20">
                    💡 Selecione múltiplos itens para criar um relatório personalizado em PDF
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
