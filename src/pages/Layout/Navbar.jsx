import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 md:h-20 bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-full h-full px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="h-10 md:h-12 w-10 md:w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-6 md:h-7 w-6 md:w-7 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">BookManager</h1>
            <p className="text-xs text-gray-500">Library Management System</p>
          </div>
        </Link>
        
      
      </div>
    </header>
  );
}