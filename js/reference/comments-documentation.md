# 注释与文档规范

## 规则详情
*   **语言**：所有注释必须使用 **中文**。
*   **JSDoc**：导出的函数、类、接口必须包含 JSDoc 注释，说明 `@param` (参数)、`@returns` (返回值) 和 `@throws` (异常)。
*   **逻辑解释**：关键的业务逻辑判断、复杂的正则表达式、非显而易见的修复原因，需在代码上方添加单行注释 `//`。

## 示例
```javascript
/**
 * 计算两个日期之间的天数差
 * @param {Date} startDate - 开始日期
 * @param {Date} endDate - 结束日期
 * @returns {number} - 天数差（绝对值）
 */
function getDaysDiff(startDate, endDate) {
  // 校验参数是否有效
  if (!startDate || !endDate) return 0;
  
  // ...
}
```
