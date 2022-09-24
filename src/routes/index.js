import {createRouter, createWebHashHistory} from 'vue-router';
import HomeLayout from "../pages/home/layouts/HomeLayout.vue"
import Home from "../pages/home/HomePage/Home.vue";
const routes = [
    {
        path: '/',
        component: HomeLayout,
        meta: {
            title: "Trang chủ"
        },
        children: [
            {
                title: 'Home',
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    title: 'Trang chủ',
                }
            }
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router