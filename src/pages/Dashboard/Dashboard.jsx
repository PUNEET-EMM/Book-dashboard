import { useState, useMemo } from 'react';
import { Plus, Search, Filter, BookOpen } from 'lucide-react';
import { useBooks } from '../../hooks/useBooks';
import BookModal from '../../components/Modals/BookModal';
import BookTable from './BookTable';
import DeleteModal from '../../components/Modals/DeleteModal';
import Toast from '../../components/Toast/Toast';
import { GENRES, STATUSES } from "../../utils/constants";
import Layout from "../Layout/Layout"

export default function Dashboard() {
  const { booksQuery, createBook, editBook, removeBook } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBook, setEditingBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, book: null });
  const [toast, setToast] = useState(null);

  const booksPerPage = 10;
  const filteredBooks = useMemo(() => {
    if (!booksQuery.data) return [];
    return booksQuery.data.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter === 'All' || book.genre === genreFilter;
      const matchesStatus = statusFilter === 'All' || book.status === statusFilter;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [booksQuery.data, searchTerm, genreFilter, statusFilter]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  const handleSave = (book) => {
    if (editingBook) {
      editBook.mutate({ id: editingBook.id, data: book }, {
        onSuccess: () => {
          setToast({ message: 'Book updated successfully!', type: 'success' });
          setIsModalOpen(false);
          setEditingBook(null);
        },
        onError: () => setToast({ message: 'Error updating book', type: 'error' }),
      });
    } else {
      createBook.mutate(book, {
        onSuccess: () => {
          setToast({ message: 'Book added successfully!', type: 'success' });
          setIsModalOpen(false);
        },
        onError: () => setToast({ message: 'Error adding book', type: 'error' }),
      });
    }
  };

  const confirmDelete = () => {
    removeBook.mutate(deleteModal.book.id, {
      onSuccess: () => {
        setToast({ message: 'Book deleted successfully!', type: 'success' });
        setDeleteModal({ isOpen: false, book: null });
      },
      onError: () => setToast({ message: 'Error deleting book', type: 'error' }),
    });
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <BookOpen className="text-blue-500 flex-shrink-0" size={24} />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                Book Management Dashboard
              </h1>
            </div>
            <button 
              onClick={() => { setEditingBook(null); setIsModalOpen(true); }} 
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base font-medium min-h-[44px] w-full sm:w-auto"
            >
              <Plus size={18} className="flex-shrink-0" /> 
              <span>Add Book</span>
            </button>
          </div>
          
          {/* search and filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by title or author…" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base min-h-[44px]" 
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={genreFilter} 
                onChange={(e) => setGenreFilter(e.target.value)} 
                className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base min-h-[44px]"
              >
                {GENRES.map((g) => <option key={g} value={g}>{g === 'All' ? 'All Genres' : g}</option>)}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)} 
                className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base min-h-[44px]"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* books table */}
        <BookTable
          books={paginatedBooks}
          onEdit={(book) => { setEditingBook(book); setIsModalOpen(true); }}
          onDelete={(book) => setDeleteModal({ isOpen: true, book })}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          booksPerPage={booksPerPage}
          filteredLength={filteredBooks.length}
        />
      </div>

      <BookModal
        book={editingBook}
        isOpen={isModalOpen}
        onSave={handleSave}
        onClose={() => { setIsModalOpen(false); setEditingBook(null); }}
      />
      
      <DeleteModal
        isOpen={deleteModal.isOpen}
        bookTitle={deleteModal.book?.title}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModal({ isOpen: false, book: null })}
      />
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
    </Layout>
  );
}