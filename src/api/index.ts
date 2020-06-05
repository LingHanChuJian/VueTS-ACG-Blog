import http from '@/api/http'
import * as API from '@/types/api'
import { AxiosResponse } from 'axios'

/**
 * 获取歌单 /aplayer?type={song | songs}&song={base64(fixed + id)}
 */
export const song = (data: API.SongData): Promise<AxiosResponse> => http.get('aplayer', { params: data })

/**
 * 获取视频 /dplayer?type={video | videos}&video=base64(fixed + id)
 */
export const video = (data: API.VideoData): Promise<AxiosResponse> => http.get('dplayer', { params: data })
