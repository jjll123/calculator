<template>
  <div class="calculator">
    <!-- 显示屏：传递表达式和当前值 -->
    <CalculatorDisplay 
      :expression="expression" 
      :current-value="currentValue" 
    />
    <!-- 按键面板：监听按钮点击事件 -->
    <CalculatorKeypad @onClick="handleKeyPress" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CalculatorDisplay from './CalculatorDisplay.vue';
import CalculatorKeypad from './CalculatorKeypad.vue';
import { evaluate } from 'mathjs'; // 引入 math.js 的 evaluate 函数

// 状态管理
const currentValue = ref('0');  // 当前输入的数字
const expression = ref('');     // 完整表达式
const lastKey = ref('');        // 记录上一次点击的键（用于处理连续操作）
const isAfterEqual = ref(false); // 标记是否刚按过等号

// 常量定义
const MAX_VALUE = 1e15;   // 最大值限制
const MIN_VALUE = -1e15;  // 最小值限制
const MAX_DIGITS = 10;    // 输入数字最大长度


// 处理按钮点击
const handleKeyPress = (key) => {
  switch (key) {
    case 'C':  // 清除所有
      currentValue.value = '0';
      expression.value = '';
      lastKey.value = '';
      isAfterEqual.value = false;
      break;
    case '=':  // 计算结果
      calculateResult();
      isAfterEqual.value = true;
      break;
    case '.':  // 小数点
      handleDecimal();
      break;
    case '±':  // 正负号切换
      
        currentValue.value = (-parseFloat(currentValue.value)).toString();
      
      break;
    case '%':  // 百分比（当前值/100）
      handlePercentage();
      break;

    case '+':
    case '-':
    case '*':
    case '/':  // 运算符
      handleOperator(key);
      break;
    default:  // 数字键
      handleNumber(key);
      break;
  }
  lastKey.value = key;  // 更新上一次按键
};

// 处理数字输入（增加长度限制）
const handleNumber = (num) => {
  if (isAfterEqual.value) {
    expression.value = '';
    currentValue.value = num;
    isAfterEqual.value = false;
  } else {
    if (currentValue.value === '0') {
      currentValue.value = num;
    } else if (currentValue.value.length < MAX_DIGITS) {  // 限制输入长度
      currentValue.value += num;
    }
  }
};



// 处理小数点
const handleDecimal = () => {
  if (!isAfterEqual.value &&!currentValue.value.includes('.')) {
    currentValue.value += '.';
  }
};

// 处理百分比
const handlePercentage = () => {

  // 将当前值转换为百分比
  const percentValue = parseFloat(currentValue.value) / 100;
  currentValue.value = percentValue.toString();
  // 不修改表达式，仅更新当前值为百分比
};

// 处理运算符
const handleOperator = (op) => {
  if (isAfterEqual.value) {
    expression.value = currentValue.value + op;
    currentValue.value = '0';
    isAfterEqual.value = false;
  
  } else if (['+', '-', '*', '/'].includes(lastKey.value)) {
    expression.value = expression.value.slice(0, -1) + op;
  } else {
    expression.value += currentValue.value + op;

    // 动态计算当前表达式的结果
    if (expression.value.length > 2) {
      try {
        let validExpr = expression.value.slice(0, -1).replace('×', '*').replace('÷', '/');
        const result = evaluate(validExpr);
        if (!isFinite(result)) {
          throw new Error('Division by zero');
        }
        currentValue.value = result.toString();
        expression.value = result.toString() + op; // 更新表达式为计算结果接上当前运算符
      } catch (error) {
        currentValue.value = 'Error';
        expression.value = '';
      }
    }
    currentValue.value = '0';  // 重置当前输入，准备接收新数字
  }
};

// 计算结果（按输入顺序计算，不考虑优先级）
const calculateResult = () => {
  try {
    // 拼接完整表达式
    const fullExpr = expression.value + currentValue.value;

    // 改进的表达式解析 - 更精确处理小数和负数
    const tokens = [];
    let currentToken = '';
    let prevChar = '';
    
    for (const char of fullExpr) {
      if ('+-*/'.includes(char)) {
        // 处理运算符
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = '0';
        }
        // 特殊处理负号：只有当前一个字符是运算符或空时才认为是负号
        if (char === '-' && (prevChar === '' || '+-*/'.includes(prevChar))) {
          currentToken += char;
        } else {
          tokens.push(char);
        }
      } else {
        // 数字或小数点
        currentToken += char;
      }
      prevChar = char;
    }
    
    // 添加最后一个token
    if (currentToken) {
      tokens.push(currentToken);
    }

    if (tokens.length === 0) {
      throw new Error('Invalid expression');
    }

    // 按顺序计算，处理小数精度
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      if (i + 1 >= tokens.length) {
        break;
      }
      const operator = tokens[i];
      const operand = parseFloat(tokens[i + 1]);

      
      switch (operator) {
        case '+':
          result = parseFloat((result + operand).toFixed(10));
          break;
        case '-':
          result = parseFloat((result - operand).toFixed(10));
          break;
        case '*':
          result = parseFloat((result * operand).toFixed(10));
          break;
        case '/':
          if (operand === 0) {
            throw new Error('Division by zero');
          }
          result = parseFloat((result / operand).toFixed(10));
          break;
        default:
          throw new Error('Invalid operator');
      }
    }
    // 检查数值范围
    if (result > MAX_VALUE || result < MIN_VALUE) {
      throw new Error('Overflow');
    }

    // 格式化结果
    currentValue.value = formatResult(result);
    expression.value = '';
  } catch (error) {
    handleCalculationError(error);
  }
};

// 结果格式化函数（新增）
const formatResult = (num) => {
  // 科学计数法条件：绝对值≥1e15 或 ≤1e-15
  if (Math.abs(num) >= 1e15 || Math.abs(num) <= 1e-15) {
    return num.toExponential(6).replace(/\.?0+e/, 'e'); // 例如 1.23e+15
  }
  // 普通数字：保留最多10位小数，去除末尾0
  return num.toFixed(10)
    .replace(/(\.\d*?[1-9])0+$/, '$1')
    .replace(/\.0+$/, '');
};

// 错误处理函数（新增）
const handleCalculationError = (error) => {
  switch (error.message) {
    case 'Division by zero':
      currentValue.value = 'Cannot divide by 0';
      break;
    case 'Overflow':
      currentValue.value = 'Value too large';
      break;
    default:
      currentValue.value = 'Error';
  }
  expression.value = '';
};


// 支持键盘输入（监听全局键盘事件）
const handleKeyboard = (e) => {
  const keyMap = {
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
    '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    '+': '+', '-': '-', '*': '*', '/': '/',
    '.': '.', '=': '=', 'Enter': '=', 'Escape': 'C'
  };
  if (keyMap[e.key]) {
    handleKeyPress(keyMap[e.key]);
  }
};
// 监听键盘事件
window.addEventListener('keydown', handleKeyboard);
// 组件卸载时移除监听
watch(() => {}, () => {
  window.removeEventListener('keydown', handleKeyboard);
}, { once: true });
</script>

<style scoped>
.calculator {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>