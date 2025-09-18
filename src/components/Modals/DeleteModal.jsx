import { AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../Loader/LoadingSpinner';

const DeleteModal = ({ isOpen, onClose, onConfirm, bookTitle, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "{bookTitle}"? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size={16} className="text-white" />
                  <span>Deleting...</span>
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;