import React, { createContext, useContext, useState, useEffect } from "react";

export interface Author {
  id: string;
  nome: string;
  bio?: string;
  artigos: number;
}

interface FollowContextType {
  seguindo: Author[];
  addFollow: (author: Author) => void;
  removeFollow: (authorId: string) => void;
  isFollowing: (authorId: string) => boolean;
  getSeguindo: () => Author[];
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

/**
 * Design Philosophy: Dark Historical Archive
 * - Context para gerenciar autores que o usuário segue
 * - Armazenamento em localStorage
 */

export function FollowProvider({ children }: { children: React.ReactNode }) {
  const [seguindo, setSeguindo] = useState<Author[]>([]);

  // Carregar seguindo do localStorage
  useEffect(() => {
    const savedSeguindo = localStorage.getItem("siga-seguindo");
    if (savedSeguindo) {
      try {
        setSeguindo(JSON.parse(savedSeguindo));
      } catch (error) {
        console.error("Erro ao carregar seguindo:", error);
      }
    }
  }, []);

  // Salvar seguindo no localStorage
  useEffect(() => {
    localStorage.setItem("siga-seguindo", JSON.stringify(seguindo));
  }, [seguindo]);

  const addFollow = (author: Author) => {
    setSeguindo((prev) => {
      if (!prev.find((a) => a.id === author.id)) {
        return [...prev, author];
      }
      return prev;
    });
  };

  const removeFollow = (authorId: string) => {
    setSeguindo((prev) => prev.filter((a) => a.id !== authorId));
  };

  const isFollowing = (authorId: string): boolean => {
    return seguindo.some((a) => a.id === authorId);
  };

  const getSeguindo = (): Author[] => {
    return seguindo;
  };

  return (
    <FollowContext.Provider
      value={{
        seguindo,
        addFollow,
        removeFollow,
        isFollowing,
        getSeguindo,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error("useFollow deve ser usado dentro de FollowProvider");
  }
  return context;
}
