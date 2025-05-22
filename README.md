
# 🎵 Music Soul 

**Music Soul** is a full-featured music streaming web app. It provides smooth audio playback, playlist browsing, and user-friendly controls. Now enhanced with **Spotify Web API** for rich song data and **Firebase** for user authentication and playlist management.


## ✨ Features

- 🎶 **Stream Music**: Browse and play full tracks from curated playlists
- 🔥 **Firebase Integration**: Secure user authentication and real-time playlist storage
- 🎵 **Spotify API Integration**: Fetches song metadata, album covers, and audio previews
- 📁 **Admin Playlist Management**: Update playlists via a JSON-based CMS
- 🧠 **Smart Triggers**: Auto-play music on welcome screen, pause on user interaction
- 🕹️ **User Controls**: Play, pause, skip, volume, mute
- 🔄 **Preference Memory**: Remembers volume/mute state across sessions
- 📱 **Responsive Design**: Works on all screen sizes
- 🧩 **Future-Ready**: Built for easy integration with analytics and personalization features


## 📁 Project Structure

```

Music\_Soul/
├── app/
│   ├── app.py                 # Flask app entry point
│   ├── music\_player.py        # Handles audio logic
│   ├── triggers.py            # Logic for smart playback control
│   ├── user\_controls.py       # UI interaction handling
│   ├── spotify.py             # Spotify API integration
│   └── firebase\_auth.py       # Firebase login/playlist sync
├── cms/
│   └── playlist.json          # Admin-editable playlist data
├── media/
│   └── tracks/                # Optional local audio storage
├── static/
│   └── js/music.js            # JS for client-side control
├── templates/
│   ├── welcome.html           # Autoplay welcome screen
│   └── playlists.html         # Music streaming UI
├── .env                       # Environment variables (not committed)
├── .gitignore                 # Includes .env and other private files
├── requirements.txt           # Python dependencies
└── README.md                  # You're here!

````


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Music_Soul
````

### 2. Set Up Environment

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

**Do not commit `.env` — it should be in your `.gitignore`.**

### 5. Run the App

```bash
python app.py
```

### 6. Open in Browser

```
http://127.0.0.1:5000/
```


## 🎧 Usage

* 🎵 Music plays automatically on the welcome screen
* 📑 Browse playlists and stream tracks with full controls
* 🔐 Users can log in using Firebase authentication
* 💾 User preferences and playlists are saved to Firestore
* 🛠 Admins can manage playlists via the `cms/playlist.json` file


## ✅ Functional Requirements

* **FR-1**: Autoplay music on welcome screen
* **FR-2**: Pause on focused tasks (e.g., form input)
* **FR-3**: Spotify metadata displayed on UI
* **FR-4**: Firebase login and user-specific data
* **FR-5**: Persistent preferences (volume, mute)
* **FR-6**: Admin-defined playlists via CMS


## ⚙️ Non-Functional Requirements

* **NFR-1**: Fast, responsive design
* **NFR-2**: Smooth audio playback (Spotify previews or local)
* **NFR-3**: Cross-browser compatibility
* **NFR-4**: Accessibility-first UI
* **NFR-5**: Secure handling of API credentials


## 📊 Data Requirements

* **Spotify**: Track ID, title, artist, preview URL, image URL
* **Firebase**: Auth data (UID, email), playlist documents, preferences
* **CMS**: Admin JSON with playlist categories and track IDs


## 🛠 Built With

* 🐍 **Python (Flask)** — Backend
* 🎵 **Spotify Web API** — Song previews, metadata
* 🔥 **Firebase** — Auth, Firestore, real-time storage
* 🧠 **LocalStorage** — Persistent user preferences
* 🖥️ **HTML/CSS/JavaScript** — Frontend UI and interactivity


## 🔮 Future Enhancements

* 📈 Analytics for most played tracks
* 🎙️ Lyrics and real-time syncing
* 🤝 Collaborative playlist sessions
* 🎨 Custom UI themes per user
* 🌍 Multi-language support
* 🔗 Full Spotify playback via OAuth (Premium required)

