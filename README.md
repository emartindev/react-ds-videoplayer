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
| `showMetadata` | `boolean` | `false` | Overlays the title/description in the top-left corner of the video with a darkened background for readability. |
| `showPlaylist` | `boolean` | `false` | When `true`, the resolved playlist is logged to the console for debugging (no UI is rendered). |
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

## TypeScript & legacy props

No extra typings package is required—the published build includes `.d.ts` files automatically. For projects that still use the original prop names, the component accepts the legacy shape as well:

```ts
<VideoPlaylistPlayer playlist={playlist} controls />
```

Internally those map to the new `videos` and `showControls` props, so you can migrate gradually without breaking type safety.

### Troubleshooting missing module types

Some toolchains cache earlier versions of the package or strip `.d.ts` files. If your TypeScript build complains that it cannot find types for `react-ds-videoplayer`, explicitly declare the module once in your project (for example in `react-ds-videoplayer.d.ts`):

```ts
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
}
```

Shipping versions 0.1.4 and higher already bundle this declaration under `types/react-ds-videoplayer/index.d.ts`, so deleting your lockfile or reinstalling dependencies usually resolves the issue.

## Local development

```bash
npm install
npm run dev      # playground with Vite
npm run lint     # lint source
npm run build    # emits ESM + CJS bundles + d.ts
```

The entry point for publishing is `src/index.ts`. The playground (`src/App.tsx`) renders the component with demo data so you can iterate quickly before shipping to npm.
