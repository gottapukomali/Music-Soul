import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX,
  Heart,
  MoreHorizontal,
  Maximize2
} from 'lucide-react';

interface AudioPlayerProps {
  isDarkTheme: boolean;
  currentSong: {
    title: string;
    artist: string;
    album: string;
    artwork: string;
  };
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isDarkTheme, currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = Math.floor((progress / 100) * 240); // 4 minute song
  const totalTime = 240;

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-40 ${
      isDarkTheme 
        ? 'bg-gray-900/95 border-gray-800' 
        : 'bg-white/95 border-gray-200'
    } backdrop-blur-md border-t`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="relative group">
              <img
                src={currentSong.artwork}
                alt={`${currentSong.title} artwork`}
                className="w-14 h-14 rounded-lg object-cover shadow-lg transition-transform duration-200 group-hover:scale-105"
              />
              <button className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-base truncate hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
                {currentSong.title}
              </h4>
              <p className={`text-sm truncate hover:text-yellow-400 transition-colors duration-200 cursor-pointer ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {currentSong.artist}
              </p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isLiked 
                  ? 'text-yellow-400 hover:text-yellow-300 scale-110' 
                  : isDarkTheme 
                    ? 'text-gray-400 hover:text-white hover:scale-110' 
                    : 'text-gray-500 hover:text-gray-900 hover:scale-110'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md mx-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsShuffled(!isShuffled)}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isShuffled 
                    ? 'text-yellow-400 bg-yellow-400/20' 
                    : isDarkTheme 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Shuffle className="w-4 h-4" />
              </button>
              
              <button className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkTheme 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full flex items-center justify-center hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </button>
              
              <button className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkTheme 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <SkipForward className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 relative ${
                  repeatMode > 0 
                    ? 'text-yellow-400 bg-yellow-400/20' 
                    : isDarkTheme 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Repeat className="w-4 h-4" />
                {repeatMode === 2 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3 w-full">
              <span className="text-xs text-gray-400 min-w-0 font-mono">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 relative group">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer transition-all duration-200 group-hover:h-2"
                  style={{
                    background: `linear-gradient(to right, #f5b70c 0%, #f5b70c ${progress}%, ${
                      isDarkTheme ? '#4B5563' : '#D1D5DB'
                    } ${progress}%, ${isDarkTheme ? '#4B5563' : '#D1D5DB'} 100%)`
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 min-w-0 font-mono">
                {formatTime(totalTime)}
              </span>
            </div>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <button className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isDarkTheme 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            
            <div className="w-24 group">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const newVolume = parseInt(e.target.value);
                  setVolume(newVolume);
                  if (newVolume > 0) setIsMuted(false);
                }}
                className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer transition-all duration-200 group-hover:h-2"
                style={{
                  background: `linear-gradient(to right, #f5b70c 0%, #f5b70c ${
                    isMuted ? 0 : volume
                  }%, ${isDarkTheme ? '#4B5563' : '#D1D5DB'} ${
                    isMuted ? 0 : volume
                  }%, ${isDarkTheme ? '#4B5563' : '#D1D5DB'} 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .flex-1.max-w-md.mx-8 {
            max-width: 200px;
            margin: 0 1rem;
          }
          .space-x-4 {
            gap: 0.5rem;
          }
          .w-24 {
            width: 4rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default AudioPlayer;