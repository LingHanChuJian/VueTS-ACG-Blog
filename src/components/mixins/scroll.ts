import { Component, Vue } from 'vue-property-decorator'
import { addEvent, removeEvent, scrollTop } from '@/utils'

@Component
export default class Scroll extends Vue {
    public scrollTop: number = 0

    private getScroll(): void {
        this.scrollTop = scrollTop()
    }

    private created() {
        this.$nextTick(() => addEvent(window, 'scroll', this.getScroll, true))
    }

    private destroyed() {
        removeEvent(window, 'scroll', this.getScroll, true)
    }
}
