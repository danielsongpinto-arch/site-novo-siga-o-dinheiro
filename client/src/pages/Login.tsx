import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Login() {
  const { login, register, loading, error } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    try {
      if (isRegistering) {
        await register(email, password);
        toast.success('Conta criada com sucesso!');
      } else {
        await login(email, password);
        toast.success('Login realizado com sucesso!');
      }
      setLocation('/admin');
    } catch (err) {
      toast.error(error || 'Erro ao autenticar');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-gold-500/30">
        <CardHeader>
          <CardTitle className="text-gold-500">
            {isRegistering ? 'Criar Conta' : 'Login Admin'}
          </CardTitle>
          <CardDescription>
            {isRegistering
              ? 'Crie uma conta para acessar o painel de admin'
              : 'Faça login para gerenciar conteúdo'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-gray-900 border-gray-700"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-900 border-gray-700"
                disabled={loading}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold"
              disabled={loading}
            >
              {loading ? 'Carregando...' : isRegistering ? 'Criar Conta' : 'Fazer Login'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-gray-400">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsRegistering(!isRegistering)}
              disabled={loading}
            >
              {isRegistering ? 'Já tem conta? Faça login' : 'Não tem conta? Crie uma'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-950/20 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-400">
              <strong>Demo:</strong> Use qualquer email e senha para criar uma conta de teste.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
