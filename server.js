const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

dotenv.config();

const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 🔐 Spotify token route
app.get('/spotify/token', async (req, res) => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Spotify error:', err);
    res.status(500).json({ error: 'Failed to fetch Spotify token' });
  }
});

// 🔍 Firestore test route
app.get('/test-db', async (req, res) => {
  try {
    await db.collection('test').add({
      message: 'Hello from Firestore!',
      time: new Date()
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Firestore error:', err);
    res.status(500).json({ error: 'Write failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Music server running at http://localhost:${PORT}`);
});
