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
                MenuItem.home(name="home" to="home")
                    Icon.animation-home(type="house-damage")
                    | 首页
                SubMenu.archives(name="archives" to="archives")
                    template(v-slot:title)
                        Icon.animation-archives(type="archive")
                        | 归档
                    MenuItem(name="archives-whatever" to="whatever")
                        Icon(type="comment-dots" fixed)
                        | 随想
                    MenuItem(name="archives-record" to="record")
                        Icon(type="bookmark" fixed)
                        | 笔记
                SubMenu.list(name="list")
                    template(v-slot:title)
                        Icon.animation-list(type="list-ul")
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
                MenuItem.comment(name="comment" to="comment")
                    Icon.animation-comment(type="edit")
                    | 留言版
                MenuItem.friends(name="friends" to="friends")
                    Icon.animation-friends(type="link")
                    | 友人帐
                MenuItem.feed(name="feed" to="feed")
                    Icon.animation-feed(type="coffee")
                    | 投食
                SubMenu.about(name="about")
                    template(v-slot:title)
                        Icon.animation-about(type="leaf")
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
            Icon.search(type="search" size="30" fixed)
            Poptip(trigger="hover" placement="bottom-end" wordWrap width="100")
                Icon.login(type="user-circle" size="30" fixed)
                template(v-slot:content)
                    | Whether to
                    a(href="/login" target="_blank" style="color:#333;font-weight:bold;") login in 
                    | now?
</template>

<script lang="ts">
import Index from '@/views/Index.vue'
import { Icon } from '@/components/icon'
import { Poptip } from '@/components/poptip'
import { WrapClasses } from '@/types/components'
import { Menu, SubMenu, MenuItem } from '@/components/menu'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Menu,
        SubMenu,
        MenuItem,
        Icon,
        Poptip,
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
    display flex
    justify-content space-between
    padding 0 20px
.logo
    font-size 20px
    a
        color $font-color
        &:hover
            color $font-color-hover
            .logo-title
                background-color $font-color-hover
                color #FFFFFF
                rt
                    color $font-color-hover
    .logo-title
        background-color rgba(255,255,255,.5)
        border-radius 5px

.home:hover
    .animation-home
        animation animation-upper-down 2.5s ease infinite

.archives:hover
.friends:hover
.about:hover
    .animation-archives
    .animation-friends
    .animation-about
        animation animation-counterclockwise-clockwise 2.5s ease infinite

.list:hover
    .animation-list
        animation animation-down-upper 2.5s ease infinite

.comment:hover
    .animation-comment
        animation animation-zoomout-zoom 2.5s ease infinite

.feed:hover
    .animation-feed
        animation animation-zoom-zoomout 2.5s ease infinite

.login:hover
    animation animation-counterclockwise-clockwise 2.5s ease infinite

.search
.login
    margin 0 5px
    cursor pointer
    transition color .5s
    &:hover
        color $font-color-hover

.login-message
    font-size 13px

menu(n)
    transition all .2s
    background-color #000000
    width 30px
    height 3px
    position n
    cursor pointer

@keyframes animation-upper-down
    6%
    18%
    30%
        transform translateX(5px)
    0%
    12%
    24%
    36%
    100%
        transform translateX(0)

@keyframes animation-counterclockwise-clockwise
    0%
        transform rotate(-12deg)
    8%
        transform rotate(12deg)
    10%
    28%
    30%
    48%
    50%
    68%
        transform rotate(24deg)
    18%
    20%
    38%
    40%
    58%
    60%
        transform rotate(-24deg)
    75%
    100%
        transform rotate(0)

@keyframes animation-down-upper
    0%
    8%
    16%
        transform translateY(-3px)
    4%
    12%
    20%
        transform translateY(3px)
    22%
    100%
        transform translateY(0)

@keyframes animation-zoomout-zoom
    0%
        transform scale(1)
    10%
    20%
        transform scale(.9) rotate(-8deg)
    30%
    50%
    70%
        transform scale(1.3) rotate(8deg)
    40%
    60%
        transform scale(1.3) rotate(-8deg)
    80%
    100%
        transform scale(1) rotate(0)

@keyframes animation-zoom-zoomout
    0%
        transform scale(1.1)
    50%
        transform scale(0.8)
    100%
        transform scale(1.1)

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