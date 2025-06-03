import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SkillsList from './pages/SkillsList';
import AddSkill from './pages/AddSkill';
import Profile from './pages/Profile';
import Login from './components/Login';
import Signup from './components/Signup';

export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);


  const authContextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<SkillsList />} />
            <Route path="/add-skill" element={<AddSkill />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
