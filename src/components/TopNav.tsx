import React, { useState } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

interface TopNavProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (theme: boolean) => void;
}

const TopNav: React.FC<TopNavProps> = ({ isDarkTheme, setIsDarkTheme }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 backdrop-blur-md border-b transition-all duration-200 ${
      isDarkTheme 
        ? 'bg-gray-950/90 border-gray-800' 
        : 'bg-white/90 border-gray-200'
    }`}>
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-black font-bold text-sm">MS</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Music Soul
        </h1>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className={`relative flex items-center rounded-full px-4 py-2 transition-all duration-200 w-full ${
          isDarkTheme 
            ? 'bg-gray-800/70 hover:bg-gray-700/80 border border-gray-700' 
            : 'bg-gray-100/70 hover:bg-gray-200/80 border border-gray-200'
        } backdrop-blur-sm`}>
          <Search className="w-4 h-4 mr-3 text-gray-400" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
            isDarkTheme 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-200'
          }`}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle mobile menu"
        >
          {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button className={`p-2 rounded-full transition-colors duration-200 relative ${
            isDarkTheme 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-200'
          }`}>
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-yellow-500/20 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm font-medium">Alex Rivera</span>
            </button>
            
            <ProfileDropdown 
              isOpen={showProfileDropdown}
              onClose={() => setShowProfileDropdown(false)}
              isDarkTheme={isDarkTheme}
              setIsDarkTheme={setIsDarkTheme}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className={`md:hidden absolute top-16 left-0 right-0 p-4 border-b backdrop-blur-md ${
          isDarkTheme 
            ? 'bg-gray-950/95 border-gray-800' 
            : 'bg-white/95 border-gray-200'
        }`}>
          {/* Mobile Search */}
          <div className={`relative flex items-center rounded-full px-4 py-3 mb-4 ${
            isDarkTheme 
              ? 'bg-gray-800' 
              : 'bg-gray-100'
          }`}>
            <Search className="w-4 h-4 mr-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search music..."
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
            />
          </div>

          {/* Mobile Profile */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-medium">Alex Rivera</p>
                <p className="text-xs text-gray-400">alex.rivera@email.com</p>
              </div>
            </div>
            <button className={`p-2 rounded-full transition-colors duration-200 relative ${
              isDarkTheme 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-200'
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;