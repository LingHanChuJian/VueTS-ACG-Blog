<template lang="pug">
    main(:class="[prefixCls + '-wrap']")
        div(:class="[prefixCls + '-discuss']")
            div(:class="[prefixCls + '-discuss-title']")
                | 与
                ruby 凌寒初见
                    rt こんにちは
                | 对话中...
            div(:class="[prefixCls + '-discuss-message-wrap']")
                div(:class="[prefixCls + '-discuss-message-container']" v-for="item, index in discuss" :key="index")
                    div(:class="[prefixCls + '-discuss-message', prefixCls + '-' + item.type]" v-html="item.html")
                    div(v-if="item.quick_replies" :class="[prefixCls + '-action-container']")
                        button(:class="[prefixCls + '-action-button']" v-for="actionItem in item.quick_replies" :key="actionItem.title" @click="") {{ actionItem.title }}
                div(:class="[prefixCls + '-discuss-input']")
        Markdown(:content="content")
</template>

<script lang="ts">
import Botkit from '@/utils/botkit'
import { UserDiscuss } from '@/types/components'
import Markdown from '@/components/Markdown.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Markdown,
    },
})
export default class Me extends Vue {
    private prefixCls: string = 'me'

    private isSocket: boolean = Botkit.isSocket()

    private discuss: UserDiscuss[] = [
        {
            html: '<p>Hi,Wanderer! 👋</p>',
            quick_replies: '',
            text: 'Hi,Wanderer!',
            type: 'message',
        },
    ]

    private content: string = '<p><em>2018/11/6 接入 Google AdSense；<br> 2018/6/6 博客 Android <a href="https://2heng.xin/client/">客户端</a>上线；<br> 2018/5/24 网页使用了思源宋体，即时加载中文字体有一定网速压力，可选择本地安装<a href="https://cloud.moezx.cc/Fonts/思源宋体【开源】/" target="_blank" rel="nofollow">思源宋体</a>；<br> 2018/4/25 <a href="https://mashiro.top/" target="_blank" rel="nofollow">笔记本</a>改用 Hexo — Simple is the best；<br> 2017/11/26 起使用新主题 <a href="https://2heng.xin/theme-sakura/">Sakura</a>；<br> 2017/8/9 - 2017/11/26 使用的主题 <a href="https://github.com/moezx/Moezx-WP-theme" target="_blank" rel="nofollow">Moezx</a>；<br> 2017/8/9 博客由 Jeklly 平台迁移至 WordPress。</em></p>'
}
</script>

<style lang="stylus" scoped>
.me-discuss
    padding 10px 20px
    width 100%
    height auto
    border-radius 10px
    background-color #F8F8F8

.me-discuss-title
    text-align center
    font-size 20px

.me-discuss-message-wrap
    padding 10px 0
    min-height 300px

.me-discuss-message
    padding 5px 10px
    border-radius 10px
    background-color #EBEBEB
    font-size 14px
    display inline-block
    line-height 1.3
    font-size 16px

.me-message
    animation animation-right-move .5s

.me-wanderer-message
    animation animation-left-move .5s

@keyframes animation-left-move
    from
        opacity 0
        transform translateX(15px)
    to
        opacity 1
        transform translateX(0)

@keyframes animation-right-move
    from
        opacity 0
        transform translateX(-15px)
    to
        opacity 1
        transform translateX(0)
</style>