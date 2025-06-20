// Music Player Application
class MusicPlayer {
  constructor() {
    this.currentSong = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 0.7;
    this.isMuted = false;
    this.isShuffled = false;
    this.repeatMode = 'none'; // none, one, all
    this.queue = [];
    this.currentIndex = 0;
    this.likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
    this.playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    this.downloads = JSON.parse(localStorage.getItem('downloads')) || [];
    
    // Sidebar states
    this.leftSidebarCollapsed = false;
    this.rightSidebarCollapsed = false;
    
    // Initialize after DOM is ready
    this.initializeElements();
    this.initializeEventListeners();
    this.loadSampleData();
    this.updateUI();
  }

  initializeElements() {
    try {
      // Audio element
      this.audio = document.getElementById('audioPlayer');
      if (!this.audio) {
        console.error('Audio player element not found');
        return;
      }
      
      // Player controls
      this.playPauseBtn = document.getElementById('playPauseBtn');
      this.prevBtn = document.getElementById('prevBtn');
      this.nextBtn = document.getElementById('nextBtn');
      this.shuffleBtn = document.getElementById('shuffleBtn');
      this.repeatBtn = document.getElementById('repeatBtn');
      this.likeBtn = document.getElementById('likeBtn');
      
      // Progress elements
      this.progressSlider = document.getElementById('progressSlider');
      this.progress = document.getElementById('progress');
      this.currentTimeEl = document.getElementById('currentTime');
      this.totalTimeEl = document.getElementById('totalTime');
      
      // Volume elements
      this.volumeBtn = document.getElementById('volumeBtn');
      this.volumeSlider = document.getElementById('volumeSlider');
      
      // Song info elements
      this.playerTitle = document.getElementById('playerTitle');
      this.playerArtist = document.getElementById('playerArtist');
      this.playerArtwork = document.getElementById('playerArtwork');
      this.currentTitle = document.getElementById('currentTitle');
      this.currentArtist = document.getElementById('currentArtist');
      this.currentArtwork = document.getElementById('currentArtwork');
      
      // Navigation elements
      this.navLinks = document.querySelectorAll('.nav-link');
      this.pages = document.querySelectorAll('.page');
      this.sidebarToggle = document.getElementById('sidebarToggle');
      this.sidebar = document.getElementById('sidebar');
      this.rightSidebar = document.getElementById('rightSidebar');
      
      // Toggle buttons
      this.leftToggle = document.getElementById('leftToggle');
      this.rightToggle = document.getElementById('rightToggle');
      
      // Search
      this.searchInput = document.getElementById('searchInput');
      
      // Modal elements
      this.createPlaylistModal = document.getElementById('createPlaylistModal');
      this.createPlaylistBtn = document.getElementById('createPlaylistBtn');
      this.closePlaylistModal = document.getElementById('closePlaylistModal');
      this.savePlaylistBtn = document.getElementById('savePlaylist');
      this.cancelPlaylistBtn = document.getElementById('cancelPlaylist');
      this.playlistNameInput = document.getElementById('playlistNameInput');
      this.playlistDescInput = document.getElementById('playlistDescInput');
      
      console.log('All elements initialized successfully');
    } catch (error) {
      console.error('Error initializing elements:', error);
    }
  }

  initializeEventListeners() {
    try {
      // Audio events with error handling
      if (this.audio) {
        this.audio.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
        this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.audio.addEventListener('ended', () => this.onSongEnded());
        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
        this.audio.addEventListener('error', (e) => this.onAudioError(e));
        this.audio.addEventListener('canplay', () => console.log('Audio can play'));
        this.audio.addEventListener('loadstart', () => console.log('Audio load started'));
      }
      
      // Player controls with null checks
      if (this.playPauseBtn) this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSong());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSong());
      if (this.shuffleBtn) this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
      if (this.repeatBtn) this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
      if (this.likeBtn) this.likeBtn.addEventListener('click', () => this.toggleLike());
      
      // Progress control
      if (this.progressSlider) this.progressSlider.addEventListener('input', () => this.onProgressChange());
      
