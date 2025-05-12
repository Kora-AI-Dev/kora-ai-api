import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DocumentationPage from './pages/DocumentationPage';
import ApiKeysPage from './pages/ApiKeysPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/keys" element={<ApiKeysPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;