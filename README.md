## 前言
用React搭建了一个属于自己的博客系统，最初目的是为了熟悉React框架，同时也是为了激励自己不断学习。[点击预览](https://wenqiii.github.io/wq-blog/)

## 项目
### 所用技术栈
React + MobX + React Router + Axios + AntDesign + Sass
### TodoList
- [x] markdownIt渲染md
- [x] GitHub Issues作为数据源
- [x] React Router管理路由
- [x] MobX管理数据
- [x] 代码高亮
- [x] 文章目录及点击跳转
- [x] 上滑隐藏头部，下滑显示头部
- [x] 分类
- [x] 每日一诗
- [ ] 回到顶部
- [ ] 使用Hook代替class
- [x] 项目构建优化
- [ ] CSS In Js
- [ ] 后台管理

## 问题记录
- 使用插件markdownNavbar生成的文章目录导航不起作用，查看源码发现是其内部使用到window.scrollTo，而项目中文章详情页固定了高度，以致未生效。
- 开发项目时就在思考项目数据源怎么获得，想自己开发一个后台，又觉得可能要花很长时间，而自己的初衷只是为了练习React，所以最终参考了别人项目的实现方式，采用了GitHub Issues作为数据源。
- 打包项目时发现打包时间有点久，通过引入速度分析插件speed-measure-webpack-plugin以及体积分析插件webpack-bundle-analyzer，发现好几个第三方库体积较大，导致babel-loader花费时间较多，其中highlight.js体积最大，因为它默认是导入了所有的语言，通过按需加载注册需要高亮的语言后，体积减少了246KB，加上通过CDN引入其它几个较大的第三方库后，项目打包时间减少了11s左右。

## 参考链接
- https://juejin.im/post/6844904020859944974
- https://github.com/axuebin/react-blog
- [react-markdown-editor-lite](https://github.com/HarryChen0506/react-markdown-editor-lite/blob/master/docs/configure.zh-CN.md)
- [markdown-it](https://markdown-it.docschina.org/#%E5%AE%89%E8%A3%85)
- [markdown-navbar](https://github.com/parksben/markdown-navbar)
- [highlight.js](https://github.com/highlightjs/highlight.js)
- [GitHub Issues](https://docs.github.com/en/rest/reference/issues#list-repository-issues)
