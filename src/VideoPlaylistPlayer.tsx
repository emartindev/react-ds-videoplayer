import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import './VideoPlaylistPlayer.css'

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

const clampIndex = (index: number, total: number) => {
  if (total === 0) return -1

  return Math.min(Math.max(index, 0), total - 1)
}

export function VideoPlaylistPlayer({
  videos,
  playlist,
  initialIndex = 0,
  autoPlay = true,
  loop = true,
  muted = true,
  showControls = false,
  controls,
  showMetadata = false,
  showPlaylist = false,
  onVideoChange,
  className,
  style,
}: VideoPlaylistPlayerProps) {
  const resolvedVideos = useMemo(
    () => (videos && videos.length > 0 ? videos : playlist ?? []),
    [videos, playlist],
  )
  const controlsEnabled = showControls ?? controls ?? false
  const [currentIndex, setCurrentIndex] = useState(() => clampIndex(initialIndex, resolvedVideos.length))
  const activeIndex = clampIndex(currentIndex, resolvedVideos.length)
  const currentVideo = resolvedVideos[activeIndex]
  const hasPlaylist = Boolean(showPlaylist && resolvedVideos.length > 1)

  useEffect(() => {
    if (currentVideo) {
      onVideoChange?.(currentVideo, activeIndex)
    }
  }, [currentVideo, activeIndex, onVideoChange])

  const safeClassName = useMemo(
    () => ['video-playlist-player', className].filter(Boolean).join(' '),
    [className],
  )

  const mergedStyle = useMemo<CSSProperties>(
    () => ({
      width: '100%',
      height: '100%',
      ...style,
    }),
    [style],
  )

  const selectVideo = (index: number) => {
    setCurrentIndex(clampIndex(index, resolvedVideos.length))
  }

  const goNext = () => {
    setCurrentIndex((prev) => {
      if (!resolvedVideos.length) return prev
      const next = prev + 1

      if (next >= resolvedVideos.length) {
        return loop ? 0 : prev
      }

      return next
    })
  }

  if (!resolvedVideos.length) {
    return null
  }

  const shouldRenderMeta =
    showMetadata && currentVideo && (currentVideo.title || currentVideo.description)

  return (
    <section
      className={safeClassName}
      style={mergedStyle}
      data-has-playlist={hasPlaylist ? 'true' : undefined}
      aria-label="Video playlist player"
    >
      <div className="video-playlist-player__stage">
        <div className="video-playlist-player__media-wrapper">
          <video
            key={currentVideo.src}
            className="video-playlist-player__media"
            controls={controlsEnabled}
            poster={currentVideo.poster}
            autoPlay={autoPlay}
            loop={loop && resolvedVideos.length === 1}
            muted={muted}
            playsInline
            onEnded={resolvedVideos.length > 1 ? goNext : undefined}
          >
            <source src={currentVideo.src} type={currentVideo.type} />
            Your browser does not support the video tag.
          </video>
          {shouldRenderMeta ? (
            <div className="video-playlist-player__meta" aria-live="polite">
              {currentVideo.title ? <h2>{currentVideo.title}</h2> : null}
              {currentVideo.description ? <p>{currentVideo.description}</p> : null}
            </div>
          ) : null}
        </div>
      </div>

      {showPlaylist ? (
        <ol className="video-playlist-player__playlist">
          {resolvedVideos.map((video, index) => {
            const isActive = index === activeIndex

            return (
              <li key={video.id ?? video.src}>
                <button
                  type="button"
                  onClick={() => selectVideo(index)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {video.title ? (
                    <span className="video-playlist-player__playlist-title">{video.title}</span>
                  ) : (
                    <span className="video-playlist-player__playlist-title">
                      Track {index + 1}
                    </span>
                  )}
                  {video.description ? (
                    <span className="video-playlist-player__playlist-description">
                      {video.description}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ol>
      ) : null}
    </section>
  )
}

export default VideoPlaylistPlayer

