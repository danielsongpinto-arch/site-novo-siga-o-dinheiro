import React, { createContext, useContext, useState, useEffect } from 'react';

interface Subscriber {
  id: string;
  email: string;
  categories: string[];
  subscribedAt: string;
}

interface Vote {
  id: string;
  itemId: string;
  itemType: 'tema' | 'artigo' | 'grafico' | 'tabela';
  voteCount: number;
}

interface NewsletterContextType {
  subscribers: Subscriber[];
  votes: Vote[];
  addSubscriber: (email: string, categories: string[]) => void;
  removeSubscriber: (email: string) => void;
  addVote: (itemId: string, itemType: string) => void;
  getVotes: (itemId: string) => number;
  getTopVoted: (type?: string, limit?: number) => Vote[];
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export const NewsletterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedSubscribers = localStorage.getItem('subscribers');
    const savedVotes = localStorage.getItem('votes');
    
    if (savedSubscribers) setSubscribers(JSON.parse(savedSubscribers));
    if (savedVotes) setVotes(JSON.parse(savedVotes));
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  const addSubscriber = (email: string, categories: string[]) => {
    const exists = subscribers.find(s => s.email === email);
    if (exists) return;

    const newSubscriber: Subscriber = {
      id: `sub-${Date.now()}`,
      email,
      categories,
      subscribedAt: new Date().toISOString(),
    };

    setSubscribers(prev => [...prev, newSubscriber]);
    
    // Simular envio de email de confirmação
    console.log(`Newsletter subscription confirmed for ${email}`);
  };

  const removeSubscriber = (email: string) => {
    setSubscribers(prev => prev.filter(s => s.email !== email));
  };

  const addVote = (itemId: string, itemType: string) => {
    setVotes(prev => {
      const existing = prev.find(v => v.itemId === itemId);
      if (existing) {
        return prev.map(v =>
          v.itemId === itemId ? { ...v, voteCount: v.voteCount + 1 } : v
        );
      }
      return [
        ...prev,
        {
          id: `vote-${Date.now()}`,
          itemId,
          itemType: itemType as 'tema' | 'artigo' | 'grafico' | 'tabela',
          voteCount: 1,
        },
      ];
    });
  };

  const getVotes = (itemId: string): number => {
    return votes.find(v => v.itemId === itemId)?.voteCount || 0;
  };

  const getTopVoted = (type?: string, limit = 10): Vote[] => {
    let filtered = votes;
    if (type) {
      filtered = votes.filter(v => v.itemType === type);
    }
    return filtered
      .sort((a, b) => b.voteCount - a.voteCount)
      .slice(0, limit);
  };

  return (
    <NewsletterContext.Provider
      value={{
        subscribers,
        votes,
        addSubscriber,
        removeSubscriber,
        addVote,
        getVotes,
        getTopVoted,
      }}
    >
      {children}
    </NewsletterContext.Provider>
  );
};

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter deve ser usado dentro de NewsletterProvider');
  }
  return context;
};
