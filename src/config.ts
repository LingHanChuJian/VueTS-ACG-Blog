import { MenuItemData, UserInformation, UserReward, UserExpression, ExpressionParam } from '@/types/components'

// site 首页标题   标题有了 author不显示
export const title: string = 'Hi,Wanderer!'

// 首页 author 图片链接
export const author: string = 'http://www.yx319.cn/wp-content/uploads/2019/02/headimg.jpg'

// 首页描述
export const description: string = 'If the heart does not have a destination, there will be wandering everywhere.'

// 首页随机图片链接
export const randomImagesLink: string = 'https://api.2heng.xin/cover'

// 首页播放 视频链接
export const playerLink: string = 'http://img.cdn.myrove.cn/test/video.m3u8'

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
        name: 'feed',
        to: { name: 'feed' },
        content: '投食',
        className: 'feed',
        icon: {
            type: 'coffee',
            className: 'animation-feed',
        },
    },
    {
        name: 'about',
        to: { name: 'about' },
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
export const reward: UserReward[] = [
    {
        image: 'http://img.cdn.myrove.cn/test/Alipay.jpg',
        title: '支付宝',
    },
    {
        image: 'http://img.cdn.myrove.cn/test/WeChat.jpg',
        title: '微信',
    },
]

//  表情分类
//  emoticon 颜文字  emoji 表情符号  sticker 贴图
export const expression: UserExpression[] = [
    {
        type: 'sticker',
        template: 'f(x)=∫({0})sec²xdx',
        titile: 'bilibili~',
        description: '贴图',
        expression: [],
    },
    {
        type: 'emoticon',
        template: '`{0}`',
        titile: '(✪ω✪)',
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
        titile: 'Tieba',
        description: '表情符号',
        expression: [],
    },
]
