# 表单标签关联 (Form Labels)

## 规则详情
*   **规则**：所有 `<input>`, `<textarea>`, `<select>` 等表单元素必须有关联的 `<label>`，可以通过 `for` 属性关联 ID，或将 input 包裹在 label 中。

## 示例
**场景**：Sonar 提示 "Form elements should have labels"。

**修复后代码**：
```html
<!-- Compliant: 使用 for 属性关联 -->
<label for="username">用户名</label>
<input type="text" id="username" name="username">

<!-- Compliant: 隐式关联 (Nest) -->
<label>
  密码
  <input type="password" name="password">
</label>
```
