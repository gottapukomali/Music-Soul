import React, { useEffect, useRef } from 'react';
import { Settings, Monitor, LogOut, Sun, Moon } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
  setIsDarkTheme: (theme: boolean) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  isOpen, 
  onClose, 
  isDarkTheme, 
  setIsDarkTheme 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-12 w-56 rounded-lg shadow-2xl border backdrop-blur-md transition-all duration-200 ${
        isDarkTheme 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}
    >
      <div className="p-2">
        <div className={`px-3 py-2 rounded-md ${
          isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <p className="font-medium text-sm">Alex Rivera</p>
          <p className="text-xs text-gray-400">alex.rivera@email.com</p>
        </div>
        
        <div className="mt-2 space-y-1">
          <button className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
            isDarkTheme 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-100'
          }`}>
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
          
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
              isDarkTheme 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-100'
            }`}
          >
            {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme</span>
          </button>
          
          <hr className={`my-2 ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`} />
          
          <button className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
            isDarkTheme 
              ? 'hover:bg-gray-800 text-red-400' 
              : 'hover:bg-gray-100 text-red-600'
          }`}>
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;