/**
 * {@link https://github.com/planetary/pug-highlight.js/blob/master/lib/languages/pug.js}
 * {@link https://github.com/ztmd/highlight-pug/blob/master/pug.js}
 */

import { HLJSStatic, IMode } from 'highlight.js'

const TAG_SELECTORS = 'abbr|acronym|address|area|article|aside|audio|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video'
const PARAM_ONLY_SELECTORS = 'a|input'
const CUSTOM_TAG_SELECTORS = 'template|Layout|Header|Content|Footer'

export const languageVue = (hljs?: HLJSStatic): IMode => {
    return {
        case_insensitive: false,
        aliases: ['jade', 'pug', 'JADE', 'PUG'],
        keywords: {
          keyword: 'define if else unless each for in elseif var const let while do import include block extends switch case when default break continue until append prepend',
        },
        contains: [
          {
            className: 'id',
            begin: '\\#[A-Za-z0-9_-]+',
            relevance: 0,
          },
          {
            className: 'class',
            begin: '\\.[A-Za-z0-9_-]+',
            relevance: 0,
          },
          {
            className: 'string',
            begin: '`', end: '`',
            illegal: '\\n',
            contains: hljs ? [hljs.BACKSLASH_ESCAPE] : [],
          },
          {
            className: 'variable',
            relevance: 0,
            variants: [
              {
                begin: '\\#{', end: '\\}',
                excludeBegin: true,
                excludeEnd: true,
              },
              {
                begin: '\\${', end: '\\}',
                excludeBegin: true,
                excludeEnd: true,
              },
            ],
          },
          {
            className: 'attr',
            begin: '&attributes',
            relevance: 0,
          },
          {
            className: 'selector-with-params',
            begin: '\\b(' + PARAM_ONLY_SELECTORS + '|' + TAG_SELECTORS + '|' + CUSTOM_TAG_SELECTORS + ')\\b\\(', end: '\\)',
            relevance: 0,
            contains: [
              {
                className: 'param-type',
                begin: '\\b(href|type|placeholder|data-json|name|checked|class|click|escaped|unescaped)\\b',
              },
              {
                className: 'param-def',
                variants: [
                  {
                    begin: /'/, end: /'/,
                  },
                  {
                    begin: /"/, end: /"/,
                  },
                  {
                    begin: /`/, end: /`/,
                  },
                ],
              },
              {
                className: 'param-split',
                variants: [
                  {
                    begin: /=/,
                  },
                  {
                    begin: /,/,
                  },
                  {
                    begin: /:/,
                  },
                  {
                    begin: '\\?',
                  },
                ],
              },
            ],
          },
          {
            className: 'selector-tag',
            begin: '\\b(' + TAG_SELECTORS + '|' + PARAM_ONLY_SELECTORS + '|' + CUSTOM_TAG_SELECTORS + ')\\b',
          },
          {
            className: 'comment',
            begin: /\/\/-?.*/,
          },
          {
            className: 'symbol',
            begin: /[=,:?!]|\.($|\n)/,
          },
        ],
    }
}
