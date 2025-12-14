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


function App() {

  return (
    <div className="youtube-clone">
      <Header />
      <div style={{ display: 'flex', width: '100%' }}>
        <SideBar />
        <div className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/videos' element={<VideoPage />} />
            <Route path='/watch/:videoId' element={<WatchPage />} />
            <Route path='/communities' element={<CommunitiesPage />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/aimentor' element={<AiMentorPage />} />
            <Route path='/profile' element={<UserProfile />} /> {/* Added UserProfile route */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
