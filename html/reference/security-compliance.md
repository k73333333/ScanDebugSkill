# 安全合规规范 (Security)

## 规则详情
*   **外链安全**：`<a>` 标签使用 `target="_blank"` 时，必须添加 `rel="noopener noreferrer"`。
*   **内联事件**：避免使用内联 JS 事件（如 `onclick="..."`），应通过脚本绑定事件。

## 示例：外链安全
**场景**：Sonar 提示 "Links with target='_blank' should have rel='noopener noreferrer'"。

**修复后代码**：
```html
<!-- Compliant: 防止新窗口通过 window.opener 访问原页面 -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  外部链接
</a>
```
