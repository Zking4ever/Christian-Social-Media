import React from 'react';
import VideoPage from './pages/VideoPage';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="youtube-clone">
      <Header />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/videos' element={<VideoPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
