# jiangwenqing

在命令行输入：
npm run dev

得到：
 VITE v6.3.5  ready in 1940 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Vue DevTools: Open http://localhost:5173/__devtools__/ as a separate window
  ➜  Vue DevTools: Press Alt(⌥)+Shift(⇧)+D in App to toggle the Vue DevTools
  ➜  press h + enter to show help


进入http://localhost:5173/，可以看到网页版计算器


本项目文件结构：
src/
├── assets/ # 存放静态资源（如样式文件、图标等）
│   ├── main.css
│   └── base.css
├── components/  # 存放可复用组件（如计算器按钮、显示屏等）
│   ├── Calculator.vue #实现计算器核心逻辑
│   ├── CalculatorKeypad.vue #创建按键面板组件
│   └── CalculatorDisplay.vue #创建显示屏组件
│   └── icons/
│       ├── IconDocumentation.vue
│       ├── IconTooling.vue
│       ├── IconEcosystem.vue
│       ├── IconCommunity.vue
│       └── IconSupport.vue

├── views/ # 存放页面级组件（计算器主页面）
│   └── CalculatorView.vue 

├── router/ # 路由配置
│   └── index.js
├── App.vue
└── main.js # 入口文件



该计算器主要由 `Calculator.vue` 组件实现，其核心逻辑围绕状态管理和按键处理展开，支持数字输入、运算符操作、小数点输入、正负号切换、百分比计算、键盘输入以及结果计算等功能。

