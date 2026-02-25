# 注释与文档规范

## 规则详情
*   **语言**：所有注释必须使用 **中文**。
*   **复杂逻辑**：对于使用了复杂 CSS Hack 或特定浏览器兼容性写法的样式，必须在上方添加注释说明原因。

## 示例
```css
/* 针对 IE11 的 Flexbox 兼容性修复 */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .container {
    display: block; 
  }
}
```
