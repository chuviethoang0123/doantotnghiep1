<template>
    <div class="header-webview" v-if="checkScreen > 768">
        <div class="header-top">
            <div class="content">
                <el-row :gutter="20">
                    <el-col :span="11"><div class="grid-content ep-bg-purple" />
                        <div>
                            <el-icon><LocationFilled /></el-icon>
                            Location | 
                            <el-icon><Promotion /></el-icon> 
                            Contact | 
                            <el-icon><PhoneFilled /></el-icon> 
                            0386132297</div>
                    </el-col>
                    <el-col :span="6" :offset="7">
                        <div class="header-top-right" v-if="!user"><a @click="login">Đăng nhập</a> / <a @click="register">Đăng ký</a></div>
                        <div class="header-top-right" v-else>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    {{ user.name }}
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="redirectInfo"><el-icon><User /></el-icon>Cá nhân</el-dropdown-item>
                                    <el-dropdown-item @click="redirectOrder"><el-icon><ShoppingCart /></el-icon>Đơn hàng</el-dropdown-item>
                                    <el-dropdown-item @click="logout"><el-icon><SwitchButton /></el-icon>Đăng xuất</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="header-center">
            <div class="content">
                <el-row style="align-items: center">
                    <el-col :span="5">
                        <img style="width: 214px; height: 106px" src="@/assets/images/cvhoang-logo.png" alt="" @click="redirectHome">
                    </el-col>
                    <el-col class="el-content" :span="5">
                        <div class="header-infomation">
                            <div class="icon-image">
                                <el-image :src="'https://bactom.com/wp-content/uploads/2022/05/policy1.png'"/>
                            </div>
                            <div class="content">
                                <div style="font-weight: bold; margin-bottom: 6px">Giao hàng miễn phí</div>
                                <div>Với đơn hàng từ 500k</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="el-content" :span="5">
                        <div class="header-infomation">
                            <div class="icon-image">
                                <el-image :src="'https://bactom.com/wp-content/uploads/2022/05/policy2-1.png'"/>
                            </div>
                            <div class="content">
                                <div style="font-weight: bold; margin-bottom: 6px">Hỗ trợ 24/7</div>
                                <div>Hotline: 0911008006</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="el-content" :span="6">
                        <div class="header-infomation">
                            <div class="icon-image">
                                <el-image :src="'https://bactom.com/wp-content/uploads/2022/05/policy3.png'"/>
                            </div>
                            <div class="content">
                                <div style="font-weight: bold; margin-bottom: 6px">Giờ làm việc</div>
                                <div>Từ 6h00 - 19h30 hàng ngày</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="cart">
                            <el-badge :value="carts.sum_quantity" class="item-badge">
                                <el-button type="success" @click="visible = true" round>
                                    <span>Giỏ Hàng</span>
                                    <el-icon :size="20"><ShoppingCart /></el-icon>
                                </el-button>
                            </el-badge>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="header-bottom">
            <div class="content">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#7a4f3f"
                    text-color="#fff"
                    active-text-color="#fff"
                    @select="handleSelect"
                >
                    <el-menu-item index="1" @click="redirectHome">Cvhoang</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Về Cvhoang</template>
                        <el-menu-item index="2-1">Giới thiệu</el-menu-item>
                        <el-menu-item index="2-2">Đối tác</el-menu-item>
                        <el-menu-item index="2-3">Thành viên</el-menu-item>
                        <el-menu-item index="2-3">Tuyển dụng</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>Sản phẩm</template>
                        <el-menu-item v-for="(cate, index) in state.categories" :key="index" @click="redirectCategory(cate.id)">{{ cate.name }}</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="4" @click="onSearch">Tin tức</el-menu-item>
                    <el-menu-item index="order">Kiểm tra đơn hàng</el-menu-item>
                    <el-menu-item index="6">Hệ thống cửa hàng</el-menu-item>
                </el-menu>
                <div class="search">
                    <el-input v-model="search" :placeholder="'Tìm sản phẩm...'" enter-button @change="onSearch" :suffix-icon="Search"/>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="header-webview-responsive">
        <el-row :gutter="20">
            <el-col :span="3">
                <el-button class="icon-responsive" @click="visibleMenu = true">
                    <el-icon><Menu /></el-icon>
                </el-button>
            </el-col>
            <el-col :span="18">
                <el-image :src="'https://bactom.com/wp-content/uploads/2022/05/logo.png'"/>
            </el-col>
            <el-col :span="3">
                <el-badge :value="carts.sum_quantity" class="item-badge" @click="visible = true" round>
                    <el-button class="icon-responsive">
                        <el-icon><ShoppingCart /></el-icon>
                    </el-button>
                </el-badge>
            </el-col>
        </el-row>
    </div>

    <!-- drawer gio hang -->
    <el-drawer v-model="visible" :show-close="false" :size="checkScreen > 768 ? '30%' : '70%'">
        <template #header="{ close }">
            <div class="icon-close">
                <el-icon @click="close" :size="30"><CloseBold /></el-icon>
            </div>
        </template>
        <div class="cart-title">Giỏ hàng</div>
        <div v-if="carts.carts.length" class="cart">
            <div v-for="item in carts.carts" :key="item.id" class="cart-content">
                <div class="cart-content-left">
                    <div class="img">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="product">
                        <div class="product-name">
                            {{ item.name }}
                        </div>
                        <div class="product-price">
                            {{ item.quantity }} x {{ $filters.formatVND(item.price) }}
                        </div>
                    </div>
                </div>
                <div class="btn-close">
                    <el-icon :size="30" @click="deleteProduct(item.id)"><CircleClose /></el-icon>
                </div>
            </div>
            <div style="height:1px; background: #c3b3b3; margin:20px 0px"/>
            <div class="total-money">Tổng tiền: {{ $filters.formatVND(carts.sum_price) }}</div>
            <div style="height:1px; background: #c3b3b3; margin:20px 0px" />
            <div class="form-button">
                <el-button class="btn-cart" size="large" round @click="redirectCart('cart')">XEM GIỎ HÀNG</el-button>
                <el-button class="btn-checkout" size="large" round @click="redirectCart('checkout')">THANH TOÁN</el-button>
            </div>
        </div>
        <div v-else class="cart">
            <h5>Giỏ hàng không có sản phẩm nào</h5>
        </div>
    </el-drawer>


    <!-- drawer menu -->
    <el-drawer v-model="visibleMenu" :show-close="false" :size="'65%'" :direction="'ltr'">
        <el-tabs
            v-model="activeName"
            type="card"
            class="menu-tab-responsive"
            @tab-click="handleClick"
        >
            <el-tab-pane label="SẢN PHẨM" name="first">
                <div class="search">
                    <el-input v-model:value="search" :placeholder="'Tìm sản phẩm...'" enter-button :suffix-icon="Search"/>
                </div>
                <div class="menu-info">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                    >
                        <el-menu-item v-for="(cate, index) in state.categories" :key="index">
                            <span>{{ (cate.name).toUpperCase() }}</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-tab-pane>
            <el-tab-pane label="MENU" name="second">
                <div class="menu-info">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                    >
                        <el-menu-item index="1">
                            <span>CVHOANG</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <span>VỀ CVHOANG</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span>SẢN PHẨM</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span>TIN TỨC</span>
                        </el-menu-item>
                        <el-menu-item index="order">
                            <span>KIỂM TRA ĐƠN HÀNG</span>
                        </el-menu-item>
                        <el-sub-menu index="6" v-if="user">
                            <template #title>
                                <span>{{ user.name }}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1" @click="redirectInfo"><el-icon><User /></el-icon>Cá nhân</el-menu-item>
                                <el-menu-item index="1-2" @click="redirectOrder"><el-icon><ShoppingCart /></el-icon>Đơn hàng</el-menu-item>
                                <el-menu-item index="1-3" @click="logout"><el-icon><SwitchButton /></el-icon>Đăng xuất</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-menu-item index="6" v-if="!user">
                            <span>ĐĂNG NHẬP</span>
                        </el-menu-item>
                        <el-menu-item index="7" v-if="!user">
                            <span>ĐĂNG KÝ</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-drawer>

    <!-- modal tra cứu thông tin đơn hàng -->
    <el-dialog
        class="check-order"
        v-model="visibleOrder"
        width="50%"
    >
        <template #header>
            <div class="title-text">
                Đơn hàng
            </div>
            <div class="search">
                <div class="text">Mã đơn hàng:</div>
                <div class="input-search">
                    <el-input v-model="searchOrder" placeholder="Nhập mã đơn hàng cần tra cứu" size="large">
                        <template #append>
                            <el-button @click="checkOrder" :icon="Search" />
                        </template>
                    </el-input>
                </div>
            </div>
        </template>
        <template #footer>
            <el-button key="back" @click="cancelOrder">Trở lại</el-button>
        </template>
        <div class="info-order">
            <div v-if="infoOrder">
                <div v-if="infoOrder.message" style="text-align: center; font-size: 18px; color: red">
                    {{ infoOrder.message }}
                </div>
                <div v-else class="info">
                    <div class="title" style="text-align: center">
                        <h2>Thông tin đơn hàng</h2>
                    </div>
                    <p><strong>Mã đơn hàng:</strong> {{ infoOrder.code }}</p>
                    <p><strong>Họ tên:</strong> {{ infoOrder.name }}</p>
                    <p><strong>Số điện thoại:</strong> {{ infoOrder.phone }}</p>
                    <p><strong>Ngày đăt:</strong> {{ $filters.formatDate(infoOrder.date) }}</p>
                    <p><strong>Số tiền:</strong> {{ $filters.formatVND(infoOrder.money) }} - {{ infoOrder.isPayment }}</p>
                    <p><strong>Tình trạng đơn hàng:</strong> {{ infoOrder.action }}</p>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
