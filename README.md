# Spotify Clone

A music streaming application inspired by Spotify. Stream music, create playlists, and discover new artists. Built with modern web technologies.

## Features

- 🎵 **Music Streaming** - Stream high-quality audio
- 📱 **Responsive** - Works on all devices
- 🎵 **Playlist Creation** - Create and manage playlists
- 🔍 **Search** - Find songs and artists
- ❤️ **Likes** - Save favorite songs
- 📊 **User Profile** - Personalized recommendations
- 🎨 **Album Art** - Beautiful album covers
- ⏱️ **Progress Bar** - Track song progress
- 🔀 **Shuffle** - Random playback
- 🔁 **Repeat** - Loop songs or playlists

## Tech Stack

- **React** - Frontend
- **Tailwind CSS** - Styling
- **Node.js/Express** - Backend
- **MongoDB** - Database
- **Firebase** - Audio storage
- **Redux** - State management

## Installation

```bash
git clone https://github.com/MUHAMMADSHAYAN593/spotify-clone.git
cd spotify-clone
npm install
```

Create `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_CONFIG=your_config
```

Start:
```bash
npm start
```

Open `http://localhost:3000`

## Project Structure

```
spotify-clone/
├── src/
│   ├── components/
│   │   ├── Player/
│   │   ├── Sidebar/
│   │   ├── NowPlaying/
│   │   └── Playlist/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── App.jsx
├── public/
└── package.json
```

## Key Features

### Music Playback
- Play, pause, skip
- Volume control
- Progress tracking
- Song queue
- Shuffle and repeat

### Playlists
- Create playlists
- Add/remove songs
- Reorder songs
- Share playlists
- Collaborative playlists

### Discovery
- Personalized recommendations
- Trending songs
- Genre browsing
- Artist pages
- Album browsing

### Library
- Liked songs
- Downloaded songs
- Recently played
- Saved playlists
- Followed artists

## API Endpoints

- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get song details
- `GET /api/playlists` - Get user playlists
- `POST /api/playlists` - Create playlist
- `GET /api/artists` - Get artists
- `GET /api/albums` - Get albums

## Usage

### Search for Music

1. Click search bar
2. Type song, artist, or album name
3. Browse results
4. Click to play

### Create Playlist

1. Click "Create Playlist"
2. Enter name
3. Search and add songs
4. Save playlist

### Listen to Music

1. Find song or playlist
2. Click play
3. Control playback
4. View lyrics (if available)

## Database Models

- Users
- Songs
- Albums
- Artists
- Playlists
- Likes
- Queue

## Audio Quality

- 128 kbps - Low
- 256 kbps - Normal
- 320 kbps - High
- Lossless - Lossless Audio

## Offline Mode

- Download songs
- Listen offline
- Sync across devices
- Storage management

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

## Future Improvements

- [ ] Add podcasts
- [ ] Implement radio stations
- [ ] Add video content
- [ ] Create social features
- [ ] Build mobile app

## License

MIT License