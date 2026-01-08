import React, { createContext, useContext, useState, useEffect } from "react";

export interface Comment {
  id: string;
  itemId: string;
  itemType: "tema" | "artigo" | "grafico" | "tabela";
  autor: string;
  conteudo: string;
  dataCriacao: string;
  likes: number;
}

interface CommentsContextType {
  comments: Comment[];
  addComment: (comment: Omit<Comment, "id" | "dataCriacao" | "likes">) => void;
  removeComment: (id: string) => void;
  likeComment: (id: string) => void;
  getCommentsByItem: (itemId: string, itemType: string) => Comment[];
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);

  // Carregar comentários do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("siga_comentarios");
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar comentários:", e);
      }
    }
  }, []);

  // Salvar comentários no localStorage
  useEffect(() => {
    localStorage.setItem("siga_comentarios", JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment: Omit<Comment, "id" | "dataCriacao" | "likes">) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      dataCriacao: new Date().toISOString().split("T")[0],
      likes: 0,
    };
    setComments([...comments, newComment]);
  };

  const removeComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const likeComment = (id: string) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const getCommentsByItem = (itemId: string, itemType: string) => {
    return comments.filter((c) => c.itemId === itemId && c.itemType === itemType);
  };

  return (
    <CommentsContext.Provider
      value={{ comments, addComment, removeComment, likeComment, getCommentsByItem }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments deve ser usado dentro de CommentsProvider");
  }
  return context;
}
