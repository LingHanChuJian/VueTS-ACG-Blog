
import { oneOf } from '@/utils'
import VueRouter, { RawLocation, Route } from 'vue-router'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LinkMixins extends Vue {
    @Prop({ type: [Object, String] })
    public to?: RawLocation

    @Prop({ default: false, type: Boolean })
    public replace!: boolean

    @Prop({
        default: '_self',
        type: String,
        validator(value: string) {
            return oneOf(value, ['_blank', '_self', '_parent', '_top'])
        },
    })
    public target!: string

    @Prop({ default: false, type: Boolean, required: false })
    public append!: boolean

    public handleClick(isNewWindow: boolean = false): void {
        const router: VueRouter = this.$router
        if (isNewWindow) {
            let to = this.to
            if (router) {
                const route = router.resolve((this.to as RawLocation), this.$route, this.append)
                to = route ? route.href : this.to
            }
            window.open((to as string))
        } else {
            if (router) {
                this.replace ? this.$router.replace((this.to as RawLocation)) : this.$router.push((this.to as RawLocation))
            } else {
                window.location.href = (this.to as string)
            }
        }
    }

    public handleCheckClick(event: Event, isNewWindow: boolean = false): boolean | void {
        if (this.to) {
            if (this.target === '_blank') {
                return false
            } else {
                event.preventDefault()
                this.handleClick(isNewWindow)
            }
        }
    }

    public get linkUrl(): object | string | null | undefined {
        const type: string = typeof this.to
        if (type !== 'string') {
            return null
        }

        if ((this.to as string).includes('//')) {
            return this.to
        }

        const router: VueRouter = this.$router
        if (router) {
            const route = router.resolve((this.to as RawLocation), this.$route, this.append)
            return route ? route.href : this.to
        }
        return this.to
    }

}
