import apiClient from './axios';

export const getBooks = async () => {
  const response = await apiClient.get('/books');
  return response.data;
};

export const addBook = async (book) => {
  const response = await apiClient.post('/books', book);
  return response.data;
};

export const updateBook = async (id, updatedBook) => {
  const response = await apiClient.put(`/books/${id}`, updatedBook);
  return response.data;
};

export const deleteBook = async (id) => {
  await apiClient.delete(`/books/${id}`);
  return id;
};
