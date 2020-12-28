<template lang="pug">
    div(:class="prefixCls") 
        component(:is="label" :class="[prefixCls + '-label']" :id="uuid") {{ this.title }}
        a(:href="'#' + uuid" :data-title="title") #
</template>

<script lang="ts">
import UUIDMixins from '@/components/mixins/uuid'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    name: 'Anchor',
})
export default class Anchor extends Mixins(UUIDMixins) {
    @Prop({ type: String, default: 'h1' })
    private label!: string

    @Prop({ type: String, default: '' })
    private title!: string

    private prefixCls: string = 'anchor'

}
</script>