export type LoopMode = 'all' | 'one' | 'none'
export type OrderMode = 'list' | 'random'
export type Preload = 'none' | 'metadata' | 'auto'
export type AudioType = 'auto' | 'hls' | 'normal'
export type AudioMode = 'mini' | 'normal'

export type APlayerEvents = 'abort' | 'canplay' | 'canplaythrough' | 'durationchange' | 'emptied' | 'ended' | 'error'
| 'loadeddata'| 'loadedmetadata' | 'loadstart' | 'mozaudioavailable' | 'pause' | 'play' | 'playing' | 'progress' | 'ratechange'
| 'seeked' | 'seeking' | 'stalled' | 'suspend' | 'timeupdate' | 'volumechange' | 'waiting' | 'listshow' | 'listhide' | 'listadd'
| 'listremove' | 'listswitch' | 'listclear' | 'noticeshow' | 'noticehide' | 'destroy' | 'lrcshow' | 'lrchide'

export enum LrcType {
    file = 3,
    html = 2,
    string = 1,
    disabled = 0,
}


export interface AudioLrc {
    show(): void
    hide(): void
    toggle(): void
}

export interface AudioList {
    show(): void
    hide(): void
    toggle(): void
    add(audio: Audio | Audio[]): void
    remove(index: number): void
    switch(index: number): void
    clear(): void
}

export interface Audio {
    [key: string]: any

    id?: number
    name: string
    artist: string
    url: string
    cover?: string
    lrc?: string
    theme?: string
    type?: AudioType
    speed?: number
}

export interface APlayerOptions {
    [key: string]: any

    container: HTMLElement | null
    fixed?: boolean
    mini?: boolean
    autoplay?: boolean
    theme?: string
    loop?: LoopMode
    order?: OrderMode
    preload?: Preload
    volume?: number
    audio: Audio | Audio[]
    customAudioType?: any
    mutex?: boolean
    lrcType?: LrcType
    listFolded?: boolean
    listMaxHeight?: number
    storageName?: string
}


export default class APlayer {
    lrc: AudioLrc
    list: AudioList
    mode: AudioMode
    audio: HTMLAudioElement

    constructor(options: APlayerOptions)

    play(): void

    pause(): void
  
    seek(time: number): void

    toggle(): void

    on(event: APlayerEvents, handler: () => void): void

    theme(color: string, index: number): void

    setMode(mode: AudioMode): void

    notice(text: string, time: number, opacity: number): void

    skipBack(): void

    skipForward(): void

    destroy(): void
}
