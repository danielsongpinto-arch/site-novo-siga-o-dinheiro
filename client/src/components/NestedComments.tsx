import { useState } from 'react';
import { useComments } from '@/contexts/CommentsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ThumbsUp, Reply, Trash2 } from 'lucide-react';

interface NestedCommentsProps {
  itemId: string;
  itemType: 'tema' | 'artigo' | 'grafico' | 'tabela';
}

export default function NestedComments({ itemId, itemType }: NestedCommentsProps) {
  const { getCommentsByItem, addComment, removeComment, likeComment, addReply, getReplies } = useComments();
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  const comments = getCommentsByItem(itemId, itemType);

  const handleAddComment = () => {
    if (newComment.trim() && author.trim()) {
      addComment({
        itemId,
        itemType,
        autor: author,
        conteudo: newComment,
      });
      setNewComment('');
      setAuthor('');
    }
  };

  const handleAddReply = (parentId: string) => {
    if (replyText.trim() && replyAuthor.trim()) {
      addReply(parentId, {
        itemId,
        itemType,
        autor: replyAuthor,
        conteudo: replyText,
      });
      setReplyText('');
      setReplyAuthor('');
      setReplyingTo(null);
    }
  };

  const CommentItem = ({ comment, level = 0 }: { comment: any; level?: number }) => {
    const replies = getReplies(comment.id);

    return (
      <div key={comment.id} className={`${level > 0 ? 'ml-4 md:ml-8' : ''}`}>
        <Card className="bg-card/50 text-card-foreground p-4 mb-3 border-l-2 border-amber-700">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-amber-400">{comment.autor}</p>
              <p className="text-xs text-muted-foreground">{comment.dataCriacao}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeComment(comment.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-300 mb-3">{comment.conteudo}</p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => likeComment(comment.id)}
              className="flex items-center gap-1 text-amber-400 hover:bg-amber-900/20"
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs">{comment.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="flex items-center gap-1 text-amber-400 hover:bg-amber-900/20"
            >
              <Reply className="w-4 h-4" />
              <span className="text-xs">Responder</span>
            </Button>
          </div>

          {replyingTo === comment.id && (
            <div className="mt-4 p-3 bg-black/30 rounded-lg space-y-2">
              <Input
                placeholder="Seu nome"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                className="bg-black/50 border-amber-700/30 text-white placeholder-gray-500 text-sm"
              />
              <Input
                placeholder="Sua resposta..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="bg-black/50 border-amber-700/30 text-white placeholder-gray-500 text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAddReply(comment.id)}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs"
                >
                  Enviar Resposta
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setReplyingTo(null)}
                  className="text-xs"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </Card>

        {replies.length > 0 && (
          <div className="space-y-2">
            {replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-amber-400">Comentários ({comments.length})</h3>

      {/* Add Comment Form */}
      <Card className="bg-card/50 text-card-foreground p-4 border-amber-700/30">
        <div className="space-y-2">
          <Input
            placeholder="Seu nome"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-black/50 border-amber-700/30 text-white placeholder-gray-500"
          />
          <Input
            placeholder="Deixe seu comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-black/50 border-amber-700/30 text-white placeholder-gray-500"
          />
          <Button
            onClick={handleAddComment}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={!newComment.trim() || !author.trim()}
          >
            Comentar
          </Button>
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        ) : (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        )}
      </div>
    </div>
  );
}
