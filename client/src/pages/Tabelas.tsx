import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface Tabela {
  id: string;
  titulo: string;
  descricao: string;
  colunas: string[];
  dados: string[][];
  dataAdicionado: string;
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para gerenciar tabelas de dados
 * - Upload de arquivos CSV para criar tabelas
 * - Exibição de tabelas já adicionadas
 */

export default function Tabelas() {
  const [tabelas, setTabelas] = useState<Tabela[]>([
    {
      id: "1",
      titulo: "Saque de Ouro por País",
      descricao: "Quantidade de ouro saqueado de cada país ocupado",
      colunas: ["País", "Período", "Quantidade (ton)", "Valor (marcos)"],
      dados: [
        ["Áustria", "1938", "90", "~2.7 bilhões"],
        ["Tchecoslováquia", "1939", "32", "~960 milhões"],
        ["Polônia", "1939-1945", "80", "~2.4 bilhões"],
        ["França", "1940-1944", "400", "~12 bilhões"],
        ["Bélgica", "1940-1944", "~50 mi marcos/mês", "~600 bilhões"],
        ["Holanda", "1940-1944", "~60 mi marcos/mês", "~720 bilhões"],
      ],
      dataAdicionado: "2024-01-06",
    },
    {
      id: "2",
      titulo: "Despesas Militares Totais",
      descricao: "Distribuição de gastos entre as divisões militares",
      colunas: ["Divisão", "Percentual", "Descrição"],
      dados: [
        ["Wehrmacht", "40%", "Exército terrestre"],
        ["Luftwaffe", "25%", "Força aérea"],
        ["Kriegsmarine", "15%", "Marinha"],
        ["Indústria Bélica", "12%", "Produção de armamentos"],
        ["Operações", "8%", "Logística e campanhas"],
      ],
      dataAdicionado: "2024-01-06",
    },
  ]);

  const [novaTabela, setNovaTabela] = useState({
    titulo: "",
    descricao: "",
    colunas: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdicionarTabela = () => {
    if (novaTabela.titulo.trim() && novaTabela.colunas.trim()) {
      const colunas = novaTabela.colunas.split(",").map((c) => c.trim());
      const tabela: Tabela = {
        id: Date.now().toString(),
        titulo: novaTabela.titulo,
        descricao: novaTabela.descricao,
        colunas,
        dados: [],
        dataAdicionado: new Date().toISOString().split("T")[0],
      };
      setTabelas([...tabelas, tabela]);
      setNovaTabela({ titulo: "", descricao: "", colunas: "" });
    }
  };

  const handleRemoverTabela = (id: string) => {
    setTabelas(tabelas.filter((t) => t.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const linhas = content.split("\n").filter((l) => l.trim());
        if (linhas.length > 0) {
          const colunas = linhas[0].split(",").map((c) => c.trim());
          const dados = linhas.slice(1).map((l) => l.split(",").map((c) => c.trim()));

          const tabela: Tabela = {
            id: Date.now().toString(),
            titulo: file.name.replace(/\.[^/.]+$/, ""),
            descricao: `Importado de: ${file.name}`,
            colunas,
            dados,
            dataAdicionado: new Date().toISOString().split("T")[0],
          };
          setTabelas([...tabelas, tabela]);
        }
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
            Explore dados estruturados sobre o saque financeiro nazista
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título da Tabela
                  </label>
                  <input
                    type="text"
                    value={novaTabela.titulo}
                    onChange={(e) => setNovaTabela({ ...novaTabela, titulo: e.target.value })}
                    placeholder="Ex: Saque de Ouro por País"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    value={novaTabela.descricao}
                    onChange={(e) => setNovaTabela({ ...novaTabela, descricao: e.target.value })}
                    placeholder="Descreva a tabela..."
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nomes das Colunas (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={novaTabela.colunas}
                    onChange={(e) => setNovaTabela({ ...novaTabela, colunas: e.target.value })}
                    placeholder="Ex: País, Período, Quantidade, Valor"
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

          {/* Tabelas List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-400 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tabelas Adicionadas ({tabelas.length})
            </h2>
            {tabelas.length === 0 ? (
              <Card className="bg-card border-amber-900/30">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-400">Nenhuma tabela adicionada ainda. Comece adicionando uma!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {tabelas.map((tabela) => (
                  <Card key={tabela.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-amber-400">{tabela.titulo}</CardTitle>
                          <CardDescription className="text-gray-400">{tabela.descricao}</CardDescription>
                        </div>
                        <button
                          onClick={() => handleRemoverTabela(tabela.id)}
                          className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-amber-900/30">
                              {tabela.colunas.map((col, idx) => (
                                <th
                                  key={idx}
                                  className="px-3 py-2 text-left text-amber-400 font-semibold"
                                >
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {tabela.dados.slice(0, 3).map((linha, idx) => (
                              <tr key={idx} className="border-b border-amber-900/20 hover:bg-amber-900/10">
                                {linha.map((celula, cidx) => (
                                  <td key={cidx} className="px-3 py-2 text-gray-300">
                                    {celula}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {tabela.dados.length > 3 && (
                          <p className="text-xs text-gray-500 mt-2">
                            +{tabela.dados.length - 3} linhas adicionais
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Adicionado em: {tabela.dataAdicionado}
                      </p>
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
