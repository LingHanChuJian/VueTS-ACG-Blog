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
import { VideoData, ResponseSuccess } from '@/types/api'
import DPlayer, { DPlayerOptions, Preload } from 'dplayer'

export const handleDPlayer = async (el: HTMLElement): Promise<DPlayer[]> => {
    const dplayer: NodeListOf<HTMLElement> = el.querySelectorAll('div[data-dplayer]')

    const arrayDPlayer: DPlayer[] = []

    for (let i = 0, len = dplayer.length; i < len; i++) {
        arrayDPlayer.push(await createDplayer(dplayer[i]))
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
        mutex: data.mutex ? Boolean(data.mutex) : true,
        video: {},
        contextmenu: [
            {
                text: '关于我?',
                link: 'https://github.com/LingHanChuJian',
            },
        ],
    }

    const videoData: VideoData = {
        video: data.video ? data.video : '',
    }

    const response: ResponseSuccess = await video(videoData)

    if (response.status === 200) {
        options.video = Object.assign({
            type: 'customHls',
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
export const destroyDPlayer = (dplayer: DPlayer[]): void => {
    for (let i = 0, len = dplayer.length; i < len; i++) {
        dplayer[i].destroy()
    }
}
