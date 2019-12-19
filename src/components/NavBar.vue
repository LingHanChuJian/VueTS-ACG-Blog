<template lang="pug">
    nav.navbar
        div.navbar-left
            div(:class="menuClasses" @click="menuClick")
            div.logo
                router-link(to="home")
                    span.logo-title
                        ruby 凌
                            rt こん
                        ruby 寒
                            rt にちは
                        ruby 初见
        div.navbar-middle
            Menu(mode="horizontal")
                MenuItem(name="home" to="home")
                    Icon(type="house-damage")
                    | 首页
                SubMenu(name="archives" to="archives")
                    template(slot="title")
                        Icon(type="archive")
                        | 归档
                    MenuItem(name="archives-whatever" to="whatever")
                        Icon(type="comment-dots" fixed)
                        | 随想
                    MenuItem(name="archives-record" to="record")
                        Icon(type="bookmark" fixed)
                        | 笔记
                SubMenu(name="list")
                    template(slot="title")
                        Icon(type="list-ul")
                        | 清单
                    MenuItem(name="list-anime" to="anime")
                        Icon(type="film" fixed)
                        | 番剧
                    MenuItem(name="list-music" to="music")
                        Icon(type="headphones" fixed)
                        | 歌单
                    MenuItem(name="list-boy" to="boy")
                        Icon(type="grin-wink" fixed)
                        | 男孩
                MenuItem(name="comment" to="comment")
                    Icon(type="edit")
                    | 留言版
                MenuItem(name="friends" to="friends")
                    Icon(type="link")
                    | 友人帐
                MenuItem(name="feed" to="feed")
                    Icon(type="coffee")
                    | 投食
                SubMenu(name="about")
                    template(slot="title")
                        Icon(type="leaf")
                        | 关于
                    MenuItem(name="about-me" to="me")
                        Icon(type="dragon" fixed)
                        | 我?
                    MenuItem(name="about-statistics" to="statistics")
                        Icon(type="chart-area" fixed)
                        | 统计
                    MenuItem(name="about-theme" to="theme")
                        Icon(type="snowflake" fixed)
                        | 主题
        div.navbar-right
            Icon(type="search" size="25" fixedSize="3x" fixed)
            Icon(type="user-circle" size="25" fixedSize="3x" fixed)
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components'
import Index from '@/views/Index.vue'
import { Icon } from '@/components/icon'
import { Menu, SubMenu, MenuItem } from '@/components/menu'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Menu,
        SubMenu,
        MenuItem,
        Icon,
    },
})
export default class NavBar extends Vue {

    private menuClick(): void {
        this.$emit('menuClick')
    }

    private get menuClasses(): Array<string | WrapClasses> {
        return [
            'icon-menu',
            {
                [`icon-menu-opened`] : (this.$parent as Index).isCollapsed,
            },
        ]
    }

}
</script>

<style lang="stylus" scoped>
.navbar
    display inline-flex

menu(n)
    transition all .2s
    background-color #000000
    width 50px
    height 3px
    position n

@media screen and (max-width 860px)
    .navbar
        width 100%
        height 100%
        .icon-menu
            menu(relative)
            &:before
                menu(absolute)
                content ''
                top -8px
            &:after
                menu(absolute)
                content ''
                bottom 8px
        .icon-menu-opened
            background-color transparent
            &:before
                top 0
                transform rotate(-45deg)
            &:after
                bottom 0
                transform rotate(45deg)
</style>