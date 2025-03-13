## 1.BFC 概念

块格式化上下文(Block Formatting Context,BFC) 是 Web 页面的可视化 css 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。(在 BFC 内部.块级元素的布局、浮动元素与其他元素的相互作用，会受到 BFC 规则的影响)

- BFC(block formatting context)块级格式化上下文，他是页面中的一块渲染区域，并且有一套属于自己的渲染规则，他决定了元素如何对齐内容进行布局，以及与其他元素的关系和相互作用。当涉及到可视化布局的时候，BFC 提供了一个环境，HTML 元素在这个环境中按照一定规则进行布局;

- BFC 是一个独立的布局环境，具有 BFC 特性的元素可以看作是隔离的独立容器，容器里面的元素不会在布局上影响到外面的元素。

> BFC(Block Formatting Context)是 Web 页面中的一个独立渲染区域，具有自己的渲染规则，会影响元素的布局方式并隔离元素。主要的作用就是解决布局问题。

- BFC 是一个独立的布局环境，BFC 内部的元素与外部的元素互不影响

## BFC 的布局规则

1. 内部的 box 会在垂直方向上一个接着一个的放置
2. 垂直距离由 margin 决定，相邻 box 的 margin 会重叠
3. 计算 BFC 高度的时候，浮动元素也会参与

## 触发 BFC 的方式

1. float 不是 none
2. position 为 absolute 或 fixed
3. overflow: hidden | auto | scroll
4. display: inline-block | table
5. flex 容器
6. grid 容器

## 应用

1. 清除浮动
   通过给父元素创建 BFC， 使得它包含浮动资源素，从而避免 高度塌陷
   ```css
   <!-- 给父元素加 class clearfix -- > .clearfix:after {
     content: '';
     display: block;
     clear: both;
     height: 0;
     visibility: hidden;
   }
   .clearfix {
     *zoom: 1;
   }
   ```
2. 防止外边距合并，通过给元素创建 BFC，可以避免与相邻元素的垂直外边距合并。

3. 实现多栏布局： 利用 BFC 不与浮动元素重叠的特性，实现自适应的多栏布局。

- 非浮动元素被浮动元素覆盖

4. BFC 内部元素的 margin 不会重叠
5. BFC 顶部元素的 margin-top 不会与自身的 margin-top 重叠
   margin 溢出问题：
   - border
   - overflow
   - BFC
