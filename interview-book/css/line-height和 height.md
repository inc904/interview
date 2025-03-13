# line-height 和 height

[css 行高 line-height 的一些深入理解及应用-张鑫旭](https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)

line-height 是行高的意思，它决定了`元素中文本内容的高度`， height 则是定义`元素自身的高度`。

行高是两行文字基线之间的高度。结构自上而下分别为：

- 顶线（top line）
- 中线（middle line）
- 基线（base line）
- 底线（bottom line）

```html
<p>测试文本高度</p>
<!-- 
 line-height: 20px：
定义 p 标签的行高是 `line-height: 20px;`,元素在浏览器中显示为一行时， 这个 p
标签的高度为 20px， 如果是 两行， 在p 标签的高度时 40px。
 -->

<!--
 height： 20px: 定义 p 标签的
height：20px，那么这个元素的高度不会因为内容的多少而改变，如果为 2 行，
位子的总高度超出了，这个 p 标签的高度也不会随着文本改变。 
-->
```

## 技巧

- 行高等于元素高，可使 但 单行文本 内容垂直居中
- 行高尽量不要大于元素高，行高大于元素高，多个相同元素的结构很容易出现错位，例如 文本内容会自动下移

- 设置高度和浏览器一样高

  ```css
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
  body {
    border: 1px solid red;
  }
  ```

  设置高为 100%，在设置边框，边框是不起作用的。需要把 html 和 body 一起设置为 100%。

## 总结

为什么 div 里有了文字后就会有高度？
不是文字撑开了高度，而是 line-height

```css
.test1 {
  font-size: 20px;
  line-height: 0;
  border: 1px solid red;
}
.test2 {
  font-size: 0;
  line-height: 20px;
  border: 1px solid red;
}
/* 表现为 test1 无高度，test2 有高度 */
```
