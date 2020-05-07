<template lang="pug">
    div.home-wrap
        div.home-strat
            h3
                Icon(type="anchor" fixed)
                |  START:RUSHING!!!
        div.home-discovery
            h3
                Icon(type="envira" fixed)
                |  DISCOVERY
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class Home extends Vue {
}
</script>

<style lang="stylus" scoped>
.home-wrap
    margin 0 auto
    padding 40px 0
    max-width 800px

.home-strat
.home-discovery
    h3
        margin-bottom 40px
        padding-bottom 10px
        border-bottom 1px dashed $font-color
</style>