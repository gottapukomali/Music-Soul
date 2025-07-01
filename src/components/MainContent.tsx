import React, { useRef } from 'react';
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

  return (
    <main className={`flex-1 transition-all duration-200 ${
      isDarkTheme ? 'bg-gradient-to-b from-gray-950 to-black' : 'bg-gradient-to-b from-gray-50 to-white'
    } pb-24 overflow-hidden`}>
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkTheme ? '#1f2937' : '#f3f4f6'};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f5b70c;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1a009;
        }
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: ${isDarkTheme ? '#1f2937' : '#f3f4f6'};
        }
      `}</style>

      <div className="h-full overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-8">
          {/* Hero Search Section */}
          <div className={`rounded-2xl p-8 bg-gradient-to-br from-yellow-500/20 via-yellow-600/30 to-orange-500/20 border backdrop-blur-sm ${
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
            
            {/* Enhanced Search Bar */}
            <div className={`relative max-w-2xl rounded-full px-6 py-4 transition-all duration-200 backdrop-blur-md ${
              isDarkTheme 
                ? 'bg-gray-900/50 hover:bg-gray-800/60 border border-gray-700' 
                : 'bg-white/70 hover:bg-white/90 border border-gray-200'
            }`}>
              <div className="flex items-center">
                <Search className="w-5 h-5 mr-4 text-yellow-500" />
                <input
                  type="text"
                  placeholder="Search for songs, artists, albums, or playlists..."
                  className="flex-1 bg-transparent outline-none text-lg placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Quick Access Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickAccess.map((item, index) => (
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
          </section>

          {/* Recently Played */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recently Played</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => scroll('left')}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDarkTheme 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-100'
                  } shadow-lg`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDarkTheme 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-100'
                  } shadow-lg`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto custom-scrollbar pb-4"
            >
              {recentlyPlayed.map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-72 p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
                    isDarkTheme 
                      ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                      : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
                  } shadow-lg hover:shadow-xl border ${
                    isDarkTheme ? 'border-gray-800' : 'border-gray-200'
                  }`}
                >
                  <div className="relative mb-4">
                    <img
                      src={item.artwork}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handlePlaySong(item)}
                      className="absolute bottom-2 right-2 w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105"
                    >
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate">{item.title}</h3>
                  <p className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  } truncate`}>
                    {item.artist}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Playlists */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Made for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className="relative mb-4">
                    <img
                      src={playlist.artwork}
                      alt={playlist.title}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105">
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate">{playlist.title}</h3>
                  <p className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  } truncate`}>
                    {playlist.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Now */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className="relative mb-4">
                    <img
                      src={item.artwork}
                      alt={item.title}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      #{index + 1}
                    </div>
                    <button
                      onClick={() => handlePlaySong(item)}
                      className="absolute bottom-2 right-2 w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105"
                    >
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate">{item.title}</h3>
                  <p className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  } truncate`}>
                    {item.artist}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default MainContent;