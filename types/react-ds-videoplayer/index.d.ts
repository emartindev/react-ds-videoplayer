declare module 'react-ds-videoplayer' {
  import { ComponentType, HTMLAttributes } from 'react'

  export interface VideoSource {
    src: string
    type?: string
    poster?: string
    title?: string
  }

  export interface VideoPlaylistPlayerProps extends HTMLAttributes<HTMLDivElement> {
    playlist: VideoSource[]
    autoPlay?: boolean
    loop?: boolean
    muted?: boolean
    controls?: boolean
    className?: string
  }

  export const VideoPlaylistPlayer: ComponentType<VideoPlaylistPlayerProps>
}

