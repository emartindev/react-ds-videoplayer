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
  videos: VideoPlaylistItem[]
  initialIndex?: number
  autoPlay?: boolean
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
  initialIndex = 0,
  autoPlay = true,
  onVideoChange,
  className,
  style,
}: VideoPlaylistPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(() => clampIndex(initialIndex, videos.length))
  const activeIndex = clampIndex(currentIndex, videos.length)
  const currentVideo = videos[activeIndex]

  useEffect(() => {
    if (currentVideo) {
      onVideoChange?.(currentVideo, activeIndex)
    }
  }, [currentVideo, activeIndex, onVideoChange])

  const safeClassName = useMemo(
    () => ['video-playlist-player', className].filter(Boolean).join(' '),
    [className],
  )

  const selectVideo = (index: number) => {
    setCurrentIndex(clampIndex(index, videos.length))
  }

  const goPrev = () => {
    setCurrentIndex((prev) => clampIndex(prev - 1, videos.length))
  }

  const goNext = () => {
    setCurrentIndex((prev) => clampIndex(prev + 1, videos.length))
  }

  if (!videos.length) {
    return (
      <section className={safeClassName} style={style} aria-live="polite">
        <p className="video-playlist-player__empty">Add at least one video to play the playlist.</p>
      </section>
    )
  }

  return (
    <section className={safeClassName} style={style} aria-label="Video playlist player">
      <div className="video-playlist-player__stage">
        <video
          key={currentVideo.src}
          className="video-playlist-player__media"
          controls
          poster={currentVideo.poster}
          autoPlay={autoPlay}
          onEnded={goNext}
        >
          <source src={currentVideo.src} type={currentVideo.type} />
          Your browser does not support the video tag.
        </video>

        <div className="video-playlist-player__meta">
          <div>
            <p className="video-playlist-player__eyebrow">Now playing</p>
            <h2>{currentVideo.title ?? 'Untitled video'}</h2>
          </div>
          {currentVideo.description ? <p>{currentVideo.description}</p> : null}
        </div>

        <div className="video-playlist-player__actions">
          <button type="button" onClick={goPrev} disabled={activeIndex === 0}>
            Previous
          </button>
          <button type="button" onClick={goNext} disabled={activeIndex === videos.length - 1}>
            Next
          </button>
        </div>
      </div>

      <ol className="video-playlist-player__playlist">
        {videos.map((video, index) => {
          const isActive = index === activeIndex

          return (
            <li key={video.id ?? video.src}>
              <button
                type="button"
                onClick={() => selectVideo(index)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="video-playlist-player__playlist-title">
                  {video.title ?? `Video ${index + 1}`}
                </span>
                {video.description ? (
                  <span className="video-playlist-player__playlist-description">{video.description}</span>
                ) : null}
                <span className="video-playlist-player__badge">
                  {isActive ? 'Now playing' : `Play #${index + 1}`}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default VideoPlaylistPlayer

