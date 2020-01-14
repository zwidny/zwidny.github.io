---
layout: markdown
title:  "React VS Vue"
date:   2019-01-31 09:49:47 +0800
categories: Tech:Web:React
---


此文旨在对比React与Vue优略，給众多开发者一个选择的思路。下面将会在一下几个方面对比二者， 对于结论，仁者见仁智者见智。

> * 流行程度
> * 社区贡献/开发维护
> * 学习资源
> * 语法对比
> * 网络观点

## 流行程度

1. 以githua star 为例, 两者可以说不分伯仲  

   ![star.png-19.2kB][1]  

1. 以githua star history为例，vue可以说势头很猛

   ![stat_history.png-48kB][2]  


## 社区贡献/开发维护

+ npm trend 在社区贡献上， 明显React 略胜一筹

   ![npm_trend.png-77.4kB][3]



## 学习资源

以stackoverflow.com trend为例，可以看出相对于vue在学习react时，碰到问题会有更多的参考

   ![stack.svg-21kB][4]


## 语法对比
+ Vue

```html
<div id="app">
  {{ message }}
</div>

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
+ React

```html
<div id="app"></div>

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```
语法对比：vue更倾向于简洁，react更倾向于模块化 

## 网络观点
1. [如果你没有JavaScript基础， Vue是一个很好的起点， 且学习起来很容易。反之的话，React对了你来说， 一定会得心应手.](https://medium.com/unicorn-supplies/angular-vs-react-vs-vue-a-2017-comparison-c5c52d620176)
1. [React VS vue](https://scotch.io/bar-talk/vuejs-and-reactjs-a-quick-comparison)：
  
   + 相对于React, Vue有如下优势
   
      >
       * 更小更快
       * 方便的模板化简化了开发过程
       * 语法更简单
  
   + 相对于Vue, React有如下优势
   
      > 
       * 在开发大型应用上更灵活
       * 容易测试
       * 更多信息和解决方案
       * 还适合移动端开发


  [1]: http://static.zybuluo.com/zwidny/icr4v1fvn2t13pj452etm63t/star.png
  [2]: http://static.zybuluo.com/zwidny/r8qh2g0lifeglazxoco8z3dh/stat_history.png
  [3]: http://static.zybuluo.com/zwidny/ur6qy5flqqy9ts54jvhalb16/npm_trend.png
  [4]: http://static.zybuluo.com/zwidny/23apv9854zz265n4wb3kykdx/stack.svg
