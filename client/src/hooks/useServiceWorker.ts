import { useEffect } from "react";

/**
 * Design Philosophy: Dark Historical Archive
 * - Hook para registrar Service Worker e habilitar modo offline
 */

export function useServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.error("Erro ao registrar Service Worker:", error);
        });
    }
  }, []);
}
