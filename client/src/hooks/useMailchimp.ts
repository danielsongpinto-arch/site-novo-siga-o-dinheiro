import { useState } from 'react';

export interface MailchimpConfig {
  apiKey: string;
  listId: string;
  serverPrefix: string; // ex: us1, us2, etc
}

export function useMailchimp(config?: MailchimpConfig) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subscribeToNewsletter = async (email: string, mergeFields?: Record<string, string>) => {
    if (!config) {
      console.warn('Mailchimp config not provided');
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Construir URL da API do Mailchimp
      const listId = config.listId;
      const serverPrefix = config.serverPrefix;
      const apiKey = config.apiKey;

      // Endpoint da API do Mailchimp
      const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;

      // Preparar dados
      const data = {
        email_address: email,
        status: 'pending', // ou 'subscribed' dependendo da configuração
        merge_fields: mergeFields || {},
      };

      // Fazer requisição
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao inscrever na newsletter');
      }

      setSuccess(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeFromNewsletter = async (email: string) => {
    if (!config) {
      console.warn('Mailchimp config not provided');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const listId = config.listId;
      const serverPrefix = config.serverPrefix;
      const apiKey = config.apiKey;

      // Converter email para hash MD5 (Mailchimp requer isso)
      const md5Email = await hashEmail(email);

      const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${md5Email}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao desinscrever da newsletter');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    loading,
    error,
    success,
  };
}

// Função auxiliar para converter email para MD5 (necessário para Mailchimp)
async function hashEmail(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
