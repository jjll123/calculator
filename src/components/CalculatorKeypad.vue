<template>
  <div class="keypad">
    <!-- 第一行：清除、正负号、百分比、除号 -->
    <button @click="handleClick('C')" class="operator">C</button>
    <button @click="handleClick('±')" class="operator">±</button>
    <button @click="handleClick('%')" class="operator">%</button>
    <button @click="handleClick('/')" class="operator">÷</button>

    <!-- 第二行：7-9、乘号 -->
    <button @click="handleClick('7')">7</button>
    <button @click="handleClick('8')">8</button>
    <button @click="handleClick('9')">9</button>
    <button @click="handleClick('*')" class="operator">×</button>

    <!-- 第三行：4-6、减号 -->
    <button @click="handleClick('4')">4</button>
    <button @click="handleClick('5')">5</button>
    <button @click="handleClick('6')">6</button>
    <button @click="handleClick('-')" class="operator">−</button>

    <!-- 第四行：1-3、加号 -->
    <button @click="handleClick('1')">1</button>
    <button @click="handleClick('2')">2</button>
    <button @click="handleClick('3')">3</button>
    <button @click="handleClick('+')" class="operator">+</button>

    <!-- 第五行：0、小数点、等号 -->
    <button @click="handleClick('0')" class="zero">0</button>
    <button @click="handleClick('.')">.</button>
    <button @click="handleClick('=')" class="operator equals">=</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

// 定义事件，将按钮点击传递给父组件
const emit = defineEmits(['onClick'])

const handleClick = (value) => {
  emit('onClick', value)
}
</script>

<style scoped>
.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
button {
  padding: 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #e0e0e0;
}
button.operator {
  background: #ff9500;
  color: white;
}
button.equals {
  background: #ff6b00;
}
button.zero {
  grid-column: span 2;  /* 0按钮占两列 */
}
button:hover {
  opacity: 0.9;
}
</style>