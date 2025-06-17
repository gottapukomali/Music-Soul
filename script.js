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
    
    this.initializeElements();
    this.initializeEventListeners();
    this.loadSampleData();
    this.updateUI();
  }

  initializeElements() {
    // Audio element
    this.audio = document.getElementById('audioPlayer');
    
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
  }

  initializeEventListeners() {
    // Audio events
    this.audio.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('ended', () => this.onSongEnded());
    this.audio.addEventListener('play', () => this.onPlay());
    this.audio.addEventListener('pause', () => this.onPause());
    
    // Player controls
    this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    this.prevBtn.addEventListener('click', () => this.previousSong());
    this.nextBtn.addEventListener('click', () => this.nextSong());
    this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
    this.likeBtn.addEventListener('click', () => this.toggleLike());
    
    // Progress control
    this.progressSlider.addEventListener('input', () => this.onProgressChange());
    
    // Volume control
    this.volumeBtn.addEventListener('click', () => this.toggleMute());
    this.volumeSlider.addEventListener('input', () => this.onVolumeChange());
    
    // Navigation
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavigation(e));
    });
    
    this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    
    // Search
    this.searchInput.addEventListener('input', () => this.handleSearch());
    
    // Modal events
    this.createPlaylistBtn.addEventListener('click', () => this.openCreatePlaylistModal());
    this.closePlaylistModal.addEventListener('click', () => this.closeCreatePlaylistModal());
    this.cancelPlaylistBtn.addEventListener('click', () => this.closeCreatePlaylistModal());
    this.savePlaylistBtn.addEventListener('click', () => this.createPlaylist());
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    
    // Click outside modal to close
    this.createPlaylistModal.addEventListener('click', (e) => {
      if (e.target === this.createPlaylistModal) {
        this.closeCreatePlaylistModal();
      }
    });
  }

  loadSampleData() {
    // Sample songs data
    this.sampleSongs = [
      {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
        artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Sample audio
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
  }

  // Player Controls
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.currentSong) {
      this.audio.play().catch(e => console.log('Play failed:', e));
    }
  }

  pause() {
    this.audio.pause();
  }

  previousSong() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadSong(this.queue[this.currentIndex]);
      if (this.isPlaying) {
        this.play();
      }
    }
  }

  nextSong() {
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
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    this.shuffleBtn.classList.toggle('active', this.isShuffled);
    
    if (this.isShuffled) {
      this.shuffleQueue();
    } else {
      this.queue = [...this.sampleSongs];
      this.currentIndex = this.queue.findIndex(song => song.id === this.currentSong?.id) || 0;
    }
  }

  toggleRepeat() {
    const modes = ['none', 'all', 'one'];
    const currentModeIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentModeIndex + 1) % modes.length];
    
    this.repeatBtn.classList.toggle('active', this.repeatMode !== 'none');
    
    // Update icon based on repeat mode
    const icon = this.repeatBtn.querySelector('i');
    if (this.repeatMode === 'one') {
      icon.className = 'fas fa-redo-alt';
    } else {
      icon.className = 'fas fa-redo';
    }
  }

  toggleLike() {
    if (!this.currentSong) return;
    
    const songId = this.currentSong.id;
    const isLiked = this.likedSongs.includes(songId);
    
    if (isLiked) {
      this.likedSongs = this.likedSongs.filter(id => id !== songId);
      this.likeBtn.innerHTML = '<i class="far fa-heart"></i>';
      this.likeBtn.classList.remove('liked');
    } else {
      this.likedSongs.push(songId);
      this.likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
      this.likeBtn.classList.add('liked');
    }
    
    localStorage.setItem('likedSongs', JSON.stringify(this.likedSongs));
    this.updateLikedSongsPage();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    
    const icon = this.volumeBtn.querySelector('i');
    if (this.isMuted) {
      icon.className = 'fas fa-volume-mute';
    } else {
      icon.className = 'fas fa-volume-up';
    }
  }

  // Audio Events
  onLoadedMetadata() {
    this.duration = this.audio.duration;
    this.totalTimeEl.textContent = this.formatTime(this.duration);
    this.progressSlider.max = this.duration;
  }

  onTimeUpdate() {
    this.currentTime = this.audio.currentTime;
    this.currentTimeEl.textContent = this.formatTime(this.currentTime);
    
    const progressPercent = (this.currentTime / this.duration) * 100;
    this.progress.style.width = `${progressPercent}%`;
    this.progressSlider.value = this.currentTime;
  }

  onSongEnded() {
    this.nextSong();
  }

  onPlay() {
    this.isPlaying = true;
    this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }

  onPause() {
    this.isPlaying = false;
    this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }

  onProgressChange() {
    const newTime = this.progressSlider.value;
    this.audio.currentTime = newTime;
  }

  onVolumeChange() {
    this.volume = this.volumeSlider.value / 100;
    this.audio.volume = this.volume;
    
    const icon = this.volumeBtn.querySelector('i');
    if (this.volume === 0) {
      icon.className = 'fas fa-volume-mute';
    } else if (this.volume < 0.5) {
      icon.className = 'fas fa-volume-down';
    } else {
      icon.className = 'fas fa-volume-up';
    }
  }

  // Song Management
  loadSong(song) {
    this.currentSong = song;
    this.audio.src = song.audioUrl;
    
    // Update UI
    this.playerTitle.textContent = song.title;
    this.playerArtist.textContent = song.artist;
    this.playerArtwork.src = song.artwork;
    this.currentTitle.textContent = song.title;
    this.currentArtist.textContent = song.artist;
    this.currentArtwork.src = song.artwork;
    
    // Update like button
    const isLiked = this.likedSongs.includes(song.id);
    this.likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    this.likeBtn.classList.toggle('liked', isLiked);
    
    // Update queue display
    this.updateQueueDisplay();
  }

  playSong(song) {
    const songIndex = this.queue.findIndex(s => s.id === song.id);
    if (songIndex !== -1) {
      this.currentIndex = songIndex;
      this.loadSong(song);
      this.play();
    }
  }

  shuffleQueue() {
    const currentSong = this.queue[this.currentIndex];
    const otherSongs = this.queue.filter((_, index) => index !== this.currentIndex);
    
    // Fisher-Yates shuffle
    for (let i = otherSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherSongs[i], otherSongs[j]] = [otherSongs[j], otherSongs[i]];
    }
    
    this.queue = [currentSong, ...otherSongs];
    this.currentIndex = 0;
  }

  // Navigation
  handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.dataset.page;
    this.showPage(page);
    
    // Update active nav link
    this.navLinks.forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');
  }

  showPage(pageId) {
    this.pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
      targetPage.classList.add('active');
      this.loadPageContent(pageId);
    }
  }

  loadPageContent(pageId) {
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
  }

  loadHomePage() {
    // Load recently played
    const recentlyPlayedContainer = document.getElementById('recentlyPlayed');
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

    // Load popular albums
    const popularAlbumsContainer = document.getElementById('popularAlbums');
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

  loadLikedPage() {
    const likedSongs = this.sampleSongs.filter(song => this.likedSongs.includes(song.id));
    const likedCount = document.getElementById('likedCount');
    const likedSongsList = document.getElementById('likedSongsList');
    
    likedCount.textContent = `${likedSongs.length} songs`;
    
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

  loadPlaylistsPage() {
    const playlistsGrid = document.getElementById('playlistsGrid');
    
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

  loadAlbumsPage() {
    const albumsGrid = document.getElementById('albumsGrid');
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

  loadArtistsPage() {
    const artistsGrid = document.getElementById('artistsGrid');
    artistsGrid.innerHTML = this.sampleArtists.map(artist => `
      <div class="artist-card">
        <img src="${artist.image}" alt="${artist.name}">
        <h3>${artist.name}</h3>
        <p>${artist.followers} followers</p>
      </div>
    `).join('');
  }

  loadDownloadsPage() {
    const downloadCount = document.getElementById('downloadCount');
    const downloadsList = document.getElementById('downloadsList');
    
    downloadCount.textContent = `${this.downloads.length} downloaded songs`;
    
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

  // Search
  handleSearch() {
    const query = this.searchInput.value.toLowerCase().trim();
    if (!query) return;
    
    const results = this.sampleSongs.filter(song => 
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );
    
    // You can implement search results display here
    console.log('Search results:', results);
  }

  // Playlist Management
  openCreatePlaylistModal() {
    this.createPlaylistModal.classList.add('active');
    this.playlistNameInput.focus();
  }

  closeCreatePlaylistModal() {
    this.createPlaylistModal.classList.remove('active');
    this.playlistNameInput.value = '';
    this.playlistDescInput.value = '';
  }

  createPlaylist() {
    const name = this.playlistNameInput.value.trim();
    if (!name) {
      alert('Please enter a playlist name');
      return;
    }
    
    const playlist = {
      id: Date.now(),
      name: name,
      description: this.playlistDescInput.value.trim(),
      songs: [],
      createdAt: new Date().toISOString(),
      artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300'
    };
    
    this.playlists.push(playlist);
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
    
    this.closeCreatePlaylistModal();
    this.loadPlaylistsPage();
  }

  // UI Updates
  updateUI() {
    // Set initial volume
    this.audio.volume = this.volume;
    this.volumeSlider.value = this.volume * 100;
    
    // Load home page by default
    this.loadHomePage();
  }

  updateQueueDisplay() {
    const queueList = document.getElementById('queueList');
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
  }

  updateLikedSongsPage() {
    if (document.getElementById('liked-page').classList.contains('active')) {
      this.loadLikedPage();
    }
  }

  // Sidebar
  toggleSidebar() {
    this.sidebar.classList.toggle('active');
  }

  // Keyboard Shortcuts
  handleKeyboardShortcuts(e) {
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
        this.volumeSlider.value = Math.min(100, parseInt(this.volumeSlider.value) + 10);
        this.onVolumeChange();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.volumeSlider.value = Math.max(0, parseInt(this.volumeSlider.value) - 10);
        this.onVolumeChange();
        break;
    }
  }

  // Utility Functions
  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// Initialize the music player when the page loads
let musicPlayer;

document.addEventListener('DOMContentLoaded', () => {
  musicPlayer = new MusicPlayer();
});

// Handle responsive sidebar on mobile
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.getElementById('sidebar').classList.remove('active');
  }
});