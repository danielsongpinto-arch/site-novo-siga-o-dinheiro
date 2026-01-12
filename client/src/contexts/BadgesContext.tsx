import React, { createContext, useContext, useState, useEffect } from "react";

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  condicao: string;
  desbloqueado: boolean;
  dataDesbloqueio?: string;
}

interface BadgesContextType {
  badges: Badge[];
  desbloquearBadge: (badgeId: string) => void;
  getBadgesDesbloqueados: () => Badge[];
  verificarNovasBadges: (stats: any) => void;
}

const BadgesContext = createContext<BadgesContextType | undefined>(undefined);

const BADGES_DISPONIVEIS: Badge[] = [
  {
    id: "primeiro_comentario",
    nome: "Primeira Voz",
    descricao: "Deixe seu primeiro comentário",
    icone: "💬",
    condicao: "1 comentário",
    desbloqueado: false,
  },
  {
    id: "comentarista_ativo",
    nome: "Comentarista Ativo",
    descricao: "Deixe 10 comentários",
    icone: "🗣️",
    condicao: "10 comentários",
    desbloqueado: false,
  },
  {
    id: "votante_dedicado",
    nome: "Votante Dedicado",
    descricao: "Vote em 5 artigos diferentes",
    icone: "👍",
    condicao: "5 votos",
    desbloqueado: false,
  },
  {
    id: "leitor_dedicado",
    nome: "Leitor Dedicado",
    descricao: "Adicione 10 itens aos favoritos",
    icone: "❤️",
    condicao: "10 favoritos",
    desbloqueado: false,
  },
  {
    id: "explorador",
    nome: "Explorador",
    descricao: "Visite todas as 11 páginas do site",
    icone: "🗺️",
    condicao: "Todas as páginas",
    desbloqueado: false,
  },
  {
    id: "pesquisador",
    nome: "Pesquisador",
    descricao: "Use a busca global 5 vezes",
    icone: "🔍",
    condicao: "5 buscas",
    desbloqueado: false,
  },
  {
    id: "newsletter_subscriber",
    nome: "Inscrito na Newsletter",
    descricao: "Inscreva-se na newsletter",
    icone: "📧",
    condicao: "Newsletter",
    desbloqueado: false,
  },
  {
    id: "trending_watcher",
    nome: "Observador de Tendências",
    descricao: "Visite a página de Trending",
    icone: "📈",
    condicao: "Trending",
    desbloqueado: false,
  },
];

export function BadgesProvider({ children }: { children: React.ReactNode }) {
  const [badges, setBadges] = useState<Badge[]>(BADGES_DISPONIVEIS);

  // Carregar badges do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("siga_badges");
    if (stored) {
      try {
        setBadges(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar badges:", e);
      }
    }
  }, []);

  // Salvar badges no localStorage
  useEffect(() => {
    localStorage.setItem("siga_badges", JSON.stringify(badges));
  }, [badges]);

  const desbloquearBadge = (badgeId: string) => {
    setBadges(
      badges.map((b) =>
        b.id === badgeId && !b.desbloqueado
          ? { ...b, desbloqueado: true, dataDesbloqueio: new Date().toISOString().split("T")[0] }
          : b
      )
    );
  };

  const getBadgesDesbloqueados = () => {
    return badges.filter((b) => b.desbloqueado);
  };

  const verificarNovasBadges = (stats: any) => {
    // Verificar badges baseado em estatísticas
    if (stats.comentarios >= 1) desbloquearBadge("primeiro_comentario");
    if (stats.comentarios >= 10) desbloquearBadge("comentarista_ativo");
    if (stats.votos >= 5) desbloquearBadge("votante_dedicado");
    if (stats.favoritos >= 10) desbloquearBadge("leitor_dedicado");
    if (stats.paginasVisitadas >= 11) desbloquearBadge("explorador");
    if (stats.buscas >= 5) desbloquearBadge("pesquisador");
    if (stats.newsletter) desbloquearBadge("newsletter_subscriber");
    if (stats.trendingVisitado) desbloquearBadge("trending_watcher");
  };

  return (
    <BadgesContext.Provider
      value={{ badges, desbloquearBadge, getBadgesDesbloqueados, verificarNovasBadges }}
    >
      {children}
    </BadgesContext.Provider>
  );
}

export function useBadges() {
  const context = useContext(BadgesContext);
  if (!context) {
    throw new Error("useBadges deve ser usado dentro de BadgesProvider");
  }
  return context;
}
