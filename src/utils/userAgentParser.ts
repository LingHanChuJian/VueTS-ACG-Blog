/**
 * {@link https://github.com/mumuy/browser/blob/master/Browser.js}
 */

import { UserAgentParser } from '@/types/utils'

const userAgentParser: UserAgentParser = {
    // 内核
    'Trident': ['Trident', 'NET CLR'],
    'Presto': 'Presto',
    'WebKit': 'AppleWebKit',
    'Gecko': 'Gecko/',
    'KHTML': 'KHTML/',
    // 浏览器
    'Safari': 'Safari',
    'Chrome': ['Chrome', 'CriOS'],
    'IE': ['MSIE', 'Trident'],
    'Edge': ['Edge', 'Edg/'],
    'Firefox': ['Firefox', 'FxiOS'],
    'Firefox Focus': 'Focus',
    'Chromium': 'Chromium',
    'Opera': ['Opera', 'OPR'],
    'Vivaldi': 'Vivaldi',
    'Yandex': 'YaBrowser',
    'Arora': 'Arora',
    'Lunascape': 'Lunascape',
    'QupZilla': 'QupZilla',
    'Coc Coc': 'coc_coc_browser',
    'Kindle': ['Kindle', 'Silk/'],
    'Iceweasel': 'Iceweasel',
    'Konqueror': 'Konqueror',
    'Iceape': 'Iceape',
    'SeaMonkey': 'SeaMonkey',
    'Epiphany': 'Epiphany',
    '360': ['QihooBrowser', 'QHBrowser'],
    '360EE': '360EE',
    '360SE': '360SE',
    'UC': ['UC', 'UBrowser'],
    'QQBrowser': 'QQBrowser',
    'QQ': 'QQ',
    'Baidu': ['Baidu', 'BIDUBrowser', 'baiduboxapp'],
    'Maxthon': 'Maxthon',
    'Sogou': ['MetaSr', 'Sogou'],
    'LBBROWSER': 'LBBROWSER',
    '2345Explorer': ['2345Explorer', 'Mb2345Browser'],
    '115Browser': '115Browser',
    'TheWorld': 'TheWorld',
    'XiaoMi': 'MiuiBrowser',
    'Quark': 'Quark',
    'Qiyu': 'Qiyu',
    'Wechat': 'MicroMessenger',
    'WechatWork': 'wxwork/',
    'Taobao': 'AliApp(TB',
    'Alipay': 'AliApp(AP',
    'Weibo': 'Weibo',
    'Douban': 'com.douban.frodo',
    'Suning': 'SNEBUY-APP',
    'iQiYi': 'IqiyiApp',
    'DingTalk': 'DingTalk',
    'Huawei': ['HuaweiBrowser', 'HUAWEI'],
    'Vivo': 'VivoBrowser',
    // 系统或者平台
    'Windows': 'Windows',
    'Linux': ['Linux', 'X11'],
    'Mac OS': 'Macintosh',
    'Android': ['Android', 'Adr'],
    'Ubuntu': 'Ubuntu',
    'FreeBSD': 'FreeBSD',
    'Debian': 'Debian',
    'Windows Phone': ['Windows Phone', 'IEMobile'],
    'BlackBerry': ['BlackBerry', 'RIM'],
    'MeeGo': 'MeeGo',
    'Symbian': 'Symbian',
    'iOS': 'like Mac OS X',
    'Chrome OS': 'CrOS',
    'WebOS': 'hpwOS',
    // 设备
    'Mobile': ['Mobi', 'iPh', '480'],
    'Tablet': ['Tablet', 'Pad', 'Nexus 7'],
}

const information: UserAgentParser = {
    engine: ['WebKit', 'Trident', 'Gecko', 'Presto', 'KHTML'],
    browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', 'XiaoMi', 'Vivo', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Huawei', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', '115Browser', 'TheWorld', 'Quark', 'Qiyu', 'Wechat', 'WechatWork', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi', 'DingTalk'],
    os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
    device: ['Mobile', 'Tablet'],
}

const browserVersion = (userAgent: string): string => {
    return ''
}

const osVersion = (userAgent: string): string => {
    return ''
}

export const uaParser = (userAgent: string): UserAgentParser => {
    const userAgentInformation: UserAgentParser = {}
    for (const informationItem of Object.keys(information)) {
        for (let i = 0, len = information[informationItem].length; i < len; i ++) {
            const value: string = information[informationItem][i]
            const userAgentParserValue: string | string[] = userAgentParser[value]
            const isUserAgentParser: boolean = Array.isArray(userAgentParserValue) ? userAgentParserValue.some((item) => userAgent.indexOf(item) > -1) : userAgent.indexOf(userAgentParserValue) > -1
            if (isUserAgentParser) { userAgentInformation[informationItem] = userAgentParserValue }
        }
    }
    return userAgentInformation
}
