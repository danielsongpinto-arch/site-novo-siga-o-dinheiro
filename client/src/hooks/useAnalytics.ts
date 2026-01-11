import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    // Carregar Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      page_path: window.location.pathname,
    });

    // Rastrear visualizações de página
    const handleRouteChange = () => {
      gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
      });
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  return { trackEvent };
};

// Estender window para incluir gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
