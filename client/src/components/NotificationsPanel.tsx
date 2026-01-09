import { useNotifications } from "@/contexts/NotificationsContext";
import { Bell, X, Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Design Philosophy: Dark Historical Archive
 * - Painel de notificações com ícone no header
 * - Mostra notificações de comentários, respostas e interações
 */

export default function NotificationsPanel() {
  const {
    notificacoes,
    removeNotificacao,
    marcarComoLida,
    marcarTodasComoLidas,
    getNotificacoesNaoLidas,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const naoLidas = getNotificacoesNaoLidas();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-amber-900/20 transition-all"
      >
        <Bell className="w-5 h-5 text-amber-400" />
        {naoLidas.length > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {naoLidas.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-card border border-amber-900/30 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-amber-900/30 p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-amber-400">Notificações</h3>
            <div className="flex gap-2">
              {naoLidas.length > 0 && (
                <Button
                  onClick={marcarTodasComoLidas}
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                >
                  <CheckCheck className="w-3 h-3 mr-1" />
                  Marcar todas
                </Button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-amber-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notificações */}
          {notificacoes.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            <div className="divide-y divide-amber-900/20">
              {notificacoes.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-amber-900/10 transition-all ${
                    !notif.lida ? "bg-amber-900/5 border-l-2 border-amber-400" : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-amber-400 text-sm">
                        {notif.titulo}
                      </p>
                      <p className="text-gray-300 text-sm mt-1">{notif.mensagem}</p>
                      <p className="text-gray-500 text-xs mt-2">{notif.dataCriacao}</p>
                    </div>
                    <div className="flex gap-1">
                      {!notif.lida && (
                        <button
                          onClick={() => marcarComoLida(notif.id)}
                          className="p-1 hover:bg-amber-900/20 rounded text-gray-400 hover:text-amber-400"
                          title="Marcar como lida"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotificacao(notif.id)}
                        className="p-1 hover:bg-red-900/20 rounded text-gray-400 hover:text-red-400"
                        title="Remover"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
