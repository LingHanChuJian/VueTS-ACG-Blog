<template lang="pug">
    div.home-wrap
        div.home-strat(v-if="recommend.length !== 0")
            h3
                Icon(type="anchor" fixed)
                |  START:RUSHING!!!
            Recommend(:recommend="recommend")
        div.home-discovery
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
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
        Recommend,
        Archives,
    },
})
export default class Home extends Vue {
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

    private archives: UserArchives[] = []
}
</script>

<style lang="stylus" scoped>
.home-wrap
    margin 0 auto
    padding 40px 0
    max-width 800px

.home-strat
.home-discovery
    margin-bottom 40px
    h3
        margin-bottom 20px
        padding-bottom 10px
        border-bottom 1px dashed $font-color
</style>