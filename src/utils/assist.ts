import { Vue } from 'vue-property-decorator'
import { ObjectBase, Func } from '@/types/utils'

// 判断元素是否在数组中
export const oneOf = (value: any, validList: any[]): boolean => {
    return validList.indexOf(value) > -1
}

// 判断对象类型
export const typeOf = (value: any): string => {
    const toString: () => string = Object.prototype.toString
    const map: ObjectBase = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object',
    }
    return map[toString.call(value)]
}

// 深度拷贝
export const deepCopy = (data: any): any => {
    const dataType: string = typeOf(data)

    let objects: ObjectBase | any[] = []

    switch (dataType) {
        case 'array':
            objects = []
            break
        case 'object':
            objects = {}
            break
        default:
            return data
    }

    switch (dataType) {
        case 'array':
            for (let i = 0, len = (data as any[]).length; i < len; i++) {
                (objects as any[]).push(deepCopy(data[i]))
            }
            return objects
        case 'object':
            const key: any[] = Object.keys(data as ObjectBase)
            for (let n = 0, nLen = key.length; n < nLen; n++) {
                objects[key[n]] = deepCopy((data as ObjectBase)[key[n]])
            }
            return objects
        default:
            return data
    }
}

/**
 * 向下查询组件 返回组件数组
 * @param context 组件对象
 * @param componentName 待查询组件名称
 * @param ignoreComponentNames 需要忽略组件名称集合
 */
export const findComponentsDownward = (context: Vue, componentName: string, ignoreComponentNames: string | string[] = []): Vue[] => {
    if (!Array.isArray(ignoreComponentNames)) {
        ignoreComponentNames = [ignoreComponentNames]
    }
    return context.$children.reduce((components: Vue[], child: Vue) => {
        if (child.$options.name === componentName) { components.push(child) }
        return ignoreComponentNames.indexOf((child.$options.name as string)) === -1 ? components.concat(findComponentsDownward(child, componentName)) : components
    }, [])
}

/**
 * 向上查询组件 返回组件数组
 * @param context 组件对象
 * @param componentName 待查询组件名称
 */
export const findComponentsUpward = (context: Vue, componentName: string): Vue[] => {
    const parents: Vue[] = []
    const parent = context.$parent
    if (parent) {
        if (parent.$options.name === componentName) { parents.push(parent) }
        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        return []
    }
}

/**
 * 向上查询组件 返回组件
 * @param context 组件对象
 * @param componentName 待查询组件名称 或者 组件名称数组
 */
export const findComponentUpward = (context: Vue, componentName: string | string[]): Vue => {
    const componentNames: string[] = typeof componentName === 'string' ? [componentName] : componentName
    let parent: Vue = context.$parent
    let name: string | undefined = parent.$options.name

    while (parent && (!name || componentNames.indexOf(name) === -1)) {
        parent = parent.$parent
        if (parent) {
            name = parent.$options.name
        }
    }

    return parent
}

/**
 * 想下查询组件 返回组件
 * @param context 组件对象
 * @param componentName 待查询组件名称
 */
export const findComponentDownward = (context: Vue, componentName: string): Vue | undefined => {
    const childrens: Vue[] = context.$children
    let children: Vue | undefined

    if (childrens.length) {
        for (const child of childrens) {
            const name: string | undefined = child.$options.name
            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) { break }
            }
        }
    }

    return children
}

/**
 * 查找兄弟组件, 返回组件数组
 * @param context 组件对象
 * @param componentName 组件名称
 * @param exceptMe 排除自身
 */
export const findBrothersComponents = (context: Vue, componentName: string, exceptMe: boolean = true): Vue[] => {
    const res: Vue[] = context.$parent.$children.filter((item) => item.$options.name === componentName)
    const index: number = res.findIndex((item) => (item as Vue & { _uid: string})._uid === (context as Vue & { _uid: string })._uid)
    if (exceptMe) { res.splice(index, 1) }
    return res
}

// 节流函数
export const throttle = (fn: Func, delay: number): EventListenerOrEventListenerObject => {
    let now: number
    let lastExec: number
    let timer: number | null

    return function() {
        now = Date.now()

        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        if (lastExec) {
            const diff: number = delay - (now - lastExec)

            if (diff < 0) {
                fn.apply(this, [...arguments])
                lastExec = Date.now()
            } else {
                timer = setTimeout(() => {
                    fn.apply(this, [...arguments])
                    lastExec = Date.now()
                }, diff)
            }
        } else {
            fn.apply(this, [...arguments])
            lastExec = Date.now()
        }
    }
}

// 生成4位数的随机字符
export const randomCharacter = (): string => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

// 添加本地存储
export const addStore = (key: string, value: string): void => localStorage.setItem(key, value)

// 取出本地存储
export const getStore = (key: string): string | null => localStorage.getItem(key)

// 移除本地存储
export const removeStore = (key: string) => localStorage.removeItem(key)

/**
 * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
 */
export const stringFormat = (format: string, args: any[]): string => {
    return format.replace(/\{(\d+)\}/g, (m, n) => args[n] || m)
}
