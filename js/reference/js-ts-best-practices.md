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
*   **日志安全**：禁止在生产环境日志中输出敏感信息（如密码、Token 等）；异常捕获时仅记录错误来源或通用提示，**严禁直接打印 `error.stack` 或完整的 `error` 对象**，防止堆栈信息泄露系统内部结构。

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

## 示例：正则表达式安全 (ReDoS)

**场景**：Sonar 提示 "Make sure the regex used here... cannot lead to denial of service"。

**修复后代码**：
```javascript
// Compliant: 优化正则结构，避免嵌套量词，防止 ReDoS 攻击
// 说明：匹配一个或多个 'a' 后跟一个 'b'
const regex = /a+b/;
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

## 示例：日志安全与异常处理

**场景**：Sonar/安全扫描提示 "User credentials should not be printed" 或 "Stack traces should not be disclosed"。

**修复后代码**：
```javascript
/**
 * 处理用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 */
async function handleLogin(username, password) {
  try {
    // 1. 敏感信息禁止打印
    // Non-Compliant: console.log(`Attempting login for ${username} with password ${password}`);
    console.log(`Attempting login for user: ${username}`); // Compliant: 仅记录非敏感标识

    await authService.login(username, password);
    
  } catch (error) {
    // 2. 异常捕获禁止泄露堆栈
    // Non-Compliant: console.error(error); 或 console.error(error.stack);
    
    // Compliant: 仅记录错误来源，不包含详细堆栈
    console.error('LoginService: 用户登录请求失败');
  }
}
```
