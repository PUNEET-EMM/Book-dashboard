import { Edit, Trash2, Calendar, User, BookOpen, Tag } from 'lucide-react';

const BookTable = ({
  books,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  booksPerPage,
  filteredLength,
}) => {
  const startIndex = (currentPage - 1) * booksPerPage + 1;
  const endIndex = Math.min(currentPage * booksPerPage, filteredLength);

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let page = 1; page <= totalPages; page++) {
        buttons.push(
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm min-w-[32px] sm:min-w-[36px] ${
              page === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        );
      }
    } else {
      // Show condensed pagination for many pages
      if (currentPage > 2) {
        buttons.push(
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm min-w-[32px] sm:min-w-[36px] hover:bg-gray-50"
          >
            1
          </button>
        );
        if (currentPage > 3) {
          buttons.push(
            <span key="ellipsis1" className="px-1 sm:px-2 text-gray-500 text-xs sm:text-sm">
              …
            </span>
          );
        }
      }

      // Show current page and adjacent pages
      for (let page = Math.max(1, currentPage - 1); page <= Math.min(totalPages, currentPage + 1); page++) {
        buttons.push(
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm min-w-[32px] sm:min-w-[36px] ${
              page === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          buttons.push(
            <span key="ellipsis2" className="px-1 sm:px-2 text-gray-500 text-xs sm:text-sm">
              …
            </span>
          );
        }
        buttons.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm min-w-[32px] sm:min-w-[36px] hover:bg-gray-50"
          >
            {totalPages}
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Books ({filteredLength} total)
          </h2>
          {filteredLength > 0 && (
            <p className="text-xs sm:text-sm text-gray-500">
              Showing {startIndex}-{endIndex} of {filteredLength}
            </p>
          )}
        </div>
      </div>

      {books.length === 0 ? (
        <div className="p-8 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-sm sm:text-base">No books found matching your criteria.</p>
        </div>
      ) : (
        <>
          {/* Mobile Card Layout */}
          <div className="block lg:hidden">
            <div className="divide-y divide-gray-200">
              {books.map((book) => (
                <div key={book.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">
                        {book.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                        <User size={12} />
                        <span className="truncate">{book.author}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => onEdit(book)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                        aria-label="Edit book"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(book)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete book"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Tag size={12} className="text-gray-400 flex-shrink-0" />
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium truncate">
                        {book.genre}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600">{book.publishedYear}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        book.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="max-w-xs truncate">{book.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="max-w-xs truncate">{book.author}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {book.publishedYear}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          book.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(book)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                          aria-label="Edit book"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(book)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                          aria-label="Delete book"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-3 sm:px-6 py-3 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <div className="flex gap-1 max-w-xs overflow-x-auto">
                {renderPageButtons()}
              </div>
              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTable;