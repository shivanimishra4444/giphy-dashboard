import './Pagination.css'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 0}
        className="pagination-button"
      >
        Previous
      </button>
      <span className="page-info">
        Page {page + 1} of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(page + 1)} 
        disabled={page >= totalPages - 1}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
