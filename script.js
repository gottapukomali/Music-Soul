// Music Soul - Pure JavaScript Implementation

class MusicSoul {
    constructor() {
        this.isDarkTheme = true;
        this.leftPanelOpen = true;
        this.rightPanelOpen = true;
        this.activeTab = 'home';
        this.isMobile = window.innerWidth < 768;
        this.isPlaying = false;
        this.isLiked = false;
        this.isShuffled = false;
        this.isMuted = false;
        this.repeatMode = 0; // 0: off, 1: all, 2: one
        this.progress = 35;
        this.volume = 75;
        this.isHidden = false;
        
        this.currentSong = {
            title: "Midnight Dreams",
            artist: "Luna Eclipse",
            album: "Nocturnal Vibes",
            artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
        };

        this.musicData = {
            recentlyPlayed: [
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
                }
            ],
            featuredPlaylists: [
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
            ],
            quickAccess: [
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
                }
            ],
            upNextQueue: [
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
            ]
        };

        this.init();
    }

    init() {
        this.loadPreferences();
        this.setupEventListeners();
        this.populateContent();
        this.updateGreeting();
        this.updateTheme();
        this.checkMobile();
        this.setupTouchEvents();
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    loadPreferences() {
        const savedTheme = localStorage.getItem('musicSoulTheme');
        const savedLeftPanel = localStorage.getItem('musicSoulLeftPanel');
        const savedRightPanel = localStorage.getItem('musicSoulRightPanel');
        
        if (savedTheme) this.isDarkTheme = savedTheme === 'dark';
        if (savedLeftPanel && !this.isMobile) this.leftPanelOpen = savedLeftPanel === 'true';
        if (savedRightPanel && !this.isMobile) this.rightPanelOpen = savedRightPanel === 'true';
    }

    savePreferences() {
        localStorage.setItem('musicSoulTheme', this.isDarkTheme ? 'dark' : 'light');
        if (!this.isMobile) {
            localStorage.setItem('musicSoulLeftPanel', this.leftPanelOpen.toString());
            localStorage.setItem('musicSoulRightPanel', this.rightPanelOpen.toString());
        }
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Panel toggles
        document.getElementById('left-panel-toggle').addEventListener('click', () => {
            this.toggleLeftPanel();
        });

        document.getElementById('right-panel-toggle').addEventListener('click', () => {
            this.toggleRightPanel();
        });

        // Profile dropdown
        document.getElementById('profile-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleProfileDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeProfileDropdown();
        });

        // Audio player controls
        document.getElementById('play-pause-btn').addEventListener('click', () => {
            this.togglePlayPause();
        });

        document.getElementById('like-btn').addEventListener('click', () => {
            this.toggleLike();
        });

        document.getElementById('shuffle-btn').addEventListener('click', () => {
            this.toggleShuffle();
        });

        document.getElementById('repeat-btn').addEventListener('click', () => {
            this.toggleRepeat();
        });

        document.getElementById('mute-btn').addEventListener('click', () => {
            this.toggleMute();
        });

        // Progress and volume sliders
        document.getElementById('progress-bar').addEventListener('input', (e) => {
            this.updateProgress(e.target.value);
        });

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.updateVolume(e.target.value);
        });

        // Horizontal scroll controls
        document.getElementById('scroll-left').addEventListener('click', () => {
            this.scrollHorizontal('left');
        });

        document.getElementById('scroll-right').addEventListener('click', () => {
            this.scrollHorizontal('right');
        });

        // Mobile navigation
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setActiveTab(btn.dataset.tab);
            });
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.checkMobile();
        });
    }

    setupTouchEvents() {
        // Touch and mouse events for hiding main content
        document.addEventListener('touchstart', () => {
            this.hideMainContent();
        }, { passive: true });

        document.addEventListener('touchend', () => {
            this.showMainContent();
        }, { passive: true });

        document.addEventListener('mousedown', () => {
            this.hideMainContent();
        });

        document.addEventListener('mouseup', () => {
            this.showMainContent();
        });
    }

    hideMainContent() {
        const mainContent = document.getElementById('main-content');
        mainContent.style.opacity = '0';
        mainContent.style.pointerEvents = 'none';
        this.isHidden = true;
    }

    showMainContent() {
        const mainContent = document.getElementById('main-content');
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
        this.isHidden = false;
    }

    checkMobile() {
        this.isMobile = window.innerWidth < 768;
        if (this.isMobile) {
            this.leftPanelOpen = false;
            this.rightPanelOpen = false;
            this.updatePanelStates();
        }
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.updateTheme();
        this.savePreferences();
    }

    updateTheme() {
        const app = document.getElementById('app');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (this.isDarkTheme) {
            app.classList.remove('light-theme');
            app.className = 'min-h-screen font-poppins transition-colors duration-200 bg-gray-950 text-white';
            themeToggle.innerHTML = '<i data-lucide="sun" class="w-4 h-4"></i><span>Switch to Light Theme</span>';
        } else {
            app.classList.add('light-theme');
            app.className = 'min-h-screen font-poppins transition-colors duration-200 bg-gray-50 text-gray-900 light-theme';
            themeToggle.innerHTML = '<i data-lucide="moon" class="w-4 h-4"></i><span>Switch to Dark Theme</span>';
        }
        
        // Reinitialize icons after theme change
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    toggleLeftPanel() {
        this.leftPanelOpen = !this.leftPanelOpen;
        this.updatePanelStates();
        this.savePreferences();
    }

    toggleRightPanel() {
        this.rightPanelOpen = !this.rightPanelOpen;
        this.updatePanelStates();
        this.savePreferences();
    }

    updatePanelStates() {
        const leftPanel = document.getElementById('left-panel');
        const rightPanel = document.getElementById('right-panel');
        const mainContent = document.getElementById('main-content');

        if (this.isMobile) {
            // Mobile behavior
            leftPanel.classList.toggle('open', this.leftPanelOpen);
            rightPanel.classList.toggle('open', this.rightPanelOpen);
        } else {
            // Desktop behavior
            if (this.leftPanelOpen) {
                leftPanel.style.width = '16rem';
                mainContent.style.left = '16rem';
            } else {
                leftPanel.style.width = '4rem';
                mainContent.style.left = '4rem';
            }

            if (this.rightPanelOpen) {
                rightPanel.style.width = '20rem';
                mainContent.style.right = '20rem';
            } else {
                rightPanel.style.width = '4rem';
                mainContent.style.right = '4rem';
            }
        }
    }

    toggleProfileDropdown() {
        const dropdown = document.getElementById('profile-dropdown');
        dropdown.classList.toggle('hidden');
    }

    closeProfileDropdown() {
        const dropdown = document.getElementById('profile-dropdown');
        dropdown.classList.add('hidden');
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('play-pause-btn');
        const icon = btn.querySelector('i');
        
        if (this.isPlaying) {
            icon.setAttribute('data-lucide', 'pause');
        } else {
            icon.setAttribute('data-lucide', 'play');
        }
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    toggleLike() {
        this.isLiked = !this.isLiked;
        const btn = document.getElementById('like-btn');
        const icon = btn.querySelector('i');
        
        if (this.isLiked) {
            btn.classList.add('text-yellow-400');
            btn.classList.remove('text-gray-400');
            icon.style.fill = 'currentColor';
        } else {
            btn.classList.remove('text-yellow-400');
            btn.classList.add('text-gray-400');
            icon.style.fill = 'none';
        }
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const btn = document.getElementById('shuffle-btn');
        
        if (this.isShuffled) {
            btn.classList.add('text-yellow-400', 'bg-yellow-400/20');
            btn.classList.remove('text-gray-400');
        } else {
            btn.classList.remove('text-yellow-400', 'bg-yellow-400/20');
            btn.classList.add('text-gray-400');
        }
    }

    toggleRepeat() {
        this.repeatMode = (this.repeatMode + 1) % 3;
        const btn = document.getElementById('repeat-btn');
        
        if (this.repeatMode > 0) {
            btn.classList.add('text-yellow-400', 'bg-yellow-400/20');
            btn.classList.remove('text-gray-400');
        } else {
            btn.classList.remove('text-yellow-400', 'bg-yellow-400/20');
            btn.classList.add('text-gray-400');
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const btn = document.getElementById('mute-btn');
        const icon = btn.querySelector('i');
        const volumeSlider = document.getElementById('volume-slider');
        
        if (this.isMuted) {
            icon.setAttribute('data-lucide', 'volume-x');
            volumeSlider.value = 0;
        } else {
            icon.setAttribute('data-lucide', 'volume-2');
            volumeSlider.value = this.volume;
        }
        
        this.updateVolumeSlider();
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    updateProgress(value) {
        this.progress = parseInt(value);
        const progressBar = document.getElementById('progress-bar');
        const currentTime = Math.floor((this.progress / 100) * 240);
        
        document.getElementById('current-time').textContent = this.formatTime(currentTime);
        
        // Update slider background
        const percentage = this.progress;
        progressBar.style.background = `linear-gradient(to right, #f5b70c 0%, #f5b70c ${percentage}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} ${percentage}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} 100%)`;
    }

    updateVolume(value) {
        this.volume = parseInt(value);
        if (this.volume > 0) this.isMuted = false;
        this.updateVolumeSlider();
    }

    updateVolumeSlider() {
        const volumeSlider = document.getElementById('volume-slider');
        const displayVolume = this.isMuted ? 0 : this.volume;
        
        volumeSlider.style.background = `linear-gradient(to right, #f5b70c 0%, #f5b70c ${displayVolume}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} ${displayVolume}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} 100%)`;
    }

    scrollHorizontal(direction) {
        const scrollContainer = document.getElementById('horizontal-scroll');
        const scrollAmount = 320;
        
        scrollContainer.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    setActiveTab(tab) {
        this.activeTab = tab;
        
        // Update mobile nav buttons
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });

        // Handle panel states for mobile
        if (this.isMobile) {
            switch (tab) {
                case 'library':
                    this.leftPanelOpen = true;
                    this.rightPanelOpen = false;
                    break;
                case 'liked':
                    this.rightPanelOpen = true;
                    this.leftPanelOpen = false;
                    break;
                default:
                    this.leftPanelOpen = false;
                    this.rightPanelOpen = false;
            }
            this.updatePanelStates();
        }
    }

    updateGreeting() {
        const hour = new Date().getHours();
        let greeting = "Good evening";
        
        if (hour < 12) greeting = "Good morning";
        else if (hour < 18) greeting = "Good afternoon";
        
        document.getElementById('greeting').textContent = greeting;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    playSong(song) {
        this.currentSong = {
            title: song.title,
            artist: song.artist,
            album: "Album Name",
            artwork: song.artwork
        };
        
        // Update current song display
        document.getElementById('current-song-title').textContent = song.title;
        document.getElementById('current-song-artist').textContent = song.artist;
        document.getElementById('current-song-artwork').src = song.artwork;
        document.getElementById('player-song-title').textContent = song.title;
        document.getElementById('player-song-artist').textContent = song.artist;
        document.getElementById('player-song-artwork').src = song.artwork;
        
        // Auto-play
        this.isPlaying = true;
        this.togglePlayPause();
    }

    populateContent() {
        this.populateQuickAccess();
        this.populateRecentlyPlayed();
        this.populateFeaturedPlaylists();
        this.populateTrending();
        this.populateUpNext();
    }

    populateQuickAccess() {
        const container = document.getElementById('quick-access-grid');
        container.innerHTML = '';
        
        this.musicData.quickAccess.forEach((item, index) => {
            const element = this.createQuickAccessItem(item, index);
            container.appendChild(element);
        });
    }

    populateRecentlyPlayed() {
        const container = document.getElementById('recently-played-list');
        container.innerHTML = '';
        
        this.musicData.recentlyPlayed.forEach((item, index) => {
            const element = this.createListItem(item, index);
            container.appendChild(element);
        });
    }

    populateFeaturedPlaylists() {
        const container = document.getElementById('featured-playlists-list');
        container.innerHTML = '';
        
        this.musicData.featuredPlaylists.forEach((item, index) => {
            const element = this.createListItem(item, index);
            container.appendChild(element);
        });
    }

    populateTrending() {
        const container = document.getElementById('trending-list');
        container.innerHTML = '';
        
        this.musicData.recentlyPlayed.forEach((item, index) => {
            const element = this.createTrendingItem(item, index);
            container.appendChild(element);
        });
    }

    populateUpNext() {
        const container = document.getElementById('up-next-queue');
        container.innerHTML = '';
        
        this.musicData.upNextQueue.forEach((item, index) => {
            const element = this.createQueueItem(item, index);
            container.appendChild(element);
        });
    }

    createQuickAccessItem(item, index) {
        const div = document.createElement('div');
        div.className = `flex items-center p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
            this.isDarkTheme 
                ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
        } shadow-lg hover:shadow-xl border ${
            this.isDarkTheme ? 'border-gray-800' : 'border-gray-200'
        }`;
        
        div.innerHTML = `
            <img src="${item.artwork}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover mr-4">
            <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-lg truncate">${item.title}</h3>
                <p class="text-sm ${this.isDarkTheme ? 'text-gray-400' : 'text-gray-600'} truncate">${item.artist}</p>
            </div>
            <button class="play-btn w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105 ml-4">
                <i data-lucide="play" class="w-5 h-5 ml-0.5"></i>
            </button>
        `;
        
        div.querySelector('.play-btn').addEventListener('click', () => {
            this.playSong(item);
        });
        
        return div;
    }

    createListItem(item, index) {
        const div = document.createElement('div');
        div.className = `p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
            this.isDarkTheme 
                ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
        } shadow-lg hover:shadow-xl border ${
            this.isDarkTheme ? 'border-gray-800' : 'border-gray-200'
        }`;
        
        div.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${item.artwork}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover">
                <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg truncate">${item.title}</h3>
                    <p class="text-sm ${this.isDarkTheme ? 'text-gray-400' : 'text-gray-600'} truncate">${item.artist || item.description}</p>
                </div>
                <button class="play-btn w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105">
                    <i data-lucide="play" class="w-5 h-5 ml-0.5"></i>
                </button>
            </div>
        `;
        
        div.querySelector('.play-btn').addEventListener('click', () => {
            this.playSong(item);
        });
        
        return div;
    }

    createTrendingItem(item, index) {
        const div = document.createElement('div');
        div.className = `p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
            this.isDarkTheme 
                ? 'bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm' 
                : 'bg-white/70 hover:bg-white/90 backdrop-blur-sm'
        } shadow-lg hover:shadow-xl border ${
            this.isDarkTheme ? 'border-gray-800' : 'border-gray-200'
        }`;
        
        div.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <img src="${item.artwork}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover">
                    <div class="absolute -top-2 -left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                        #${index + 1}
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg truncate">${item.title}</h3>
                    <p class="text-sm ${this.isDarkTheme ? 'text-gray-400' : 'text-gray-600'} truncate">${item.artist}</p>
                </div>
                <button class="play-btn w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-yellow-400 hover:scale-105">
                    <i data-lucide="play" class="w-5 h-5 ml-0.5"></i>
                </button>
            </div>
        `;
        
        div.querySelector('.play-btn').addEventListener('click', () => {
            this.playSong(item);
        });
        
        return div;
    }

    createQueueItem(item, index) {
        const div = document.createElement('div');
        div.className = `flex items-center space-x-3 p-2 rounded-lg hover:bg-opacity-50 transition-colors duration-200 cursor-pointer ${
            this.isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`;
        
        div.innerHTML = `
            <img src="${item.artwork}" alt="${item.title}" class="w-10 h-10 rounded-md object-cover">
            <div class="flex-1 min-w-0">
                <p class="font-medium text-sm truncate">${item.title}</p>
                <p class="text-xs text-gray-400 truncate">${item.artist}</p>
            </div>
            <span class="text-xs text-gray-400">${item.duration}</span>
        `;
        
        div.addEventListener('click', () => {
            this.playSong(item);
        });
        
        return div;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicSoul = new MusicSoul();
});