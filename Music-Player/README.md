# Local Music Media Player

This is a local music media player built using HTML, CSS, and JavaScript. It allows you to play, pause, and navigate through songs in different playlists. Each playlist is detected from the `PlayLists` folder, which contains folders with an `info.json` file for metadata and an optional image for the playlist cover.

## Key Features

- **Play/Pause**: Control the playback of the current song.
- **Next/Previous**: Skip to the next or previous song in the playlist.
- **Seekbar**: Navigate to any part of the current song.
- **Different Playlists**: Each playlist is detected from the `PlayLists` folder.
- **Playlist Creation**: To create a new playlist, simply add a new folder in the `PlayLists` folder with an `info.json` file for title and description, and optionally an image for the playlist cover.
- **Playlist Cover Image**: Each playlist will have a default image, but you can change it by adding any photo in the folder of that playlist.
- **Playlist Display**: Clicking on a playlist displays the songs in that playlist. Clicking on a song starts its playback.
- **Empty Playlist Handling**: If a playlist is empty, "No songs found" will be displayed.
- **Playback Information**: The playbar displays the name of the song, the current time of the song, and the total duration of the song.

## Folder Structure

/PlayLists
/Playlist1
- info.json
- cover.jpg (optional)
- song1.mp3
- song2.mp3

### `info.json` Format

Each `info.json` file should contain the following fields:

```json
{
    "title": "Playlist Title",
    "description": "Description of the playlist"
}
```
  

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/local-music-media-player.git
2. Navigate to the project directory:
   ```bach
   cd local-music-media-player
3. add some music files in any playlist of "PlayLists" or make any other playlist
4. Preview index.html
