declare module 'react-ds-videoplayer' {
  import { ComponentType, CSSProperties } from 'react'

  export type VideoPlaylistItem = {
    id?: string
    src: string
    title?: string
    description?: string
    poster?: string
    type?: string
  }

  export type VideoPlaylistPlayerProps = {
    videos?: VideoPlaylistItem[]
    playlist?: VideoPlaylistItem[]
    initialIndex?: number
    autoPlay?: boolean
    loop?: boolean
    muted?: boolean
    showControls?: boolean
    controls?: boolean
    showMetadata?: boolean
    showPlaylist?: boolean
    onVideoChange?: (video: VideoPlaylistItem, index: number) => void
    className?: string
    style?: CSSProperties
  }

  export const VideoPlaylistPlayer: ComponentType<VideoPlaylistPlayerProps>
  export default VideoPlaylistPlayer
}


