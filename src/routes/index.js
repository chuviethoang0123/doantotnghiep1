import {createRouter, createWebHashHistory} from 'vue-router';
import {store} from "../stores";

import HomeLayout from "../pages/home/layouts/HomeLayout.vue";
import AdminLayout from "../pages/admin/layouts/AdminLayout.vue";
import DashBoard from "../pages/admin/DashBoard/DashBoard.vue";
import Home from "../pages/home/HomePage/Home.vue";

// import màn chi tiết sản phẩm
import ProductDetail from '../pages/home/Product/ProductDetail.vue';

// import component chức năng đăng nhập/đăng ký
import Login from '../pages/home/Login/Login.vue';
import Forgot from '../pages/home/Login/Forgot.vue';
import Register from '../pages/home/Login/Register.vue';
import LoginFacebook from '../pages/home/Login/LoginFacebook.vue';


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

    // đăng nhập
    {
        path: '/login',
        component: HomeLayout,
        meta: {
            title: "Đăng nhập"
        },
        children: [
            {
                title: 'Đăng nhập',
                path: '',
                name: 'Login',
                component: Login,
                meta: {
                    title: 'Đăng nhập',
                }
            }
        ]
    },

    // đăng nhập bằng facebook
    {
        path: '/login-facebook',
        component: HomeLayout,
        meta: {
            title: "Đăng nhập Facebook"
        },
        children: [
            {
                title: 'Đăng nhập Facebook',
                path: '',
                name: 'LoginFacebook',
                component: LoginFacebook,
                meta: {
                    title: 'Đăng nhập Facebook',
                }
            }
        ]
    },

    // Quên mật khẩu
    {
        path: '/forgot',
        component: HomeLayout,
        meta: {
            title: "Quên mật khẩu"
        },
        children: [
            {
                title: 'Quên mật khẩu',
                path: '',
                name: 'Forgot',
                component: Forgot,
                meta: {
                    title: 'Quên mật khẩu',
                }
            }
        ]
    },

    // đăng ký
    {
        path: '/register',
        component: HomeLayout,
        meta: {
            title: "Đăng Ký"
        },
        children: [
            {
                title: 'Đăng Ký',
                path: '',
                name: 'Register',
                component: Register,
                meta: {
                    title: 'Đăng Ký',
                }
            }
        ]
    },

    {
        path: '/product',
        component: HomeLayout,
        meta: {
            title: "Chi tết sản phẩm"
        },
        children: [
            {
                title: 'Chi tết sản phẩm',
                path: 'product-detail/:id',
                name: 'ProductDetail',
                component: ProductDetail,
                meta: {
                    title: 'Chi tiết sản phẩm',
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
    store: store
})

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Than run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
            store
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
});

export default router