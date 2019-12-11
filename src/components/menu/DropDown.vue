<template lang="pug">
    div(:class="classes" :style="styles")
        slot
</template>

<script lang="ts">
import { getStyle } from '@/utils'
import Popper, { PopperOptions } from 'popper.js'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'

@Component
export default class DropDown extends Vue {
    @Prop({ type: String })
    private className?: string

    @Prop({ default: 'bottom-start', type: String })
    private placement!: PopperOptions['placement']

    private prefixCls: string = 'dropdown'

    private popper?: Popper | null

    private popperStatus: boolean = false

    private minWidth: string = ''

    private get classes(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            this.className ? this.className : '',
        ]
    }

    private get styles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}

        if (this.minWidth) {
            style.minWidth = this.minWidth
        }

        return style
    }

    public update() {
        if (this.popper) {
            this.popper.update()
            this.popperStatus = true
        } else {
            this.$nextTick(() => {
                this.popper = new Popper((this.$parent.$refs.reference as Element), this.$el, {
                    placement: this.placement,
                    modifiers: {
                        preventOverflow: {
                            boundariesElement: 'window',
                        },
                    },
                    onCreate: () => {
                        this.resetTransformOrigin()
                        this.$nextTick(() => (this.popper as Popper).update())
                    },
                    onUpdate: () => {
                        this.resetTransformOrigin()
                    },
                })
            })
        }

        if (this.$parent.$options.name === 'SubMenu') {
            this.minWidth = getStyle((this.$parent.$el as HTMLElement), 'width')
        }
    }

    public destroy() {
        if (this.popper) {
            setTimeout(() => {
                if (this.popper && !this.popperStatus) {
                    this.popper.destroy()
                    this.popper = null
                }
                this.popperStatus = false
            }, 300)
        }
    }

    private resetTransformOrigin(): void {
        if (!this.popper) { return }
        const xPlacement: string | null = this.popper.popper.getAttribute('x-placement')
        const placementStart: string = xPlacement ? xPlacement.split('-')[0] : ''
        const placementEnd: string = xPlacement ? xPlacement.split('-')[1] : ''
        if (xPlacement === 'left' || xPlacement === 'right') {
            (this.popper.popper as HTMLElement).style.transformOrigin = placementStart === 'bottom' || ( placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
        }
    }

    private created() {
        this.$on('on-update-popper', this.update)
        this.$on('on-destroy-popper', this.destroy)
    }

    private beforeDestroy() {
        if (this.popper) {
            this.popper.destroy()
        }
    }
}
</script>