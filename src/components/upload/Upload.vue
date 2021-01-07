<template lang="pug">
    div(:class="[prefixCls + '-wrap']")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'Upload',
})
export default class Upload extends Vue {
    private prefixCls: string = 'upload'
}
</script>

<style lang="stylus" scoped>

</style>
