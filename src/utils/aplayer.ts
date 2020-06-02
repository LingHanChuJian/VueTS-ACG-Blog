/**
 * markdown aplayer 语法设计
 * 栗子:
 * <div
 * data-aplayer
 * data-autoplay="false"
 * data-preload="auto"
 * data-theme="#5895be"
 * data-songs="md5(fixed + id)"
 * data-loop="all"
 * data-order="list"
 * data-listmaxheight="349px"></div>
 */
import APlayer, { APlayerOptions, LoopMode, OrderMode, Preload } from 'aplayer'

export const handleAPlayer = (el: HTMLElement): void => {
    const aplayer: NodeListOf<HTMLElement> = el.querySelectorAll('div[data-aplayer]')

    for (let i = 0, len = aplayer.length; i < len; i++) {
        // aplayer[i].dataset
    }
}

export const createAPlayer = (el: HTMLElement): APlayer => {
    const data: DOMStringMap = el.dataset
    const options: APlayerOptions = {
        container: el,
        fixed: data.fixed ? Boolean(data.fixed) : false,
        mini: data.mini ? Boolean(data.mini) : false,
        autoplay: data.autoplay ? Boolean(data.autoplay) : false,
        theme: data.theme ? data.theme : '#b7daff',
        loop: data.loop ? (data.loop as LoopMode) : 'all',
        order: data.order ? (data.order as OrderMode) : 'list',
        preload: data.preload ? (data.preload as Preload) : 'auto',
        mutex: data.mutex ? Boolean(data.mutex) : true,
        lrcType: data.lrcType ? Number(data.lrcType) : 3,
        listFolded: data.listFolded ? Boolean(data.listFolded) : false,
        listMaxHeight: data.listMaxHeight ? Number(data.listMaxHeight) : 350,
        audio: [],
    }
    return new APlayer(options)
}