import { inject, reactive } from 'vue'
import api from "../../../api/home";
import 'element-plus/theme-chalk/display.css'
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElButton, ElDrawer } from 'element-plus'
import { CircleCloseFilled, ShoppingCart, Search, SwitchButton } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'

const store = useStore();
const router = useRouter();
const emitter : any = inject("emitter");

const visible = ref(false);
const visibleMenu = ref(false);
const visibleOrder = ref(false);
const search = ref('');
const activeIndex = ref('1');
const activeName = ref('first');

const checkScreen = ref(window.innerWidth);
const current = ref('');
const infoOrder = ref('');
const searchOrder = ref('');

const state = reactive({
    categories: []
})

onMounted(async() => {
    window.addEventListener('resize', () => {checkScreen.value = window.innerWidth} );
    await getCategory();
    await getCart();
    await getMyInfo();
})
onUnmounted(() => { 
    window.removeEventListener('resize', () => {checkScreen.value = window.innerWidth})
})


async function getCart() {
    let params = {
        product_id: '',
        quantity: ''
    }
    await store.dispatch('home/cartData', params);
}

const user = computed(() => {
    if (store.state.auth.user) {
        return store.state.auth.user
    }
});
const carts = computed(() => {
    let shoppingCart = JSON.parse(JSON.stringify(store.state.home.cartData))
    
    if (shoppingCart) {
        return JSON.parse(JSON.stringify(store.state.home.cartData));
    }
})

