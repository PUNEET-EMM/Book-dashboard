import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';


function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-50">

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard/> } />
          </Routes>
        </div>
      </Router>
  );
}

export default App;