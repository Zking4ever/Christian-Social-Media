import React, { useState } from 'react';
import VideoPage from './pages/VideoPage';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import AiMentorPage from './pages/aiMentor';
import WatchPage from './pages/WatchPage';
import UserProfile from './components/UserProfile/UserProfile';
import UploadPage from './pages/UploadPage';

import CommunitiesPage from './pages/CommunitiesPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';


function App() {

  return (
    <div className="youtube-clone">
      <Header />
      <div style={{ display: 'flex', width: '100%' }}>
        <SideBar />
        <div className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {/* Protected Routes */}
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/videos' element={
              <ProtectedRoute>
                <VideoPage />
              </ProtectedRoute>
            } />
            <Route path='/watch/:videoId' element={
              <ProtectedRoute>
                <WatchPage />
              </ProtectedRoute>
            } />
            <Route path='/communities' element={
              <ProtectedRoute>
                <CommunitiesPage />
              </ProtectedRoute>
            } />
            <Route path='/upload' element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            } />
            <Route path='/aimentor' element={
              <ProtectedRoute>
                <AiMentorPage />
              </ProtectedRoute>
            } />
            <Route path='/profile' element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
