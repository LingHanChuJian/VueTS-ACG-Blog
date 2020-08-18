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

// browsers parser
// const browsers: UserAgentParser = {
//     IE: /MSIE ([a-zA-Z0-9.]+)/i,
//     EDGE: /Edge?\/([a-zA-Z0-9.]+)/i,
//     BROWSER360: /360([a-zA-Z0-9.]+)/i,
//     SOGOU: /SE 2([a-zA-Z0-9.]+)/i,
//     LBBROWSER: /LBBROWSER/i,
//     WECHAT: /MicroMessenger\/([a-zA-Z0-9.]+)/i,
//     QQBROWSER: /QQBrowser\/([a-zA-Z0-9.]+)/i,
//     BAIDU: /BIDUBrowser\/([a-zA-Z0-9.]+)/i,
//     UC: /UCWEB([a-zA-Z0-9.]+)/i,
//     FIREFOX: /Firefox\/([a-zA-Z0-9.]+)/i,
//     CRIOS: /CriOS\/([a-zA-Z0-9.]+)/i,
//     CHROME: /Chrome\/([a-zA-Z0-9.]+)/i,
//     OPERA: /Opera.*Version[ /]([a-zA-Z0-9.]+)|OPR\/([a-zA-Z0-9.]+)/i,  // 1 2
//     OPERAMINI: /Opera mini/i,
//     SAFARI: /Safari\/([a-zA-Z0-9.]+)/i,
//     MAXTHON: /Maxthon( |\/)([a-zA-Z0-9.]+)/i,
//     WORDPRESS: /wp-(iphone|android)\/([a-zA-Z0-9.]+)/i,
// }

// // os parser
// const os: UserAgentParser = {
//     WINDOWS10: /Windows NT 10.0/i,
//     WINDOWS81: /Windows NT 6.3/i,
//     WINDOWS8: /Windows NT 6.2/i,
//     WINDOWS7: /Windows NT 6.1/i,
//     WINDOWSVISTA: /Windows NT 6.0/i,
//     WINDOWSXP: /Windows NT 5.1/i,
//     WINDOWSSERVER2003: /Windows NT 5.2/i,
//     WINDOWS2000: /Windows NT 5.0/i,
//     WINDOWSPHONE: /Windows Phone/i,
//     IPOD: /iPod.*.CPU.([a-zA-Z0-9.( _)]+)/i,
//     IPHONE: /iPhone OS ([a-zA-Z0-9.( _)]+)/i,
//     IPAD: /iPad.*.CPU.([a-zA-Z0-9.( _)]+)/i,
//     ANDROID: /Android.([0-9. _]+)/i,
//     MACOSX: /Mac OS X.([0-9. _]+)/i,
//     MACOS: /Macintosh/i,
//     CROS: /CrOS/i,
//     LINUX: /Linux/i,
//     UBUNTU: /Ubuntu/i,
//     DEBIAN: /Debian/i,
//     FEDORA: /Fedora/i,
// }


// export const userAgentParser = (userAgent: string): void => {
//     for (let browsersItem in browsers) {
//         console.log(browsersItem)
//     }
// }
