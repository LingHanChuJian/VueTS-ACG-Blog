// project https://github.com/DefinitelyTyped/DefinitelyTyped

export type Lang = 'en' | 'zh-cn' | 'zh-tw'
export type Preload = 'none' | 'metadata' | 'auto'
export type VideoType = 'auto' | 'hls' | 'flv' | 'dash' | 'webtorrent' | 'normal'
export type SubTitleType = 'webvtt' | 'ass'
export type DirectionType = 'top' | 'right' | 'bottom'
export type FullScreenType = 'web' | 'browser'

export type DPlayerEvents = 'abort' | 'canplay' | 'canplaythrough' | 'durationchange' | 'emptied' | 'ended' | 'error'
| 'loadeddata' | 'loadedmetadata' | 'loadstart' | 'mozaudioavailable' | 'pause' | 'play' | 'playing' | 'progress' | 'ratechange'
| 'seeked' | 'seeking' | 'stalled' | 'suspend' | 'timeupdate' | 'volumechange' | 'waiting' | 'screenshot' | 'thumbnails_show'
| 'thumbnails_hide' | 'danmaku_show' | 'danmaku_hide' | 'danmaku_clear' | 'danmaku_loaded' | 'danmaku_send' | 'danmaku_opacity'
| 'contextmenu_show' | 'contextmenu_hide' | 'notice_show' | 'notice_hide' | 'quality_start' | 'quality_end' | 'destroy' | 'resize'
| 'fullscreen' | 'fullscreen_cancel' | 'subtitle_show' | 'subtitle_hide' | 'subtitle_change'

export interface DPlayerOptions {
  [key: string]: any

  container: HTMLElement | null
  live?: boolean
  autoplay?: boolean
  theme?: string
  loop?: boolean
  lang?: Lang | string
  screenshot?: boolean
  hotkey?: boolean
  preload?: Preload
  logo?: string
  volume?: number
  mutex?: boolean
  video?: DPlayerVideo
  subtitle?: DPlayerSubTitle
  danmaku?: DPlayerDanmaku
  contextmenu?: DPlayerContextMenuItem[]
  highlight?: DPlayerHighLightItem[]
  apiBackend?: DPlayerAPIBackend
}

export interface DPlayerDanmakuItem {
  text: string
  color: string
  type: DirectionType
}

export interface DPlayerContextMenuItem {
  text: string
  link?: string
  click?: () => void
}

export interface DPlayerHighLightItem {
  text: string
  time: number
}

export interface DPlayerVideoQuality {
  name: string
  url: string
  type?: string
}

export interface DPlayerVideo {
  url: string
  pic?: string
  thumbnails?: string
  type?: VideoType | string
  customType?: any
  quality?: DPlayerVideoQuality[]
  defaultQuality?: number
}

export interface DPlayerSubTitle {
  url: string
  type?: SubTitleType
  fontSize?: string
  bottom?: string
  color?: string
}

export interface DPlayerDanmaku {
  id: string
  api: string
  token?: string
  maximum?: string
  addition?: string[]
  user?: string
  bottom?: string
  unlimited?: boolean
}

export interface DPlayerAPIBackend {
  read(endpoint: any, callback: () => void): void

  send(endpoint: any, danmakuData: DPlayerDanmakuItem, callback: () => void): void
}

export interface Danmaku {
  send(danmaku: DPlayerDanmakuItem, callback: () => void): void

  draw(danmaku: DPlayerDanmakuItem): void

  opacity(percentage: number): void

  clear(): void

  hide(): void

  show(): void
}

export interface FullScreen {
  request(type: FullScreenType): void

  cancel(type: FullScreenType): void
}

export default class DPlayer {
  events: any
  video: HTMLVideoElement
  danmaku: Danmaku
  fullScreen: FullScreen

  constructor(options: DPlayerOptions)

  play(): void

  pause(): void

  seek(time: number): void

  toggle(): void

  on(event: DPlayerEvents, handler: () => void): void

  switchVideo(video: DPlayerVideo, danmaku: DPlayerDanmaku): void

  notice(text: string, time: number, opacity: number): void

  switchQuality(index: number): void

  destroy(): void

  speed(rate: number): void

  volume(percentage: number, nostorage: boolean, nonotice: boolean): void
}
