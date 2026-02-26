# HTML 语义化结构

## 规则详情
*   **链接文本**：`<a>` 标签必须包含有意义的文本内容，避免仅包含图标或空内容（如果是图标链接，应使用 `aria-label`）。
*   **Doctype**：每个 HTML 文档必须声明 `<!DOCTYPE html>`。
*   **Lang 属性**：`<html>` 标签必须包含 `lang` 属性，声明页面语言（如 `lang="zh-CN"`）。
*   **表格结构**：`<table>` 必须包含 `<caption>` (标题) 或 `summary` 属性（虽已废弃但部分旧标准仍用），以及正确使用 `<thead>`, `<tbody>`, `<tfoot>`。
*   **标签嵌套**：严禁错误的标签嵌套，例如：
    *   `<a>` 标签内禁止嵌套其他交互元素（如 `<button>`, `<input>`, `<a>`）。
    *   `<p>` 标签内禁止嵌套块级元素（如 `<div>`, `<h1>`, `<ul>`）。
    *   `<ul>`/`<ol>` 的直接子元素必须是 `<li>`。

## 示例：链接文本为空
**场景**：Sonar 提示 "Links must have discernible text"。

**修复后代码**：
```html
<!-- Compliant: 提供文本内容 -->
<a href="/home">返回首页</a>

<!-- Compliant: 图标链接使用 aria-label -->
<a href="/settings" aria-label="设置">
  <i class="icon-settings"></i>
</a>
```

## 示例：标签错误嵌套
**场景**：Sonar 提示 "The element 'button' must not appear as a descendant of the 'a' element" 或 "The element 'div' must not appear as a descendant of the 'p' element"。

**修复后代码**：
```html
<!-- Non-Compliant: a 标签嵌套 button (非法交互元素嵌套) -->
<!-- <a href="/login"><button>登录</button></a> -->

<!-- Compliant: 使用样式将 a 标签伪装成按钮，或使用 JS 跳转 -->
<a href="/login" class="btn">登录</a>

<!-- Non-Compliant: p 标签嵌套 div (非法块级元素嵌套) -->
<!-- <p>这是一个段落 <div>错误嵌套</div></p> -->

<!-- Compliant: 将外层 p 改为 div -->
<div>这是一个段落 <div>正确嵌套</div></div>
```
