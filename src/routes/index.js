import {createRouter, createWebHashHistory} from 'vue-router';
import {store} from "../stores";

import HomeLayout from "../pages/home/layouts/HomeLayout.vue";
import Home from "../pages/home/HomePage/Home.vue";

// import file js check  quyền người dùng
import auth from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

// import màn chi tiết sản phẩm
import ProductDetail from '../pages/home/Product/ProductDetail.vue';

// import component chức năng đăng nhập/đăng ký
import Login from '../pages/home/Login/Login.vue';
import Forgot from '../pages/home/Login/Forgot.vue';
import Register from '../pages/home/Login/Register.vue';
import LoginFacebook from '../pages/home/Login/LoginFacebook.vue';

// import component thông tin tài khoản, đơn hàng người dùng
import OrderUser from '../pages/home/User/Order.vue';
import InfoUser from '../pages/home/User/Info.vue';

// import error 404 (Không tìm thấy trang)
import Error404 from "../pages/home/errors/Error404.vue";


//admin
import AdminLayout from "../pages/admin/layouts/AdminLayout.vue";
import Dashboard from '../pages/admin/Dashboard/Dashboard.vue';
import Slide from '../pages/admin/Slide/index.vue';
import Brand from '../pages/admin/Brand/index.vue';
import Voucher from '../pages/admin/Voucher/index.vue';
import VoucherCreate from '../pages/admin/Voucher/create.vue';
import VoucherUpdate from '../pages/admin/Voucher/update.vue';
import Product from '../pages/admin/Product/index.vue';
import ProductCreate from '../pages/admin/Product/create.vue';
import ProductUpdate from '../pages/admin/Product/update.vue';
import Order from '../pages/admin/Order/index.vue';
import OrderDetail from '../pages/admin/Order/detail.vue';
import CategoryAdmin from '../pages/admin/Category/index.vue';
import AccountAdmin from '../pages/admin/User/AccountAdmin.vue';
import User from '../pages/admin/User/Index.vue';
import CreateUser from '../pages/admin/User/create.vue';
import ImportProduct from '../pages/admin/Import/ImportProduct.vue';


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

    {
        path: '/user',
        component: HomeLayout,
        meta: {
            middleware: [auth],
            title: "Tài khoản"
        },
        children: [
            {
                title: 'Thông tin Đơn Hàng',
                path: 'order',
                name: 'OrderUser',
                component: OrderUser,
                meta: {
                    title: 'Đơn hàng',
                }
            },
            {
                title: 'Thông tin tài khoản',
                path: 'info',
                name: 'InfoUser',
                component: InfoUser,
                meta: {
                    title: 'Tài khoản',
                }
            }
        ]
    },




    //admin
    //các page admin
    {
        path: '/admin',
        component: AdminLayout,
        meta: {
            middleware: [authAdmin],
            title: "Admin"
        },
        children: [
            {
                title: 'Dashboard',
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: 'Dashboard',
                }
            },
            {
                title: 'Slide',
                path: 'slide',
                name: 'Slide',
                component: Slide,
                meta: {
                    title: 'Slide',
                }
            },
            {
                title: 'Thể loại',
                path: 'category',
                name: 'CategoryAdmin',
                component: CategoryAdmin,
                meta: {
                    title: 'Thể loại',
                }
            },
            {
                title: 'Thương hiệu',
                path: 'brand',
                name: 'Brand',
                component: Brand,
                meta: {
                    title: 'Thương hiệu',
                }
            },
            {
                title: 'Voucher',
                path: 'voucher',
                name: 'Voucher',
                component: Voucher,
                meta: {
                    title: 'Voucher',
                }
            },
            {
                title: 'Voucher',
                path: 'voucher/create',
                name: 'VoucherCreate',
                component: VoucherCreate,
                meta: {
                    title: 'Voucher',
                }
            },
            {
                title: 'Voucher',
                path: 'voucher/update',
                name: 'VoucherUpdate',
                component: VoucherUpdate,
                meta: {
                    title: 'Voucher',
                }
            },

            // Sản phẩm
            {
                title: 'Sản phẩm',
                path: 'product',
                name: 'Product',
                component: Product,
                meta: {
                    title: 'Sản phẩm',
                }
            },
            {
                title: 'Thêm mới',
                path: 'product/create',
                name: 'ProductCreate',
                component: ProductCreate,
                meta: {
                    title: 'Thêm mới',
                }
            },
            {
                title: 'Chỉnh sửa',
                path: 'product/update',
                name: 'ProductUpdate',
                component: ProductUpdate,
                meta: {
                    title: 'Chỉnh sửa',
                }
            },

            //Đơn hàng
            {
                title: 'Đơn hàng',
                path: 'order',
                name: 'Order',
                component: Order,
                meta: {
                    title: 'Đơn hàng',
                }
            },
            {
                title: 'Chi tiết',
                path: 'order/detail',
                name: 'OrderDetail',
                component: OrderDetail,
                meta: {
                    title: 'Chi tiết',
                }
            },


            //User
            {
                title: 'Tài khoản',
                path: 'user',
                name: 'User',
                component: User,
                meta: {
                    title: 'Tài khoản',
                }
            },
            {
                title: 'Tài khoản',
                path: 'account',
                name: 'AccountAdmin',
                component: AccountAdmin,
                meta: {
                    title: 'Tài khoản',
                }
            },
            {
                title: 'Tạo mới',
                path: 'user/create',
                name: 'CreateUser',
                component: CreateUser,
                meta: {
                    title: 'Tạo mới',
                }
            },

            //Nhập kho
            {
                title: 'Nhập kho',
                path: 'import',
                name: 'ImportProduct',
                component: ImportProduct,
                meta: {
                    title: 'Nhập kho',
                }
            },
        ]
    },



    // error 404 not found
    {
        path: "/:pathMatch(.*)*",
        name: 'Error404',
        component: Error404,
        meta: {
            title: 'Không tìm thấy trang'
        }
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