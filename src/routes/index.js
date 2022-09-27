import {createRouter, createWebHashHistory} from 'vue-router';
import HomeLayout from "../pages/home/layouts/HomeLayout.vue";
import AdminLayout from "../pages/admin/layouts/AdminLayout.vue";
import DashBoard from "../pages/admin/DashBoard/DashBoard.vue";
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






    //admin
    {
        path: '/admin',
        component: AdminLayout,
        meta: {
            title: "Admin"
        },
        children: [
            {
                title: 'Admin',
                path: '/',
                name: 'Admin',
                component: DashBoard,
                meta: {
                    title: 'DashBoard',
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