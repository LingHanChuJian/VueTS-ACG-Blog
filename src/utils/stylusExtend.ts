/**
 * {@link https://github.com/PrismJS/prism/blob/master/components/prism-stylus.js}
 */

import { HLJSStatic, IMode } from 'highlight.js'

export const languageStylusExtend = (hljs: HLJSStatic): IMode => {
    return {
        case_insensitive: false,
    }
}
