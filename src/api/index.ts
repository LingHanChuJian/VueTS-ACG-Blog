import http from '@/api/http'
import * as API from '@/types/api'
import { searchParams } from '@/utils'

/**
 * 获取歌单 aplayer?songs=md5(fixed + songs_id)
 * 获取歌曲 aplayer?song=md5(fixed + id)
 */
export const song = (data: API.SongData): Promise<API.ResponseBase> => http.get(`aplayer?${searchParams(data)}`)
