// Music Soul - Pure JavaScript Implementation with Enhanced Navigation

class MusicSoul {
    constructor() {
        this.isDarkTheme = true;
        this.leftPanelOpen = true;
        this.rightPanelOpen = true;
        this.activeTab = 'home';
        this.currentPage = 'home';
        this.isMobile = window.innerWidth < 768;
        this.isPlaying = false;
        this.isLiked = false;
        this.isShuffled = false;
        this.isMuted = false;
        this.repeatMode = 0; // 0: off, 1: all, 2: one
        this.progress = 35;
        this.volume = 75;
        
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
            ],
            likedSongs: [
                {
                    title: "Midnight Dreams",
                    artist: "Luna Eclipse",
                    album: "Nocturnal Vibes",
                    dateAdded: "2 days ago",
                    duration: "4:32",
                    artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    title: "Synthwave Sunset",
                    artist: "Neon Drive",
                    album: "Retro Future",
                    dateAdded: "1 week ago",
                    duration: "3:45",
                    artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    title: "Jazz Cafe",
                    artist: "Smooth Notes",
                    album: "Evening Sessions",
                    dateAdded: "2 weeks ago",
                    duration: "5:12",
                    artwork: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                }
            ],
            playlists: [
                {
                    title: "Chill Vibes",
                    description: "Relaxing music for any time",
                    songCount: 45,
                    artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    title: "Workout Mix",
                    description: "High energy tracks for your workout",
                    songCount: 32,
                    artwork: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    title: "Late Night Jazz",
                    description: "Smooth jazz for late nights",
                    songCount: 28,
                    artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                }
            ],
            albums: [
                {
                    title: "Nocturnal Vibes",
                    artist: "Luna Eclipse",
                    year: "2023",
                    artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    title: "Retro Future",
                    artist: "Neon Drive",
                    year: "2023",
                    artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    title: "Evening Sessions",
                    artist: "Smooth Notes",
                    year: "2022",
                    artwork: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                }
            ],
            artists: [
                {
                    name: "Luna Eclipse",
                    followers: "1.2M",
                    artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    name: "Neon Drive",
                    followers: "890K",
                    artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    name: "Smooth Notes",
                    followers: "654K",
                    artwork: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                }
            ],
            downloads: [
                {
                    title: "Midnight Dreams",
                    artist: "Luna Eclipse",
                    size: "8.2 MB",
                    artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                },
                {
                    title: "Synthwave Sunset",
                    artist: "Neon Drive",
                    size: "7.8 MB",
                    artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                }
            ],
            languages: [
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'es', name: 'Español', flag: '🇪🇸' },
                { code: 'fr', name: 'Français', flag: '🇫🇷' },
                { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
                { code: 'it', name: 'Italiano', flag: '🇮🇹' },
                { code: 'pt', name: 'Português', flag: '🇵🇹' },
                { code: 'ja', name: '日本語', flag: '🇯🇵' },
                { code: 'ko', name: '한국어', flag: '🇰🇷' }
            ]
        };

        this.init();
    }

    // Helper method to safely get DOM elements
    safeGetElement(selector, context = document) {
        try {
            const element = context.querySelector(selector);
            if (!element) {
                console.warn(`Element not found: ${selector}`);
                return null;
            }
            return element;
        } catch (error) {
            console.error(`Error selecting element ${selector}:`, error);
            return null;
        }
    }

    // Helper method to safely get multiple DOM elements
    safeGetElements(selector, context = document) {
        try {
            const elements = context.querySelectorAll(selector);
            return Array.from(elements);
        } catch (error) {
            console.error(`Error selecting elements ${selector}:`, error);
            return [];
        }
    }

    init() {
        this.loadPreferences();
        this.setupEventListeners();
        this.populateContent();
        this.updateGreeting();
        this.updateTheme();
        this.checkMobile();
        this.showPage(this.currentPage);
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    loadPreferences() {
        const savedTheme = localStorage.getItem('musicSoulTheme');
        const savedLeftPanel = localStorage.getItem('musicSoulLeftPanel');
        const savedRightPanel = localStorage.getItem('musicSoulRightPanel');
        const savedPage = localStorage.getItem('musicSoulCurrentPage');
        
        if (savedTheme) this.isDarkTheme = savedTheme === 'dark';
        if (savedLeftPanel && !this.isMobile) this.leftPanelOpen = savedLeftPanel === 'true';
        if (savedRightPanel && !this.isMobile) this.rightPanelOpen = savedRightPanel === 'true';
        if (savedPage) this.currentPage = savedPage;
    }

    savePreferences() {
        localStorage.setItem('musicSoulTheme', this.isDarkTheme ? 'dark' : 'light');
        localStorage.setItem('musicSoulCurrentPage', this.currentPage);
        if (!this.isMobile) {
            localStorage.setItem('musicSoulLeftPanel', this.leftPanelOpen.toString());
            localStorage.setItem('musicSoulRightPanel', this.rightPanelOpen.toString());
        }
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = this.safeGetElement('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Panel toggles
        const leftPanelToggle = this.safeGetElement('#left-panel-toggle');
        if (leftPanelToggle) {
            leftPanelToggle.addEventListener('click', () => {
                this.toggleLeftPanel();
            });
        }

        const rightPanelToggle = this.safeGetElement('#right-panel-toggle');
        if (rightPanelToggle) {
            rightPanelToggle.addEventListener('click', () => {
                this.toggleRightPanel();
            });
        }

        // Top navigation
        const navBtns = this.safeGetElements('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                if (page) {
                    this.showPage(page);
                    this.setActiveNavBtn(btn);
                }
            });
        });

        // Library navigation
        const libraryNavBtns = this.safeGetElements('.library-nav-btn');
        libraryNavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                if (page) {
                    this.showPage(page);
                    this.setActiveLibraryBtn(btn);
                }
            });
        });

        // Profile dropdown
        const profileBtn = this.safeGetElement('#profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleProfileDropdown();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeProfileDropdown();
        });

        // Audio player controls
        const playPauseBtn = this.safeGetElement('#play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.togglePlayPause();
            });
        }

        const likeBtn = this.safeGetElement('#like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', () => {
                this.toggleLike();
            });
        }

        const shuffleBtn = this.safeGetElement('#shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                this.toggleShuffle();
            });
        }

        const repeatBtn = this.safeGetElement('#repeat-btn');
        if (repeatBtn) {
            repeatBtn.addEventListener('click', () => {
                this.toggleRepeat();
            });
        }

        const muteBtn = this.safeGetElement('#mute-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                this.toggleMute();
            });
        }

        // Progress and volume sliders
        const progressBar = this.safeGetElement('#progress-bar');
        if (progressBar) {
            progressBar.addEventListener('input', (e) => {
                this.updateProgress(e.target.value);
            });
        }

        const volumeSlider = this.safeGetElement('#volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.updateVolume(e.target.value);
            });
        }

        // Horizontal scroll controls
        const scrollLeft = this.safeGetElement('#scroll-left');
        if (scrollLeft) {
            scrollLeft.addEventListener('click', () => {
                this.scrollHorizontal('left');
            });
        }

        const scrollRight = this.safeGetElement('#scroll-right');
        if (scrollRight) {
            scrollRight.addEventListener('click', () => {
                this.scrollHorizontal('right');
            });
        }

        // Mobile navigation
        const mobileNavBtns = this.safeGetElements('.mobile-nav-btn');
        mobileNavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                if (tab) {
                    this.setActiveTab(tab);
                }
            });
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.checkMobile();
        });
    }

    showPage(pageName) {
        // Hide all pages
        const allPages = this.safeGetElements('.page-content');
        allPages.forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        const targetPage = this.safeGetElement(`#${pageName}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = pageName;
            this.savePreferences();
        }

        // Update navigation states
        this.updateNavigationStates(pageName);
    }

    updateNavigationStates(pageName) {
        // Update top navigation
        const navBtns = this.safeGetElements('.nav-btn');
        navBtns.forEach(btn => {
            btn.classList.remove('active', 'text-yellow-400', 'bg-yellow-400/20');
            btn.classList.add('text-gray-400');
            if (btn.dataset.page === pageName) {
                btn.classList.add('active', 'text-yellow-400', 'bg-yellow-400/20');
                btn.classList.remove('text-gray-400');
            }
        });

        // Update library navigation
        const libraryNavBtns = this.safeGetElements('.library-nav-btn');
        libraryNavBtns.forEach(btn => {
            btn.classList.remove('bg-yellow-400/20', 'text-yellow-400');
            btn.classList.add('text-gray-300');
            if (btn.dataset.page === pageName) {
                btn.classList.add('bg-yellow-400/20', 'text-yellow-400');
                btn.classList.remove('text-gray-300');
            }
        });
    }

    setActiveNavBtn(activeBtn) {
        const navBtns = this.safeGetElements('.nav-btn');
        navBtns.forEach(btn => {
            btn.classList.remove('active', 'text-yellow-400', 'bg-yellow-400/20');
            btn.classList.add('text-gray-400');
        });
        
        activeBtn.classList.add('active', 'text-yellow-400', 'bg-yellow-400/20');
        activeBtn.classList.remove('text-gray-400');
    }

    setActiveLibraryBtn(activeBtn) {
        const libraryNavBtns = this.safeGetElements('.library-nav-btn');
        libraryNavBtns.forEach(btn => {
            btn.classList.remove('bg-yellow-400/20', 'text-yellow-400');
            btn.classList.add('text-gray-300');
        });
        
        activeBtn.classList.add('bg-yellow-400/20', 'text-yellow-400');
        activeBtn.classList.remove('text-gray-300');
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
        const app = this.safeGetElement('#app');
        const themeToggle = this.safeGetElement('#theme-toggle');
        
        if (app) {
            if (this.isDarkTheme) {
                app.classList.remove('light-theme');
                app.className = 'min-h-screen font-poppins transition-colors duration-200 bg-gray-950 text-white';
            } else {
                app.classList.add('light-theme');
                app.className = 'min-h-screen font-poppins transition-colors duration-200 bg-gray-50 text-gray-900 light-theme';
            }
        }
        
        if (themeToggle) {
            if (this.isDarkTheme) {
                themeToggle.innerHTML = '<i data-lucide="sun" class="w-4 h-4"></i><span>Switch to Light Theme</span>';
            } else {
                themeToggle.innerHTML = '<i data-lucide="moon" class="w-4 h-4"></i><span>Switch to Dark Theme</span>';
            }
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
        const leftPanel = this.safeGetElement('#left-panel');
        const rightPanel = this.safeGetElement('#right-panel');
        const mainContent = this.safeGetElement('#main-content');

        if (this.isMobile) {
            // Mobile behavior
            if (leftPanel) {
                leftPanel.classList.toggle('open', this.leftPanelOpen);
            }
            if (rightPanel) {
                rightPanel.classList.toggle('open', this.rightPanelOpen);
            }
        } else {
            // Desktop behavior
            if (leftPanel && mainContent) {
                if (this.leftPanelOpen) {
                    leftPanel.style.width = '16rem';
                    mainContent.style.left = '16rem';
                } else {
                    leftPanel.style.width = '4rem';
                    mainContent.style.left = '4rem';
                }
            }

            if (rightPanel && mainContent) {
                if (this.rightPanelOpen) {
                    rightPanel.style.width = '20rem';
                    mainContent.style.right = '20rem';
                } else {
                    rightPanel.style.width = '4rem';
                    mainContent.style.right = '4rem';
                }
            }
        }
    }

    toggleProfileDropdown() {
        const dropdown = this.safeGetElement('#profile-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    closeProfileDropdown() {
        const dropdown = this.safeGetElement('#profile-dropdown');
        if (dropdown) {
            dropdown.classList.add('hidden');
        }
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = this.safeGetElement('#play-pause-btn');
        
        if (!btn) {
            console.error('Play/pause button not found');
            return;
        }
        
        const icon = btn.querySelector('i');
        if (!icon) {
            console.error('Play/pause icon not found');
            return;
        }
        
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
        const btn = this.safeGetElement('#like-btn');
        
        if (!btn) {
            console.error('Like button not found');
            return;
        }
        
        const icon = btn.querySelector('i');
        if (!icon) {
            console.error('Like icon not found');
            return;
        }
        
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
        const btn = this.safeGetElement('#shuffle-btn');
        
        if (!btn) {
            console.error('Shuffle button not found');
            return;
        }
        
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
        const btn = this.safeGetElement('#repeat-btn');
        
        if (!btn) {
            console.error('Repeat button not found');
            return;
        }
        
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
        const btn = this.safeGetElement('#mute-btn');
        const volumeSlider = this.safeGetElement('#volume-slider');
        
        if (!btn) {
            console.error('Mute button not found');
            return;
        }
        
        const icon = btn.querySelector('i');
        if (!icon) {
            console.error('Mute icon not found');
            return;
        }
        
        if (this.isMuted) {
            icon.setAttribute('data-lucide', 'volume-x');
            if (volumeSlider) {
                volumeSlider.value = 0;
            }
        } else {
            icon.setAttribute('data-lucide', 'volume-2');
            if (volumeSlider) {
                volumeSlider.value = this.volume;
            }
        }
        
        this.updateVolumeSlider();
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    updateProgress(value) {
        this.progress = parseInt(value);
        const progressBar = this.safeGetElement('#progress-bar');
        const currentTimeEl = this.safeGetElement('#current-time');
        
        if (currentTimeEl) {
            const currentTime = Math.floor((this.progress / 100) * 240);
            currentTimeEl.textContent = this.formatTime(currentTime);
        }
        
        // Update slider background
        if (progressBar) {
            const percentage = this.progress;
            progressBar.style.background = `linear-gradient(to right, #f5b70c 0%, #f5b70c ${percentage}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} ${percentage}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} 100%)`;
        }
    }

    updateVolume(value) {
        this.volume = parseInt(value);
        if (this.volume > 0) this.isMuted = false;
        this.updateVolumeSlider();
    }

    updateVolumeSlider() {
        const volumeSlider = this.safeGetElement('#volume-slider');
        
        if (volumeSlider) {
            const displayVolume = this.isMuted ? 0 : this.volume;
            volumeSlider.style.background = `linear-gradient(to right, #f5b70c 0%, #f5b70c ${displayVolume}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} ${displayVolume}%, ${this.isDarkTheme ? '#4B5563' : '#D1D5DB'} 100%)`;
        }
    }

    scrollHorizontal(direction) {
        const scrollContainer = this.safeGetElement('#horizontal-scroll');
        
        if (scrollContainer) {
            const scrollAmount = 320;
            scrollContainer.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    setActiveTab(tab) {
        this.activeTab = tab;
        
        // Update mobile nav buttons
        const mobileNavBtns = this.safeGetElements('.mobile-nav-btn');
        mobileNavBtns.forEach(btn => {
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
        const greetingEl = this.safeGetElement('#greeting');
        
        if (greetingEl) {
            const hour = new Date().getHours();
            let greeting = "Good evening";
            
            if (hour < 12) greeting = "Good morning";
            else if (hour < 18) greeting = "Good afternoon";
            
            greetingEl.textContent = greeting;
        }
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
        
        // Update current song display with safe element access
        const elements = {
            'current-song-title': song.title,
            'current-song-artist': song.artist,
            'player-song-title': song.title,
            'player-song-artist': song.artist
        };
        
        Object.entries(elements).forEach(([id, text]) => {
            const element = this.safeGetElement(`#${id}`);
            if (element) {
                element.textContent = text;
            }
        });
        
        // Update artwork
        const artworkElements = ['#current-song-artwork', '#player-song-artwork'];
        artworkElements.forEach(selector => {
            const element = this.safeGetElement(selector);
            if (element) {
                element.src = song.artwork;
            }
        });
        
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
        this.populateLikedSongs();
        this.populatePlaylists();
        this.populateAlbums();
        this.populateArtists();
        this.populateDownloads();
        this.populateLanguages();
        this.populateProfileData();
    }

    populateQuickAccess() {
        const container = this.safeGetElement('#quick-access-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.quickAccess.forEach((item, index) => {
            const element = this.createQuickAccessItem(item, index);
            container.appendChild(element);
        });
    }

    populateRecentlyPlayed() {
        const container = this.safeGetElement('#recently-played-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.recentlyPlayed.forEach((item, index) => {
            const element = this.createListItem(item, index);
            container.appendChild(element);
        });
    }

    populateFeaturedPlaylists() {
        const container = this.safeGetElement('#featured-playlists-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.featuredPlaylists.forEach((item, index) => {
            const element = this.createListItem(item, index);
            container.appendChild(element);
        });
    }

    populateTrending() {
        const container = this.safeGetElement('#trending-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.recentlyPlayed.forEach((item, index) => {
            const element = this.createTrendingItem(item, index);
            container.appendChild(element);
        });
    }

    populateUpNext() {
        const container = this.safeGetElement('#up-next-queue');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.upNextQueue.forEach((item, index) => {
            const element = this.createQueueItem(item, index);
            container.appendChild(element);
        });
    }

    populateLikedSongs() {
        const container = this.safeGetElement('#liked-songs-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.likedSongs.forEach((song, index) => {
            const element = this.createSongListItem(song, index);
            container.appendChild(element);
        });
    }

    populatePlaylists() {
        const container = this.safeGetElement('#playlists-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.playlists.forEach((playlist, index) => {
            const element = this.createPlaylistCard(playlist, index);
            container.appendChild(element);
        });
    }

    populateAlbums() {
        const container = this.safeGetElement('#albums-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.albums.forEach((album, index) => {
            const element = this.createAlbumCard(album, index);
            container.appendChild(element);
        });
    }

    populateArtists() {
        const container = this.safeGetElement('#artists-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.artists.forEach((artist, index) => {
            const element = this.createArtistCard(artist, index);
            container.appendChild(element);
        });
    }

    populateDownloads() {
        const container = this.safeGetElement('#downloads-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.downloads.forEach((download, index) => {
            const element = this.createDownloadItem(download, index);
            container.appendChild(element);
        });
    }

    populateLanguages() {
        const container = this.safeGetElement('#languages-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.musicData.languages.forEach((language, index) => {
            const element = this.createLanguageItem(language, index);
            container.appendChild(element);
        });
    }

    populateProfileData() {
        const recentArtistsContainer = this.safeGetElement('#recent-artists');
        const topGenresContainer = this.safeGetElement('#top-genres');
        
        if (recentArtistsContainer) {
            recentArtistsContainer.innerHTML = '';
            this.musicData.artists.slice(0, 3).forEach((artist, index) => {
                const element = this.createRecentArtistItem(artist, index);
                recentArtistsContainer.appendChild(element);
            });
        }
        
        if (topGenresContainer) {
            const genres = ['Electronic', 'Jazz', 'Pop', 'Rock', 'Classical'];
            topGenresContainer.innerHTML = '';
            genres.forEach((genre, index) => {
                const element = this.createGenreItem(genre, index);
                topGenresContainer.appendChild(element);
            });
        }
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
        
        const playBtn = div.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playSong(item);
            });
        }
        
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
        
        const playBtn = div.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playSong(item);
            });
        }
        
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
        
        const playBtn = div.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playSong(item);
            });
        }
        
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

    createSongListItem(song, index) {
        const div = document.createElement('div');
        div.className = `grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group`;
        
        div.innerHTML = `
            <div class="col-span-1 flex items-center text-gray-400 group-hover:text-white">
                <span class="group-hover:hidden">${index + 1}</span>
                <i data-lucide="play" class="w-4 h-4 hidden group-hover:block"></i>
            </div>
            <div class="col-span-5 flex items-center space-x-3">
                <img src="${song.artwork}" alt="${song.title}" class="w-10 h-10 rounded object-cover">
                <div class="min-w-0">
                    <p class="font-medium truncate">${song.title}</p>
                    <p class="text-sm text-gray-400 truncate">${song.artist}</p>
                </div>
            </div>
            <div class="col-span-3 flex items-center text-gray-400 truncate">${song.album}</div>
            <div class="col-span-2 flex items-center text-gray-400">${song.dateAdded}</div>
            <div class="col-span-1 flex items-center justify-center text-gray-400">${song.duration}</div>
        `;
        
        div.addEventListener('click', () => {
            this.playSong(song);
        });
        
        return div;
    }

    createPlaylistCard(playlist, index) {
        const div = document.createElement('div');
        div.className = `bg-gray-900/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer group`;
        
        div.innerHTML = `
            <img src="${playlist.artwork}" alt="${playlist.title}" class="w-full aspect-square rounded-lg object-cover mb-4">
            <h3 class="font-semibold text-lg truncate mb-2">${playlist.title}</h3>
            <p class="text-sm text-gray-400 truncate mb-2">${playlist.description}</p>
            <p class="text-xs text-gray-500">${playlist.songCount} songs</p>
        `;
        
        return div;
    }

    createAlbumCard(album, index) {
        const div = document.createElement('div');
        div.className = `bg-gray-900/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer group`;
        
        div.innerHTML = `
            <img src="${album.artwork}" alt="${album.title}" class="w-full aspect-square rounded-lg object-cover mb-4">
            <h3 class="font-semibold text-lg truncate mb-1">${album.title}</h3>
            <p class="text-sm text-gray-400 truncate mb-1">${album.artist}</p>
            <p class="text-xs text-gray-500">${album.year}</p>
        `;
        
        return div;
    }

    createArtistCard(artist, index) {
        const div = document.createElement('div');
        div.className = `bg-gray-900/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer group`;
        
        div.innerHTML = `
            <img src="${artist.artwork}" alt="${artist.name}" class="w-full aspect-square rounded-full object-cover mb-4">
            <h3 class="font-semibold text-lg truncate mb-1">${artist.name}</h3>
            <p class="text-sm text-gray-400">${artist.followers} followers</p>
        `;
        
        return div;
    }

    createDownloadItem(download, index) {
        const div = document.createElement('div');
        div.className = `grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer`;
        
        div.innerHTML = `
            <div class="col-span-1 flex items-center text-gray-400">${index + 1}</div>
            <div class="col-span-5 flex items-center space-x-3">
                <img src="${download.artwork}" alt="${download.title}" class="w-10 h-10 rounded object-cover">
                <div class="min-w-0">
                    <p class="font-medium truncate">${download.title}</p>
                    <p class="text-sm text-gray-400 truncate">${download.artist}</p>
                </div>
            </div>
            <div class="col-span-3 flex items-center text-gray-400">${download.artist}</div>
            <div class="col-span-2 flex items-center text-gray-400">${download.size}</div>
            <div class="col-span-1 flex items-center justify-center">
                <i data-lucide="download" class="w-4 h-4 text-yellow-400"></i>
            </div>
        `;
        
        return div;
    }

    createLanguageItem(language, index) {
        const div = document.createElement('div');
        div.className = `flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer`;
        
        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">${language.flag}</span>
                <span class="font-medium">${language.name}</span>
            </div>
            <input type="radio" name="language" value="${language.code}" class="text-yellow-500">
        `;
        
        return div;
    }

    createRecentArtistItem(artist, index) {
        const div = document.createElement('div');
        div.className = `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200`;
        
        div.innerHTML = `
            <img src="${artist.artwork}" alt="${artist.name}" class="w-10 h-10 rounded-full object-cover">
            <div>
                <p class="font-medium text-sm">${artist.name}</p>
                <p class="text-xs text-gray-400">${artist.followers} followers</p>
            </div>
        `;
        
        return div;
    }

    createGenreItem(genre, index) {
        const div = document.createElement('div');
        div.className = `flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200`;
        
        div.innerHTML = `
            <span class="font-medium text-sm">${genre}</span>
            <span class="text-xs text-gray-400">${Math.floor(Math.random() * 50) + 10}%</span>
        `;
        
        return div;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicSoul = new MusicSoul();
});