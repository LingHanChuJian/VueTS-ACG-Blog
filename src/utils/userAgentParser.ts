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

const osVersion = (userAgent: string, osName: string): string => {
    let version: string = ''
    switch (osName) {
        case 'Windows':
            version = userAgent.replace(/^Mozilla\/\d.0 \(Windows NT ([\d.]+);.*$/, '$1')
            const hash: UserAgentParser = {
                10: '10',
                6.4: '10',
                6.3: '8.1',
                6.2: '8',
                6.1: '7',
                6.0: 'Vista',
                5.2: 'XP',
                5.1: 'XP',
                5.0: '2000',
            }
            version = (hash[version] as string) || version
            break
        case 'Android':
            version = userAgent.replace(/^.*Android ([\d.]+);.*$/, '$1')
            break
        case 'iOS':
            version = userAgent.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
            break
        case 'Debian':
            version = userAgent.replace(/^.*Debian\/([\d.]+).*$/, '$1')
            break
        case 'Windows Phone':
            version = userAgent.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
            break
        case 'Mac OS':
            version = userAgent.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
            break
        case 'WebOS':
            version = userAgent.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
            break
    }
    return version
}

const browserVersion = (userAgent: string, browserName: string): string => {
    let version: string = ''
    let hash: UserAgentParser = {}
    let chromeVision: string = ''
    switch (browserName) {
        case 'Safari':
            version = userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1')
            break
        case 'Chrome':
            version = userAgent.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1')
            break
        case 'IE':
            version = userAgent.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1')
            break
        case 'Edge':
            version = userAgent.replace(/^.*Edge\/([\d.]+).*$/, '$1').replace(/^.*Edg\/([\d.]+).*$/, '$1')
            break
        case 'Firefox':
            version = userAgent.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
            break
        case 'Firefox Focus':
            version = userAgent.replace(/^.*Focus\/([\d.]+).*$/, '$1')
            break
        case 'Chromium':
            version = userAgent.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
            break
        case 'Opera':
            version = userAgent.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1')
            break
        case 'Vivaldi':
            version = userAgent.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
            break
        case 'Yandex':
            version = userAgent.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
            break
        case 'Arora':
            version = userAgent.replace(/^.*Arora\/([\d.]+).*$/, '$1')
            break
        case 'Lunascape':
            version = userAgent.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1')
            break
        case 'Lunascape':
            version = userAgent.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1')
            break
        case 'QupZilla':
            version = userAgent.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1')
            break
        case 'Coc Coc':
            version = userAgent.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
            break
        case 'Kindle':
            version = userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1')
            break
        case 'Iceweasel':
            version = userAgent.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1')
            break
        case 'Konqueror':
            version = userAgent.replace(/^.*Konqueror\/([\d.]+).*$/, '$1')
            break
        case 'Iceape':
            version = userAgent.replace(/^.*Iceape\/([\d.]+).*$/, '$1')
            break
        case 'SeaMonkey':
            version = userAgent.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1')
            break
        case 'Epiphany':
            version = userAgent.replace(/^.*Epiphany\/([\d.]+).*$/, '$1')
            break
        case '360':
            version = userAgent.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1')
            break
        case '360SE':
            hash = {
                78: '12.1',
                69: '11.1',
                63: '10.0',
                55: '9.1',
                45: '8.1',
                42: '8.0',
                31: '7.0',
                21: '6.3',
            }
            chromeVision = userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
            version = (hash[chromeVision] as string) || ''
            break
        case '360EE':
            hash = {
                78: '12.0',
                69: '11.0',
                63: '9.5',
                55: '9.0',
                50: '8.7',
                30: '7.5',
            }
            chromeVision = userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
            version = (hash[chromeVision] as string) || ''
            break
        case 'Maxthon':
            version = userAgent.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
            break
        case 'QQBrowser':
            version = userAgent.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
            break
        case 'QQ':
            version = userAgent.replace(/^.*QQ\/([\d.]+).*$/, '$1')
            break
        case 'Baidu':
            version = userAgent.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1').replace(/^.*baiduboxapp\/([\d.]+).*$/, '$1')
            break
        case 'UC':
            version = userAgent.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
            break
        case 'Sogou':
            version = userAgent.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
            break
        case 'LBBROWSER':
            hash = {
                57: '6.5',
                49: '6.0',
                46: '5.9',
                42: '5.3',
                39: '5.2',
                34: '5.0',
                29: '4.5',
                21: '4.0',
            }
            chromeVision = userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
            version = (hash[chromeVision] as string) || ''
            break
        case '2345Explorer':
            hash = {
                69: '10.0',
                55: '9.9',
            }
            chromeVision = userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
            version = (hash[chromeVision] as string) || userAgent.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1').replace(/^.*Mb2345Browser\/([\d.]+).*$/, '$1')
            break
        case '115Browser':
            version = userAgent.replace(/^.*115Browser\/([\d.]+).*$/, '$1')
            break
        case 'TheWorld':
            version = userAgent.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
            break
        case 'XiaoMi':
            version = userAgent.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
            break
        case 'Vivo':
            version = userAgent.replace(/^.*VivoBrowser\/([\d.]+).*$/, '$1')
            break
        case 'Quark':
            version = userAgent.replace(/^.*Quark\/([\d.]+).*$/, '$1')
            break
        case 'Qiyu':
            version = userAgent.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
            break
        case 'Wechat':
            version = userAgent.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
            break
        case 'WechatWork':
            version = userAgent.replace(/^.*wxwork\/([\d.]+).*$/, '$1')
            break
        case 'Taobao':
            version = userAgent.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
            break
        case 'Alipay':
            version = userAgent.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
            break
        case 'Weibo':
            version = userAgent.replace(/^.*weibo__([\d.]+).*$/, '$1')
            break
        case 'Douban':
            version = userAgent.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
            break
        case 'Suning':
            version = userAgent.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
            break
        case 'iQiYi':
            version = userAgent.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
            break
        case 'DingTalk':
            version = userAgent.replace(/^.*DingTalk\/([\d.]+).*$/, '$1')
            break
        case 'Huawei':
            version = userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1').replace(/^.*HuaweiBrowser\/([\d.]+).*$/, '$1')
            break
    }
    return version
}

export const uaParser = (userAgent: string): UserAgentParser => {
    const userAgentInformation: UserAgentParser = {}
    for (const informationItem of Object.keys(information)) {
        for (let i = 0, len = information[informationItem].length; i < len; i ++) {
            const value: string = information[informationItem][i]
            const userAgentParserValue: string | string[] = userAgentParser[value]
            const isUserAgentParser: boolean = Array.isArray(userAgentParserValue) ? userAgentParserValue.some((item) => userAgent.indexOf(item) > -1) : userAgent.indexOf(userAgentParserValue) > -1

            if (isUserAgentParser) { userAgentInformation[informationItem] = value }
        }
    }
    userAgentInformation.osVersion = osVersion(userAgent, (userAgentInformation.os as string))
    userAgentInformation.browserVersion = browserVersion(userAgent, (userAgentInformation.browser as string))

    // 修正一些 useragent
    if (userAgentInformation.osVersion === userAgent) { userAgentInformation.osVersion = '' }
    if (userAgentInformation.browserVersion === userAgent) { userAgentInformation.browserVersion = '' }

    if (userAgentInformation.browser === 'Chrome' && /\S+Browser/.test(userAgent)) {
        const browser: RegExpMatchArray | null =  userAgent.match(/\S+Browser/)
        userAgentInformation.browser = browser ? browser[0] : ''
        userAgentInformation.browserVersion = userAgent.replace(/^.*Browser\/([\d.]+).*$/, '$1')
    }

    const chrome: string | string[] = userAgentParser.Chrome
    const isChrome: boolean = Array.isArray(chrome) ? chrome.some((item) => userAgent.indexOf(item) > -1) : userAgent.indexOf(chrome) > -1
    if (userAgentInformation.browser === 'Edge') {
        userAgentInformation.engine = Number(userAgentInformation.browserVersion) > 75 ? 'Blink' : 'EdgeHTML'
    } else if (isChrome && userAgentInformation.engine === 'WebKit' && parseInt(browserVersion(userAgent, 'Chrome'), 10) > 27) {
        userAgentInformation.engine = 'Blink'
    } else if (userAgentInformation.browser === 'Opera' && parseInt(userAgentInformation.browserVersion, 10) > 12) {
        userAgentInformation.engine = 'Blink'
    } else if (userAgentInformation.browser === 'Yandex') {
        userAgentInformation.engine = 'Blink'
    }

    return userAgentInformation
}
