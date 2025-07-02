import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Heart, MoreHorizontal, Search } from 'lucide-react';

interface MainContentProps {
  isDarkTheme: boolean;
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  setCurrentSong: (song: any) => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
  isDarkTheme, 
  leftPanelOpen, 
  rightPanelOpen, 
  setCurrentSong 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);

  const recentlyPlayed = [
    {
      title: "Synthwave Sunset",
      artist: "Neon Drive",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Jazz Cafe",
      artist: "Smooth Notes",
      artwork: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Electronic Dreams",
      artist: "Digital Waves",
      artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Acoustic Sessions",
      artist: "Folk Heart",
      artwork: "https://images.pexels.com/photos/1699340/pexels-photo-1699340.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Urban Beats",
      artist: "City Rhythm",
      artwork: "https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Classical Harmony",
      artist: "Orchestra Elite",
      artwork: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ];

  const featuredPlaylists = [
    {
      title: "Today's Top Hits",
      description: "The biggest songs right now",
      artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Chill Mix",
      description: "Relax and unwind",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Workout Anthems",
      description: "High energy tracks",
      artwork: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Late Night Vibes",
      description: "Perfect for night time",
      artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ];

  const quickAccess = [
    {
      title: "Liked Songs",
      artist: "247 songs",
      artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Recently Played",
      artist: "Your recent tracks",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Discover Weekly",
      artist: "Fresh picks for you",
      artwork: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Daily Mix 1",
      artist: "Your favorites",
      artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Release Radar",
      artist: "New releases",
      artwork: "https://images.pexels.com/photos/1699340/pexels-photo-1699340.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      title: "Chill Hits",
      artist: "Relaxing music",
      artwork: "https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ];

  // Touch and mouse event handlers
  useEffect(() => {
    const handleTouchStart = () => {
      setTouchStartTime(Date.now());
      setIsHidden(true);
    };

    const handleTouchEnd = () => {
      setIsHidden(false);
    };

    const handleMouseDown = () => {
      setTouchStartTime(Date.now());
      setIsHidden(true);
    };

    const handleMouseUp = () => {
      setIsHidden(false);
    };

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePlaySong = (song: any) => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      album: "Album Name",
      artwork: song.artwork
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // All content sections as an array for horizontal layout
  const contentSections = [
    // Hero Section
    {
      id: 'hero',
      content: (
        <div className={`min-w-[400px] max-w-[500px] rounded-2xl p-8 bg-gradient-to-br from-yellow-500/20 via-yellow-600/30 to-orange-500/20 border backdrop-blur-sm ${
          isDarkTheme ? 'border-yellow-500/20' : 'border-yellow-500/30'
        }`}>
          <h1 className="text-4xl font-bold mb-2">
            {getGreeting()}, <span className="text-yellow-400">Alex</span>
          </h1>
          <p className={`text-lg mb-6 ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to feel the music? Let's discover your next favorite track.
          </p>
          
          <div className={`relative rounded-full px-6 py-4 transition-all duration-200 backdrop-blur-md ${
            isDarkTheme 
              ? 'bg-gray-900/50 hover:bg-gray-800/60 border border-gray-700' 
              : 'bg-white/70 hover:bg-white/90 border border-gray-200'
          }`}>
            <div className="flex items-center">
              <Search className="w-5 h-5 mr-4 text-yellow-500" />
              <input
                type="text"
                placeholder="Search for songs, artists, albums..."
                className="flex-1 bg-transparent outline-none text-lg placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      )
    },
    // Quick Access Section
    {
      id: 'quick-access',
      content: (
        <div className="min-w-[400px] max-w-[500px]">
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 gap-4">
            {quickAccess.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isDarkTheme 
                    ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                    : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
                } shadow-lg hover:shadow-xl border ${
                  isDarkTheme ? 'border-gray-800' : 'border-gray-200'
                }`}
              >
                <img
                  src={item.artwork}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                  <p className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  } truncate`}>
                    {item.artist}
                  </p>
                </div>
                <button
                  onClick={() => handlePlaySong(item)}
                  className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105 ml-4"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Recently Played Section
    {
      id: 'recently-played',
      content: (
        <div className="min-w-[400px] max-w-[500px]">
          <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
          <div className="space-y-4">
            {recentlyPlayed.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isDarkTheme 
                    ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                    : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
                } shadow-lg hover:shadow-xl border ${
                  isDarkTheme ? 'border-gray-800' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.artwork}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                    <p className={`text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    } truncate`}>
                      {item.artist}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePlaySong(item)}
                    className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105"
                  >
                    <Play className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Featured Playlists Section
    {
      id: 'featured',
      content: (
        <div className="min-w-[400px] max-w-[500px]">
          <h2 className="text-2xl font-bold mb-6">Made for You</h2>
          <div className="space-y-4">
            {featuredPlaylists.map((playlist, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isDarkTheme 
                    ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                    : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
                } shadow-lg hover:shadow-xl border ${
                  isDarkTheme ? 'border-gray-800' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={playlist.artwork}
                    alt={playlist.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{playlist.title}</h3>
                    <p className={`text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    } truncate`}>
                      {playlist.description}
                    </p>
                  </div>
                  <button className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105">
                    <Play className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Trending Section
    {
      id: 'trending',
      content: (
        <div className="min-w-[400px] max-w-[500px]">
          <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
          <div className="space-y-4">
            {recentlyPlayed.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isDarkTheme 
                    ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                    : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
                } shadow-lg hover:shadow-xl border ${
                  isDarkTheme ? 'border-gray-800' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={item.artwork}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 -left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                    <p className={`text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                    } truncate`}>
                      {item.artist}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePlaySong(item)}
                    className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105"
                  >
                    <Play className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <main className={`fixed top-16 bottom-24 left-0 right-0 transition-all duration-300 ${
      isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
    } ${isDarkTheme ? 'bg-gradient-to-r from-gray-950 to-black' : 'bg-gradient-to-r from-gray-50 to-white'}`}>
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .horizontal-scroll::-webkit-scrollbar {
          height: 12px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: ${isDarkTheme ? '#1f2937' : '#f3f4f6'};
          border-radius: 6px;
          margin: 0 20px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #f5b70c, #d1a009);
          border-radius: 6px;
          border: 2px solid ${isDarkTheme ? '#1f2937' : '#f3f4f6'};
        }
        .horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #d1a009, #b8900a);
        }
      `}</style>

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('left')}
          className={`p-3 rounded-full transition-all duration-200 shadow-lg ${
            isDarkTheme 
              ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white' 
              : 'bg-white/90 hover:bg-gray-100/90 text-gray-900'
          } backdrop-blur-md border ${
            isDarkTheme ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('right')}
          className={`p-3 rounded-full transition-all duration-200 shadow-lg ${
            isDarkTheme 
              ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white' 
              : 'bg-white/90 hover:bg-gray-100/90 text-gray-900'
          } backdrop-blur-md border ${
            isDarkTheme ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Horizontal Scrolling Content */}
      <div
        ref={scrollRef}
        className="h-full overflow-x-auto overflow-y-hidden horizontal-scroll flex items-center space-x-8 px-20 py-8"
      >
        {contentSections.map((section) => (
          <div key={section.id} className="flex-shrink-0">
            {section.content}
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className={`px-4 py-2 rounded-full text-xs font-medium ${
          isDarkTheme 
            ? 'bg-gray-800/90 text-gray-300' 
            : 'bg-white/90 text-gray-600'
        } backdrop-blur-md border ${
          isDarkTheme ? 'border-gray-700' : 'border-gray-200'
        }`}>
          Scroll horizontally to explore more →
        </div>
      </div>
    </main>
  );
};

export default MainContent;