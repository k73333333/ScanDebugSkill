# HTML 语义化结构

## 规则详情
*   **链接文本**：`<a>` 标签必须包含有意义的文本内容，避免仅包含图标或空内容（如果是图标链接，应使用 `aria-label`）。
*   **Doctype**：每个 HTML 文档必须声明 `<!DOCTYPE html>`。
*   **Lang 属性**：`<html>` 标签必须包含 `lang` 属性，声明页面语言（如 `lang="zh-CN"`）。
*   **表格结构**：`<table>` 必须包含 `<caption>` (标题) 或 `summary` 属性（虽已废弃但部分旧标准仍用），以及正确使用 `<thead>`, `<tbody>`, `<tfoot>`。

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
