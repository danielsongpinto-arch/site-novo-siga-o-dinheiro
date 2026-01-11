import { useState } from 'react';
import { useNewsletter } from '@/contexts/NewsletterContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { addSubscriber } = useNewsletter();

  const categories = [
    'Análise Econômica',
    'Documentos Históricos',
    'Gráficos e Dados',
    'Tabelas Comparativas',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedCategories.length > 0) {
      addSubscriber(email, selectedCategories);
      setSubmitted(true);
      setEmail('');
      setSelectedCategories([]);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-amber-900/30 to-black/30 border border-amber-700/30 p-6">
      <div className="flex items-start gap-4">
        <Mail className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-amber-400 mb-2">Receba Novidades</h3>
          <p className="text-sm text-gray-300 mb-4">
            Inscreva-se em nossa newsletter para receber atualizações sobre novos artigos e análises
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Inscrição confirmada! Obrigado.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-amber-700/30 text-white placeholder-gray-500"
                required
              />

              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, cat]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(c => c !== cat));
                        }
                      }}
                      className="w-4 h-4 accent-amber-400"
                    />
                    <span className="text-sm text-gray-300">{cat}</span>
                  </label>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={!email || selectedCategories.length === 0}
              >
                Inscrever-se
              </Button>
            </form>
          )}
        </div>
      </div>
    </Card>
  );
}
