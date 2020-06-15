// requests
export type SongType = 'songs' | 'song'

export interface SongData {
    type: SongType
    song: string
}

export interface VideoData {
    video: string
}

export interface ResponseBase {
    status: number
    message: string
}

export type ResponseError = ResponseBase

export interface ResponseSuccess extends ResponseBase {
    data: any
}
