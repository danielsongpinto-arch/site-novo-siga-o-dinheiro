import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  onFilter: (filters: {
    searchTerm: string;
    dateFrom?: string;
    dateTo?: string;
    type?: string;
  }) => void;
  types?: string[];
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Barra de filtros avançados para cada página
 * - Suporta busca por termo, data e tipo
 */

export default function FilterBar({ onFilter, types }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleApplyFilters = () => {
    onFilter({
      searchTerm,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      type: selectedType || undefined,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
    setSelectedType("");
    onFilter({
      searchTerm: "",
    });
  };

  const hasActiveFilters = searchTerm || dateFrom || dateTo || selectedType;

  return (
    <div className="mb-6">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-900/20 hover:bg-amber-900/30 border border-amber-900/50 rounded-lg text-amber-400 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              Ativo
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="mt-4 p-4 bg-card border border-amber-900/30 rounded-lg space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite para buscar..."
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Data De
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Data Até
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Type Filter */}
          {types && types.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">Todos</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-black font-semibold"
            >
              Aplicar Filtros
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
