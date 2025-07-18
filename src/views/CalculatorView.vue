<template>
  <div class="calculator-page">
    <h1>Vue 计算器</h1>
    <Calculator />  <!-- 引入计算器核心组件 -->
  </div>
</template>

<script setup>
import Calculator from '../components/Calculator.vue'  // 后续创建的计算器组件
</script>

<style scoped>
.calculator-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
}
</style>