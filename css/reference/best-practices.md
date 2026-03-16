# CSS 通用最佳实践

## 规则详情
*   **ID 选择器**：尽量避免使用 ID 选择器定义样式（高优先级难以覆盖），推荐使用 Class 选择器。
*   **!important**：慎用 `!important`，除非用于覆盖内联样式或第三方库样式，且需添加注释说明。
*   **单位统一**：
    *   当值为 `0` 时，省略单位（如 `0px` -> `0`）。
    *   避免使用绝对单位（如 `cm`, `in`），除非在打印样式表中。
*   **命名规范**：推荐使用 **BEM (Block Element Modifier)** 命名规则，提高样式的可维护性和复用性。
    *   Block: `.block`
    *   Element: `.block__element`
    *   Modifier: `.block--modifier`

## 示例：BEM 命名规范
**场景**：样式类名杂乱，层级嵌套过深，难以维护。

**修复后代码**：
```css
/* Non-Compliant: 嵌套过深，命名无结构 */
.list .item .active { ... }

/* Compliant: BEM 命名 */
.user-list { }                 /* Block */
.user-list__item { }           /* Element */
.user-list__item--active { }   /* Modifier */
```

## 示例：省略零值单位
**场景**：Sonar 提示 "Unexpected unit"。

**修复后代码**：
```css
div {
  /* Compliant: 0 不需要单位 */
  margin: 0;
  padding: 10px;
}
```