watch(() => current.value, (first, second) => {
    if (current.value === 'order') {
        visibleOrder.value = true
    }
});

const getCategory = async () => {
    let res = await api.getCategory();
    state.categories = res;
}

async function getMyInfo() {
    let data = await store.dispatch('auth/getMyInfo');
    emitter.emit("user_id", data);
}

const login = () => {
    router.push({name: 'Login'})
}
const register = () => {
    router.push({name: 'Register'})
}

async function logout() {
    let res = await api.logout();
    if (res.status === true) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        ElMessage({
            message: 'Đăng xuất thành công',
            type: 'success',
        })
        router.push({ name: 'Login' });
        store.state.auth.user = "";
        store.state.auth.myId = "";
    } else {
        ElMessage.error('Bạn chưa đăng nhập');
    }
}

const deleteProduct = (data: String) => {
    let params = {
        type: 'delete',
        quantity: '',
        product_id: data
    }
    store.dispatch('home/cartData', params);
}

const handleSelect = (key: string, keyPath: string[]) => {
  current.value = key
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const checkOrder = async () => {
    let res = await api.checkOrder({ search: searchOrder.value });
    infoOrder.value = res;
}

const redirectOrder = () => {
    router.push({name: 'OrderUser'})
}

const redirectInfo = () => {
    router.push({name: 'InfoUser'})
}

const cancelOrder = () => {
    visibleOrder.value = false
}

const redirectHome = () => {
    router.push({name: 'Home'})
}

const redirectCart = (val: string) => {
    visible.value = false
    router.push({
        name: 'Cart',
        query: {
            step: val === 'cart' ? 0 : 1
        }
    })
}
const onSearch = () => {
    if (search.value) {
        localStorage.setItem('search', search.value)
        emitter.emit("search", search.value);
        router.push({ name: 'Search' });
    } else {
        return false;
    }
}

const redirectCategory = (id: string) => {
    router.push({
        name: 'Category',
        params: {id}
    })
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/homeCommon/header.scss';
</style>
<style lang="scss">
.el-drawer.rtl.open {
    background-color: #eeecec !important;
}
.el-drawer__header {
    margin: 0 !important;
}
.search {
    .el-input__wrapper {
        border-radius: 20px;
    }
}
.menu-tab-responsive {
    .el-tabs__nav {
        width: 100%;
        .el-tabs__item {
            width: 50%;
            text-align: center;
        }
    }
}

</style>