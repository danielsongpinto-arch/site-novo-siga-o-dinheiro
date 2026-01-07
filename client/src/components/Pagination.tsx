import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Componente de paginação simples e elegante
 * - Navegação entre páginas com botões
 */

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxPagesToShow = 5;
  const halfWindow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfWindow);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>

      {startPage > 1 && (
        <>
          <Button
            onClick={() => onPageChange(1)}
            variant="outline"
            size="sm"
          >
            1
          </Button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          className={
            currentPage === page
              ? "bg-amber-600 hover:bg-amber-700 text-black"
              : ""
          }
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
          <Button
            onClick={() => onPageChange(totalPages)}
            variant="outline"
            size="sm"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        className="gap-1"
      >
        Próximo
        <ChevronRight className="w-4 h-4" />
      </Button>

      <div className="ml-4 text-sm text-gray-400">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
}
