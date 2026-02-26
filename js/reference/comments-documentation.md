# 注释与文档规范

## 规则详情
*   **语言**：所有注释必须使用 **中文**。
*   **JSDoc**：导出的函数、类、接口必须包含 JSDoc 注释，说明 `@param` (参数)、`@returns` (返回值) 和 `@throws` (异常)。
*   **详细逻辑注释**：
    *   **流程注释**：代码逻辑的每一个关键步骤和流程分支，都必须有详细的中文单行注释 `//` 说明其意图和处理逻辑。
    *   **变量/引入注释**：所有引入的模块 (`import`) 和定义的关键变量 (`const`, `let`)，必须在其上方或右侧添加注释，说明其用途或来源。
*   **非显而易见的修复原因**：对于为了修复 Sonar 问题而做的特殊改动，必须注释说明原因。

## 示例
```javascript
// 引入日期处理工具库
import { format } from 'date-fns';

/**
 * 计算两个日期之间的天数差
 * @description 用于计算合同期限或逾期天数
 * @param {Date} startDate - 开始日期对象
 * @param {Date} endDate - 结束日期对象
 * @returns {number} - 两个日期之间的天数差（绝对值）
 * @throws {Error} - 如果参数不是有效的日期对象抛出异常
 */
function getDaysDiff(startDate, endDate) {
  // 1. 参数校验：检查传入的日期对象是否有效
  if (!startDate || !endDate) {
    // 如果日期无效，返回 0 天
    return 0;
  }
  
  // 2. 获取时间戳：将日期对象转换为毫秒数
  const startObj = startDate.getTime(); // 开始时间毫秒数
  const endObj = endDate.getTime();     // 结束时间毫秒数

  // 3. 计算差值：取绝对值以确保结果为正数
  const diffTime = Math.abs(endObj - startObj);
  
  // 定义一天的毫秒数常量
  const ONE_DAY_MS = 1000 * 60 * 60 * 24; 

  // 4. 转换天数：向上取整，不足一天按一天计算（根据业务需求调整）
  return Math.ceil(diffTime / ONE_DAY_MS);
}
```
