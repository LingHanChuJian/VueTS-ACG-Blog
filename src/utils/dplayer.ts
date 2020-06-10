/**
 * markdown dplayer 语法设计
 * 栗子:
 * <div
 * data-dplayer
 * data-autoplay="false"
 * data-preload="auto"
 * data-theme="#5895be"
 * data-video="base64(fixed + id)"
 * data-loop="false"
 * data-listmaxheight="349px"></div>
 */
import Hls from 'hls.js'
import { video } from '@/api'
import { AxiosResponse } from 'axios'
import { typeOf } from '@/utils/assist'
import { VideoData } from '@/types/api'
import DPlayer, { DPlayerOptions, Preload } from 'dplayer'

export const handleDPlayer = (el: HTMLElement) => {
    const dplayer: NodeListOf<HTMLElement> = el.querySelectorAll('div[data-dplayer]')

    const arrayDPlayer: Array<Promise<DPlayer>> = []

    for (let i = 0, len = dplayer.length; i < len; i++) {
        arrayDPlayer.push(createDplayer(dplayer[i]))
    }

    return arrayDPlayer
}

export const createDplayer = async (el: HTMLElement): Promise<DPlayer> => {
    const data: DOMStringMap = el.dataset

    const options: DPlayerOptions = {
        container: el,
        autoplay: data.autoplay ? Boolean(data.autoplay) : false,
        theme: data.theme ? data.theme : '#b7daff',
        loop: data.loop ? Boolean(data.loop) : false,
        lang: data.lang ? data.lang : navigator.language.toLowerCase(),
        screenshot: data.screenshot ? Boolean(data.screenshot) : false,
        hotkey: data.hotkey ? Boolean(data.hotkey) : true,
        airplay: data.airplay ? Boolean(data.airplay) : true,
        preload: data.preload ? (data.preload as Preload) : 'auto',
        video: {},
    }

    const videoData: VideoData = {
        video: data.video ? data.video : '',
    }

    const response: AxiosResponse = await video(videoData)

    if (response.status === 200) {
        options.video = Object.assign({
            customType: {
                customHls: (curVideo: HTMLVideoElement) => {
                    const hls: Hls = new Hls()
                    hls.loadSource(curVideo.src)
                    hls.attachMedia(curVideo)
                },
            },
        }, response.data)
    }

    return Promise.resolve(new DPlayer(options))
}

// 销毁 DPlayer
export const destroyDPlayer = (dplayer: Promise<DPlayer> | Array<Promise<DPlayer>>): void => {

    if (typeOf(dplayer) === 'object') { dplayer = [(dplayer as Promise<DPlayer>)] }

    for (let i = 0, len = (dplayer as Array<Promise<DPlayer>>).length; i < len; i++) {
        (dplayer as Array<Promise<DPlayer>>)[i].then((item) => item.destroy())
    }
}
