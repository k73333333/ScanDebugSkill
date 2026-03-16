# 代码命名与工程规范

## 规则详情

*   **目录与文件命名**：
    *   统一使用 `kebab-case`（短横线连接），例如 `src/components/user-list.js`、`src/hooks/use-user-info.ts`。
    *   组件/类文件可使用 `PascalCase`（大驼峰）或 `kebab-case`，但项目中应保持统一。
*   **组件/类命名**：
    *   文件名：`UserList.ts` 或 `user-list.ts`。
    *   类名：`UserList` (PascalCase)。
    *   使用时：`new UserList()` (PascalCase)。
*   **变量与函数命名**：
    *   变量/函数：使用 `camelCase`（小驼峰），例如 `userInfo`, `fetchData`。
    *   常量：使用 `UPPER_CASE`（全大写下划线），例如 `MAX_COUNT`, `API_BASE_URL`。
    *   **方法名**：必须使用动宾结构，例如 `getUserList` (获取), `handleSubmit` (处理), `isFinished` (判断)。
    *   **布尔变量**：推荐以 `is`, `has`, `should` 开头，例如 `isVisible`, `hasError`。
*   **类型与接口命名**：
    *   统一使用 `PascalCase`（大驼峰），例如 `interface UserInfo {}`, `type ApiResponse = {}`。
    *   不要使用下划线命名法（如 `user_info`）。
*   **Hooks 命名**：
    *   文件名：`use-auth.ts` (kebab-case)。
    *   导出函数：`useAuth` (camelCase，以 use 开头)。

## 示例：命名规范

**场景**：Sonar 提示 "Rename this file to match the regular expression..." 或 "Identifier 'xxx' does not match usage"。

**修复后代码**：
```typescript
// 文件名: src/hooks/use-user-info.ts

// Non-Compliant: 接口命名不规范
// interface user_info {}

// Compliant: 接口使用 PascalCase
export interface UserInfo {
  id: number;
  name: string;
}

// Non-Compliant: 函数名无动宾结构
// function data() {}

// Compliant: 函数名动宾结构，变量小驼峰
export function useUserInfo() {
  const isLoading = ref(false);

  async function fetchUserData() {
    // ...
  }

  return {
    isLoading,
    fetchUserData
  };
}
```

## 示例：目录结构分层

**场景**：代码耦合度高，API 请求散落在组件中。

**修复后代码**：
```javascript
// ❌ Non-Compliant: API 请求写在组件/UI层内部
// src/components/UserList.ts
const res = await axios.post("/api/user/list", data);

// ✅ Compliant: API 调用集中在 src/api/，UI层只调用服务
// src/api/user.ts
export function fetchUserList(data) {
  return request.post('/api/user/list', data);
}

// src/components/UserList.ts
import { fetchUserList } from "@/api/user";
const res = await fetchUserList(data);
```
