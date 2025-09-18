import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { GENRES } from "../../utils/constants";
import LoadingSpinner from '../Loader/LoadingSpinner';

const BookModal = ({ book, isOpen, onClose, onSave, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publishedYear: '',
      status: 'Available'
    }
  });

  useEffect(() => {
    if (book) {
      reset(book);
    } else {
      reset({
        title: '',
        author: '',
        genre: '',
        publishedYear: '',
        status: 'Available'
      });
    }
  }, [book, isOpen, reset]);

  const onSubmit = (data) => {
    onSave({
      ...data,
      publishedYear: parseInt(data.publishedYear)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{book ? 'Edit Book' : 'Add New Book'}</h2>
          <button 
            onClick={onClose} 
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              disabled={isLoading}
              {...register('title', { required: 'Title is required' })}
              className={`w-full p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter book title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1">Author *</label>
            <input
              type="text"
              disabled={isLoading}
              {...register('author', { required: 'Author is required' })}
              className={`w-full p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter author name"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium mb-1">Genre *</label>
            <select
              disabled={isLoading}
              {...register('genre', { required: 'Genre is required' })}
              className={`w-full p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${errors.genre ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select genre</option>
              {GENRES.filter(g => g !== 'All').map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          {/* Published Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Published Year *</label>
            <input
              type="number"
              disabled={isLoading}
              {...register('publishedYear', {
                required: 'Published year is required',
                min: { value: 1000, message: 'Enter a valid year' },
                max: { value: new Date().getFullYear(), message: 'Enter a valid year' }
              })}
              className={`w-full p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${errors.publishedYear ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter published year"
            />
            {errors.publishedYear && (
              <p className="text-red-500 text-sm mt-1">{errors.publishedYear.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              disabled={isLoading}
              {...register('status')}
              className="w-full p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size={16} className="text-white" />
                  <span>{book ? 'Updating...' : 'Adding...'}</span>
                </>
              ) : (
                <span>{book ? 'Update' : 'Add'} Book</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;