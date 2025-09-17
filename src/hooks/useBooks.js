import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, addBook, updateBook, deleteBook } from '../services/api/books';

export function useBooks() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  const createBook = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const editBook = useMutation({
    mutationFn: ({ id, data }) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const removeBook = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  return {
    booksQuery,
    createBook,
    editBook,
    removeBook,
  };
}
