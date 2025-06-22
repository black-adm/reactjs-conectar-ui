import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon
} from "@phosphor-icons/react";

import { Button } from "../../../components/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange
}: PaginationProps) {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) rangeWithDots.push(1, '...');
    else rangeWithDots.push(1);

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) rangeWithDots.push('...', totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-light">
            Mostrando <span className="font-medium">{startItem}</span> a{' '}
            <span className="font-medium">{endItem}</span> de{' '}
            <span className="font-medium">{total}</span> resultados.
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-light font-medium">
            <span>Página {currentPage} de {totalPages}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            title="Primeira página"
            className="hover:bg-gray-100 hover:text-gray-main"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <CaretDoubleLeftIcon className="size-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            title="Página anterior"
            className="hover:bg-gray-100 hover:text-gray-main"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <CaretLeftIcon className="size-4" />
          </Button>

          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-gray-light">...</span>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => onPageChange(page as number)}
                    className={`min-w-[40px] h-10 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${currentPage === page
                      ? 'bg-gray-200 text-gray-light hover:bg-gray-100'
                      : 'bg-white text-gray-main hover:bg-gray-100 border border-gray-200'
                      }`}
                  >
                    {page}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            size="icon"
            variant="outline"
            title="Próxima página"
            className="hover:bg-gray-100 hover:text-gray-main"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <CaretRightIcon className="size-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            title="Última página"
            className="hover:bg-gray-100 hover:text-gray-main"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <CaretDoubleRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}