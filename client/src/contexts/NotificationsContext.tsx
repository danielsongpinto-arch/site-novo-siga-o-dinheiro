import React, { createContext, useContext, useState, useEffect } from "react";

export interface Notification {
  id: string;
  tipo: "comentario" | "resposta" | "favorito" | "compartilhamento";
  titulo: string;
  mensagem: string;
  itemId: string;
  itemTipo: string;
  lida: boolean;
  dataCriacao: string;
  usuarioId?: string;
}

interface NotificationsContextType {
  notificacoes: Notification[];
  addNotificacao: (notificacao: Notification) => void;
  removeNotificacao: (id: string) => void;
  marcarComoLida: (id: string) => void;
  marcarTodasComoLidas: () => void;
  getNotificacoesNaoLidas: () => Notification[];
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(
  undefined
);

/**
 * Design Philosophy: Dark Historical Archive
 * - Context para gerenciar notificações de comentários e interações
 * - Armazenamento em localStorage
 */

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notificacoes, setNotificacoes] = useState<Notification[]>([]);

  // Carregar notificações do localStorage
  useEffect(() => {
    const savedNotificacoes = localStorage.getItem("siga-notificacoes");
    if (savedNotificacoes) {
      try {
        setNotificacoes(JSON.parse(savedNotificacoes));
      } catch (error) {
        console.error("Erro ao carregar notificações:", error);
      }
    }
  }, []);

  // Salvar notificações no localStorage
  useEffect(() => {
    localStorage.setItem("siga-notificacoes", JSON.stringify(notificacoes));
  }, [notificacoes]);

  const addNotificacao = (notificacao: Notification) => {
    setNotificacoes((prev) => [notificacao, ...prev]);
  };

  const removeNotificacao = (id: string) => {
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));
  };

  const marcarComoLida = (id: string) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const getNotificacoesNaoLidas = (): Notification[] => {
    return notificacoes.filter((n) => !n.lida);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificacoes,
        addNotificacao,
        removeNotificacao,
        marcarComoLida,
        marcarTodasComoLidas,
        getNotificacoesNaoLidas,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications deve ser usado dentro de NotificationsProvider");
  }
  return context;
}
