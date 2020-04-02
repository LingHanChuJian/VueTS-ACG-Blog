<template lang="pug">
    Layout
        Drawer(ref="drawer" isCollapsible v-model="isCollapsed")
            NavDrawer
        Layout(:class="layoutClasses" @click.native="layoutClick")
            Header
                NavBar(:menuData="menuData")
                NavBarMobile(:isCollapsed="isCollapsed" @on-menu-click="setDrawer")
            Content(:class="collapsedClasses")
                keep-alive
                    router-view
            Footer(:class="collapsedClasses")
                FooterCenter
</template>

<script lang="ts">
import FooterCenter from '@/views/Footer.vue'
import { Component, Vue } from 'vue-property-decorator'
import { WrapClasses, MenuItemData } from '@/types/components'
import { NavBar, NavDrawer, NavBarMobile } from '@/components/nav'
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
        FooterCenter,
    },
})
export default class Index extends Vue {
    private isCollapsed: boolean = false

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

    private setDrawer(): void {
        (this.$refs.drawer as Drawer).toggleCollapse()
    }

    private layoutClick(): void {
        if (!this.isCollapsed) { return }
        this.setDrawer()
    }

    private get layoutClasses(): Array<string | WrapClasses> {
        return [
            {
                [`layout-opened`] : this.isCollapsed,
            },
        ]
    }

    private get collapsedClasses(): Array<string | WrapClasses> {
        return [
            {
                [`collapsed-opened`] : this.isCollapsed,
            },
        ]
    }
}
</script>

<style lang="stylus" scoped>
.layout-opened:after
    content ''
    width 100%
    height 100%
    position fixed
    background-color rgba(0,0,0,.4)
    z-index -1

.collapsed-opened
    transform translateX(250px)
</style>