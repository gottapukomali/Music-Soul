import React from 'react';
import { Home, Search, Library, Heart, User } from 'lucide-react';

interface MobileNavProps {
  isDarkTheme: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isDarkTheme, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'liked', icon: Heart, label: 'Liked' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className={`md:hidden fixed bottom-20 left-0 right-0 z-30 ${
      isDarkTheme 
        ? 'bg-gray-900/95 border-gray-800' 
        : 'bg-white/95 border-gray-200'
    } backdrop-blur-md border-t`}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'text-yellow-400'
                : isDarkTheme
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${
              activeTab === item.id ? 'fill-current' : ''
            }`} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;