<template lang="pug">
    ul(:class="wrapClasses")
        span(v-if="showTotal" :class="[prefixCls + '-total']")
            slot(name="total") 共 {{ total }} 条
        li(:class="prevClasses" @click.stop="prevClick")
            slot(name="prev")
                Icon(type="chevron-left")
        li
        li(:class="nextClasses" @click.stop="nextClick")
            slot(name="next")
                Icon(type="chevron-right")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class Page extends Vue {
    @Prop({ type: Number, default: 1 })
    private value!: number

    @Prop({ type: Number, default: 0 })
    private total!: number

    @Prop({ type: Number, default: 10 })
    private pageSize!: number

    @Prop({ type: Number, default: 10 })
    private totalVisible!: number

    @Prop({ type: Boolean, default: false })
    private showTotal!: boolean

    @Prop({ type: Boolean, default: false })
    private showElevator!: boolean

    @Prop({ type: Boolean, default: false })
    private showSizer!: boolean

    @Prop({ type: Boolean, default: false })
    private transfer!: boolean

    @Prop({
        type: Array,
        default() {
            return [10, 20, 30 , 40]
        },
    })
    private pageSizeOpts!: number[]

    private prefixCls: string = 'page'

    private currentPage: number = this.value

    private currentPageSize: number = this.pageSize

    private currentItems: Array<number | string> = []

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            this.prefixCls + '-wrap',
        ]
    }

    private get prevClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls + '-prev',
        ]
    }

    private get nextClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls + '-next',
        ]
    }

    @Watch('total')
    private onTotalChange(newValue: number) {
        const maxPage: number = Math.ceil(newValue / this.currentPageSize)
        if (maxPage < this.currentPage) { this.currentPage = maxPage === 0 ? 1 : maxPage }
    }

    @Watch('value')
    private onValue(newValue: number) {
        this.currentPage = newValue
    }

    @Watch('pageSize')
    private onPageSize(newValue: number) {
        this.currentPageSize = newValue
    }

    private get items(): Array<number | string> {
        if (this.totalVisible === 0) { return [] }

        return []
    }

    private range(from: number, to: number): number[] {
        const ranges: number[] =  []

        from  = from > 0 ? from : 1
        for (let i = from; i <= to; i++) {
            ranges.push(i)
        }

        return ranges
    }

}
</script>

<style lang="stylus" scoped>

</style>