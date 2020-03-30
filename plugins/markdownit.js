// import MarkdownIt from 'markdown-it'
// // const toc1 = require('markdown-it-table-of-contents')
// // const toc2 = require('markdown-it-anchor')

// export default ({ app }, inject) => {
//   const md = new MarkdownIt({
//     injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
//     breaks: true, // 改行コードを<br>に変換する
//     html: true,
//     linkify: true,
//     typography: true
//   })
//   // .use(require('markdown-it-anchor'), {
//   //   permalink: true,
//   //   permalinkBefore: true,
//   //   permalinkSymbol: '§'
//   // })
//   // .use(require('markdown-it-table-of-contents'))
//   md.use(require('markdown-it-anchor')) // Optional, but makes sense as you really want to link to something
//   md.use(require('markdown-it-table-of-contents'))

//   // md.use(require('markdown-it-table-of-contents'))

//   const defaultRender =
//     md.renderer.rules.link_open ||
//     function(tokens, idx, options, env, self) {
//       return self.renderToken(tokens, idx, options)
//     }

//   md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
//     const aIndex = tokens[idx].attrIndex('target')
//     if (tokens[idx].attrs[0][1].match('http')) {
//       if (aIndex < 0) {
//         tokens[idx].attrPush(['target', '_blank'])
//       } else {
//         tokens[idx].attrs[aIndex][1] = '_blank'
//       }
//     }
//     return defaultRender(tokens, idx, options, env, self)
//   }

//   // md.use(toc2)
//   // require('markdown-it-table-of-contents'),
//   // require('markdown-it-anchor')

//   // md.use(require('markdown-it-anchor'))
//   inject('md', md)
// }
