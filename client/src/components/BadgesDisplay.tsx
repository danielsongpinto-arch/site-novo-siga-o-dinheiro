import { useBadges } from '@/contexts/BadgesContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BadgesDisplay() {
  const { badges, getBadgesDesbloqueados } = useBadges();
  const badgesDesbloqueados = getBadgesDesbloqueados();
  const totalBadges = badges.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-amber-400">Conquistas</h3>
        <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-700">
          {badgesDesbloqueados.length} / {totalBadges}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-amber-700/30">
        <div
          className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-500"
          style={{ width: `${(badgesDesbloqueados.length / totalBadges) * 100}%` }}
        />
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              badge.desbloqueado
                ? 'bg-amber-900/30 border border-amber-600'
                : 'bg-black/30 border border-gray-700 opacity-50'
            }`}
            title={badge.nome}
          >
            <div className="text-2xl">{badge.icone}</div>
            <span className="text-xs text-center text-gray-300 line-clamp-1">{badge.nome}</span>
          </div>
        ))}
      </div>

      {/* Desbloqueados */}
      {badgesDesbloqueados.length > 0 && (
        <Card className="bg-amber-900/20 border border-amber-700/30 p-4">
          <h4 className="text-sm font-semibold text-amber-400 mb-3">Conquistas Desbloqueadas</h4>
          <div className="space-y-2">
            {badgesDesbloqueados.map((badge) => (
              <div key={badge.id} className="flex items-start gap-2">
                <span className="text-xl">{badge.icone}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-300">{badge.nome}</p>
                  <p className="text-xs text-gray-400">{badge.descricao}</p>
                  {badge.dataDesbloqueio && (
                    <p className="text-xs text-gray-500">Desbloqueado em {badge.dataDesbloqueio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
