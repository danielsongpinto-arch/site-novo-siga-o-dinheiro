import React, { createContext, useContext, useState, useEffect } from "react";

export interface Tag {
  id: string;
  nome: string;
  cor: string;
  itemIds: string[]; // IDs dos itens que possuem esta tag
}

interface TagsContextType {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  removeTag: (id: string) => void;
  updateTag: (id: string, tag: Partial<Tag>) => void;
  addTagToItem: (tagId: string, itemId: string) => void;
  removeTagFromItem: (tagId: string, itemId: string) => void;
  getTagsByItemId: (itemId: string) => Tag[];
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

/**
 * Design Philosophy: Dark Historical Archive
 * - Context para gerenciar tags customizáveis
 * - Armazenamento em localStorage
 */

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<Tag[]>([]);

  // Carregar tags do localStorage
  useEffect(() => {
    const savedTags = localStorage.getItem("siga-tags");
    if (savedTags) {
      try {
        setTags(JSON.parse(savedTags));
      } catch (error) {
        console.error("Erro ao carregar tags:", error);
      }
    }
  }, []);

  // Salvar tags no localStorage
  useEffect(() => {
    localStorage.setItem("siga-tags", JSON.stringify(tags));
  }, [tags]);

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const removeTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTag = (id: string, updates: Partial<Tag>) => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const addTagToItem = (tagId: string, itemId: string) => {
    setTags((prev) =>
      prev.map((t) =>
        t.id === tagId && !t.itemIds.includes(itemId)
          ? { ...t, itemIds: [...t.itemIds, itemId] }
          : t
      )
    );
  };

  const removeTagFromItem = (tagId: string, itemId: string) => {
    setTags((prev) =>
      prev.map((t) =>
        t.id === tagId
          ? { ...t, itemIds: t.itemIds.filter((id) => id !== itemId) }
          : t
      )
    );
  };

  const getTagsByItemId = (itemId: string): Tag[] => {
    return tags.filter((t) => t.itemIds.includes(itemId));
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        addTag,
        removeTag,
        updateTag,
        addTagToItem,
        removeTagFromItem,
        getTagsByItemId,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTags deve ser usado dentro de TagsProvider");
  }
  return context;
}
