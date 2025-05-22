# music soul
Music Soul is a web application feature that integrates pleasant background music into user-facing screens to enhance user experience (UX). It offers ambient sound during idle or browsing moments, with adaptive controls and smooth playback designed to comply with modern web standards and user preferences.

# Features
Background Music Playback: Automatically plays soft ambient music on welcome and browsing screens.

Smart Triggers: Activates during long content loads and pauses on focused tasks or other media playback.

User Controls: UI elements for pause/play, mute/unmute, and volume adjustments.

Preferences Memory: Saves user settings (volume, mute state) across sessions.

Admin Content Management: Update playlists seasonally or thematically through CMS without code changes.

Responsive Design: Seamless audio integration without disrupting page performance.

# Project Structure

Music_Soul/
├── app/
│   ├── music_player.py        # Core playback logic
│   ├── triggers.py            # Logic for screen and task-based triggers
│   └── user_controls.py       # Playback and settings controls
├── templates/
│   ├── welcome.html           # Screen with background music
│   └── playlists.html         # Browsing interface
├── static/
│   └── js/music.js            # Client-side controls
├── requirements.txt           # Dependencies
└── README.md                  # Project overview

# Getting Started

1. Clone the Repository

git clone <repository-url>
cd Music_Soul


2. Set Up a Virtual Environment (Recommended)

python -m venv venv
source venv/bin/activate  # Or venv\Scripts\activate on Windows


3. Install Dependencies

pip install -r requirements.txt


4. Run the Application

python app.py


5. Access in Browser Visit http://127.0.0.1:5000/ to use the feature.

# Functional Requirements

FR-1 to FR-5: Playback triggers and pause conditions.

FR-6 to FR-7: Dynamic music selection from media library.

FR-8 to FR-9: User playback controls and preference persistence.


