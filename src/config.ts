import { MenuItemData, UserInformation, UserDonate, UserExpression } from '@/types/components'

// site 首页标题   标题有了 author不显示
export const title: string = 'Hi,Wanderer!'

// 首页 author 图片链接
export const author: string = 'http://www.yx319.cn/wp-content/uploads/2019/02/headimg.jpg'

// 首页描述
export const description: string = 'If the heart does not have a destination, there will be wandering everywhere.'

// 首页随机图片链接
export const randomImagesLink: string = 'https://api.2heng.xin/cover'

// 首页播放 视频链接
export const videoPlayerLink: string = 'http://img.cdn.myrove.cn/test/video.m3u8'

// 404页面 背景图片
export const images404: string = 'http://img.cdn.myrove.cn/test/404.jpg'

// menu 菜单
export const menuData: MenuItemData[] = [
    {
        name: 'home',
        to: { name: 'home' },
        content: '首页',
        className: 'home',
        icon: {
            type: 'house-damage',
            className: 'animation-home',
        },
    },
    {
        name: 'archives',
        to: { name: 'archives' },
        content: '归档',
        className: 'archives',
        icon: {
            type: 'archive',
            className: 'animation-archives',
        },
        children: [
            {
                name: 'archives-hacking',
                to: {
                    name: 'categories',
                    params: {
                        tag: 'hacking',
                    },
                },
                content: '极客',
                icon: {
                    type: 'terminal',
                    fixed: true,
                },
            },
            {
                name: 'archives-whatever',
                to: {
                    name: 'categories',
                    params: {
                        tag: 'whatever',
                    },
                },
                content: '随想',
                icon: {
                    type: 'comment-dots',
                    fixed: true,
                },
            },
            {
                name: 'archives-record',
                to: {
                    name: 'categories',
                    params: {
                        tag: 'record',
                    },
                },
                content: '笔记',
                icon: {
                    type: 'bookmark',
                    fixed: true,
                },
            },
        ],
    },
    {
        name: 'list',
        content: '清单',
        className: 'list',
        icon: {
            type: 'list-ul',
            className: 'animation-list',
        },
        children: [
            {
                name: 'list-anime',
                to: { name: 'anime' },
                content: '番剧',
                icon: {
                    type: 'film',
                    fixed: true,
                },
            },
            {
                name: 'list-music',
                to: { name: 'music' },
                content: '歌单',
                icon: {
                    type: 'headphones',
                    fixed: true,
                },
            },
            {
                name: 'list-boy',
                to: { name: 'boy' },
                content: '男孩',
                icon: {
                    type: 'grin-wink',
                    fixed: true,
                },
            },
        ],
    },
    {
        name: 'comment',
        to: { name: 'comment' },
        content: '留言版',
        className: 'comment',
        icon: {
            type: 'edit',
            className: 'animation-comment',
        },
    },
    {
        name: 'friends',
        to: { name: 'friends' },
        content: '友人帐',
        className: 'friends',
        icon: {
            type: 'link',
            className: 'animation-friends',
        },
    },
    {
        name: 'donate',
        to: { name: 'donate' },
        content: '投食',
        className: 'donate',
        icon: {
            type: 'coffee',
            className: 'animation-donate',
        },
    },
    {
        name: 'about',
        content: '关于',
        className: 'about',
        icon: {
            type: 'leaf',
            className: 'animation-about',
        },
        children: [
            {
                name: 'about-me',
                to: { name: 'me' },
                content: '我?',
                icon: {
                    type: 'dragon',
                    fixed: true,
                },
            },
            {
                name: 'about-statistics',
                to: { name: 'statistics' },
                content: '统计',
                icon: {
                    type: 'chart-area',
                    fixed: true,
                },
            },
            {
                name: 'about-theme',
                to: { name: 'theme' },
                content: '主题',
                icon: {
                    type: 'snowflake',
                    fixed: true,
                },
            },
        ],
    },
]

