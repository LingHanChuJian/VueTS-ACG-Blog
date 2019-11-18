import { ObjectType } from '@/types/utils'
import { Vue } from 'vue-property-decorator'

// 判断元素是否在数组中
export const oneOf = (value: any, validList: any[]): boolean => {
    return validList.indexOf(value) > -1
}

// 判断对象类型
export const typeOf = (value: any): string => {
    const toString: () => string = Object.prototype.toString
    const map: ObjectType = {
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

    switch (dataType) {
        case 'array':
            const array: any[] = []
            for (let i = 0, len = (data as any[]).length; i < len; i++) {
                array.push(deepCopy(data))
            }
            return array
        case 'object':
            const objects: ObjectType = {}
            const objectsName: string[] = Object.keys(data as ObjectType)
            for (let n = 0, nLen = objectsName.length; n < nLen; n++) {
                objects[objectsName[n]] = deepCopy((data as ObjectType).objectsName[n])
            }
            return objects
        default:
            return data
    }
}

/**
 * 向下查询组件
 * @param context 组件对象
 * @param componentName 组件名称
 * @param ignoreComponentNames 忽略组件名称集合
 */
export const findComponentsDownward = (context: Vue, componentName: string, ignoreComponentNames: string | string[] = []): Vue[] => {
    if (!Array.isArray(ignoreComponentNames)) {
        ignoreComponentNames = [ignoreComponentNames]
    }
    return context.$children.reduce((components: any[], child: Vue) => {
        if (child.$options.name === componentName) { components.push(child) }
        if (ignoreComponentNames.indexOf((child.$options.name as string)) < 0) {
            const foundChilds: Vue[] = findComponentsDownward(child, componentName);
            return components.concat(foundChilds)
        } else {
            return components
        }
    }, [])
}

/**
 * 向上查询组件
 * @param context 组件对象
 * @param componentName 组件名称
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
