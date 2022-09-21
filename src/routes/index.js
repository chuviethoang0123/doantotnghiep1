import {createRouter, createWebHashHistory} from 'vue-router';
import test from "../../src/App.vue";

const routes = [
    {
        path: '/test',
        component: test,
        meta: {
            title: "Trang chủ"
        },
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router