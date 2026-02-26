# 前端框架规范 (Vue/React)

## 规则详情
*   **架构分离 (Architecture Separation)**：
    *   **业务逻辑抽离**：复杂的业务逻辑（如数据处理、API 请求组合）必须从组件中抽离，封装到独立的 `Service` 类或工具函数中（此为建议非强制）。
    *   **组件职责**：UI 组件应仅负责视图渲染、用户交互响应和简单的状态管理（此为建议非强制）。
*   **列表渲染**：`v-for` (Vue) 或 `map` (React) 循环渲染时，必须提供唯一的 `key`，且**避免使用数组索引 (index) 作为 key**（除非列表是静态且不排序的）。
*   **Props 验证**：组件接收的 Props 必须定义类型验证和默认值。
*   **副作用清理**：在组件销毁生命周期（`beforeUnmount`, `useEffect cleanup`）中，必须清理定时器、事件监听器等副作用。

## 示例：架构分离与副作用清理

**场景**：组件内包含了大量的数据获取和处理逻辑，且使用了定时器。

**修复后代码 (React 示例)**：

```javascript
// 1. 业务逻辑抽离 (UserService.js)
import { api } from './api';

export class UserService {
  /**
   * 轮询获取用户状态
   * @param {string} userId - 用户ID
   * @returns {Promise<Object>} - 用户状态
   */
  static async fetchStatus(userId) {
    try {
      return await api.get(`/user/${userId}/status`);
    } catch (error) {
      console.error('UserService: 获取状态失败');
      return null;
    }
  }
}

// 2. 组件逻辑 (UserStatus.jsx)
import React, { useEffect, useState } from 'react';
import { UserService } from './UserService';

export function UserStatus({ userId }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let timerId = null;

    const loadData = async () => {
      // 调用抽离的业务逻辑
      const data = await UserService.fetchStatus(userId);
      if (data) setStatus(data);
    };

    // 初始加载
    loadData();

    // 设置轮询
    timerId = setInterval(loadData, 5000);

    // Compliant: 清理副作用
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [userId]);

  return <div>状态: {status}</div>;
}
```

## 示例：Vue/React 列表 Key 问题

**场景**：Sonar 提示 "Use a unique value for the key attribute"。

**修复后代码**：
```html
<!-- Compliant: 使用数据的唯一 ID 作为 key -->
<div v-for="item in list" :key="item.id">
  <!-- 显示用户名称 -->
  {{ item.name }}
</div>
```
