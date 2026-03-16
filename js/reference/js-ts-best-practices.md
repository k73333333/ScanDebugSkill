# JS/TS 通用最佳实践

## 规则详情
*   **模块化与组织 (Class-based)**：
    *   优先使用 ES6 Class 语法进行模块化组织，特别是 API 请求封装。
    *   通过继承 (`extends`) 实现常量和通用逻辑的复用。
*   **异步处理 (Async/Await)**：
    *   统一采用 `Promise` / `async/await` 进行异步处理。
    *   **强制捕获异常**：所有 Promise 调用必须追加 `.catch()` 方法或包裹在 `try...catch` 中。
    *   **异常处理规范**：
        *   **严禁空 Catch**：`catch` 块或 `.catch()` 回调中必须包含处理逻辑，禁止留空。
        *   **安全打印**：遵循 [安全合规规范 - 日志安全](security-compliance.md) 要求，严禁打印堆栈信息。
*   **日志与异常 (Logging)**：
    *   **分级打印**：建议根据场景正确使用 `console.error()` (错误), `console.warn()` (警告), `console.info()` (信息)。
    *   **异常输出**：避免打印冗余的堆栈详情 (`error.stack`)，仅输出关键信息（如 `***方法报错/接口请求失败`）。
*   **强类型判断**：始终使用 `===` 和 `!==` 代替 `==` 和 `!=`，避免隐式类型转换带来的 Bug。
*   **变量声明**：优先使用 `const`，其次使用 `let`，**严禁使用 `var`**。
*   **认知复杂度 (Cognitive Complexity)**：当 Sonar 提示函数复杂度过高（通常 > 15）时，须逻辑拆分为多个职责单一的子函数（此为建议非强制）。
*   **魔法数字 (Magic Numbers)**：避免直接使用无意义的数字（0 和 1 除外），应将其定义为具名常量。
*   **冗余条件判断**：当 `if` 和 `else` 分支执行逻辑完全一致时，应移除条件判断，直接执行公共逻辑。
*   **空值检查 (Null Safety)**：在访问对象的深层属性前，必须进行非空检查，推荐使用可选链操作符 (`?.`) 和空值合并操作符 (`??`)，避免 "Cannot read property of undefined" 错误。
*   **性能优化**：
    *   **正则表达式预编译**：避免在循环内创建 `RegExp` 实例，应提取到循环外部或模块作用域。
    *   **避免嵌套循环**：3 层以上的嵌套循环（O(n³)）必须优化，建议使用 `flatMap` 或 Map 索引。
    *   **字符串拼接**：循环内避免使用 `+=` 拼接大量字符串，应使用数组 `push` 后 `join`。
*   **异常处理**：
    *   **禁止 Finally Return**：`finally` 块中严禁使用 `return`，否则会覆盖 `try/catch` 中的异常抛出。
    *   **流程控制**：禁止使用异常（try-catch）来处理正常的业务流程控制（如判断 JSON 格式，应先用正则预判）。
*   **状态管理**：
    *   **状态回滚**：前端乐观更新（Optimistic UI）时，若请求失败必须回滚状态。
    *   **避免全局锁**：避免使用单一的全局 `loading` 状态控制并发请求，应使用独立的 loading 变量。

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

## 示例：空指针异常修复

**场景**：代码运行时抛出 "TypeError: Cannot read property 'name' of undefined"，或 Sonar 提示可能存在空指针访问风险。

**修复后代码**：
```javascript
/**
 * 获取用户显示名称
 * @param {Object} user - 用户对象
 * @returns {string} - 用户名称或默认值
 */
function getUserDisplayName(user) {
  // Non-Compliant: 如果 user 或 user.profile 为空，将导致程序崩溃
  // return user.profile.name;

  // Compliant: 使用可选链 (?.) 安全访问，并提供默认值 (??)
  return user?.profile?.name ?? '未知用户';
}

/**
 * 处理订单列表
 * @param {Array} orders - 订单数组
 */
function processOrders(orders) {
  // Compliant: 确保 orders 存在且为数组后再进行遍历
  if (Array.isArray(orders) && orders.length > 0) {
    orders.forEach(order => {
      console.log(`订单ID: ${order?.id}`);
    });
  }
}
```

## 示例：性能优化与异常处理

**场景**：Sonar 提示 "Regular expressions should not be created in a loop" 或 "Jump statements should not occur in finally blocks"。

**修复后代码**：
```javascript
// 1. 正则预编译
// Non-Compliant: 循环内重复创建正则
// items.forEach(item => { if (new RegExp('^\\d{4}').test(item)) ... })

// Compliant: 提取为常量
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
items.forEach(item => {
  if (DATE_PATTERN.test(item.date)) { /* ... */ }
});

// 2. 字符串拼接优化
// Non-Compliant: 使用 += 拼接
// let html = ""; list.forEach(i => html += `<li>${i}</li>`);

// Compliant: 使用 Array.join
const html = list.map(i => `<li>${i}</li>`).join("");

// 3. 禁止 Finally Return
async function submitData() {
  try {
    await api.post('/submit');
  } catch (error) {
    console.error('提交失败', error);
    return Promise.reject(error);
  } finally {
    // Non-Compliant: return true; // 这会吞掉上面的 reject
    
    // Compliant: 仅做清理工作
    this.loading = false;
  }
}
```
