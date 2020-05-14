<template lang="pug">
    div.home-wrap
        div.home-strat(v-if="recommend.length !== 0")
            h3
                Icon(type="anchor" fixed)
                |  START:RUSHING!!!
            Recommend(:recommend="recommend")
        div.home-discovery(v-scroll="loadScroll" :data-disabled="isLoadData")
            h3
                Icon(type="envira" fixed)
                |  DISCOVERY
            Archives(:archives="archives")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import Archives from '@/components/Archives.vue'
import { UserArchives } from '@/types/components'
import { UserRecommend } from '@/types/components'
import Recommend from '@/components/Recommend.vue'
import scroll from '@/components/directives/scroll'
import { Component, Mixins, Watch, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
        Recommend,
        Archives,
    },
    directives: {
        scroll,
    },
})
export default class Home extends Vue {
    // 判断是否在请求加载数据
    private isLoadData: boolean = false

    private recommend: UserRecommend[] = [
        {
            link: 'https://2heng.xin/theme-sakura/',
            image: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg',
            title: 'recommend',
            description: '主题',
        },
        {
            link: 'https://2heng.xin/theme-sakura/',
            image: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg',
            title: 'recommend',
            description: '主题',
        },
        {
            link: 'https://2heng.xin/theme-sakura/',
            image: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg',
            title: 'recommend',
            description: '主题',
        },
    ]

    private archives: UserArchives[] = [
        {
            id: 1,
            title: '解决ts引用第三方模块，无法找到模块“xxx”的声明文件问题',
            subtitle: 'can-not-find-module',
            introduction: '由于想写一个自己的工具，开发过程中使用了一个我自己写的vue插件, 简单的 (textarea)自适应插件',
            create: 1589160923626,
            tag: 'hacking',
            tagName: '野生技术协会',
            pageView: 100,
            comments: 10,
            image: 'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
        },
        {
            id: 2,
            title: '解决移动端浏览器 vh 单位异常问题',
            subtitle: 'can-not-find-module',
            introduction: '在做一个响应式布局时用 vh 单位定义了元素的高度，结果在发现在移动端的 Chrome 和 Firefox 浏览器中，浏览器',
            create: 1589160923626,
            tag: 'hacking',
            tagName: '野生技术协会',
            pageView: 200,
            comments: 0,
            image: 'https://2heng.xin/wp-content/uploads//2018/06/child-1024x576.jpg',
        },
    ]

    private loadScroll(): void {
        this.isLoadData = true
        console.log('加载数据')
        setTimeout(() => {
            console.log('加载数据成功')
            this.isLoadData = false
        }, 1000)
    }
}
</script>

<style lang="stylus" scoped>
.home-wrap
    margin 0 auto
    padding 40px 10px
    max-width 820px

.home-strat
.home-discovery
    margin-bottom 40px
    h3
        margin-bottom 20px
        padding-bottom 10px
        border-bottom 1px dashed $font-color
</style>