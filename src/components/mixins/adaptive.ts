import { Component, Prop, Vue } from 'vue-property-decorator'
import { addEvent, removeEvent, clientHeight, scrollHeight } from '@/utils'

@Component({
    name: 'AdaptiveMixins',
})
export default class AdaptiveMixins extends Vue {
    public isMediaMatched: boolean = this.matchMedia()

    public clientHeight: number = 0

    public scrollHeight: number = 0

    @Prop({ type: Boolean, default: false })
    private isMatchMediaMaxWidth!: boolean

    @Prop({ type: [Number, String], default: 860 })
    private matchMediaMaxWidth!: number | string

    private matchMedia(): boolean {
        return !this.isMatchMediaMaxWidth ? matchMedia(`(max-width: ${this.matchMediaMaxWidth}px)`).matches : true
    }

    private setResize(): void {
        this.isMediaMatched = this.matchMedia()
        this.clientHeight = clientHeight()
        this.scrollHeight = scrollHeight()
    }

    private mounted() {
        this.clientHeight = clientHeight()
        this.scrollHeight = scrollHeight()
        addEvent(window, 'resize', this.setResize)
    }

    private beforeDestroy() {
        removeEvent(window, 'resize', this.setResize)
    }
}
