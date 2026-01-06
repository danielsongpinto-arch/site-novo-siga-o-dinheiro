import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface Tema {
  id: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  dataAdicionado: string;
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para gerenciar temas educativos
 * - Upload de documentos para adicionar novos temas
 * - Exibição de temas já adicionados
 */

export default function Temas() {
  const [temas, setTemas] = useState<Tema[]>([
    {
      id: "1",
      titulo: "O Sistema Ponzi Nazista",
      descricao: "Análise de como o sistema de saque funcionava como um esquema de Ponzi",
      conteudo: "O sistema financeiro nazista dependia de conquistas militares contínuas para financiar a guerra...",
      dataAdicionado: "2024-01-06",
    },
  ]);

  const [novoTema, setNovoTema] = useState({
    titulo: "",
    descricao: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdicionarTema = () => {
    if (novoTema.titulo.trim() && novoTema.descricao.trim()) {
      const tema: Tema = {
        id: Date.now().toString(),
        titulo: novoTema.titulo,
        descricao: novoTema.descricao,
        conteudo: novoTema.descricao,
        dataAdicionado: new Date().toISOString().split("T")[0],
      };
      setTemas([...temas, tema]);
      setNovoTema({ titulo: "", descricao: "" });
    }
  };

  const handleRemoverTema = (id: string) => {
    setTemas(temas.filter((t) => t.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const tema: Tema = {
          id: Date.now().toString(),
          titulo: file.name.replace(/\.[^/.]+$/, ""),
          descricao: `Importado de: ${file.name}`,
          conteudo: content,
          dataAdicionado: new Date().toISOString().split("T")[0],
        };
        setTemas([...temas, tema]);
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
            Temas
          </h1>
          <p className="text-gray-300 text-lg">
            Explore temas educativos sobre o sistema financeiro de saque nazista
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Upload Section */}
          <Card className="bg-card border-amber-900/30 mb-12">
            <CardHeader>
              <CardTitle className="text-amber-400">Adicionar Novo Tema</CardTitle>
              <CardDescription className="text-gray-400">
                Adicione temas manualmente ou faça upload de documentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Manual Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título do Tema
                  </label>
                  <input
                    type="text"
                    value={novoTema.titulo}
                    onChange={(e) => setNovoTema({ ...novoTema, titulo: e.target.value })}
                    placeholder="Ex: O Sistema Ponzi Nazista"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={novoTema.descricao}
                    onChange={(e) => setNovoTema({ ...novoTema, descricao: e.target.value })}
                    placeholder="Descreva o tema..."
                    rows={4}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <Button
                  onClick={handleAdicionarTema}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                >
                  Adicionar Tema
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

          {/* Temas List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-400 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Temas Adicionados ({temas.length})
            </h2>
            {temas.length === 0 ? (
              <Card className="bg-card border-amber-900/30">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-400">Nenhum tema adicionado ainda. Comece adicionando um!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {temas.map((tema) => (
                  <Card key={tema.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-amber-400">{tema.titulo}</CardTitle>
                          <CardDescription className="text-gray-400">{tema.descricao}</CardDescription>
                        </div>
                        <button
                          onClick={() => handleRemoverTema(tema.id)}
                          className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400">Adicionado em: {tema.dataAdicionado}</p>
                      <p className="text-sm text-gray-300 mt-3 line-clamp-2">{tema.conteudo}</p>
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
