<template lang="pug">
    div(:class="classes" :style="styles")
        div(
            :class="[prefixCls + '-arrow']"
            ref="arrow"
            data-popper-arrow
        )
        slot
</template>

<script lang="ts">
import { getStyle, oneOf } from '@/utils'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'
import { createPopper, Options as PopperOptions, Placement, Instance as Popper } from '@popperjs/core'

@Component({
    name: 'DropDown',
})
export default class DropDown extends Vue {
    @Prop({
        type: String,
        default: 'bottom-start',
        validator(value: string) {
            return oneOf(value, ['auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'])
        },
    })
    private placement!: Placement

    private prefixCls: string = 'dropdown'

    private popper?: Popper | null

    private popperStatus: boolean = false

    private minWidth: string = ''

    private get classes(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
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
            this.popper.forceUpdate()
            this.popperStatus = true
        } else {
            this.$nextTick(() => {
                this.popper = createPopper((this.$parent.$refs.reference as Element), (this.$el as HTMLElement), {
                    placement: this.placement,
                    modifiers: [
                        {
                            name: 'computeStyle',
                            options: {
                                gpuAcceleration: false,
                            },
                        },
                        {
                            phase: 'afterWrite',
                            fn: () => {
                                this.resetTransformOrigin()
                            },
                        },
                        {
                            name: 'arrow',
                            options: {
                                element: this.$refs.arrow,
                            },
                        },
                    ],
                    onFirstUpdate: () => {
                        this.resetTransformOrigin()
                        this.$nextTick((this.popper as Popper).forceUpdate)
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
        const placement: string = this.popper.state.placement
        const placementStart: string = placement ? placement.split('-')[0] : ''
        const placementEnd: string = placement ? placement.split('-')[1] : ''
        if (placement !== 'left' && placement !== 'right') {
            this.popper.state.elements.popper.style.transformOrigin = placementStart === 'bottom' || ( placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
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