# 字体族回退 (Font Family Fallback)

## 规则详情
*   **规则**：在定义 `font` 或 `font-family` 时，必须在末尾指定一个通用字体族，**优先使用 `sans-serif`**（除非业务明确要求使用 `serif` 或 `monospace`），以防止特定字体不可用时浏览器回退到默认字体导致样式崩坏。

## 示例
**场景**：Sonar 提示 "font-family" 缺少通用字体族声明。

**修复后代码**：
```css
body {
  /* Compliant: 末尾添加 sans-serif 作为通用回退字体 */
  font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
}
```
