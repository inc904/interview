```less
@number: 100px; // 使用 @ 定义变量
@h: height; // 插值
.box {
  width: @number;
  @{h}: @number;
}
```

```scss
$number: 100px; // 使用 $ 定义变量
$h: height;
@function sum($a, $b) {
  @return $a + $b;
}
.box {
  width: $number;
  #{$h}: $number; // 插值
  margin: sum(1px, 2px);
}
```
