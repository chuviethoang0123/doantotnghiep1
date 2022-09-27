import { createApp } from 'vue'
import App from './App.vue'
import route from "./routes/index";
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vClickOutside from "click-outside-vue3";
import VueApexCharts from "vue3-apexcharts";
import mitt from 'mitt';
// import { createVuetify } from 'vuetify'
const emitter = mitt();

// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// const vuetify = createVuetify({
//     components,
//     directives,
// })

const app = createApp(App);
app.use(route);
// app.use(Antd);
app.use(ElementPlus);
app.use(vClickOutside);
app.use(VueApexCharts);
// app.use(vuetify); 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// app.config.globalProperties.$filters = filters;
app.config.globalProperties.$emitter = emitter;

route.isReady().then(() => {
    app.mount('#app');
});





// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import { createVuetify } from 'vuetify'

// const app = createApp(App);
// app.use(vuetify)
// app.mount('#app')
