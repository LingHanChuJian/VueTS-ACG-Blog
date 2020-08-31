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
    'Ubuntu': 'Ubuntu',
    'Debian': 'Debian',
    'Fedora': 'Fedora',
    'Linux': ['Linux', 'X11'],
    'Mac OS': 'Macintosh',
    'Android': ['Android', 'Adr'],
    'FreeBSD': 'FreeBSD',
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
    os: ['Windows', 'Debian', 'Ubuntu', 'Fedora', 'Linux', 'Mac OS', 'Android', 'FreeBSD', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
    device: ['Mobile', 'Tablet'],
}

const iconPath = (path: string): string => require(`@/assets/images/useragent/${path}.svg`)

const os = (userAgent: string, osName: string): string[] => {
    let [title, icon, version] = ['unknow', 'unknow', '']
    switch (osName) {
        case 'Windows':
            version = userAgent.replace(/^Mozilla\/\d.0 \(Windows NT ([\d.]+);.*$/, '$1')
            const hash: UserAgentParser = {
                '10.0': '10',
                '6.4': '10',
                '6.3': '8.1',
                '6.2': '8',
                '6.1': '7',
                '6.0': 'Vista',
                '5.2': 'XP',
                '5.1': 'XP',
                '5.0': '2000',
            }
            version = (hash[version] as string) || version
            title = `Windows ${version}`
            const hashIcon: UserAgentParser = {
                10: 'os/windows_win10',
                8.1: 'os/windows_win8',
                8: 'os/windows_win8',
                7: 'os/windows_win7',
                Vista: 'os/windows_vista',
                XP: 'os/windows',
                2000: 'os/windows',
            }
            icon = (hashIcon[version] as string) || icon
            break
        case 'Android':
            version = userAgent.replace(/^.*Android ([\d.]+);.*$/, '$1')
            title = `Android ${version}`
            icon = 'os/android'
            break
        case 'iOS':
            version = userAgent.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
            title = `Iphone ${version}`
            icon = 'os/iphone'
            break
        case 'Ubuntu':
            title = 'Ubuntu Linux'
            icon = 'os/ubuntu'
            break
        case 'Debian':
            version = userAgent.replace(/^.*Debian\/([\d.]+).*$/, '$1')
            title = `Debian GNU/Linux ${version}`
            icon = 'os/debian'
            break
        case 'Linux':
            title = 'Linux'
            icon = 'os/linux'
            break
        case 'Windows Phone':
            version = userAgent.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
            title = `Windows Phone ${version}`
            icon = 'os/windows_phone'
            break
        case 'Mac OS':
            version = userAgent.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
            title = `Mac OSX ${version}`
            icon = 'os/macos'
            break
        case 'Chrome OS':
            title = 'Google Chrome OS'
            icon = 'os/chrome'
            break
        case 'WebOS':
            version = userAgent.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
            title = `WebOS ${version}`
            icon = 'os/linux'
            break
    }
    return [title, icon, version]
}

const browser = (userAgent: string, browserName: string): string[] => {
    let [title, icon, version] = ['unknow', 'unknow', '']
    let hash: UserAgentParser = {}
    let chromeVision: string = ''
    switch (browserName) {
        case 'Safari':
            version = userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1')
            title = `Safari ${version}`
            icon = 'browser/safari'
            break
        case 'Chrome':
            version = userAgent.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1')
            title = `Google Chrome ${version}`
            icon = 'browser/chrome'
            break
        case 'IE':
            version = userAgent.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1')
            title = `Internet Explorer ${version}`
            icon = 'browser/ie'
            break
        case 'Edge':
            version = userAgent.replace(/^.*Edge\/([\d.]+).*$/, '$1').replace(/^.*Edg\/([\d.]+).*$/, '$1')
            title = /^.*Edge\/([\d.]+).*$/i.test(userAgent) ? `Edge ${version}` : `Edge Dev (Chromium) ${version}`
            icon = 'browser/edge'
            break
        case 'Firefox':
            version = userAgent.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
            title = `Firefox ${version}`
            icon = 'browser/firefox'
            break
        case 'Firefox Focus':
            version = userAgent.replace(/^.*Focus\/([\d.]+).*$/, '$1')
            title = `Firefox Focus ${version}`
            icon = 'browser/firefox'
            break
        case 'Chromium':
            version = userAgent.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
            title = `Chromium ${version}`
            icon = 'browser/Chromium'
            break
        case 'Opera':
            version = userAgent.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1')
            title = /Opera Mini/i.test(userAgent) ? `Opera Mini ${version}` : `Opera ${version}`
            icon = 'browser/opera'
            break
        case 'Vivaldi':
            version = userAgent.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
            title = `Vivaldi ${version}`
            icon = 'browser/vivaldi'
            break
        case 'Yandex':
            version = userAgent.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
            title = `YaBrowser ${version}`
            icon = 'browser/yandex'
            break
        case 'Arora':
            version = userAgent.replace(/^.*Arora\/([\d.]+).*$/, '$1')
            title = `Arora ${version}`
            icon = 'browser/arora'
            break
        case 'Lunascape':
            version = userAgent.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1')
            title = `Lunascape ${version}`
            icon = 'browser/lunascape'
            break
        case 'QupZilla':
            version = userAgent.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1')
            title = `QupZilla ${version}`
            icon = 'browser/QupZilla'
            break
        case 'Coc Coc':
            version = userAgent.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
            title = `Coc Coc Browser ${version}`
            icon = 'browser/coccoc'
            break
        case 'Kindle':
            version = userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1')
            title = `Kindle ${version}`
            icon = 'browser/ipad'
            break
        case 'Iceweasel':
            version = userAgent.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1')
            title = `Iceweasel ${version}`
            icon = 'browser/iceweasel'
            break
        case 'Konqueror':
            version = userAgent.replace(/^.*Konqueror\/([\d.]+).*$/, '$1')
            title = `Konqueror ${version}`
            icon = 'browser/konqueror'
            break
        case 'Iceape':
            version = userAgent.replace(/^.*Iceape\/([\d.]+).*$/, ' $1')
            title = `Iceape ${version}`
            icon = 'browser/iceape'
            break
        case 'SeaMonkey':
            version = userAgent.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1')
            title = `SeaMonkey ${version}`
            icon = 'browser/seaMonkey'
            break
        case 'Epiphany':
            version = userAgent.replace(/^.*Epiphany\/([\d.]+).*$/, '$1')
            title = `Epiphany ${version}`
            icon = 'browser/epiphany'
            break
        case '360':
            version = userAgent.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1')
            title = `360 Browser ${version}`
            icon = 'browser/360'
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
            title = `360SE Browser ${version}`
            icon = 'browser/360se'
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
            title = `360EE Browser ${version}`
            icon = 'browser/360se'
            break
        case 'Maxthon':
            version = userAgent.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
            title = `Maxthon ${version}`
            icon = 'browser/maxthon'
            break
        case 'QQBrowser':
            version = userAgent.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
            title = `QQBrowser ${version}`
            icon = 'browser/QQBrowser'
            break
        case 'QQ':
            version = userAgent.replace(/^.*QQ\/([\d.]+).*$/, '$1')
            title = `QQ ${version}`
            icon = 'browser/QQBrowser'
            break
        case 'Baidu':
            version = userAgent.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1').replace(/^.*baiduboxapp\/([\d.]+).*$/, '$1')
            title = `Baidu Browser ${version}`
            icon = 'browser/baidu'
            break
        case 'UC':
            version = userAgent.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
            title = `UCWeb ${version}`
            icon = 'browser/ucweb'
            break
        case 'Sogou':
            version = userAgent.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
            title = `Sogou ${version}`
            icon = 'browser/sogou'
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
            title = `CM Browser ${version}`
            icon = 'browser/LBBROWSER'
            break
        case '2345Explorer':
            hash = {
                69: '10.0',
                55: '9.9',
            }
            chromeVision = userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
            version = (hash[chromeVision] as string) || userAgent.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1').replace(/^.*Mb2345Browser\/([\d.]+).*$/, '$1')
            title = `2345Explorer ${version}`
            icon = 'browser/2345Explorer'
            break
        case '115Browser':
            version = userAgent.replace(/^.*115Browser\/([\d.]+).*$/, '$1')
            title = `115Browser ${version}`
            icon = 'browser/115Browser'
            break
        case 'TheWorld':
            version = userAgent.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
            title = `TheWorld ${version}`
            icon = 'browser/theWorld'
            break
        case 'XiaoMi':
            version = userAgent.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
            title = `MiuiBrowser ${version}`
            icon = 'browser/xiaoMi'
            break
        case 'Vivo':
            version = userAgent.replace(/^.*VivoBrowser\/([\d.]+).*$/, '$1')
            title = `VivoBrowser ${version}`
            icon = 'browser/vivo'
            break
        case 'Quark':
            version = userAgent.replace(/^.*Quark\/([\d.]+).*$/, '$1')
            title = `Quark ${version}`
            icon = 'browser/quark'
            break
        case 'Qiyu':
            version = userAgent.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
            title = `Qiyu ${version}`
            icon = 'browser/qiyu'
            break
        case 'Wechat':
            version = userAgent.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
            title = `Built-in Browser of WeChat ${version}`
            icon = 'browser/wechat'
            break
        case 'WechatWork':
            version = userAgent.replace(/^.*wxwork\/([\d.]+).*$/, '$1')
            title = `Built-in Browser of WechatWork ${version}`
            icon = 'browser/wechat'
            break
        case 'Taobao':
            version = userAgent.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
            title = `Taobao ${version}`
            // icon = 'browser/taobao'
            break
        case 'Alipay':
            version = userAgent.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
            title = `Alipay ${version}`
            // icon = 'browser/alipay'
            break
        case 'Weibo':
            version = userAgent.replace(/^.*weibo__([\d.]+).*$/, '$1')
            title = `Weibo ${version}`
            // icon = 'browser/weibo'
            break
        case 'Douban':
            version = userAgent.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
            title = `Douban ${version}`
            // icon = 'browser/douban'
            break
        case 'Suning':
            version = userAgent.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
            title = `Suning ${version}`
            // icon = 'browser/suning'
            break
        case 'iQiYi':
            version = userAgent.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
            title = `iQiYi ${version}`
            // icon = 'browser/iQiYi'
            break
        case 'DingTalk':
            version = userAgent.replace(/^.*DingTalk\/([\d.]+).*$/, '$1')
            title = `DingTalk ${version}}`
            // icon = 'browser/dingTalk'
            break
        case 'Huawei':
            version = userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1').replace(/^.*HuaweiBrowser\/([\d.]+).*$/, '$1')
            title = `HuaweiBrowser ${version}`
            // icon = 'browser/huawei'
            break
    }
    return [title, icon, version]
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

    const [osTitle, osIcon, osVersion] = os(userAgent, (userAgentInformation.os as string))
    userAgentInformation.osTitle = osTitle
    userAgentInformation.osIcon = iconPath(osIcon)
    userAgentInformation.osVersion = osVersion

    const [browserTitle, browserIcon, browserVersion] = browser(userAgent, (userAgentInformation.browser as string))
    userAgentInformation.browserTitle = browserTitle
    userAgentInformation.browserIcon = iconPath(browserIcon)
    userAgentInformation.browserVersion = browserVersion

    // 修正一些 useragent
    if (userAgentInformation.osVersion === userAgent) { userAgentInformation.osVersion = '' }
    if (userAgentInformation.browserVersion === userAgent) { userAgentInformation.browserVersion = '' }

    if (userAgentInformation.browser === 'Chrome' && /\S+Browser/.test(userAgent)) {
        const curBrowser: RegExpMatchArray | null =  userAgent.match(/\S+Browser/)
        userAgentInformation.browser = curBrowser ? curBrowser[0] : ''
        userAgentInformation.browserVersion = userAgent.replace(/^.*Browser\/([\d.]+).*$/, '$1')
    }

    const chrome: string | string[] = userAgentParser.Chrome
    const isChrome: boolean = Array.isArray(chrome) ? chrome.some((item) => userAgent.indexOf(item) > -1) : userAgent.indexOf(chrome) > -1
    if (userAgentInformation.browser === 'Edge') {
        userAgentInformation.engine = Number(userAgentInformation.browserVersion) > 75 ? 'Blink' : 'EdgeHTML'
    } else if (isChrome && userAgentInformation.engine === 'WebKit' && parseInt(browser(userAgent, 'Chrome')[2], 10) > 27) {
        userAgentInformation.engine = 'Blink'
    } else if (userAgentInformation.browser === 'Opera' && parseInt(userAgentInformation.browserVersion, 10) > 12) {
        userAgentInformation.engine = 'Blink'
    } else if (userAgentInformation.browser === 'Yandex') {
        userAgentInformation.engine = 'Blink'
    }

    return userAgentInformation
}
