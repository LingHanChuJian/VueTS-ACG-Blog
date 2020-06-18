<template lang="pug">
    main(:class="[prefixCls + '-wrap']")
        Markdown(:content="content")
        div(:class="[prefixCls + '-coffee']")
            a(:class="[prefixCls + '-github']")
</template>

<script lang="ts">
import { reward } from '@/config'
import Markdown from '@/components/Markdown.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Markdown,
    },
})
export default class Feed extends Vue {
    private prefixCls: string = 'feed'

    private content: string = '<p>如果喜欢我的博客，可以考虑请我喝杯咖啡~非常感激！<br> 网站所需的服务器和 CDN 都是不小的开支、日常维护也需要大量精力。 (,,• ₃ •,,)</p>'


}
</script>

<style lang="stylus" scoped>

</style>
