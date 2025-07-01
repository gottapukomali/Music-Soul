import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Music2,
  List,
  Volume2,
  Clock,
  X
} from 'lucide-react';

interface RightPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDarkTheme: boolean;
  currentSong: {
    title: string;
    artist: string;
    album: string;
    artwork: string;
  };
}

const RightPanel: React.FC<RightPanelProps> = ({ 
  isOpen, 
  setIsOpen, 
  isDarkTheme, 
  currentSong 
}) => {
  const upNextQueue = [
    {
      title: "Neon Nights",
      artist: "Cyber Dreams",
      duration: "3:42",
      artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Ocean Waves",
      artist: "Serene Sounds",
      duration: "4:15",
      artwork: "https://images.pexels.com/photos/1699340/pexels-photo-1699340.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "City Lights",
      artist: "Urban Pulse",
      duration: "3:28",
      artwork: "https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Mountain Echo",
      artist: "Nature's Call",
      duration: "5:01",
      artwork: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
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
        isOpen ? 'w-80' : 'w-16'
      } transition-all duration-200 ease-in-out border-l ${
        isDarkTheme 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      } flex flex-col ${
        isOpen ? 'md:relative fixed right-0 z-40 h-full' : 'hidden md:flex'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDarkTheme 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-100'
            }`}
            aria-label={isOpen ? 'Collapse feel the music panel' : 'Expand feel the music panel'}
          >
            {isOpen ? (
              <div className="md:hidden">
                <X className="w-4 h-4" />
              </div>
            ) : null}
            <div className="hidden md:block">
              {isOpen ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </div>
          </button>
          {isOpen && (
            <h2 className="font-semibold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              FEEL THE MUSIC
            </h2>
          )}
        </div>

        {isOpen && (
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Now Playing */}
            <div className={`rounded-xl p-4 ${
              isDarkTheme 
                ? 'bg-gradient-to-br from-gray-800 to-gray-850' 
                : 'bg-gradient-to-br from-gray-50 to-gray-100'
            }`}>
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Music2 className="w-4 h-4 mr-2 text-yellow-400" />
                Now Playing
              </h3>
              <div className="flex items-center space-x-3">
                <img
                  src={currentSong.artwork}
                  alt={`${currentSong.title} artwork`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{currentSong.title}</p>
                  <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
                </div>
                <button className="p-2 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition-colors duration-200">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-yellow-500 text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center">
                <Music2 className="w-4 h-4 mr-2" />
                Lyrics
              </button>
              <button className={`flex-1 px-4 py-2 rounded-full font-medium text-sm border transition-colors duration-200 flex items-center justify-center ${
                isDarkTheme 
                  ? 'border-gray-600 hover:bg-gray-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <List className="w-4 h-4 mr-2" />
                Queue
              </button>
            </div>

            {/* Up Next */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                Up Next
              </h3>
              <div className="space-y-2">
                {upNextQueue.map((song, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-opacity-50 transition-colors duration-200 cursor-pointer ${
                      isDarkTheme 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <img
                      src={song.artwork}
                      alt={`${song.title} artwork`}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{song.title}</p>
                      <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                    </div>
                    <span className="text-xs text-gray-400">{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default RightPanel;