// information 用户信息
export const userInformation: UserInformation[] = [
    {
        icon: {
            type: 'github-alt',
            color: '#000000',
            fixed: true,
        },
        link: 'https://github.com/LingHanChuJian',
        title: 'github',
    },
    {
        icon: {
            type: 'twitter-square',
            color: '#1ab2e8',
            fixed: true,
        },
        link: 'https://twitter.com/5wHHx3QAsNNxhYd?lang=zh-tw',
        title: 'twitter',
    },
    {
        icon: {
            type: 'qq',
            color: '#1296DB',
            fixed: true,
        },
        link: 'tencent://message/?uin=2739069093',
        title: 'qq',
    },
    {
        icon: {
            type: 'weixin',
            color: '#02bb0e',
            fixed: true,
        },
        image: 'http://img.cdn.myrove.cn/blog/img/wenchat.9c0df2f2.png',
        title: 'weixin',
    },
    {
        icon: {
            type: 'envelope',
            color: '#ffbf00',
            fixed: true,
        },
        link: 'mailto:linghanchujian@gmail.com',
        title: 'email',
    },
]

// 赞赏
export const donate: UserDonate[] = [
    {
        name: 'Alipay',
        image: 'http://img.cdn.myrove.cn/test/Alipay.jpg',
        title: '支付宝',
    },
    {
        name: 'WeChat',
        image: 'http://img.cdn.myrove.cn/test/WeChat.jpg',
        title: '微信',
    },
    {
        name: 'PayPal',
        title: 'paypal',
        link: 'https://paypal.me/linghanchujian?locale.x=zh_XC',
    },
]

