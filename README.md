# 🎵 Music Soul

**Music Soul** is a full-featured web application for music streaming, built to deliver a sleek, immersive experience . It allows users to browse, stream songs, control playback, and enjoy smart UI interactions, with playlists and content managed via a flexible CMS.


## ✨ Features

- 🎶 **Stream Music**: Full-track streaming from curated playlists  
- 📁 **Admin Playlist Management**: Update seasonal/thematic music via a no-code CMS  
- 🧠 **Smart Playback Triggers**: Music auto-plays on welcome or idle screens and pauses during focused tasks or user interactions  
- 🕹️ **Intuitive Controls**: Users can play/pause, mute/unmute, skip, and adjust volume  
- 🔄 **User Preference Memory**: Playback settings persist across sessions  
- 📱 **Responsive Design**: Seamlessly works on desktop, tablet, and mobile  
- 🎧 **Future-Ready Architecture**: Easy to extend with analytics, personalization, and streaming service integrations (e.g. Spotify)  


## 📁 Project Structure

```

Music\_Soul/
├── app/
│   ├── app.py                 # Flask app entry point
│   ├── music\_player.py        # Handles track loading and playback logic
│   ├── triggers.py            # Trigger-based playback logic
│   └── user\_controls.py       # Handles user interactions (play/pause/mute/etc.)
├── templates/
│   ├── welcome.html           # Welcome screen with autoplay
│   └── playlists.html         # Playlist browsing and playback
├── static/
│   └── js/
│       └── music.js           # JavaScript for dynamic controls and playback
├── media/
│   └── tracks/                # MP3 or audio files (or streaming links)
├── cms/
│   └── playlist.json          # Admin-editable playlist config
├── requirements.txt           # Python dependencies
└── README.md                  # Project overview

````


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Music_Soul
````

### 2. Create and Activate Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

### 5. Access in Browser

```
http://127.0.0.1:5000/
```


## 🎧 Usage

* On **welcome screen**, music plays automatically
* On **playlist screen**, users can browse and stream tracks
* **User controls**: Play, pause, mute, volume
* **Admin** can edit playlists by modifying `cms/playlist.json`
* **Preferences** like mute and volume persist using local storage



## ✅ Functional Requirements

* **FR-1**: Auto-play music on welcome screen
* **FR-2**: Pause playback on form entries or focused tasks
* **FR-3**: User can control playback via UI
* **FR-4**: Playlists defined by admin in CMS
* **FR-5**: Preference state (volume, mute) saved between sessions


## ⚙️ Non-Functional Requirements

* **NFR-1**: Fast initial load and responsive design
* **NFR-2**: Smooth audio streaming and fallback support
* **NFR-3**: Compatible with all major browsers
* **NFR-4**: Accessible UI for all users
* **NFR-5**: Secure and scalable backend structure


## 📊 Data Requirements

* Track metadata: ID, title, artist, duration, file path/URL
* User preferences: Stored via LocalStorage or cookie
* Playlist config: Stored in CMS JSON or backend DB


## 🧩 Future Enhancements

* 📈 User analytics and trending songs
* 🎨 Custom themes and visualizers
* 🎙️ Lyrics display and synced subtitles
* 🤝 Collaborative listening sessions
* 🧠 Context-aware playlist curation
* 🌍 Multi-language support
* 🔗 Integration with Spotify API or YouTube Music


## 🛠 Built With

* **Python (Flask)** — Backend framework
* **HTML/CSS/JS** — Frontend templates
* **JavaScript** — Playback & interaction logic
* **LocalStorage** — Persistent settings
* **CMS (JSON or Headless)** — Playlist management


