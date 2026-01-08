import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import { useComments } from "@/contexts/CommentsContext";

interface CommentsSectionProps {
  itemId: string;
  itemType: "tema" | "artigo" | "grafico" | "tabela";
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Componente para exibir e gerenciar comentários
 * - Permite adicionar novos comentários
 * - Sistema de likes para comentários
 */

export default function CommentsSection({ itemId, itemType }: CommentsSectionProps) {
  const { getCommentsByItem, addComment, removeComment, likeComment } = useComments();
  const [novoComentario, setNovoComentario] = useState("");
  const [autor, setAutor] = useState("");
  const comments = getCommentsByItem(itemId, itemType);

  const handleAddComment = () => {
    if (novoComentario.trim() && autor.trim()) {
      addComment({
        itemId,
        itemType,
        autor,
        conteudo: novoComentario,
      });
      setNovoComentario("");
      setAutor("");
    }
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Título */}
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
          Discussões ({comments.length})
        </h2>
      </div>

      {/* Formulário de Novo Comentário */}
      <Card className="bg-card border-amber-900/30">
        <CardHeader>
          <CardTitle className="text-amber-400 text-lg">Adicionar Comentário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seu Nome
            </label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seu Comentário
            </label>
            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Compartilhe sua análise ou perspectiva..."
              rows={4}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <Button
            onClick={handleAddComment}
            disabled={!novoComentario.trim() || !autor.trim()}
            className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold disabled:opacity-50"
          >
            Publicar Comentário
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Comentários */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="bg-card border-amber-900/30">
            <CardContent className="py-8 text-center">
              <p className="text-gray-400">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {/* Cabeçalho do Comentário */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-amber-400">{comment.autor}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.dataCriacao).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <button
                      onClick={() => removeComment(comment.id)}
                      className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remover comentário"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>

                  {/* Conteúdo */}
                  <p className="text-gray-300 leading-relaxed">{comment.conteudo}</p>

                  {/* Ações */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => likeComment(comment.id)}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-900/10 hover:bg-amber-900/20 transition-colors text-amber-400 text-sm font-medium"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
