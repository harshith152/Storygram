import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';  
import AddStory from './pages/AddStory'; 
import Bookmark from './pages/Bookmark'; 
import StoryDetail from './components/StoryDetail';

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false); 

  const openLogin = () => setShowLoginModal(true);
  const openRegister = () => setShowRegisterModal(true);
  const openAddStory = () => setShowAddStoryModal(true);  
  const closeLogin = () => setShowLoginModal(false);
  const closeRegister = () => setShowRegisterModal(false);
  const closeAddStory = () => setShowAddStoryModal(false);  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Home openLogin={openLogin} openRegister={openRegister} />} 
          />
          <Route 
            path="/profile" 
            element={<Profile openAddStory={openAddStory} />} 
          />
          <Route 
            path="/bookmark" 
            element={<Bookmark />} 
          />
          <Route 
            path="/bookmark/:id" 
            element={<StoryDetail />} 
          />
        </Routes>

        {showLoginModal && (
          <div className="modal-overlay">
            <Login closeModal={closeLogin} />
          </div>
        )}

        {showRegisterModal && (
          <div className="modal-overlay">
            <Register closeModal={closeRegister} />
          </div>
        )}

        {showAddStoryModal && (
          <div className="modal-overlay">
            <AddStory closeModal={closeAddStory} />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
