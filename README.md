# scan-debug-skill

一套用于代码扫描与调试技能（Scan & Debug Skill）。
主要应用于 SonarQube 和奇安信的常见问题快速修复。

A set of code scanning and debugging skills (Scan & Debug Skill).
Primarily used for quick fixes of common SonarQube and Qianxin issues.

## 使用方法 / Usage

### 通过 npx 安装 / Install via npx

在您的项目根目录下运行以下命令：
Run the following command in your project root directory:

```bash
npx scan-debug-skill
```

运行后，脚本会提示您选择安装目标：
After running, the script will prompt you to select an installation target:

1.  **Trae**：安装到 `.trae/scan-debug-skill` (Install to `.trae/scan-debug-skill`)
2.  **Cursor**：安装到 `.cursor/scan-debug-skill` (Install to `.cursor/scan-debug-skill`)
3.  **Custom**：安装到指定目录 (Install to a specified directory)

### 包含的内容 / Contents

- CSS 最佳实践与规范 / CSS Best Practices & Standards
- HTML 语义化与安全规范 / HTML Semantics & Security Standards
- JS/TS 编码规范与安全指南 / JS/TS Coding Standards & Security Guidelines

### AI 辅助编码 / AI Assisted Coding

在编辑器中使用 AI 生成或修复代码时，可以通过以下提示词引用此规范：
When using AI to generate or fix code in the editor, you can reference this standard with the following prompts:

- "请根据 `scan-debug-skill` 规范修复当前文件的 Sonar 问题"
  "Please fix Sonar issues in the current file according to `scan-debug-skill` standards"
- "生成一段 API 请求代码，要求符合 `scan-debug-skill` 中的 JS 安全规范"
  "Generate API request code that complies with the JS security standards in `scan-debug-skill`"

### 项目规则引用 / Project Rules Reference

您可以在 `.cursorrules` 或 `.trae/rules` 文件中添加以下规则，以确保 AI 始终遵循此规范：
You can add the following rules to your `.cursorrules` or `.trae/rules` file to ensure AI always follows this standard: