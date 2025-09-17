import { useState, useEffect } from 'react';
import { X} from 'lucide-react';
import { GENRES } from "../../utils/constants";


const BookModal = ({ book, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    status: 'Available'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: '',
        author: '',
        genre: '',
        publishedYear: '',
        status: 'Available'
      });
    }
    setErrors({});
  }, [book, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    if (!formData.publishedYear) {
      newErrors.publishedYear = 'Published year is required';
    } else if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear()) {
      newErrors.publishedYear = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        publishedYear: parseInt(formData.publishedYear)
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{book ? 'Edit Book' : 'Add New Book'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full p-2 border rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter book title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author *</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className={`w-full p-2 border rounded-lg ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter author name"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Genre *</label>
            <select
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
              className={`w-full p-2 border rounded-lg ${errors.genre ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select genre</option>
              {GENRES.filter(g => g !== 'All').map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Published Year *</label>
            <input
              type="number"
              value={formData.publishedYear}
              onChange={(e) => setFormData({...formData, publishedYear: e.target.value})}
              className={`w-full p-2 border rounded-lg ${errors.publishedYear ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter published year"
              min="1000"
              max={new Date().getFullYear()}
            />
            {errors.publishedYear && <p className="text-red-500 text-sm mt-1">{errors.publishedYear}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {book ? 'Update' : 'Add'} Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BookModal