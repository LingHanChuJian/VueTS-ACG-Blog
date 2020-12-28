<template lang="pug">
    div.header-container(style="height: 475px")
        
</template>

<script lang="ts">
import AdaptiveMixins from '@/components/mixins/adaptive'
import { Component, Mixins, Vue } from 'vue-property-decorator'

@Component({
    name: 'ArticleHeader',
})
export default class ArticleHeader extends Mixins(AdaptiveMixins) {

}
</script>

<style lang="stylus" scoped>

</style>
