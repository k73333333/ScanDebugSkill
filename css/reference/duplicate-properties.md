# 重复属性 (Duplicate Properties)

## 规则详情
*   **规则**：避免在同一选择器块中重复定义相同的属性（除非用于浏览器兼容性 fallback）。重复的属性只有最后一次声明生效，多余的声明应被移除。

## 示例
**场景**：Sonar 提示 "Duplicate property names" (重复的属性名)。

**修复后代码**：
```css
a {
  color: pink;
  /* Compliant: 移除了重复定义的 color: orange */
  background: orange;
}
```
