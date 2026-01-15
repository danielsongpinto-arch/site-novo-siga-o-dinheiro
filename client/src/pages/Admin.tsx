import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useFirebase } from '@/contexts/FirebaseContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CATEGORIES = [
  'Análise Econômica',
  'Documentos Históricos',
  'Operações Militares',
  'Impacto Social',
  'Recuperação de Bens',
];

const TYPES = [
  { value: 'tema', label: 'Tema' },
  { value: 'artigo', label: 'Artigo' },
  { value: 'gráfico', label: 'Gráfico' },
  { value: 'tabela', label: 'Tabela' },
];

export default function Admin() {
  const { user, logout, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { items, loading, error, addItem, updateItem, deleteItem, fetchItems } = useFirebase();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    type: 'tema' as const,
    author: '',
    tags: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Verificar autenticação
  useEffect(() => {
    if (!user) {
      setLocation('/login');
    }
  }, [user, setLocation]);

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout realizado com sucesso!');
      setLocation('/');
    } catch (err) {
      toast.error('Erro ao fazer logout');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category || !formData.type) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const itemData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        type: formData.type,
        author: formData.author || user?.email || 'Anônimo',
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      };

      if (editingId) {
        await updateItem(editingId, itemData);
        toast.success('Item atualizado com sucesso!');
        setEditingId(null);
      } else {
        await addItem(itemData);
        toast.success('Item criado com sucesso!');
      }

      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        type: 'tema',
        author: '',
        tags: '',
      });
      setIsOpen(false);
    } catch (err) {
      toast.error('Erro ao salvar item');
      console.error(err);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description,
      content: item.content || '',
      category: item.category,
      type: item.type,
      author: item.author || '',
      tags: item.tags?.join(', ') || '',
    });
    setEditingId(item.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este item?')) {
      try {
        await deleteItem(id);
        toast.success('Item deletado com sucesso!');
      } catch (err) {
        toast.error('Erro ao deletar item');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      type: 'tema',
      author: '',
      tags: '',
    });
    setEditingId(null);
    setIsOpen(false);
  };

  if (!user) {
    return null; // Será redirecionado para login
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gold-500">Painel de Admin</h1>
            <p className="text-gray-400">
              Logado como: <strong>{user.email}</strong>
              {isAdmin && ' (Admin)'}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
          >
            Logout
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-red-500 bg-red-950/20">
            <CardContent className="pt-6">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleCancel()}
              className="mb-6 bg-gold-500 hover:bg-gold-600 text-black font-bold"
            >
              + Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-background border-gold-500/30">
            <DialogHeader>
              <DialogTitle className="text-gold-500">
                {editingId ? 'Editar Item' : 'Novo Item'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do item para {editingId ? 'atualizar' : 'criar'} um novo conteúdo
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Digite o título"
                  className="bg-gray-900 border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo *</label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="bg-gray-900 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Categoria *</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-gray-900 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Digite a descrição"
                  className="bg-gray-900 border-gray-700 h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Conteúdo Completo</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Digite o conteúdo completo (opcional)"
                  className="bg-gray-900 border-gray-700 h-32"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Autor</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Nome do autor"
                    className="bg-gray-900 border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-black font-bold">
                  {editingId ? 'Atualizar' : 'Criar'} Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {loading ? (
            <Card className="border-gold-500/30">
              <CardContent className="pt-6">
                <p className="text-center text-gray-400">Carregando itens...</p>
              </CardContent>
            </Card>
          ) : items.length === 0 ? (
            <Card className="border-gold-500/30">
              <CardContent className="pt-6">
                <p className="text-center text-gray-400">Nenhum item encontrado. Crie o primeiro!</p>
              </CardContent>
            </Card>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="border-gold-500/30 hover:border-gold-500/60 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gold-500">{item.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {item.type} • {item.category}
                        {item.author && ` • ${item.author}`}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id!)}
                      >
                        Deletar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-2">{item.description}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gold-500/20 text-gold-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
