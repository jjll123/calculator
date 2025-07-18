<template>
  <div class="display">
    <!-- 显示完整表达式（如“3 + 5 * 2”） -->
    <div class="expression">{{ expression || '0' }}</div>
    <!-- 显示当前输入或结果 -->
    <div class="current-value">{{ currentValue || '0' }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 接收父组件传递的表达式和当前值
const props = defineProps({
  expression: {
    type: String,
    default: ''
  },
  currentValue: {
    type: String,
    default: '0'
  }
})
</script>

<style scoped>
.display {
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: right;
}
.expression {
  color: #666;
  height: 1.5rem;
}
.current-value {
  font-size: 2rem;
  font-weight: bold;
}
</style>