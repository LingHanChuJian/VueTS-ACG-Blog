<template lang="pug">
    Layout
        Drawer.drawer(ref="drawer" isCollapsible v-model="isCollapsed")
            NavDrawer(:menuData="menuData")
        Layout(:class="{ 'layout-opened': isCollapsed }" @click.native="layoutClick")
            Header(
                :class="headerClasses"
                @mouseenter.native="handleToggle"
                @mouseleave.native="handleToggle"
            )
                NavBar(:menuData="menuData" :isToggle="isToggle")
                NavBarMobile(:isCollapsed="isCollapsed" @on-menu-click="setDrawer")
            Layout.acg-layout(:class="{ 'collapsed-opened': isCollapsed }")
                Header.acg-header
                    Acg-Header(:userInformation="userInformation")
                Content
                    keep-alive
                        router-view
                Footer
                    Acg-Footer
        GoTop
</template>

<script lang="ts">
import GoTop from '@/components/GoTop.vue'
import AcgFooter from '@/components/AcgFooter.vue'
import { AcgHeader } from '@/components/acg-header'
import ScrollMixins from '@/components/mixins/scroll'
import { NavBar, NavDrawer, NavBarMobile } from '@/components/nav'
import { Component, Mixins, Watch, Vue } from 'vue-property-decorator'
import { WrapClasses, MenuItemData, UserInformation } from '@/types/components'
import { Layout, Header, Content, Footer, Drawer } from '@/components/layout'

@Component({
    components: {
        Layout,
        Header,
        Content,
        Footer,
        Drawer,
        NavBar,
        NavDrawer,
        NavBarMobile,
        AcgFooter,
        AcgHeader,
        GoTop,
    },
})
export default class Index extends Mixins(ScrollMixins) {
    private isCollapsed: boolean = false

    private isToggle: boolean = false

    private menuData: MenuItemData[] = [
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
            content: '归档',
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

    private userInformation: UserInformation[] = [
        {
            icon: {
                type: 'github-alt',
                size: 24,
                color: '#000',
                fixed: true,
            },
            link: 'https://github.com/LingHanChuJian',
            title: 'github',
        },
        {
            icon: {
                type: 'twitter-square',
                size: 24,
                color: '#1ab2e8',
                fixed: true,
            },
            link: 'https://twitter.com/5wHHx3QAsNNxhYd?lang=zh-tw',
            title: 'twitter',
        },
        {
            icon: {
                type: 'weixin',
                size: 24,
                color: '#02bb0e',
                fixed: true,
            },
            image: 'http://img.cdn.myrove.cn/blog/img/wenchat.9c0df2f2.png',
            title: 'weixin',
        },
        {
            icon: {
                type: 'envelope',
                size: 24,
                color: '#ffbf00',
                fixed: true,
            },
            link: 'mailto:linghanchujian@gmail.com',
            title: 'email',
        },
    ]

    private setDrawer(): void {
        (this.$refs.drawer as Drawer).toggleCollapse()
    }

    private layoutClick(): void {
        if (!this.isCollapsed) { return }
        this.setDrawer()
    }

    private handleToggle(): void {
        if (this.scrollTop !== 0) { return }
        this.isToggle = !this.isToggle
    }

    private get headerClasses(): Array<string | WrapClasses> {
        return [
            'header-navbar',
            {
                ['toggle-header-navbar']: this.isToggle,
            },
        ]
    }

    @Watch('scrollTop')
    private onOffsetTopChange(newValue: number, oldValue: number) {
        this.isToggle = newValue !== 0
    }
}
</script>

<style lang="stylus" scoped>
toggle-header-navbar()
  background-color rgba(255,255,255,.95)
  box-shadow 0 1px 40px -8px rgba(0,0,0,.5)

.drawer
.acg-layout
    transition all .3s ease-in-out

.acg-header
    position relative
    height auto
    &:before
        content ''
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-attachment fixed
        background url(./../assets/images/dot.png)
        z-index 10

.layout-opened:after
    content ''
    width 100%
    height 100%
    position fixed
    background-color rgba(0,0,0,.3)

.collapsed-opened
    transform translateX(250px)
    position fixed
    left 0
    right 0

@media screen and (min-width 860px)
    .header-navbar
        position fixed
        width 100%
        background-color transparent
        transition background .4s ease
        z-index 999
    .toggle-header-navbar
        toggle-header-navbar()

@media screen and (max-width 860px)
    .header-navbar
        position absolute
        width 100%
        z-index 999
    .acg-header:before
        background url(./../assets/images/grid.png)
</style>