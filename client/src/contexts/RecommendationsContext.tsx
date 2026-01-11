import React, { createContext, useContext, useState, useEffect } from 'react';
import { useContent } from './ContentContext';

interface Recommendation {
  id: string;
  type: 'tema' | 'artigo' | 'grafico' | 'tabela';
  title: string;
  score: number;
  reason: string;
}

interface RecommendationsContextType {
  recommendations: Recommendation[];
  getRecommendations: (limit?: number) => Recommendation[];
  trackView: (id: string, type: string) => void;
  trackFavorite: (id: string, type: string) => void;
}

const RecommendationsContext = createContext<RecommendationsContextType | undefined>(undefined);

export const RecommendationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { temas, artigos, graficos, tabelas } = useContent();
  const [viewHistory, setViewHistory] = useState<{ id: string; type: string; timestamp: number }[]>([]);
  const [favoriteHistory, setFavoriteHistory] = useState<{ id: string; type: string }[]>([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    const savedViewHistory = localStorage.getItem('viewHistory');
    const savedFavoriteHistory = localStorage.getItem('favoriteHistory');
    
    if (savedViewHistory) setViewHistory(JSON.parse(savedViewHistory));
    if (savedFavoriteHistory) setFavoriteHistory(JSON.parse(savedFavoriteHistory));
  }, []);

  // Salvar histórico no localStorage
  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
  }, [viewHistory]);

  useEffect(() => {
    localStorage.setItem('favoriteHistory', JSON.stringify(favoriteHistory));
  }, [favoriteHistory]);

  const trackView = (id: string, type: string) => {
    setViewHistory(prev => [...prev, { id, type, timestamp: Date.now() }]);
  };

  const trackFavorite = (id: string, type: string) => {
    setFavoriteHistory(prev => {
      const exists = prev.find(fav => fav.id === id && fav.type === type);
      if (exists) return prev;
      return [...prev, { id, type }];
    });
  };

  const getRecommendations = (limit = 5): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Análise de categorias visualizadas
    const viewedCategories = new Map<string, number>();
    viewHistory.forEach(view => {
      const category = getCategoryFromView(view.id, view.type);
      if (category) {
        viewedCategories.set(category, (viewedCategories.get(category) || 0) + 1);
      }
    });

    // Recomendações baseadas em categorias
    temas.forEach(tema => {
      if (!viewHistory.some(v => v.id === tema.id)) {
        const score = viewedCategories.get(tema.categoria || '') || 0;
        if (score > 0) {
          recommendations.push({
            id: tema.id,
            type: 'tema',
            title: tema.titulo,
            score: score * 2,
            reason: `Baseado em temas que você visualizou em "${tema.categoria}"`
          });
        }
      }
    });

    artigos.forEach(artigo => {
      if (!viewHistory.some(v => v.id === artigo.id)) {
        const score = viewedCategories.get(artigo.categoria || '') || 0;
        if (score > 0) {
          recommendations.push({
            id: artigo.id,
            type: 'artigo',
            title: artigo.titulo,
            score: score * 1.5,
            reason: `Artigo relacionado a "${artigo.categoria}"`
          });
        }
      }
    });

    // Recomendações baseadas em favoritos
    favoriteHistory.forEach(fav => {
      const relatedItems = getRelatedItems(fav.id, fav.type);
      relatedItems.forEach(item => {
        const existing = recommendations.find(r => r.id === item.id);
        if (existing) {
          existing.score += 3;
        } else {
          recommendations.push({
            id: item.id,
            type: item.type,
            title: item.title,
            score: 3,
            reason: 'Relacionado a um item que você favoritou'
          });
        }
      });
    });

    // Ordenar por score e retornar top N
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  const getCategoryFromView = (id: string, type: string): string | null => {
    switch (type) {
      case 'tema':
        return temas.find(t => t.id === id)?.categoria || null;
      case 'artigo':
        return artigos.find(a => a.id === id)?.categoria || null;
      default:
        return null;
    }
  };

  const getRelatedItems = (id: string, type: string) => {
    const items: any[] = [];
    
    if (type === 'tema') {
      const tema = temas.find(t => t.id === id);
      if (tema) {
        items.push(
          ...artigos
            .filter(a => a.categoria === tema.categoria && a.id !== id)
            .slice(0, 2)
        );
      }
    } else if (type === 'artigo') {
      const artigo = artigos.find(a => a.id === id);
      if (artigo) {
        items.push(
          ...temas
            .filter(t => t.categoria === artigo.categoria && t.id !== id)
            .slice(0, 2)
        );
      }
    }
    
    return items;
  };

  return (
    <RecommendationsContext.Provider value={{ recommendations: getRecommendations(), getRecommendations, trackView, trackFavorite }}>
      {children}
    </RecommendationsContext.Provider>
  );
};

export const useRecommendations = () => {
  const context = useContext(RecommendationsContext);
  if (!context) {
    throw new Error('useRecommendations deve ser usado dentro de RecommendationsProvider');
  }
  return context;
};
