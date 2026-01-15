import React, { createContext, useContext, useState } from 'react';

export interface FirebaseItem {
  id?: string;
  title: string;
  description: string;
  content?: string;
  category: string;
  type: 'tema' | 'artigo' | 'gráfico' | 'tabela';
  author?: string;
  tags?: string[];
  [key: string]: any;
}

interface FirebaseContextType {
  items: FirebaseItem[];
  loading: boolean;
  error: string | null;
  addItem: (item: Omit<FirebaseItem, 'id'>) => Promise<string>;
  updateItem: (id: string, item: Partial<FirebaseItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  fetchItems: (type?: string) => Promise<void>;
  searchItems: (query: string, type?: string) => Promise<FirebaseItem[]>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<FirebaseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (type?: string) => {
    try {
      setLoading(true);
      setError(null);
      // Implementação será feita após configurar Firebase
      setItems([]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar itens';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<FirebaseItem, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      // Implementação será feita após configurar Firebase
      return 'temp-id';
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar item';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, item: Partial<FirebaseItem>) => {
    try {
      setLoading(true);
      setError(null);
      // Implementação será feita após configurar Firebase
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar item';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      // Implementação será feita após configurar Firebase
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar item';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchItems = async (searchQuery: string, type?: string): Promise<FirebaseItem[]> => {
    try {
      // Implementação será feita após configurar Firebase
      return [];
    } catch (err) {
      console.error('Erro ao pesquisar itens:', err);
      return [];
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        items,
        loading,
        error,
        addItem,
        updateItem,
        deleteItem,
        fetchItems,
        searchItems,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase deve ser usado dentro de FirebaseProvider');
  }
  return context;
};
