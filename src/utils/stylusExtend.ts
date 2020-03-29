/**
 * {@link https://github.com/PrismJS/prism/blob/master/components/prism-stylus.js}
 */

import { HLJSStatic, IMode } from 'highlight.js'

export const languageStylusExtend = (hljs: HLJSStatic): IMode => {
    const HEX_COLOR: IMode = {
        className: 'number',
        begin: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})',
    }

    const VARIABLE: IMode = {
        className: 'variable',
        begin: '\\$' + hljs.IDENT_RE,
    }

    const LOOKAHEAD_TAG_END: string = '(?=[\\.\\s\\n\\[\\:,])'

    const FUNCTION: IMode = {
        className: 'function',
        begin: /[\w-]+\([^)]*\).*/,
        illegal: '[\\n]',
        returnBegin: true,
        contains: [
            {
                className: 'title',
                begin: '\\b[a-zA-Z][a-zA-Z0-9_\-]*',
            },
            {
                className: 'params',
                begin: /\(/,
                end: /\)/,
                contains: [
                    HEX_COLOR,
                    VARIABLE,
                    hljs.APOS_STRING_MODE,
                    hljs.CSS_NUMBER_MODE,
                    hljs.NUMBER_MODE,
                    hljs.QUOTE_STRING_MODE,
                ],
            },
        ],
    }

    return {
        case_insensitive: false,
        aliases: ['stylus-extend'],
        contains: [
            {
                className: 'selector-class',
                begin: '\\.[a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
            },
            {
                className: 'selector-id',
                begin: '\\#[a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
            },
            {
                className: 'comment',
                begin: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
            },
            {
                className: 'selector-tag',
                begin: /^[\t ]*/,
                end: /\s/,
                contains: [
                    FUNCTION,
                    {
                        className: 'attribute',
                        begin: '[a-zA-Z0-9_-]+',
                    },
                    {
                        className: 'selector-class',
                        begin: '\\.[a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
                    },
                    {
                        className: 'selector-id',
                        begin: '\\#[a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
                    },
                ],
            },
            FUNCTION,
        ],
    }
}
