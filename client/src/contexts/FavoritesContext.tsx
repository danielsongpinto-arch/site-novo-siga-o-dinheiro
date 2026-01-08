import React, { createContext, useContext, useState, useEffect } from "react";

export interface Favorite {
  id: string;
  type: "tema" | "artigo" | "grafico" | "tabela";
  titulo: string;
  descricao: string;
  dataAdicionado: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string, type: string) => void;
  isFavorite: (id: string, type: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("siga_favoritos");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar favoritos:", e);
      }
    }
  }, []);

  // Salvar favoritos no localStorage
  useEffect(() => {
    localStorage.setItem("siga_favoritos", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (favorite: Favorite) => {
    if (!favorites.find((f) => f.id === favorite.id && f.type === favorite.type)) {
      setFavorites([...favorites, favorite]);
    }
  };

  const removeFavorite = (id: string, type: string) => {
    setFavorites(favorites.filter((f) => !(f.id === id && f.type === type)));
  };

  const isFavorite = (id: string, type: string) => {
    return favorites.some((f) => f.id === id && f.type === type);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  }
  return context;
}
