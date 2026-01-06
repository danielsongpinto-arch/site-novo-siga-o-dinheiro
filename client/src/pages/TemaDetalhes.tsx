import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRoute, useLocation } from "wouter";

/**
 * Design Philosophy: Dark Historical Archive
 * - Página de detalhes para visualizar tema completo
 * - Opção de deletar tema
 */

export default function TemaDetalhes() {
  const [match, params] = useRoute("/temas/:id");
  const [, navigate] = useLocation();
  const { temas, removeTema } = useContent();

  const tema = temas.find((t) => t.id === params?.id);

    if (!match || !tema) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-400 mb-4">Tema não encontrado</h1>
          <Button onClick={() => navigate("/temas")} className="bg-amber-600 hover:bg-amber-700">
            Voltar para Temas
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja deletar este tema?")) {
      removeTema(tema.id);
      navigate("/temas");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-900/30 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Button
            onClick={() => navigate("/temas")}
            variant="ghost"
            className="mb-6 text-amber-400 hover:text-amber-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            {tema.titulo}
          </h1>
          <p className="text-gray-400">Adicionado em: {tema.dataAdicionado}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-card border border-amber-900/30 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-amber-400 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Descrição
            </h2>
            <p className="text-gray-300 mb-6">{tema.descricao}</p>

            <h2 className="text-2xl font-bold text-amber-400 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Conteúdo Completo
            </h2>
            <div className="bg-black/30 rounded p-6 text-gray-300 whitespace-pre-wrap">
              {tema.conteudo}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Deletar Tema
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
