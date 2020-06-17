<template lang="pug">
    article(:class="[prefixCls + '-article', 'markdown']" ref="article" v-html="content")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Markdown extends Vue {
    @Prop({ type: String, default: ''})
    private prefixCls!: string

    @Prop({ type: String, default: ''})
    private content!: string
}
</script>
