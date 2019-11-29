import { addEvent, removeEvent } from '@/utils/dom'
import {
    oneOf,
    typeOf,
    deepCopy,
    findComponentsDownward,
    findComponentsUpward,
    findComponentUpward,
    findComponentDownward,
    findBrothersComponents,
    addClass,
    hasClass,
    removeClass,
} from '@/utils/assist'

export {
    addEvent,
    removeEvent,
    oneOf,
    typeOf,
    deepCopy,
    findComponentsDownward,
    findComponentsUpward,
    findComponentUpward,
    findComponentDownward,
    findBrothersComponents,
    addClass,
    hasClass,
    removeClass,
}

const files: __WebpackModuleApi.RequireContext = require.context('.', false, /\.ts$/)

files.keys().forEach((key: string) => {
    if (key === './index.ts') { return }
    console.log(key)
})
