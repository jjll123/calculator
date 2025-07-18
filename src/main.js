import './assets/main.css' //导入项目的全局样式文件 main.css
import { createApp } from 'vue' //从 vue 库中导入 createApp 函数
import App from './App.vue'  //导入根组件 App.vue。在 Vue 项目中，App.vue 是整个应用的根组件，它是整个应用的入口点，其他组件会在这个根组件的基础上进行嵌套和渲染。
import router from './router'

const app = createApp(App) //使用 createApp 函数创建一个 Vue 应用实例
app.use(router) //调用 app.use() 方法来安装路由插件。
app.mount('#app') //调用 app.mount() 方法将 Vue 应用实例挂载到 HTML 页面中 id 为 app 的元素上。