---
name: 扫描问题
description: SonarQube和安全扫描的时候触发。分析并修复 SonarQube 扫描出的代码问题，确保符合安全与质量规范。当用户要求修复 Sonar 问题时调用。
triggers:
  - sonar问题修复
  - 奇安信问题修复
  - sonar问题扫描
  - 奇安信问题扫描
  - 扫描问题修复
  - 扫描代码问题
  - scan-debug-skill扫描
  - scan-debug-skill
  - scan-debug
license: MIT
author: [scan-debug-skill](https://github.com/k73333333/ScanDebugSkill)
---

# Sonar 代码质量与安全修复技能集

本项目包含针对前端不同技术栈（JS/TS, CSS, HTML）的 SonarQube 修复技能指南。

## 目录结构

*   **[JS/TS 修复技能](./js/SKILL.md)**
    *   包含 JavaScript、TypeScript 的修复规则。
    *   涉及：注释规范、最佳实践、安全合规。

*   **[CSS 修复技能](./css/SKILL.md)**
    *   包含 CSS、SASS、LESS 的样式修复规则。
    *   涉及：注释规范、通用实践、字体回退、重复属性。

*   **[HTML 修复技能](./html/SKILL.md)**
    *   包含 HTML 结构、语义化及可访问性修复规则。
    *   涉及：注释规范、图片/表单/语义化结构、安全合规。

## 使用说明
对指定代码/文件/目录进行扫描问题然后根据扫描结果概览进行修复。

请点击上述链接进入相应的技能目录查看详细指南。

### 引用指南

在编辑器中使用 AI 助手生成或修复代码时，可以通过以下方式引用本规范：

1.  **代码生成**：在生成代码时，显式要求遵循 `scan-debug-skill` 规范。
    > "生成一段 API 请求代码，请遵循 `scan-debug-skill` 中的 JS 安全规范。"
2.  **问题修复**：在修复代码问题时，要求 AI 参考本技能集。
    > "请按照 `scan-debug-skill` 修复当前代码的 Sonar 问题。"
3.  **项目规则配置**：在项目的 `.cursorrules` 或 `.trae/rules` 文件中配置全局引用，使 AI 默认遵循此规范。
    > "Follow the `scan-debug-skill` standards for all code generation and fixes."

## 扫描结果概览输出规则

当用户提供扫描报告或提及多个代码问题时，应首先以表格形式输出扫描结果概览，遵循以下规范：

- **表格列**：必须包含 类别、严重程度、问题描述、涉及文件。
- **严重程度标识**：使用 🔴 高危、🟡 中、🔵 低、⚪ 建议 进行视觉区分。
- **示例格式**：

| 类别 | 严重程度 | 问题描述 | 涉及文件 |
| :--- | :--- | :--- | :--- |
| JS/TS 安全 | 🔴 高危 | window.open 缺少 noopener (反向 Tabnabbing 漏洞) | src/views/Assistant.vue |
| 代码质量 | 🔴 高危 | 遗留 debugger 调试断点 | vite.config.ts |
| 代码质量 | 🟡 中 | 遗留 console.log 调试日志 | vite.config.ts |
| CSS 规范 | 🟡 中 | 滥用 !important 破坏级联规则 | src/assets/assistant.css |
| JS/TS 规范 | 🟡 中 | 使用原生 confirm 阻塞交互 | src/views/Assistant.vue |
| Vue 规范 | 🔵 低 | v-for 使用 index 作为 key (潜在渲染风险) | src/views/Assistant.vue |
| 代码风格 | ⚪ 建议 | 变量命名可优化为更具语义化的名称 | src/utils/format.js |
