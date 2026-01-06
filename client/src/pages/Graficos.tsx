import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface Grafico {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  dados: string;
  dataAdicionado: string;
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para gerenciar gráficos e visualizações
 * - Upload de dados para criar gráficos
 * - Exibição de gráficos já adicionados
 */

export default function Graficos() {
  const [graficos, setGraficos] = useState<Grafico[]>([
    {
      id: "1",
      titulo: "Saque por País (em toneladas de ouro)",
      descricao: "Comparação visual do ouro saqueado de cada país ocupado",
      tipo: "barras",
      dados: "Áustria: 90, Tchecoslováquia: 32, Polônia: 80, França: 400",
      dataAdicionado: "2024-01-06",
    },
    {
      id: "2",
      titulo: "Distribuição de Despesas Militares",
      descricao: "Como os recursos foram gastos entre as diferentes divisões militares",
      tipo: "pizza",
      dados: "Wehrmacht: 40%, Luftwaffe: 25%, Kriegsmarine: 15%, Indústria: 12%, Operações: 8%",
      dataAdicionado: "2024-01-06",
    },
  ]);

  const [novoGrafico, setNovoGrafico] = useState({
    titulo: "",
    descricao: "",
    tipo: "barras",
    dados: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdicionarGrafico = () => {
    if (novoGrafico.titulo.trim() && novoGrafico.dados.trim()) {
      const grafico: Grafico = {
        id: Date.now().toString(),
        titulo: novoGrafico.titulo,
        descricao: novoGrafico.descricao,
        tipo: novoGrafico.tipo,
        dados: novoGrafico.dados,
        dataAdicionado: new Date().toISOString().split("T")[0],
      };
      setGraficos([...graficos, grafico]);
      setNovoGrafico({ titulo: "", descricao: "", tipo: "barras", dados: "" });
    }
  };

  const handleRemoverGrafico = (id: string) => {
    setGraficos(graficos.filter((g) => g.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const grafico: Grafico = {
          id: Date.now().toString(),
          titulo: file.name.replace(/\.[^/.]+$/, ""),
          descricao: `Importado de: ${file.name}`,
          tipo: "dados",
          dados: content,
          dataAdicionado: new Date().toISOString().split("T")[0],
        };
        setGraficos([...graficos, grafico]);
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
            Gráficos
          </h1>
          <p className="text-gray-300 text-lg">
            Visualize dados e estatísticas sobre o saque financeiro nazista
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Upload Section */}
          <Card className="bg-card border-amber-900/30 mb-12">
            <CardHeader>
              <CardTitle className="text-amber-400">Adicionar Novo Gráfico</CardTitle>
              <CardDescription className="text-gray-400">
                Adicione dados para criar gráficos ou faça upload de arquivos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Manual Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título do Gráfico
                  </label>
                  <input
                    type="text"
                    value={novoGrafico.titulo}
                    onChange={(e) => setNovoGrafico({ ...novoGrafico, titulo: e.target.value })}
                    placeholder="Ex: Saque por País"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    value={novoGrafico.descricao}
                    onChange={(e) => setNovoGrafico({ ...novoGrafico, descricao: e.target.value })}
                    placeholder="Descreva o gráfico..."
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Gráfico
                  </label>
                  <select
                    value={novoGrafico.tipo}
                    onChange={(e) => setNovoGrafico({ ...novoGrafico, tipo: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="barras">Barras</option>
                    <option value="linhas">Linhas</option>
                    <option value="pizza">Pizza</option>
                    <option value="area">Área</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dados (formato: label: valor, label: valor)
                  </label>
                  <textarea
                    value={novoGrafico.dados}
                    onChange={(e) => setNovoGrafico({ ...novoGrafico, dados: e.target.value })}
                    placeholder="Ex: Áustria: 90, França: 400, Polônia: 80"
                    rows={4}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <Button
                  onClick={handleAdicionarGrafico}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                >
                  Adicionar Gráfico
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
                <p className="text-gray-600 text-xs mt-2">Suporta: CSV, JSON, TXT</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Gráficos List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-400 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Gráficos Adicionados ({graficos.length})
            </h2>
            {graficos.length === 0 ? (
              <Card className="bg-card border-amber-900/30">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-400">Nenhum gráfico adicionado ainda. Comece adicionando um!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {graficos.map((grafico) => (
                  <Card key={grafico.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-amber-400">{grafico.titulo}</CardTitle>
                          <CardDescription className="text-gray-400">
                            Tipo: {grafico.tipo} | {grafico.descricao}
                          </CardDescription>
                        </div>
                        <button
                          onClick={() => handleRemoverGrafico(grafico.id)}
                          className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black/30 rounded p-3 mb-2">
                        <p className="text-xs text-gray-400 font-mono line-clamp-2">{grafico.dados}</p>
                      </div>
                      <p className="text-xs text-gray-500">Adicionado em: {grafico.dataAdicionado}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
