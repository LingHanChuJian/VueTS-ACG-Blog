import http from '@/api/http'
import * as API from '@/types/api'
import { AxiosResponse } from 'axios'

/**
 * 获取歌单 /aplayer  POST
 *  type={song | songs}
 *  song={base64(fixed + id)}
 */
export const song = (data: API.SongData): Promise<AxiosResponse> => http.post('/api/aplayer', { data })

/**
 * 获取视频 /dplayer  POST
 *   video=base64(fixed + id)
 */
export const video = (data: API.VideoData): Promise<AxiosResponse> => http.post('/api/dplayer', { data })
