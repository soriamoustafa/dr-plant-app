import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Calculate pagination range (show 5 pages max)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesDisplayed = Math.min(5, totalPages);
    
    let startPage = Math.max(1, currentPage - Math.floor(totalPagesDisplayed / 2));
    const endPage = Math.min(totalPages, startPage + totalPagesDisplayed - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - totalPagesDisplayed + 1 > 0) {
      startPage = Math.max(1, endPage - totalPagesDisplayed + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className={`w-10 h-10 rounded-full border ${currentPage === 1 ? 'border-neutral-200 text-neutral-300 cursor-not-allowed' : 'border-primary-dark text-primary-dark  hover:bg-primary hover:text-primary'}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} className="text-inherit" />
        </Button>
        
        {getPageNumbers().map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={`w-10 h-10 rounded-full ${
              currentPage === page 
                ? 'bg-primary-dark text-gray-600 border border-primary-light ' 
                : 'border border-primary-light text-primary hover:bg-primary-dark hover:text-primary'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="icon"
          className={`w-10 h-10 rounded-full border ${currentPage === totalPages ? 'border-neutral-200 text-neutral-300 cursor-not-allowed' : 'border-primary-light text-primary-dark hover:bg-primary-light hover:text-white'}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
