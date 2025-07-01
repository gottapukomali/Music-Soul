import React, { useState, useEffect } from 'react';
import TopNav from './components/TopNav';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import MainContent from './components/MainContent';
import AudioPlayer from './components/AudioPlayer';
import MobileNav from './components/MobileNav';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    album: "Nocturnal Vibes",
    artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('musicSoulTheme');
    const savedLeftPanel = localStorage.getItem('musicSoulLeftPanel');
    const savedRightPanel = localStorage.getItem('musicSoulRightPanel');
    
    if (savedTheme) setIsDarkTheme(savedTheme === 'dark');
    if (savedLeftPanel && !isMobile) setLeftPanelOpen(savedLeftPanel === 'true');
    if (savedRightPanel && !isMobile) setRightPanelOpen(savedRightPanel === 'true');
  }, [isMobile]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('musicSoulTheme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('musicSoulLeftPanel', leftPanelOpen.toString());
    }
  }, [leftPanelOpen, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('musicSoulRightPanel', rightPanelOpen.toString());
    }
  }, [rightPanelOpen, isMobile]);

  // Handle mobile tab changes
  useEffect(() => {
    if (isMobile) {
      switch (activeTab) {
        case 'library':
          setLeftPanelOpen(true);
          setRightPanelOpen(false);
          break;
        case 'liked':
          setRightPanelOpen(true);
          setLeftPanelOpen(false);
          break;
        default:
          setLeftPanelOpen(false);
          setRightPanelOpen(false);
      }
    }
  }, [activeTab, isMobile]);

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

      <MobileNav
        isDarkTheme={isDarkTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default App;