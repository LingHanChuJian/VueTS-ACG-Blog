import { MenuItemData, UserInformation } from '@/types/components'

// site 首页标题
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
        to: 'home',
        content: '首页',
        className: 'home',
        icon: {
            type: 'house-damage',
            className: 'animation-home',
        },
    },
    {
        name: 'archives',
        to: 'archives',
        content: '归档',
        className: 'archives',
        icon: {
            type: 'archive',
            className: 'animation-archives',
        },
        children: [
            {
                name: 'archives-whatever',
                to: 'whatever',
                content: '随想',
                icon: {
                    type: 'comment-dots',
                    fixed: true,
                },
            },
            {
                name: 'archives-record',
                to: 'record',
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
                to: 'anime',
                content: '番剧',
                icon: {
                    type: 'film',
                    fixed: true,
                },
            },
            {
                name: 'list-music',
                to: 'music',
                content: '歌单',
                icon: {
                    type: 'headphones',
                    fixed: true,
                },
            },
            {
                name: 'list-boy',
                to: 'boy',
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
        to: 'comment',
        content: '留言版',
        className: 'comment',
        icon: {
            type: 'edit',
            className: 'animation-comment',
        },
    },
    {
        name: 'friends',
        to: 'friends',
        content: '友人帐',
        className: 'friends',
        icon: {
            type: 'link',
            className: 'animation-friends',
        },
    },
    {
        name: 'feed',
        to: 'feed',
        content: '投食',
        className: 'feed',
        icon: {
            type: 'coffee',
            className: 'animation-feed',
        },
    },
    {
        name: 'about',
        to: 'about',
        content: '关于',
        className: 'about',
        icon: {
            type: 'leaf',
            className: 'animation-about',
        },
        children: [
            {
                name: 'about-me',
                to: 'me',
                content: '我?',
                icon: {
                    type: 'dragon',
                    fixed: true,
                },
            },
            {
                name: 'about-statistics',
                to: 'statistics',
                content: '统计',
                icon: {
                    type: 'chart-area',
                    fixed: true,
                },
            },
            {
                name: 'about-theme',
                to: 'theme',
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
            color: '#000',
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
