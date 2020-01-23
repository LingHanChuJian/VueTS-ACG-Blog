/**
 * {@link https://github.com/PrismJS/prism/blob/master/components/prism-pug.js}
 */

import { HLJSStatic, IMode } from 'highlight.js'

const IDENT_RE: string = '[A-Za-z0-9\\._:-]+'

const ENTITIES: IMode = {
    className: 'symbol',
    begin: '&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;',
}

const TAG_INTERNALS: IMode = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: 'attr',
        begin: IDENT_RE,
        relevance: 0,
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: 'string',
            endsParent: true,
            variants: [
              {begin: /"/, end: /"/, contains: [ENTITIES]},
              {begin: /'/, end: /'/, contains: [ENTITIES]},
              {begin: /[^\s"'=<>`]+/},
            ],
          },
        ],
      },
    ],
}

export const languagePug = (hljs: HLJSStatic): IMode => {
    return {
        case_insensitive: false,
        aliases: ['jade', 'pug', 'JADE', 'PUG'],
        contains: [
          {
            className: 'tag',
            begin: '<(script)(?=\\s|>)',
            end: '>',
            keywords: {name: 'script'},
            contains: [TAG_INTERNALS],
            starts: {
                end: '\<\/script\>',
                returnEnd: true,
                subLanguage: ['js', 'ts', 'coffee'],
            },
          },
          {
            className: 'tag',
            begin: '<style(?=\\s|>)',
            end: '>',
            keywords: {name: 'style'},
            contains: [TAG_INTERNALS],
            starts: {
                end: '\<\/style\>',
                returnEnd: true,
                subLanguage: ['css', 'stylus', 'scss', 'less', 'stylus-extend'],
            },
          },
          {
            className: 'tag',
            begin: '</?', end: '/?>',
            contains: [
              {
                className: 'name',
                begin: /[^\/><\s]+/,
                relevance: 0,
              },
              TAG_INTERNALS,
            ],
          },
          {
            className: 'tag',
            begin: /^[\t ]*/,
            end: /\s/,
            contains: [
              {
                className: 'name',
                begin: hljs.IDENT_RE,
                relevance: 0,
              },
              {
                className: 'selector-id',
                begin: /#[A-Za-z0-9_-]+/,
                relevance: 0,
              },
              {
                className: 'selector-class',
                begin: /\.[A-Za-z0-9_-]+/,
                relevance: 0,
              },
              {
                className: 'attributes',
                begin: /\(/,
                end: /\)/,
                contains: [
                  TAG_INTERNALS,
                ],
              },
            ],
          },
          {
            className: 'string',
            begin: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
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
          {
              className: 'symbol',
              begin: /[.\-!=|]+/,
          },
        ],
    }
}
