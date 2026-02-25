# 安全合规规范 (Security)

## 规则详情
*   **XSS 防范**：
    *   严禁使用 `eval()`、`new Function()`。
    *   慎用 `v-html` (Vue) 或 `dangerouslySetInnerHTML` (React)，必须确保内容已经过 DOMPurify 等库的清洗。
*   **敏感信息**：代码中禁止硬编码密码、Token、密钥（AK/SK）、内网 IP 等敏感信息，应通过环境变量或配置接口获取。
*   **链接安全**：使用 `target="_blank"` 打开外部链接时，必须添加 `rel="noopener noreferrer"` 以防止钓鱼攻击。
*   **禁止打印敏感堆栈**：在 `.catch()` 中禁止直接打印整个 Error 对象。

## 示例：禁止打印敏感堆栈

**场景**：Sonar 提示 "Define and throw a dedicated exception instead of using a generic one" 或敏感日志泄露。

**修复后代码**：
```javascript
try {
  await getUserInfo();
} catch (error) {
  // Compliant: 仅打印必要的错误摘要，隐藏堆栈详情
  console.error('获取用户信息失败:', error.message || '未知错误');
  
  // 可选：上报监控系统
  // logger.report(error);
}
```
