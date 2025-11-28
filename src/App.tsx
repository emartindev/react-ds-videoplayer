import './App.css'
import { VideoPlaylistPlayer } from './VideoPlaylistPlayer'

const demoPlaylist = [
  {
    id: 'mt-baker',
    title: 'Mt. Baker Sunrise',
    description: 'A calm aerial shot of the Cascades at first light.',
    src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    poster:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60',
    type: 'video/mp4',
  },
  {
    id: 'drone-ocean',
    title: 'Pacific Waves',
    description: 'Slow-motion waves captured from a drone in Hawaii.',
    src: 'https://storage.googleapis.com/coverr-main/mp4/Pacific_Waves.mp4',
    poster:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=60',
    type: 'video/mp4',
  },
  {
    id: 'city-night',
    title: 'City Night Timelapse',
    description: 'Timelapse of downtown traffic painting light trails.',
    src: 'https://storage.googleapis.com/coverr-main/mp4/Foot_Traffic.mp4',
    poster:
      'https://images.unsplash.com/photo-1469478712689-33e4e0b25b8a?auto=format&fit=crop&w=1600&q=60',
    type: 'video/mp4',
  },
]

function App() {
  return (
    <main className="app">
      <div className="app__content">
        <p className="app__eyebrow">React DS Video Player</p>
        <h1>Playlist-first video player</h1>
        <p className="app__lead">
          Drop this component into any React project, pass it an array of video sources, and you
          instantly get a modern video experience with a built-in playlist.
        </p>

        <VideoPlaylistPlayer videos={demoPlaylist} />
      </div>
    </main>
  )
}

export default App
