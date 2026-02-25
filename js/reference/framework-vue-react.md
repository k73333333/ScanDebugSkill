# 前端框架规范 (Vue/React)

## 规则详情
*   **列表渲染**：`v-for` (Vue) 或 `map` (React) 循环渲染时，必须提供唯一的 `key`，且**避免使用数组索引 (index) 作为 key**（除非列表是静态且不排序的）。
*   **Props 验证**：组件接收的 Props 必须定义类型验证和默认值。
*   **副作用清理**：在组件销毁生命周期（`beforeUnmount`, `useEffect cleanup`）中，必须清理定时器、事件监听器等副作用。

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
