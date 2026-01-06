import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface Artigo {
  id: string;
  titulo: string;
  autor: string;
  resumo: string;
  conteudo: string;
  dataAdicionado: string;
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para gerenciar artigos educativos
 * - Upload de documentos para adicionar novos artigos
 * - Exibição de artigos já adicionados
 */

export default function Artigos() {
  const [artigos, setArtigos] = useState<Artigo[]>([
    {
      id: "1",
      titulo: "A Economia da Segunda Guerra Mundial",
      autor: "Historiador Anônimo",
      resumo: "Uma análise profunda sobre os mecanismos econômicos que sustentavam a máquina de guerra nazista",
      conteudo: "A economia nazista era baseada em um modelo insustentável...",
      dataAdicionado: "2024-01-06",
    },
  ]);

  const [novoArtigo, setNovoArtigo] = useState({
    titulo: "",
    autor: "",
    resumo: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdicionarArtigo = () => {
    if (novoArtigo.titulo.trim() && novoArtigo.autor.trim() && novoArtigo.resumo.trim()) {
      const artigo: Artigo = {
        id: Date.now().toString(),
        titulo: novoArtigo.titulo,
        autor: novoArtigo.autor,
        resumo: novoArtigo.resumo,
        conteudo: novoArtigo.resumo,
        dataAdicionado: new Date().toISOString().split("T")[0],
      };
      setArtigos([...artigos, artigo]);
      setNovoArtigo({ titulo: "", autor: "", resumo: "" });
    }
  };

  const handleRemoverArtigo = (id: string) => {
    setArtigos(artigos.filter((a) => a.id !== id));
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
          resumo: `Arquivo: ${file.name}`,
          conteudo: content,
          dataAdicionado: new Date().toISOString().split("T")[0],
        };
        setArtigos([...artigos, artigo]);
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
            Leia análises detalhadas sobre o sistema financeiro de saque nazista
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título do Artigo
                  </label>
                  <input
                    type="text"
                    value={novoArtigo.titulo}
                    onChange={(e) => setNovoArtigo({ ...novoArtigo, titulo: e.target.value })}
                    placeholder="Ex: A Economia da Segunda Guerra Mundial"
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Resumo
                  </label>
                  <textarea
                    value={novoArtigo.resumo}
                    onChange={(e) => setNovoArtigo({ ...novoArtigo, resumo: e.target.value })}
                    placeholder="Escreva um resumo do artigo..."
                    rows={4}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
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

          {/* Artigos List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-400 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Artigos Adicionados ({artigos.length})
            </h2>
            {artigos.length === 0 ? (
              <Card className="bg-card border-amber-900/30">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-400">Nenhum artigo adicionado ainda. Comece adicionando um!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {artigos.map((artigo) => (
                  <Card key={artigo.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-amber-400">{artigo.titulo}</CardTitle>
                          <CardDescription className="text-gray-400">Por {artigo.autor}</CardDescription>
                        </div>
                        <button
                          onClick={() => handleRemoverArtigo(artigo.id)}
                          className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300 mb-2">{artigo.resumo}</p>
                      <p className="text-xs text-gray-500">Adicionado em: {artigo.dataAdicionado}</p>
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
