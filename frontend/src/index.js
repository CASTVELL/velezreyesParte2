import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

// Import of pages components
import Home from './pages/Home';
import Query from './pages/Query';
import Queries from './pages/Queries';

// Import of components
import Header from './components/Header';

// Create a new context
export const DropdownContext = createContext();

const App = () => {
  // Create a state to store the selected value
  const [selectedValue, setSelectedValue] = useState('0');

  return (
    <Router>
      {/* Use the Provider component to share the state */}
      <DropdownContext.Provider value={{ selectedValue, setSelectedValue }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/query/:id" element={<Query />} />
          <Route path="/queries" element={<Queries />} />
        </Routes>
      </DropdownContext.Provider>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);