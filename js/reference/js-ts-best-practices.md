# JS/TS 通用最佳实践

## 规则详情
*   **强类型判断**：始终使用 `===` 和 `!==` 代替 `==` 和 `!=`，避免隐式类型转换带来的 Bug。
*   **变量声明**：优先使用 `const`，其次使用 `let`，**严禁使用 `var`**。
*   **认知复杂度 (Cognitive Complexity)**：当 Sonar 提示函数复杂度过高（通常 > 15）时，必须将逻辑拆分为多个职责单一的子函数。
*   **魔法数字 (Magic Numbers)**：避免直接使用无意义的数字（0 和 1 除外），应将其定义为具名常量。
*   **异步处理**：
    *   优先使用 `async/await`。
    *   所有 Promise 链必须以 `.catch()` 结束，或在 `try...catch` 块中处理错误。
*   **冗余条件判断**：当 `if` 和 `else` 分支执行逻辑完全一致时，应移除条件判断，直接执行公共逻辑。

## 示例：认知复杂度与魔法数字

**场景**：Sonar 提示 "Refactor this function to reduce its Cognitive Complexity" 及 "Replace this constant value 86400000 with a name"。

**修复后代码**：
```javascript
// 定义常量，消除魔法数字
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 检查日期是否在明天之后
 * @param {Date} date - 待检查的日期对象
 * @returns {boolean} - 如果日期有效且在一天之后，返回 true
 */
function isDateFuture(date) {
  // 1. 参数校验：确保日期对象存在
  if (!date) {
    return false;
  }

  // 2. 逻辑判断：计算时间差
  const thresholdTime = Date.now() + ONE_DAY_MS;
  
  // 3. 返回结果：判断是否超过阈值
  return date.getTime() > thresholdTime;
}
```

## 示例：冗余条件判断

**场景**：Sonar 提示 "This 'if' block is equivalent to the 'else' block"，即 `if` 和 `else` 分支执行了完全相同的逻辑。

**修复后代码**：
```javascript
/**
 * 处理页面跳转
 * @description 无论用户是否登录，点击该按钮都跳转到首页
 */
function handleRedirect() {
  // Compliant: 移除冗余的条件判断
  // 修复前：
  // if (isLoggedIn) {
  //   navigateTo('/home');
  // } else {
  //   navigateTo('/home');
  // }

  // 修复后：直接执行通用逻辑
  navigateTo('/home');
}
```
