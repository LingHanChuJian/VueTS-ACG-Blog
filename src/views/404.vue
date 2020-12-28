<template lang="pug">
    Layout(:class="[prefixCls + '-404']")
        Content
            div(:class="[prefixCls + '-image']" v-lazy:background-image.container="images404" :style="{ height: clientHeight + 'px' }")
                div(:class="[prefixCls + '-message']") 
                    p 找不到路了么 (ﾟДﾟ≡ﾟдﾟ)!? 
                    p 路在脚下 →_→
                div(:class="[prefixCls + '-button']")
                    span(@click="$router.back()") 返回上一页
                    router-link(:to="{ name: 'home' }" tag="span") 返回首页
</template>

<script lang="ts">
import { images404 } from '@/config'
import { Layout, Content } from '@/components/layout'
import AdaptiveMixins from '@/components/mixins/adaptive'
import { Component, Mixins, Vue } from 'vue-property-decorator'


@Component({
    name: 'Error',
    components: {
        Layout,
        Content,
    },
})
export default class Error extends Mixins(AdaptiveMixins) {
    private prefixCls: string = 'error'

    private images404: string = images404
}
</script>

<style lang="stylus" scoped>
.error-image
    width 100%
    background-size cover
    background-position bottom

.error-message
    width 100%
    text-align center
    bottom 250px
    color #FFFFFF
    position absolute

.error-button
    position absolute
    width 100%
    text-align center
    bottom 200px
    span
        margin 0 10px
        border 1px solid #FFFFFF
        border-radius 50px
        padding 10px 30px
        cursor pointer
        color #FFFFFF

@media screen and (max-width 860px)
    .error-message
        bottom 200px
    .error-button
        bottom 150px
</style>