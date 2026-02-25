# 图片替代文本 (Image Alt Text)

## 规则详情
*   **规则**：所有 `<img>` 标签必须包含 `alt` 属性。
    *   如果图片仅用于装饰，应设置 `alt=""`。
    *   如果图片包含信息，应提供有意义的描述文本。

## 示例
**场景**：Sonar 提示 "<img> elements should have an 'alt' attribute"。

**修复后代码**：
```html
<!-- Compliant: 装饰性图片，alt 为空 -->
<img src="bg-pattern.png" alt="">

<!-- Compliant: 信息性图片，提供描述 -->
<img src="logo.png" alt="公司 Logo">
```
