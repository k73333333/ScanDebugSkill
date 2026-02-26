# 安全合规规范 (Security)

## 规则详情
*   **XSS 防范**：
    *   严禁使用 `eval()`、`new Function()`。
    *   慎用 `v-html` (Vue) 或 `dangerouslySetInnerHTML` (React)，必须确保内容已经过 DOMPurify 等库的清洗。
*   **敏感信息**：代码中禁止硬编码密码、Token、密钥（AK/SK）、内网 IP 等敏感信息，应通过环境变量或配置接口获取。
*   **日志安全**：
    *   禁止在生产环境日志中输出敏感信息（如密码、Token 等）。
    *   **变量命名**：若变量名无明确语义化（如 `data`, `info`, `res`），视为潜在敏感信息禁止直接打印。
    *   **异常捕获**：**严禁直接打印 `error.stack` 或完整的 `error` 对象**。如无法确定 `error` 结构则不打印 `error`，必须按照 **模块名 + 方法名 + 错误简述** 的格式输出，防止堆栈信息泄露系统内部结构。
*   **链接安全**：使用 `target="_blank"` 打开外部链接时，必须添加 `rel="noopener noreferrer"` 以防止钓鱼攻击。
*   **正则安全**：确保正则表达式不会导致拒绝服务攻击 (ReDoS)。

## 示例：敏感信息处理

**场景**：Sonar 提示 "Hardcoded passwords/tokens/keys should not be used"。

**修复后代码**：
```javascript
// Non-Compliant: 硬编码敏感信息
// const API_KEY = "sk-123456789";

// Compliant: 使用环境变量
// 说明：确保环境变量在构建或运行时已正确注入
const API_KEY = process.env.VUE_APP_API_KEY;
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
    // Non-Compliant (敏感数据): console.log(`Attempting login for ${username} with password ${password}`);
    // Non-Compliant (非语义化变量): console.log('Login info:', info); // info 语义不明确，可能包含敏感字段
    console.log(`Attempting login for user: ${username}`); // Compliant: 仅记录明确的非敏感标识

    await authService.login(username, password);
    
  } catch (error) {
    // 2. 异常捕获禁止泄露堆栈
    // Non-Compliant: console.error(error); 或 console.error(error.stack);
    
    // Compliant: 仅记录错误来源，不包含详细堆栈
    // 格式要求：模块名 + 方法名 + 错误简述
    console.error('LoginService: handleLogin 方法报错/接口请求失败');
  }
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
