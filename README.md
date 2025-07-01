# 🎵 Music Soul - Feel the Music

A modern, responsive music streaming web application built with React, TypeScript, and Tailwind CSS. Experience music like never before with our sleek, Spotify-inspired interface.

## ✨ Features

### 🎨 Design & UI
- **Modern Interface**: Spotify-inspired design with custom golden accent (#f5b70c)
- **Dark/Light Themes**: Seamless theme switching with user preference persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glass Morphism**: Subtle backdrop blur effects and modern aesthetics
- **Custom Scrollbars**: Styled scrollbars with accent color theming

### 🎵 Music Experience
- **Audio Player**: Full-featured bottom player with play/pause, skip, shuffle, repeat
- **Progress Control**: Interactive progress bar with time display
- **Volume Control**: Dedicated volume slider with mute functionality
- **Queue Management**: "Up Next" queue with track previews
- **Song Information**: Rich metadata display with album artwork

### 🗂 Navigation & Layout
- **Collapsible Panels**: 
  - Left panel: "My Library" with accordion-style toggle
  - Right panel: "Feel the Music" with queue and lyrics
- **Smart Layout**: Responsive grid system adapting to panel states
- **Smooth Animations**: 200ms transitions for all interactions
- **Keyboard Accessible**: Full ARIA support and keyboard navigation

### 💾 Persistence
- **LocalStorage Integration**: Remembers theme, panel states, and user preferences
- **Session Continuity**: Maintains user settings across browser sessions

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom configurations
- **Icons**: Lucide React (Feather icon family)
- **Build Tool**: Vite
- **Fonts**: Poppins (Google Fonts) with Segoe UI fallback

## 📁 Project Structure

```
src/
├── components/
│   ├── AudioPlayer.tsx      # Bottom audio player with controls
│   ├── LeftPanel.tsx        # Collapsible library navigation
│   ├── RightPanel.tsx       # Queue and music info panel
│   ├── MainContent.tsx      # Central content area with music discovery
│   ├── TopNav.tsx           # Header with search and profile
│   └── ProfileDropdown.tsx  # User profile menu
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css               # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd music-soul
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎯 Key Components

### AudioPlayer
- Full-featured music controls
- Progress tracking with visual feedback
- Volume management with mute toggle
- Shuffle and repeat modes
- Like/unlike functionality

### Navigation Panels
- **Left Panel**: Library management with collapsible accordion
- **Right Panel**: Queue management and music discovery
- **Responsive**: Auto-collapse on mobile devices

### MainContent
- Hero search section with dynamic greetings
- Quick access grid for frequent actions
- Horizontal scrolling music carousels
- Featured playlists and trending content

### Theme System
- Dark/light mode toggle
- Consistent color scheme with golden accents
- Smooth transitions between themes
- User preference persistence

## 🎨 Design System

### Colors
- **Primary Accent**: #f5b70c (Golden yellow)
- **Dark Background**: #0a0a0a (Near black)
- **Secondary**: Various gray tones for depth
- **Interactive States**: Hover and focus effects

### Typography
- **Primary Font**: Poppins (300, 400, 600, 700)
- **Fallback**: Segoe UI, sans-serif
- **Hierarchy**: Clear weight distinction for headings and body text

### Spacing
- **Consistent Scale**: 8px base unit system
- **Responsive**: Adaptive spacing for different screen sizes

## 📱 Responsive Behavior

- **Desktop**: Full three-panel layout with expanded features
- **Tablet**: Adaptive panel sizing with touch-friendly controls
- **Mobile**: Collapsible panels with hamburger menu navigation

## 🔧 Customization

### Theme Configuration
Edit `tailwind.config.js` to customize:
- Color palette
- Font families
- Spacing scale
- Animation timings

### Component Styling
Each component uses Tailwind classes with conditional theming:
```tsx
className={`base-styles ${isDarkTheme ? 'dark-styles' : 'light-styles'}`}
```

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🎵 Future Enhancements

- **Real Audio Integration**: Connect to Spotify Web API or similar
- **User Authentication**: Personal playlists and preferences
- **Social Features**: Sharing and collaborative playlists
- **Advanced Search**: Filters and recommendations
- **Offline Mode**: Downloaded music playback
- **Visualizations**: Audio spectrum and waveform displays

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Music Soul** - Where technology meets melody. Feel the music, live the experience.