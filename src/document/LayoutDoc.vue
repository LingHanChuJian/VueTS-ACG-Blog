<template lang="pug">
    div
        h2 Layout 布局
        p
            code Layout
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

}
</script>

<style lang="stylus" scoped>

</style>