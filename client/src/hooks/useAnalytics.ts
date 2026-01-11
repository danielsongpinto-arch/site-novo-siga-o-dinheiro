import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    // Obter ID do Google Analytics das variáveis de ambiente
    const gaId = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';
    
    // Carregar Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId, {
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

  const trackVote = (itemId: string, itemType: string) => {
    trackEvent('vote', {
      item_id: itemId,
      item_type: itemType,
      timestamp: new Date().toISOString(),
    });
  };

  const trackNewsletterSignup = (categories: string[]) => {
    trackEvent('newsletter_signup', {
      categories: categories.join(','),
      timestamp: new Date().toISOString(),
    });
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
