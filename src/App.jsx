import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './pages/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
// import Layout from './components/layout/Layout';
// import Dashboard from './pages/Dashboard';
// import { BooksProvider } from './context/BooksContext';

function App() {
  return (
    // <BooksProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <Layout>
                <Dashboard/>
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    // </BooksProvider>
  );
}

export default App;