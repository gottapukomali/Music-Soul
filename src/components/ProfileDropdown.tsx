import React from 'react';
import { Settings, Sun, Moon, LogOut } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-12 w-56 rounded-lg shadow-2xl border backdrop-blur-md transition-all duration-200 ${
      isDarkTheme 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="p-2">
        <div className={`px-3 py-2 rounded-md ${
          isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <p className="font-medium text-sm">Alex Rivera</p>
          <p className={`text-xs ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            alex.rivera@email.com
          </p>
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
            {isDarkTheme ? (
              <>
                <Sun className="w-4 h-4" />
                <span>Switch to Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span>Switch to Dark Theme</span>
              </>
            )}
          </button>
          
          <hr className={`my-2 ${
            isDarkTheme ? 'border-gray-700' : 'border-gray-200'
          }`} />
          
          <button className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors duration-200 text-red-400 ${
            isDarkTheme 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-100'
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