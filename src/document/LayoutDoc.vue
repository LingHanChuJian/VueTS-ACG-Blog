<template lang="pug">
    div
        h2 Layout 布局
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout, Header, Content, Footer } from '@/components/layout'

@Component({
    components: {
        Layout,
        Header,
        Content,
        Footer,
    },
})
export default class LayoutDoc extends Vue {
    // private mounted() {
    // }
}
</script>

<style lang="stylus" scoped>

</style>