      // Volume control
      if (this.volumeBtn) this.volumeBtn.addEventListener('click', () => this.toggleMute());
      if (this.volumeSlider) this.volumeSlider.addEventListener('input', () => this.onVolumeChange());
      
      // Navigation
      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => this.handleNavigation(e));
      });
      
      if (this.sidebarToggle) this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
      
      // Sidebar toggle buttons
      if (this.leftToggle) this.leftToggle.addEventListener('click', () => this.toggleLeftSidebar());
      if (this.rightToggle) this.rightToggle.addEventListener('click', () => this.toggleRightSidebar());
      
      // Search
      if (this.searchInput) this.searchInput.addEventListener('input', () => this.handleSearch());
      
      // Modal events
      if (this.createPlaylistBtn) this.createPlaylistBtn.addEventListener('click', () => this.openCreatePlaylistModal());
      if (this.closePlaylistModal) this.closePlaylistModal.addEventListener('click', () => this.closeCreatePlaylistModal());
      if (this.cancelPlaylistBtn) this.cancelPlaylistBtn.addEventListener('click', () => this.closeCreatePlaylistModal());
      if (this.savePlaylistBtn) this.savePlaylistBtn.addEventListener('click', () => this.createPlaylist());
      
      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
      
      // Click outside modal to close
      if (this.createPlaylistModal) {
        this.createPlaylistModal.addEventListener('click', (e) => {
          if (e.target === this.createPlaylistModal) {
            this.closeCreatePlaylistModal();
          }
        });
      }
      
      console.log('All event listeners initialized successfully');
    } catch (error) {
      console.error('Error initializing event listeners:', error);
    }
  }

  // Audio error handling
  onAudioError(e) {
    console.error('Audio error:', e);
    const error = this.audio.error;
    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          console.error('Audio playback aborted');
          break;
        case error.MEDIA_ERR_NETWORK:
          console.error('Network error while loading audio');
          break;
        case error.MEDIA_ERR_DECODE:
          console.error('Audio decoding error');
          break;
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          console.error('Audio format not supported');
          break;
        default:
          console.error('Unknown audio error');
      }
    }
    
    // Try to skip to next song on error
    setTimeout(() => {
      this.nextSong();
    }, 1000);
  }

  // Sidebar Toggle Functions
  toggleLeftSidebar() {
    this.leftSidebarCollapsed = !this.leftSidebarCollapsed;
    if (this.sidebar) {
      this.sidebar.classList.toggle('collapsed', this.leftSidebarCollapsed);
    }
    if (this.leftToggle) {
      this.leftToggle.classList.toggle('collapsed', this.leftSidebarCollapsed);
      
      // Update icon
      const icon = this.leftToggle.querySelector('i');
      if (icon) {
        if (this.leftSidebarCollapsed) {
          icon.className = 'fas fa-chevron-right';
        } else {
          icon.className = 'fas fa-chevron-left';
        }
      }
    }
  }

  toggleRightSidebar() {
    this.rightSidebarCollapsed = !this.rightSidebarCollapsed;
    if (this.rightSidebar) {
      this.rightSidebar.classList.toggle('collapsed', this.rightSidebarCollapsed);
    }
    if (this.rightToggle) {
      this.rightToggle.classList.toggle('collapsed', this.rightSidebarCollapsed);
      
      // Update icon
      const icon = this.rightToggle.querySelector('i');
      if (icon) {
        if (this.rightSidebarCollapsed) {
          icon.className = 'fas fa-chevron-left';
        } else {
          icon.className = 'fas fa-chevron-right';
        }
      }
    }
  }

  loadSampleData() {
    // Sample songs data with working audio URLs
    this.sampleSongs = [
      {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
        artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      },
      {
        id: 2,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        duration: 233,
        artwork: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      },
      {
        id: 3,
        title: "Someone Like You",
        artist: "Adele",
        album: "21",
        duration: 285,
        artwork: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=300",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      },
      {
        id: 4,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: 355,
        artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      },
      {
        id: 5,
        title: "Imagine",
        artist: "John Lennon",
        album: "Imagine",
        duration: 183,
        artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      },
      {
        id: 6,
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        duration: 391,
        artwork: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      }
    ];

    // Sample albums
    this.sampleAlbums = [
      {
        id: 1,
        title: "After Hours",
        artist: "The Weeknd",
        artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
        year: 2020,
        songs: [1]
      },
      {
        id: 2,
        title: "÷ (Divide)",
        artist: "Ed Sheeran",
        artwork: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
        year: 2017,
        songs: [2]
      },
      {
        id: 3,
        title: "21",
        artist: "Adele",
        artwork: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=300",
        year: 2011,
        songs: [3]
      }
    ];

    // Sample artists
    this.sampleArtists = [
      {
        id: 1,
        name: "The Weeknd",
        image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
        followers: "85M"
      },
      {
        id: 2,
        name: "Ed Sheeran",
        image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
        followers: "47M"
      },
      {
        id: 3,
        name: "Adele",
        image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=300",
        followers: "32M"
      }
    ];

    this.queue = [...this.sampleSongs];
    this.currentIndex = 0;
    console.log('Sample data loaded successfully');
  }

  // Player Controls
  togglePlayPause() {
    try {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  }

  async play() {
    try {
      if (this.currentSong && this.audio) {
        console.log('Attempting to play:', this.currentSong.title);
        await this.audio.play();
      } else {
        console.warn('No current song or audio element available');
        // Load first song if none is selected
        if (this.queue.length > 0) {
          this.loadSong(this.queue[0]);
          await this.audio.play();
        }
      }
    } catch (error) {
      console.error('Play failed:', error);
      // Handle autoplay restrictions
      if (error.name === 'NotAllowedError') {
        console.warn('Autoplay prevented by browser. User interaction required.');
      }
    }
  }

  pause() {
    try {
      if (this.audio) {
        this.audio.pause();
      }
    } catch (error) {
      console.error('Pause failed:', error);
    }
  }

  previousSong() {
    try {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.loadSong(this.queue[this.currentIndex]);
        if (this.isPlaying) {
          this.play();
        }
      }
    } catch (error) {
      console.error('Error playing previous song:', error);
    }
  }

  nextSong() {
    try {
      if (this.repeatMode === 'one') {
        this.audio.currentTime = 0;
        this.play();
        return;
      }

      if (this.currentIndex < this.queue.length - 1) {
        this.currentIndex++;
      } else if (this.repeatMode === 'all') {
        this.currentIndex = 0;
      } else {
        return;
      }

      this.loadSong(this.queue[this.currentIndex]);
      if (this.isPlaying) {
        this.play();
      }
    } catch (error) {
      console.error('Error playing next song:', error);
    }
  }

  toggleShuffle() {
    try {
      this.isShuffled = !this.isShuffled;
      if (this.shuffleBtn) {
        this.shuffleBtn.classList.toggle('active', this.isShuffled);
      }
      
      if (this.isShuffled) {
        this.shuffleQueue();
      } else {
        this.queue = [...this.sampleSongs];
        this.currentIndex = this.queue.findIndex(song => song.id === this.currentSong?.id) || 0;
      }
    } catch (error) {
      console.error('Error toggling shuffle:', error);
    }
  }

  toggleRepeat() {
    try {
      const modes = ['none', 'all', 'one'];
      const currentModeIndex = modes.indexOf(this.repeatMode);
      this.repeatMode = modes[(currentModeIndex + 1) % modes.length];
      
      if (this.repeatBtn) {
        this.repeatBtn.classList.toggle('active', this.repeatMode !== 'none');
        
        // Update icon based on repeat mode
        const icon = this.repeatBtn.querySelector('i');
        if (icon) {
          if (this.repeatMode === 'one') {
            icon.className = 'fas fa-redo-alt';
          } else {
            icon.className = 'fas fa-redo';
          }
        }
      }
    } catch (error) {
      console.error('Error toggling repeat:', error);
    }
  }

  toggleLike() {
    try {
      if (!this.currentSong) return;
      
      const songId = this.currentSong.id;
      const isLiked = this.likedSongs.includes(songId);
      
      if (isLiked) {
        this.likedSongs = this.likedSongs.filter(id => id !== songId);
        if (this.likeBtn) {
          this.likeBtn.innerHTML = '<i class="far fa-heart"></i>';
          this.likeBtn.classList.remove('liked');
        }
      } else {
        this.likedSongs.push(songId);
        if (this.likeBtn) {
          this.likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
          this.likeBtn.classList.add('liked');
        }
      }
      
      localStorage.setItem('likedSongs', JSON.stringify(this.likedSongs));
      this.updateLikedSongsPage();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }

  toggleMute() {
    try {
      this.isMuted = !this.isMuted;
      if (this.audio) {
        this.audio.muted = this.isMuted;
      }
      
      if (this.volumeBtn) {
        const icon = this.volumeBtn.querySelector('i');
        if (icon) {
          if (this.isMuted) {
            icon.className = 'fas fa-volume-mute';
          } else {
            icon.className = 'fas fa-volume-up';
          }
        }
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  }

  // Audio Events
  onLoadedMetadata() {
    try {
      if (this.audio) {
        this.duration = this.audio.duration;
        if (this.totalTimeEl) {
          this.totalTimeEl.textContent = this.formatTime(this.duration);
        }
        if (this.progressSlider) {
          this.progressSlider.max = this.duration;
        }
      }
    } catch (error) {
      console.error('Error in onLoadedMetadata:', error);
    }
  }

  onTimeUpdate() {
    try {
      if (this.audio) {
        this.currentTime = this.audio.currentTime;
        if (this.currentTimeEl) {
          this.currentTimeEl.textContent = this.formatTime(this.currentTime);
        }
        
        if (this.duration > 0) {
          const progressPercent = (this.currentTime / this.duration) * 100;
          if (this.progress) {
            this.progress.style.width = `${progressPercent}%`;
          }
          if (this.progressSlider) {
            this.progressSlider.value = this.currentTime;
          }
        }
      }
    } catch (error) {
      console.error('Error in onTimeUpdate:', error);
    }
  }

  onSongEnded() {
    try {
      this.nextSong();
    } catch (error) {
      console.error('Error in onSongEnded:', error);
    }
  }

  onPlay() {
    try {
      this.isPlaying = true;
      if (this.playPauseBtn) {
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
    } catch (error) {
      console.error('Error in onPlay:', error);
    }
  }

  onPause() {
    try {
      this.isPlaying = false;
      if (this.playPauseBtn) {
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    } catch (error) {
      console.error('Error in onPause:', error);
    }
  }

  onProgressChange() {
    try {
      if (this.progressSlider && this.audio) {
        const newTime = this.progressSlider.value;
        this.audio.currentTime = newTime;
      }
    } catch (error) {
      console.error('Error in onProgressChange:', error);
    }
  }

  onVolumeChange() {
    try {
      if (this.volumeSlider && this.audio) {
        this.volume = this.volumeSlider.value / 100;
        this.audio.volume = this.volume;
        
        if (this.volumeBtn) {
          const icon = this.volumeBtn.querySelector('i');
          if (icon) {
            if (this.volume === 0) {
              icon.className = 'fas fa-volume-mute';
            } else if (this.volume < 0.5) {
              icon.className = 'fas fa-volume-down';
            } else {
              icon.className = 'fas fa-volume-up';
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in onVolumeChange:', error);
    }
  }

  // Song Management
  loadSong(song) {
    try {
      if (!song) {
        console.error('No song provided to loadSong');
        return;
      }
      
      this.currentSong = song;
      if (this.audio) {
        this.audio.src = song.audioUrl;
      }
      
      // Update UI
      if (this.playerTitle) this.playerTitle.textContent = song.title;
      if (this.playerArtist) this.playerArtist.textContent = song.artist;
      if (this.playerArtwork) this.playerArtwork.src = song.artwork;
      if (this.currentTitle) this.currentTitle.textContent = song.title;
      if (this.currentArtist) this.currentArtist.textContent = song.artist;
      if (this.currentArtwork) this.currentArtwork.src = song.artwork;
      
      // Update like button
      const isLiked = this.likedSongs.includes(song.id);
      if (this.likeBtn) {
        this.likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        this.likeBtn.classList.toggle('liked', isLiked);
      }
      
      // Update queue display
      this.updateQueueDisplay();
      
      console.log('Song loaded:', song.title);
    } catch (error) {
      console.error('Error loading song:', error);
    }
  }

  playSong(song) {
    try {
      const songIndex = this.queue.findIndex(s => s.id === song.id);
      if (songIndex !== -1) {
        this.currentIndex = songIndex;
        this.loadSong(song);
        this.play();
      }
    } catch (error) {
      console.error('Error playing song:', error);
    }
  }

  shuffleQueue() {
    try {
      const currentSong = this.queue[this.currentIndex];
      const otherSongs = this.queue.filter((_, index) => index !== this.currentIndex);
      
      // Fisher-Yates shuffle
      for (let i = otherSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherSongs[i], otherSongs[j]] = [otherSongs[j], otherSongs[i]];
      }
      
      this.queue = [currentSong, ...otherSongs];
      this.currentIndex = 0;
    } catch (error) {
      console.error('Error shuffling queue:', error);
    }
  }

  // Navigation
  handleNavigation(e) {
    try {
      e.preventDefault();
      const page = e.currentTarget.dataset.page;
      this.showPage(page);
      
      // Update active nav link
      this.navLinks.forEach(link => link.classList.remove('active'));
      e.currentTarget.classList.add('active');
    } catch (error) {
      console.error('Error handling navigation:', error);
    }
  }

  showPage(pageId) {
    try {
      this.pages.forEach(page => page.classList.remove('active'));
      const targetPage = document.getElementById(`${pageId}-page`);
      if (targetPage) {
        targetPage.classList.add('active');
        this.loadPageContent(pageId);
      }
      
      // Update active nav link
      this.navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`[data-page="${pageId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    } catch (error) {
      console.error('Error showing page:', error);
    }
  }

  loadPageContent(pageId) {
    try {
      switch (pageId) {
        case 'home':
          this.loadHomePage();
          break;
        case 'liked':
          this.loadLikedPage();
          break;
        case 'playlists':
          this.loadPlaylistsPage();
          break;
        case 'albums':
          this.loadAlbumsPage();
          break;
        case 'artists':
          this.loadArtistsPage();
          break;
        case 'downloads':
          this.loadDownloadsPage();
          break;
      }
    } catch (error) {
      console.error('Error loading page content:', error);
    }
  }

  loadHomePage() {
    try {
      // Load recently played
      const recentlyPlayedContainer = document.getElementById('recentlyPlayed');
      if (recentlyPlayedContainer) {
        recentlyPlayedContainer.innerHTML = this.sampleSongs.slice(0, 4).map(song => `
          <div class="music-card" onclick="musicPlayer.playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
            <img src="${song.artwork}" alt="${song.title}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <div class="play-overlay">
              <i class="fas fa-play"></i>
            </div>
          </div>
        `).join('');
      }

      // Load popular albums
      const popularAlbumsContainer = document.getElementById('popularAlbums');
      if (popularAlbumsContainer) {
        popularAlbumsContainer.innerHTML = this.sampleAlbums.map(album => `
          <div class="music-card">
            <img src="${album.artwork}" alt="${album.title}">
            <h3>${album.title}</h3>
            <p>${album.artist} • ${album.year}</p>
            <div class="play-overlay">
              <i class="fas fa-play"></i>
            </div>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Error loading home page:', error);
    }
  }

  loadLikedPage() {
    try {
      const likedSongs = this.sampleSongs.filter(song => this.likedSongs.includes(song.id));
      const likedCount = document.getElementById('likedCount');
      const likedSongsList = document.getElementById('likedSongsList');
      
      if (likedCount) {
        likedCount.textContent = `${likedSongs.length} songs`;
      }
      
      if (likedSongsList) {
        if (likedSongs.length === 0) {
          likedSongsList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.7);">
              <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem; color: #f7a520;"></i>
              <h3>No liked songs yet</h3>
              <p>Songs you like will appear here</p>
            </div>
          `;
        } else {
          likedSongsList.innerHTML = likedSongs.map((song, index) => `
            <div class="song-item" onclick="musicPlayer.playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
              <span class="song-number">${index + 1}</span>
              <img src="${song.artwork}" alt="${song.title}" class="song-artwork">
              <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
              </div>
              <span class="song-duration">${this.formatTime(song.duration)}</span>
              <div class="song-actions">
                <button class="action-btn" onclick="event.stopPropagation(); musicPlayer.toggleLike()">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
          `).join('');
        }
      }
    } catch (error) {
      console.error('Error loading liked page:', error);
    }
  }

  loadPlaylistsPage() {
    try {
      const playlistsGrid = document.getElementById('playlistsGrid');
      
      if (playlistsGrid) {
        if (this.playlists.length === 0) {
          playlistsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.7);">
              <i class="fas fa-list" style="font-size: 3rem; margin-bottom: 1rem; color: #f7a520;"></i>
              <h3>No playlists yet</h3>
              <p>Create your first playlist to get started</p>
            </div>
          `;
        } else {
          playlistsGrid.innerHTML = this.playlists.map(playlist => `
            <div class="playlist-card">
              <img src="${playlist.artwork || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300'}" alt="${playlist.name}">
              <h3>${playlist.name}</h3>
              <p>${playlist.description || 'No description'}</p>
              <span class="song-count">${playlist.songs?.length || 0} songs</span>
            </div>
          `).join('');
        }
      }
    } catch (error) {
      console.error('Error loading playlists page:', error);
    }
  }

  loadAlbumsPage() {
    try {
      const albumsGrid = document.getElementById('albumsGrid');
      if (albumsGrid) {
        albumsGrid.innerHTML = this.sampleAlbums.map(album => `
          <div class="music-card">
            <img src="${album.artwork}" alt="${album.title}">
            <h3>${album.title}</h3>
            <p>${album.artist} • ${album.year}</p>
            <div class="play-overlay">
              <i class="fas fa-play"></i>
            </div>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Error loading albums page:', error);
    }
  }

  loadArtistsPage() {
    try {
      const artistsGrid = document.getElementById('artistsGrid');
      if (artistsGrid) {
        artistsGrid.innerHTML = this.sampleArtists.map(artist => `
          <div class="artist-card">
            <img src="${artist.image}" alt="${artist.name}">
            <h3>${artist.name}</h3>
            <p>${artist.followers} followers</p>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Error loading artists page:', error);
    }
  }

  loadDownloadsPage() {
    try {
      const downloadCount = document.getElementById('downloadCount');
      const downloadsList = document.getElementById('downloadsList');
      
      if (downloadCount) {
        downloadCount.textContent = `${this.downloads.length} downloaded songs`;
      }
      
      if (downloadsList) {
        if (this.downloads.length === 0) {
          downloadsList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.7);">
              <i class="fas fa-download" style="font-size: 3rem; margin-bottom: 1rem; color: #f7a520;"></i>
              <h3>No downloads yet</h3>
              <p>Downloaded songs will appear here</p>
            </div>
          `;
        } else {
          downloadsList.innerHTML = this.downloads.map((song, index) => `
            <div class="song-item" onclick="musicPlayer.playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
              <span class="song-number">${index + 1}</span>
              <img src="${song.artwork}" alt="${song.title}" class="song-artwork">
              <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
              </div>
              <span class="song-duration">${this.formatTime(song.duration)}</span>
            </div>
          `).join('');
        }
      }
    } catch (error) {
      console.error('Error loading downloads page:', error);
    }
  }

  // Search
  handleSearch() {
    try {
      const query = this.searchInput?.value.toLowerCase().trim();
      if (!query) return;
      
      const results = this.sampleSongs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
      );
      
      console.log('Search results:', results);
      // You can implement search results display here
    } catch (error) {
      console.error('Error handling search:', error);
    }
  }

  // Playlist Management
  openCreatePlaylistModal() {
    try {
      if (this.createPlaylistModal) {
        this.createPlaylistModal.classList.add('active');
      }
      if (this.playlistNameInput) {
        this.playlistNameInput.focus();
      }
    } catch (error) {
      console.error('Error opening create playlist modal:', error);
    }
  }

  closeCreatePlaylistModal() {
    try {
      if (this.createPlaylistModal) {
        this.createPlaylistModal.classList.remove('active');
      }
      if (this.playlistNameInput) {
        this.playlistNameInput.value = '';
      }
      if (this.playlistDescInput) {
        this.playlistDescInput.value = '';
      }
    } catch (error) {
      console.error('Error closing create playlist modal:', error);
    }
  }

  createPlaylist() {
    try {
      const name = this.playlistNameInput?.value.trim();
      if (!name) {
        alert('Please enter a playlist name');
        return;
      }
      
      const playlist = {
        id: Date.now(),
        name: name,
        description: this.playlistDescInput?.value.trim() || '',
        songs: [],
        createdAt: new Date().toISOString(),
        artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300'
      };
      
      this.playlists.push(playlist);
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
      
      this.closeCreatePlaylistModal();
      this.loadPlaylistsPage();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  }

  // UI Updates
  updateUI() {
    try {
      // Set initial volume
      if (this.audio) {
        this.audio.volume = this.volume;
      }
      if (this.volumeSlider) {
        this.volumeSlider.value = this.volume * 100;
      }
      
      // Load home page by default
      this.loadHomePage();
    } catch (error) {
      console.error('Error updating UI:', error);
    }
  }

  updateQueueDisplay() {
    try {
      const queueList = document.getElementById('queueList');
      if (!queueList) return;
      
      const upcomingSongs = this.queue.slice(this.currentIndex + 1, this.currentIndex + 6);
      
      if (upcomingSongs.length === 0) {
        queueList.innerHTML = '<p style="color: rgba(255, 255, 255, 0.7); text-align: center;">No upcoming songs</p>';
      } else {
        queueList.innerHTML = upcomingSongs.map(song => `
          <div class="queue-item" onclick="musicPlayer.playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
            <img src="${song.artwork}" alt="${song.title}">
            <div class="queue-item-info">
              <div class="queue-item-title">${song.title}</div>
              <div class="queue-item-artist">${song.artist}</div>
            </div>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Error updating queue display:', error);
    }
  }

  updateLikedSongsPage() {
    try {
      const likedPage = document.getElementById('liked-page');
      if (likedPage && likedPage.classList.contains('active')) {
        this.loadLikedPage();
      }
    } catch (error) {
      console.error('Error updating liked songs page:', error);
    }
  }

  // Sidebar
  toggleSidebar() {
    try {
      if (this.sidebar) {
        this.sidebar.classList.toggle('active');
      }
    } catch (error) {
      console.error('Error toggling sidebar:', error);
    }
  }

  // Keyboard Shortcuts
  handleKeyboardShortcuts(e) {
    try {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.previousSong();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSong();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (this.volumeSlider) {
            this.volumeSlider.value = Math.min(100, parseInt(this.volumeSlider.value) + 10);
            this.onVolumeChange();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (this.volumeSlider) {
            this.volumeSlider.value = Math.max(0, parseInt(this.volumeSlider.value) - 10);
            this.onVolumeChange();
          }
          break;
      }
    } catch (error) {
      console.error('Error handling keyboard shortcuts:', error);
    }
  }

  // Utility Functions
  formatTime(seconds) {
    try {
      if (isNaN(seconds) || seconds < 0) return '0:00';
      
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return '0:00';
    }
  }
}

// Initialize the music player when the page loads
let musicPlayer;

document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('DOM loaded, initializing music player...');
    musicPlayer = new MusicPlayer();
    console.log('Music player initialized successfully');
  } catch (error) {
    console.error('Failed to initialize music player:', error);
  }
});

// Handle responsive sidebar on mobile
window.addEventListener('resize', () => {
  try {
    if (window.innerWidth > 768) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.remove('active');
      }
    }
  } catch (error) {
    console.error('Error handling window resize:', error);
  }
});

// Global error handler
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});