//  表情分类
//  emoticon 颜文字  emoji 表情符号  sticker 贴图
export const expression: UserExpression[] = [
    {
        type: 'sticker',
        template: 'f(x)=∫({0})sec²xdx',
        title: 'bilibili~',
        description: '贴图',
        expression: [
            {
                value: 'baiyan',
                step: 45,
                transform: 'translateY(-1408px)',
                delay: 1.8,
                height: '1440px',
            },
            {
                value: 'fadai',
                step: 27,
                transform: 'translateY(-832px)',
                delay: 1.08,
                height: '864px',
            },
            {
                value: 'koubi',
                step: 30,
                transform: 'translateY(-928px)',
                delay: 1.2,
                height: '960px',
            },
            {
                value: 'qinqin',
                step: 7,
                transform: 'translateY(-192px)',
                delay: 0.28,
                height: '224px',
            },
            {
                value: 'weiqu',
                step: 20,
                transform: 'translateY(-608px)',
                delay: 0.8,
                height: '640px',
            },
            {
                value: 'bishi',
                step: 9,
                transform: 'translateY(-256px)',
                delay: 0.36,
                height: '288px',
            },
            {
                value: 'fanu',
                step: 33,
                transform: 'translateY(-1024px)',
                delay: 1.32,
                height: '1056px',
            },
            {
                value: 'kun',
                step: 44,
                transform: 'translateY(-1376px)',
                delay: 1.76,
                height: '1408px',
            },
            {
                value: 'se',
                step: 10,
                transform: 'translateY(-288px)',
                delay: 0.4,
                height: '320px',
            },
            {
                value: 'weixiao',
                step: 20,
                transform: 'translateY(-608px)',
                delay: 0.8,
                height: '640px',
            },
            {
                value: 'bizui',
                step: 31,
                transform: 'translateY(-960px)',
                delay: 1.24,
                height: '992px',
            },
            {
                value: 'ganga',
                step: 38,
                transform: 'translateY(-1184px)',
                delay: 1.52,
                height: '1216px',
            },
            {
                value: 'lengmo',
                step: 1,
                transform: 'translateY(0px)',
                delay: 0.04,
                height: '32px',
            },
            {
                value: 'shengbing',
                step: 35,
                transform: 'translateY(-1088px)',
                delay: 1.4,
                height: '1120px',
            },
            {
                value: 'wunai',
                step: 23,
                transform: 'translateY(-704px)',
                delay: 0.92,
                height: '736px',
            },
            {
                value: 'chan',
                step: 40,
                transform: 'translateY(-1248px)',
                delay: 1.6,
                height: '1280px',
            },
            {
                value: 'guilian',
                step: 1,
                transform: 'translateY(0px)',
                delay: 0.04,
                height: '32px',
            },
            {
                value: 'liubixue',
                step: 35,
                transform: 'translateY(-1088px)',
                delay: 1.4,
                height: '1120px',
            },
            {
                value: 'shengqi',
                step: 11,
                transform: 'translateY(-320px)',
                delay: 0.44,
                height: '352px',
            },
            {
                value: 'xiaoku',
                step: 15,
                transform: 'translateY(-448px)',
                delay: 0.6,
                height: '480px',
            },
            {
                value: 'daku',
                step: 8,
                transform: 'translateY(-224px)',
                delay: 0.32,
                height: '256px',
            },
            {
                value: 'guzhang',
                step: 17,
                transform: 'translateY(-512px)',
                delay: 0.68,
                height: '544px',
            },
            {
                value: 'liuhan',
                step: 27,
                transform: 'translateY(-832px)',
                delay: 1.08,
                height: '864px',
            },
            {
                value: 'shuizhao',
                step: 24,
                transform: 'translateY(-736px)',
                delay: 0.96,
                height: '768px',
            },
            {
                value: 'xieyanxiao',
                step: 8,
                transform: 'translateY(-224px)',
                delay: 0.32,
                height: '256px',
            },
            {
                value: 'dalao',
                step: 33,
                transform: 'translateY(-1024px)',
                delay: 1.32,
                height: '1056px',
            },
            {
                value: 'haixiu',
                step: 31,
                transform: 'translateY(-960px)',
                delay: 1.24,
                height: '992px',
            },
            {
                value: 'liulei',
                step: 1,
                transform: 'translateY(0px)',
                delay: 0.04,
                height: '32px',
            },
            {
                value: 'sikao',
                step: 36,
                transform: 'translateY(-1120px)',
                delay: 1.44,
                height: '1152px',
            },
            {
                value: 'yiwen',
                step: 21,
                transform: 'translateY(-640px)',
                delay: 0.84,
                height: '672px',
            },
            {
                value: 'dalian',
                step: 37,
                transform: 'translateY(-1152px)',
                delay: 1.48,
                height: '1184px',
            },
            {
                value: 'heirenwenhao',
                step: 26,
                transform: 'translateY(-800px)',
                delay: 1.04,
                height: '832px',
            },
            {
                value: 'miantian',
                step: 28,
                transform: 'translateY(-864px)',
                delay: 1.12,
                height: '896px',
            },
            {
                value: 'tiaokan',
                step: 1,
                transform: 'translateY(0px)',
                delay: 0.04,
                height: '32px',
            },
            {
                value: 'yun',
                step: 12,
                transform: 'translateY(-352px)',
                delay: 0.48,
                height: '384px',
            },
            {
                value: 'dianzan',
                step: 20,
                transform: 'translateY(-608px)',
                delay: 0.8,
                height: '640px',
            },
            {
                value: 'huaixiao',
                step: 31,
                transform: 'translateY(-960px)',
                delay: 1.24,
                height: '992px',
            },
            {
                value: 'mudengkoudai',
                step: 1,
                transform: 'translateY(0px)',
                delay: 0.04,
                height: '32px',
            },
            {
                value: 'tiaopi',
                step: 50,
                transform: 'translateY(-1568px)',
                delay: 2,
                height: '1600px',
            },
            {
                value: 'zaijian',
                step: 24,
                transform: 'translateY(-736px)',
                delay: 0.96,
                height: '768px',
            },
            {
                value: 'doge',
                step: 20,
                transform: 'translateY(-608px)',
                delay: 0.8,
                height: '640px',
            },
            {
                value: 'jingxia',
                step: 32,
                transform: 'translateY(-992px)',
                delay: 1.28,
                height: '1024px',
            },
            {
                value: 'nanguo',
                step: 28,
                transform: 'translateY(-864px)',
                delay: 1.12,
                height: '896px',
            },
            {
                value: 'touxiao',
                step: 6,
                transform: 'translateY(-160px)',
                delay: 0.24,
                height: '192px',
            },
            {
                value: 'zhoumei',
                step: 1,
                transform: 'translateY(0px)',
                delay: 0.04,
                height: '32px',
            },
            {
                value: 'facai',
                step: 30,
                transform: 'translateY(-928px)',
                delay: 1.2,
                height: '960px',
            },
            {
                value: 'keai',
                step: 17,
                transform: 'translateY(-512px)',
                delay: 0.68,
                height: '544px',
            },
            {
                value: 'outu',
                step: 42,
                transform: 'translateY(-1312px)',
                delay: 1.68,
                height: '1344px',
            },
            {
                value: 'tuxue',
                step: 8,
                transform: 'translateY(-224px)',
                delay: 0.32,
                height: '256px',
            },
            {
                value: 'zhuakuang',
                step: 19,
                transform: 'translateY(-576px)',
                delay: 0.76,
                height: '608px',
            },
        ],
    },
    {
        type: 'emoticon',
        template: '`{0}`',
        title: '(✪ω✪)',
        description: '颜文字',
        expression: [{ value: '(⌒▽⌒)' }, { value: '(￣▽￣)' }, { value: '(=・ω・=)' }, { value: '(｀・ω・´)' },
        { value: '(〜￣△￣)〜' }, { value: '(･∀･)' }, { value: '(°∀°)ﾉ' }, { value: '(￣3￣)' }, { value: '╮(￣▽￣)╭' },
        { value: '(´_ゝ｀)' }, { value: '←_←' }, { value: '→_→' }, { value: '(<_<)' }, { value: '(>_>)' }, { value: '(;¬_¬)' },
        { value: '("▔□▔)/' }, { value: '(ﾟДﾟ≡ﾟдﾟ)!?' }, { value: 'Σ(ﾟдﾟ;)' }, { value: 'Σ(￣□￣||)' }, { value: '(’；ω；‘)' },
        { value: '(/TДT)/' }, { value: '(^・ω・^' }, { value: ')' }, { value: '(｡･ω･｡)' }, { value: '(●￣(ｴ)￣●)' },
        { value: 'ε=ε=(ノ≧∇≦)ノ' }, { value: '(’･_･‘)' }, { value: '(-_-#)' }, { value: '（￣へ￣）' }, { value: '(￣ε(#￣)Σ' },
        { value: 'ヽ(‘Д’)ﾉ' }, { value: '(#-_-)┯━┯' }, { value: '(╯°口°)╯(┴—┴' }, { value: '←◡←' }, { value: '(' },
        { value: '♥д♥)' }, { value: '_(:3」∠)_' }, { value: 'Σ>―(〃°ω°〃)♡→' }, { value: '⁄(⁄' }, { value: '⁄•⁄ω⁄•⁄' },
        { value: '⁄)⁄' }, { value: '(╬ﾟдﾟ)▄︻┻┳═一' }, { value: '･*･:≡(　ε:)' }, { value: '(笑)' }, { value: '(汗)' },
        { value: '(泣)' }, { value: '(苦笑)' }, { value: 'OωO' }, { value: 'ヾ(≧∇≦*)ゝ' }],
    },
    {
        type: 'emoji',
        template: ':{0}:',
        title: 'Tieba',
        description: '表情符号',
        expression: [{ value: 'tongue' }, { value: 'theblackline' }, { value: 'tear' }, { value: 'surprised' },
        { value: 'surprised2' }, { value: 'spray' }, { value: 'spit' }, { value: 'smilingeyes' }, { value: 'shui' },
        { value: 'shame' }, { value: 'se' }, { value: 'rmb' }, { value: 'tongue' }, { value: 'reluctantly' }, { value: 'rbq' },
        { value: 'niconiconit' }, { value: 'niconiconi' }, { value: 'niconiconi_t' }, { value: 'naive' }, { value: 'ku' },
        { value: 'huaji' }, { value: 'hu' }, { value: 'han' }, { value: 'haha' }, { value: 'good' }, { value: 'doubt' },
        { value: 'britan' }, { value: 'bbd' }, { value: 'awesome' }, { value: 'anger' }, { value: 'aa' }, { value: 'happy' },
        { value: 'grievance' }],
    },
]
