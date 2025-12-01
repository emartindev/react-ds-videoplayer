# React DS Video Player

A minimal, themeable React component that renders a modern video player with a built-in playlist. Pass it an array of video sources and you instantly get a polished playback experience with controls, metadata, and keyboard-accessible navigation.

## Installation

```bash
npm install react-ds-videoplayer
# or
yarn add react-ds-videoplayer
```

> The package declares `react` and `react-dom` as peer dependencies (`>=18.2.0`). Make sure they are available in your app.

## Quick start

```tsx
import { VideoPlaylistPlayer } from 'react-ds-videoplayer'

const videos = [
  {
    src: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    title: 'Mt. Baker Sunrise',
    description: 'A calm aerial shot of the Cascades at first light.',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60',
  },
  // ...more items
]

export function Page() {
  return <VideoPlaylistPlayer videos={videos} showPlaylist showMetadata />
}
```

## Component API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `videos` | `VideoPlaylistItem[]` | — | Required playlist data. Each item needs at least a `src`. |
| `initialIndex` | `number` | `0` | Zero-based index to start the playlist. Clamped to valid range. |
| `autoPlay` | `boolean` | `true` | Videos auto-play so the player starts immediately. |
| `loop` | `boolean` | `true` | Repeats the playlist (and single videos) automatically. |
| `muted` | `boolean` | `true` | Required for auto-play on most browsers; you can opt out if needed. |
| `showControls` | `boolean` | `false` | Reveals native video controls (hidden by default). |
| `onVideoChange` | `(video, index) => void` | — | Fired whenever the active video updates. |
| `showMetadata` | `boolean` | `false` | Renders title/description text below the video. |
| `showPlaylist` | `boolean` | `false` | Displays the playlist selector; otherwise only the video renders. |
| `className` | `string` | — | Inject custom class names for layout/theming. |
| `style` | `CSSProperties` | — | Inline styles applied to the root wrapper. |

> The player stretches to `width: 100%` / `height: 100%` by default. Pass a `style` prop or wrap it to constrain the size.

### `VideoPlaylistItem`

```ts
type VideoPlaylistItem = {
  id?: string
  src: string
  title?: string
  description?: string
  poster?: string
  type?: string
}
```

## TypeScript consumers

This package already ships its own `.d.ts` files via the build, but if you prefer the legacy `playlist` + `controls` prop surface you can install the ambient types shim:

```bash
npm i --save-dev @types/react-ds-videoplayer
```

That package exposes the following declaration so existing code keeps type-checking:

```ts
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
```

## Local development

```bash
npm install
npm run dev      # playground with Vite
npm run lint     # lint source
npm run build    # emits ESM + CJS bundles + d.ts
```

The entry point for publishing is `src/index.ts`. The playground (`src/App.tsx`) renders the component with demo data so you can iterate quickly before shipping to npm.
