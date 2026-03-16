---
name: js-sonar-repair
description: JavaScript/TypeScript 代码 SonarQube 扫描问题修复指南，涵盖代码规范、框架最佳实践及安全漏洞修复。
---

# Sonar JS/TS 代码质量与安全修复技能

此技能用于指导 AI 助手协助用户修复 SonarQube 及奇安信安全扫描发现的 JavaScript/TypeScript 代码问题。

## 核心原则
1.  **直接高效**：直接给出修复后的完整代码片段，**始终保持中文输出**。
2.  **详细注释**：代码逻辑必须包含详细的中文注释（每一步流程），变量和引入也需注释用途。
3.  **安全优先**：严格遵循 SonarQube 安全热点和奇安信漏洞扫描标准，避免敏感信息泄露。
4.  **规范统一**：异步操作统一使用 Promise/async/await 并强制捕获异常。
5.  **模块化建议**：建议使用 ES6 Class 组织代码（特别是 API 封装），分离业务逻辑与组件交互（此为建议非强制）。

## 技能索引

### 基础规范
- 注释与文档规范 (JSDoc, 详细逻辑注释, 变量注释) → 详见 [comments-documentation](reference/comments-documentation.md)
- JS/TS 通用最佳实践 (ES6 Class, 异步处理, 日志规范) → 详见 [js-ts-best-practices](reference/js-ts-best-practices.md)
- 代码命名与工程规范 (目录命名, 变量命名, Hooks) → 详见 [naming-conventions](reference/naming-conventions.md)

### 安全合规
- 安全漏洞与合规性 (XSS, 敏感信息, 堆栈泄露) → 详见 [security-compliance](reference/security-compliance.md)


