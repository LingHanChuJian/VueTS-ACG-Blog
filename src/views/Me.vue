<template lang="pug">
    main(:class="[prefixCls + '-wrap']")
        div(:class="[prefixCls + '-discuss']")
            div(:class="[prefixCls + '-discuss-title']")
                | 与
                ruby 凌寒初见
                    rt こんにちは
                | 对话中...
            div(:class="[prefixCls + '-discuss-message-wrap']")
                div(:class="[prefixCls + '-discuss-message-container']" v-for="item, index in discuss" :key="index" :style="{ textAlign: item.type === 'message' ? 'left' : 'right' }")
                    div(:class="[prefixCls + '-discuss-message', prefixCls + '-' + item.type]" :data-action="!!item.options" v-html="item.text")
                    div(v-if="item.options" :class="[prefixCls + '-action-container']")
                        button(:class="[prefixCls + '-action-button']" v-for="actionItem in item.options" :key="actionItem.title" @click="actionClick(index, actionItem)") {{ actionItem.title }}
        Markdown(:content="content")
</template>

<script lang="ts">
import Botkit from '@/utils/botkit'
import Markdown from '@/components/Markdown.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BotkitOptions, UserDiscuss, QuickReplies } from '@/types/utils'


@Component({
    components: {
        Markdown,
    },
})
export default class Me extends Vue {
    private prefixCls: string = 'me'

    private discussBotkit: Botkit | undefined

    private discuss: UserDiscuss[] = []

    private content: string = '<p><em>2018/11/6 接入 Google AdSense；<br> 2018/6/6 博客 Android <a href="https://2heng.xin/client/">客户端</a>上线；<br> 2018/5/24 网页使用了思源宋体，即时加载中文字体有一定网速压力，可选择本地安装<a href="https://cloud.moezx.cc/Fonts/思源宋体【开源】/" target="_blank" rel="nofollow">思源宋体</a>；<br> 2018/4/25 <a href="https://mashiro.top/" target="_blank" rel="nofollow">笔记本</a>改用 Hexo — Simple is the best；<br> 2017/11/26 起使用新主题 <a href="https://2heng.xin/theme-sakura/">Sakura</a>；<br> 2017/8/9 - 2017/11/26 使用的主题 <a href="https://github.com/moezx/Moezx-WP-theme" target="_blank" rel="nofollow">Moezx</a>；<br> 2017/8/9 博客由 Jeklly 平台迁移至 WordPress。</em></p>'

    private botkit(): Botkit {
        const options: BotkitOptions = {
            wsUrl: process.env.VUE_APP_SOCKRT_BOTKIT_URL,
            onMessage: (event: MessageEvent) => {
                try {
                    const message: UserDiscuss = JSON.parse(event.data)
                    const discussOptions: QuickReplies[] | undefined = message.options
                    delete message.options
                    this.discuss.push(message)
                    if (options) { setTimeout(() => this.$set(this.discuss[this.discuss.length - 1], 'options', discussOptions), 1000) }
                } catch (e) {
                    console.error(e)
                }
            },
            onError: (event: Event) => {
                console.error(event)
            },
        }
        return Botkit.getInstance(options)
    }

    private actionClick(index: number, item: QuickReplies): void {
        this.$set(this.discuss[index], 'options', undefined)
        this.discuss.push({ type: 'wanderer-message', text: item.title })
        if (this.discussBotkit) { this.discussBotkit.send(item.payload) }
    }

    private mounted(): void {
        this.discussBotkit = this.botkit()
    }
}
</script>

<style lang="stylus" scoped>
.me-discuss
    position relative
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

.me-discuss-message-container
    margin 10px 0

.me-discuss-message
    padding 5px 10px
    border-radius 10px
    background-color #EBEBEB
    display inline-block
    line-height 1.3

.me-wanderer-message
    margin 0 auto
    background-color #919292
    color #FFFFFF

.me-action-container
    margin 10px 0

.me-message
.me-action-container
    animation animation-right-move .5s

.me-wanderer-message
    animation animation-left-move .5s

.me-action-button
    border none 
    cursor pointer
    margin-right 10px
    padding 7px 15px
    background-color #777979
    color #FFFFFF
    border-radius 4px
    box-shadow 2px 3px 4px 0 rgba(0,0,0,.25)

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