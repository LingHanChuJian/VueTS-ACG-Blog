// requests
export type SongType = 'songs' | 'song'

export interface SongData {
    type: SongType
    song: string
}

export interface VideoData {
    video: string
}

export interface ResponseError {
    status: number
    message: string
}
