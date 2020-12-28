<template lang="pug">
    div
        Anchor(title="Menu 导航菜单")
        Example.simple(title="顶部导航")
            template(v-slot:dome)
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
            template(v-slot:description)
                p 水平的顶部导航菜单
            template(v-slot:code)
                Block(:content="dome1" lang="VUE" :custom="['language-pug']")
        Example.simple(title="侧栏导航")
            template(v-slot:dome)
                Menu(mode="vertical")
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
            template(v-slot:description)
                p 垂直导航菜单，可以内嵌子菜单
            template(v-slot:code)
                Block(:content="dome2" lang="VUE" :custom="['language-pug']")
        div.api
            Anchor(title="API" label="h2")
            Anchor(title="Menu props" label="h3")
            Table(:column="columns" :data="data")
            Anchor(title="Menu events" label="h3")
            Table(:column="columns2" :data="data2")
            Anchor(title="MenuItem props" label="h3")
            Table(:column="columns" :data="data3")
            Anchor(title="SubMenu props" label="h3")
            Table(:column="columns" :data="data4")
            Anchor(title="SubMenu slot" label="h3")
            Table(:column="columns3" :data="data5")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Table } from '@/components/table'
import { Anchor } from '@/components/anchor'
import { Column, Row } from '@/types/components'
import { Example, Block } from '@/components/example'
import { Menu, MenuItem, SubMenu } from '@/components/menu'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'MenuDoc',
    components: {
        Table,
        Anchor,
        Example,
        Block,
        Menu,
        MenuItem,
        SubMenu,
        Icon,
    },
})
export default class MenuDoc extends Vue {
    private dome1: string =
`<template lang="pug">
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
</template>`

    private dome2: string =
`<template lang="pug">
    Menu(mode="vertical")
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
</template>`

    private columns: Column[] = [
        {
            key: 'prop',
            title: '属性',
        },
        {
            key: 'description',
            title: '说明',
        },
        {
            key: 'type',
            title: '类型',
        },
        {
            key: 'default',
            title: '默认值',
        },
    ]

    private data: Row[] = [
        {
            prop: 'mode',
            description: '菜单类型，可选值为 horizontal (水平) 和 vertical (垂直) ',
            type: 'String',
            default: 'vertical',
        },
        {
            prop: 'width',
            description: '仅在 vertical (垂直) 模式下有效',
            type: 'Number',
            default: '250',
        },
        {
            prop: 'activeName',
            description: '激活菜单 name',
            type: 'Number | String',
            default: '',
        },
        {
            prop: 'openedNames',
            description: '展开菜单 name 集合',
            type: 'Array<Number | String>',
            default: '[]',
        },
    ]

    private columns2: Column[] = [
        {
            key: 'eventsName',
            title: '事件名',
        },
        {
            key: 'description',
            title: '说明',
        },
        {
            key: 'returnValue',
            title: '返回值',
        },
    ]

    private data2: Row[] = [
        {
            eventsName: 'on-select',
            description: '选择菜单 (MenuItem) 时触发',
            returnValue: 'name',
        },
        {
            eventsName: 'on-open-change',
            description: '当 展开/收起 子菜单时触发',
            returnValue: '当前展开的 SubMenu 的 name 值数组',
        },
    ]

    private data3: Row[] = [
        {
            prop: 'name',
            description: '菜单项的唯一标识, 必填',
            type: 'String | Number',
            default: '',
        },
        {
            prop: 'to',
            description: '跳转的链接, 支持 vue-router 对象',
            type: 'String | RawLocation',
            default: '',
        },
        {
            prop: 'replace',
            description: '路由跳转时, 开启 replace 将不会向 history 添加新记录',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'target',
            description: '相当于 a 链接的 target 属性',
            type: 'String',
            default: '_self',
        },
        {
            prop: 'append',
            description: '同 vue-router append',
            type: 'Boolean',
            default: 'false',
        },
    ]

    private data4: Row[] = [
        {
            prop: 'name',
            description: '菜单项的唯一标识, 必填',
            type: 'String | Number',
            default: '',
        },
    ]

    private columns3: Column[] = [
        {
            key: 'name',
            title: '名称',
        },
        {
            key: 'description',
            title: '说明',
        },
    ]

    private data5: Row[] = [
        {
            name: 'default',
            description: '菜单项',
        },
        {
            name: 'title',
            description: '子菜单项',
        },
    ]
}
</script>

<style lang="stylus" scoped>
.simple
    margin-bottom 20px
</style>