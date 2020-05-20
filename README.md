# myrove

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

    |-- Vue-ACG-Blog
        |-- .browserslistrc
        |-- .env.development    开发环境变量
        |-- .env.production     生产环境变量
        |-- .gitignore
        |-- babel.config.js
        |-- package.json
        |-- postcss.config.js
        |-- README.md
        |-- tsconfig.json
        |-- tslint.json
        |-- vue.config.js       vue config
        |-- yarn.lock
        |-- public
        |   |-- favicon.ico
        |   |-- index.html
        |-- src
        |   |-- App.vue
        |   |-- config.ts       常用数据配置 比如 菜单 等等
        |   |-- main.ts         入口 main
        |   |-- message.d.ts    全局消息定义
        |   |-- router.ts       路由
        |   |-- shims-tsx.d.ts
        |   |-- shims-vue.d.ts
        |   |-- api
        |   |   |-- index.ts
        |   |-- assets
        |   |   |-- css
        |   |   |   |-- anchor.styl    描点样式
        |   |   |   |-- default.styl   默认样式
        |   |   |   |-- example.styl   栗子样式
        |   |   |   |-- icon.styl      图标样式
        |   |   |   |-- layout.styl    布局样式
        |   |   |   |-- loader.styl    预加载样式
        |   |   |   |-- markdown.styl  markdown 样式
        |   |   |   |-- menu.styl      菜单样式
        |   |   |   |-- message.styl   消息样式
        |   |   |   |-- nav.styl       导航样式
        |   |   |   |-- poptip.styl    提示样式
        |   |   |   |-- reset.styl     样式汇总 或者 重定义某些样式
        |   |   |   |-- table.styl     表格样式
        |   |   |-- fonts
        |   |   |   |-- icon-brands-400.eot
        |   |   |   |-- icon-brands-400.svg
        |   |   |   |-- icon-brands-400.ttf
        |   |   |   |-- icon-brands-400.woff
        |   |   |   |-- icon-brands-400.woff2
        |   |   |   |-- icon-regular-400.eot
        |   |   |   |-- icon-regular-400.svg
        |   |   |   |-- icon-regular-400.ttf
        |   |   |   |-- icon-regular-400.woff
        |   |   |   |-- icon-regular-400.woff2
        |   |   |   |-- icon-solid-900.eot
        |   |   |   |-- icon-solid-900.svg
        |   |   |   |-- icon-solid-900.ttf
        |   |   |   |-- icon-solid-900.woff
        |   |   |   |-- icon-solid-900.woff2
        |   |   |-- images
        |   |       |-- author.jpg
        |   |       |-- back.png
        |   |       |-- dot.png
        |   |       |-- front.png
        |   |       |-- grid.png
        |   |       |-- handup_199px.png
        |   |       |-- loli.gif
        |   |       |-- mb_scroll.png
        |   |       |-- scroll.png
        |   |-- components
        |   |   |-- AcgFooter.vue              footer 底部组件
        |   |   |-- Archives.vue               文章卡片组件
        |   |   |-- Comments.vue               评论组件
        |   |   |-- GoTop.vue                  回到顶部组件
        |   |   |-- Recommend.vue              推荐组件
        |   |   |-- Surprise.vue               惊喜组件
        |   |   |-- acg-header      
        |   |   |   |-- AcgHeader.vue          header 组件
        |   |   |   |-- index.ts
        |   |   |   |-- Player.vue             APlayer组件
        |   |   |-- anchor
        |   |   |   |-- Anchor.vue             锚点组件
        |   |   |   |-- index.ts
        |   |   |-- base
        |   |   |   |-- collapseTransition.ts  展开动画效果
        |   |   |   |-- expand.ts              render 扩展
        |   |   |-- directives    
        |   |   |   |-- scroll.ts              滚动到底部加载指令
        |   |   |   |-- transfer.ts            脱离文档流指令
        |   |   |-- example
        |   |   |   |-- Block.vue              展示栗子代码组件
        |   |   |   |-- Example.vue            展示效果组件
        |   |   |   |-- index.ts
        |   |   |-- icon
        |   |   |   |-- Icon.vue               图标组件
        |   |   |   |-- index.ts
        |   |   |-- layout
        |   |   |   |-- Content.vue            内容布局组件
        |   |   |   |-- Drawer.vue             侧边栏布局组件
        |   |   |   |-- Footer.vue             底部布局组件
        |   |   |   |-- Header.vue             头部布局组件
        |   |   |   |-- index.ts              
        |   |   |   |-- Layout.vue             布局组件
        |   |   |-- live2d
        |   |   |   |-- index.ts
        |   |   |   |-- Live2d.vue             live2d 组件
        |   |   |-- menu
        |   |   |   |-- DropDown.vue           菜单展开动画组件
        |   |   |   |-- index.ts 
        |   |   |   |-- Menu.vue               菜单组件
        |   |   |   |-- MenuItem.vue           菜单项组件
        |   |   |   |-- SubMenu.vue            多级菜单组件
        |   |   |-- message
        |   |   |   |-- index.ts
        |   |   |   |-- Message.vue            消息组件
        |   |   |   |-- Notification.vue       消息管理组件
        |   |   |-- mixins
        |   |   |   |-- adaptive.ts            自适应混入
        |   |   |   |-- emitter.ts             广播混入     
        |   |   |   |-- link.ts                router-link混入
        |   |   |   |-- menu.ts                菜单混入
        |   |   |   |-- scroll.ts              滚动混入
        |   |   |   |-- uuid.ts                uuid混入
        |   |   |-- nav
        |   |   |   |-- index.ts
        |   |   |   |-- Info.vue               Information 子组件
        |   |   |   |-- Information.vue        首页信息展示
        |   |   |   |-- Logo.vue               logo
        |   |   |   |-- Nav.vue                导航条子组件
        |   |   |   |-- NavBar.vue             导航条
        |   |   |   |-- NavBarMobile.vue       手机导航条
        |   |   |   |-- NavDrawer.vue          手机导航条
        |   |   |   |-- NavIcon.vue            导航Icon封装
        |   |   |   |-- NavSearch.vue          导航搜索
        |   |   |-- poptip
        |   |   |   |-- index.ts
        |   |   |   |-- Poptip.vue             提示组件
        |   |   |-- table
        |   |       |-- index.ts
        |   |       |-- Table.vue              表格组件
        |   |       |-- Tbody.vue              表格子组件
        |   |       |-- Thead.vue              表格子组件
        |   |-- docs
        |   |   |-- IconDoc.vue                图标文档
        |   |   |-- Index.vue
        |   |   |-- LayoutDoc.vue              布局文档
        |   |   |-- MenuDoc.vue                菜单文档
        |   |   |-- MessageDoc.vue             消息文档
        |   |   |-- PoptipDoc.vue              提示文档
        |   |-- store
        |   |   |-- index.ts
        |   |-- types
        |   |   |-- components.d.ts            组件定义
        |   |   |-- utils.d.ts                 资源定义
        |   |-- utils
        |   |   |-- assist.ts                  杂七杂八的方法
        |   |   |-- dom.ts                     dom有关操作
        |   |   |-- index.ts
        |   |   |-- lineNumber.ts              markdown代码行数展示
        |   |   |-- markdown.ts                markdown代码处理
        |   |   |-- pug.ts                     pug 高亮扩展
        |   |   |-- stylusExtend.ts            stylus 高亮扩展
        |   |-- views
        |       |-- 404.vue                    404 页面
        |       |-- Archives.vue               归档页面
        |       |-- Article.vue                文章页面
        |       |-- Categories.vue             分类页面
        |       |-- Home.vue                   首页
        |       |-- Index.vue                  页面入口
        |       |-- Search.vue                 搜索页面
        |       |-- Tag.vue                    标签页面
        |-- types
            |-- dplayer.d.ts                   dplayer 全局定义
            |-- highlight.js.d.ts              highlight 全局定义
            |-- v-click-outside-x.d.ts         v-click-outside-x 全局定义
