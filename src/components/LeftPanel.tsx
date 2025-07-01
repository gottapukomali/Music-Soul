import React from 'react';
import { 
  Heart, 
  Music, 
  Disc, 
  Users, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  X
} from 'lucide-react';

interface LeftPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDarkTheme: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isOpen, setIsOpen, isDarkTheme }) => {
  const menuItems = [
    { icon: Heart, label: 'Liked Songs', count: 247 },
    { icon: Music, label: 'Playlists', count: 12 },
    { icon: Disc, label: 'Albums', count: 34 },
    { icon: Users, label: 'Artists', count: 89 },
    { icon: Download, label: 'Downloads', count: 156 }
  ];

  const recentPlaylists = [
    'Chill Vibes',
    'Workout Mix',
    'Late Night Jazz',
    'Road Trip Classics',
    'Focus Flow'
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`${
        isOpen ? 'w-64' : 'w-16'
      } transition-all duration-200 ease-in-out border-r ${
        isDarkTheme 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      } flex flex-col ${
        isOpen ? 'md:relative fixed z-40 h-full' : 'hidden md:flex'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {isOpen && (
            <h2 className="font-semibold text-lg">My Library</h2>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDarkTheme 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-100'
            }`}
            aria-label={isOpen ? 'Collapse library' : 'Expand library'}
          >
            {isOpen ? (
              <div className="md:hidden">
                <X className="w-4 h-4" />
              </div>
            ) : null}
            <div className="hidden md:block">
              {isOpen ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isDarkTheme 
                    ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left font-medium">{item.label}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkTheme 
                          ? 'bg-gray-800 text-gray-400 group-hover:bg-yellow-500/20 group-hover:text-yellow-400' 
                          : 'bg-gray-200 text-gray-500 group-hover:bg-yellow-100 group-hover:text-yellow-600'
                      }`}>
                        {item.count}
                      </span>
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {isOpen && (
            <>
              {/* Create Playlist */}
              <div className="mt-8">
                <button className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isDarkTheme 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-yellow-600'
                }`}>
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Create Playlist</span>
                </button>
              </div>

              {/* Recent Playlists */}
              <div className="mt-6">
                <h3 className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Recent Playlists
                </h3>
                <ul className="space-y-1 mt-2">
                  {recentPlaylists.map((playlist, index) => (
                    <li key={index}>
                      <button className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isDarkTheme 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}>
                        <span className="text-sm">{playlist}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default LeftPanel;