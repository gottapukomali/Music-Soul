import React, { useState, useEffect } from 'react';
import TopNav from './components/TopNav';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import MainContent from './components/MainContent';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    album: "Nocturnal Vibes",
    artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  });

  // Load preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('musicSoulTheme');
    const savedLeftPanel = localStorage.getItem('musicSoulLeftPanel');
    const savedRightPanel = localStorage.getItem('musicSoulRightPanel');
    
    if (savedTheme) setIsDarkTheme(savedTheme === 'dark');
    if (savedLeftPanel) setLeftPanelOpen(savedLeftPanel === 'true');
    if (savedRightPanel) setRightPanelOpen(savedRightPanel === 'true');
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('musicSoulTheme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  useEffect(() => {
    localStorage.setItem('musicSoulLeftPanel', leftPanelOpen.toString());
  }, [leftPanelOpen]);

  useEffect(() => {
    localStorage.setItem('musicSoulRightPanel', rightPanelOpen.toString());
  }, [rightPanelOpen]);

  return (
    <div className={`min-h-screen font-poppins transition-colors duration-200 ${
      isDarkTheme ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <TopNav 
        isDarkTheme={isDarkTheme} 
        setIsDarkTheme={setIsDarkTheme}
      />
      
      <div className="flex h-screen pt-16">
        <LeftPanel 
          isOpen={leftPanelOpen}
          setIsOpen={setLeftPanelOpen}
          isDarkTheme={isDarkTheme}
        />
        
        <MainContent 
          isDarkTheme={isDarkTheme}
          leftPanelOpen={leftPanelOpen}
          rightPanelOpen={rightPanelOpen}
          setCurrentSong={setCurrentSong}
        />
        
        <RightPanel 
          isOpen={rightPanelOpen}
          setIsOpen={setRightPanelOpen}
          isDarkTheme={isDarkTheme}
          currentSong={currentSong}
        />
      </div>
      
      <AudioPlayer 
        isDarkTheme={isDarkTheme}
        currentSong={currentSong}
      />
    </div>
  );
}

export default App;