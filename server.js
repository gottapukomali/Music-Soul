const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Sample music data
const sampleSongs = [
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

const sampleAlbums = [
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

const sampleArtists = [
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

// API Routes
app.get('/api/songs', (req, res) => {
  res.json(sampleSongs);
});

app.get('/api/songs/:id', (req, res) => {
  const song = sampleSongs.find(s => s.id === parseInt(req.params.id));
  if (!song) {
    return res.status(404).json({ error: 'Song not found' });
  }
  res.json(song);
});

app.get('/api/albums', (req, res) => {
  res.json(sampleAlbums);
});

app.get('/api/artists', (req, res) => {
  res.json(sampleArtists);
});

app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const results = sampleSongs.filter(song => 
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query) ||
    song.album.toLowerCase().includes(query)
  );
  res.json(results);
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Music Soul server running on http://localhost:${PORT}`);
  console.log(`🚀 Open your browser and navigate to the URL above`);
});

module.exports = app;