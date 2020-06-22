<template lang="pug">
    main(:class="[prefixCls + '-wrap']")
        div(:class="[prefixCls + '-discuss']")
            div(:class="[prefixCls + '-discuss-title']")
                | 与
                ruby 凌寒初见
                    rt こんにちは
                | 对话中...
            
        Markdown(:content="content")
</template>

<script lang="ts">
import Markdown from '@/components/Markdown.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Markdown,
    },
})
export default class Me extends Vue {
    private prefixCls: string = 'me'

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
</style>