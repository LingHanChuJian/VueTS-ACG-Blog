/**
 * {@link https://github.com/PrismJS/prism/blob/master/components/prism-pug.js}
 */

import { HLJSStatic, IMode } from 'highlight.js'

export const languageVue = (hljs?: HLJSStatic): IMode => {
    return {
        case_insensitive: false,
        aliases: ['jade', 'pug', 'JADE', 'PUG'],
        contains: [
            {
                className: 'selector-id',
                begin: /#[A-Za-z0-9_-]+/,
            },
            {
                className: 'selector-class',
                begin: /.[A-Za-z0-9_-]+/,
            },
            {
                className: 'comment',
                begin: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
                relevance: 0,
            },
            {
                className: 'doctype',
                begin: /((?:^|\n)[\t ]*)doctype(?: .+)?/,
                relevance: 0,
            },
        ],
    }
}
