import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import ExerciseLibrary from './pages/ExerciseLibrary';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/log" element={<LogWorkout />} />
            <Route path="/exercises" element={<ExerciseLibrary />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
