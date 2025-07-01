import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Heart, MoreHorizontal } from 'lucide-react';

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

  return (
    <main className={`flex-1 transition-all duration-200 ${
      isDarkTheme ? 'bg-gray-950' : 'bg-gray-50'
    } pb-24`}>
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
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
      `}</style>

      <div className="h-full overflow-y-auto p-6 space-y-8">
        {/* Welcome Banner */}
        <div className={`rounded-2xl p-8 bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border ${
          isDarkTheme ? 'border-yellow-500/20' : 'border-yellow-500/30'
        }`}>
          <h1 className="text-4xl font-bold mb-2">
            Good evening, <span className="text-yellow-400">Alex</span>
          </h1>
          <p className={`text-lg ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to feel the music? Let's discover your next favorite track.
          </p>
        </div>

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
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDarkTheme 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-100'
                }`}
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
                    ? 'bg-gray-900 hover:bg-gray-800' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-xl`}
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
                    ? 'bg-gray-900 hover:bg-gray-800' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-xl`}
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
      </div>
    </main>
  );
};

export default MainContent;