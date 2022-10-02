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
                        <div class="header-top-right" v-if="!user"><a @click="login">Đăng nhập</a>/<a @click="register">Đăng ký</a></div>
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
                                    <el-dropdown-item><el-icon><User /></el-icon>Cá nhân</el-dropdown-item>
                                    <el-dropdown-item><el-icon><ShoppingCart /></el-icon>Đơn hàng</el-dropdown-item>
                                    <el-dropdown-item><el-icon><SwitchButton /></el-icon>Đăng xuất</el-dropdown-item>
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
                        <el-image :src="'https://bactom.com/wp-content/uploads/2022/05/logo.png'"/>
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
                    <el-menu-item index="1">Bác tôm</el-menu-item>
                    <el-sub-menu index="2">
                    <template #title>Về bác tôm</template>
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item two</el-menu-item>
                    <el-menu-item index="2-3">item three</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="3">Sản phẩm</el-menu-item>
                    <el-menu-item index="4">Tin tức</el-menu-item>
                    <el-menu-item index="5">Blog sống xanh</el-menu-item>
                    <el-menu-item index="6">Hệ thống cửa hàng</el-menu-item>
                </el-menu>
                <div class="search">
                    <el-input v-model:value="search" :placeholder="'Tìm sản phẩm...'" enter-button :suffix-icon="Search"/>
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
                <el-badge :value="12" class="item-badge" @click="visible = true" round>
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
                    <el-icon :size="30"><CircleClose /></el-icon>
                </div>
            </div>
            <div style="height:1px; background: #c3b3b3; margin:20px 0px"/>
            <div class="total-money">Tổng tiền: {{ $filters.formatVND(carts.sum_price) }}</div>
            <div style="height:1px; background: #c3b3b3; margin:20px 0px" />
            <div class="form-button">
                <el-button class="btn-cart" size="large" round>XEM GIỎ HÀNG</el-button>
                <el-button class="btn-checkout" size="large" round>THANH TOÁN</el-button>
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
                        <el-menu-item index="1">
                            <span>ĐỒ SƠ CHẾ</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <span>HẢI SẢN VÙNG MIỀN</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span>HÀNG KHÔ</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span>RAU CỦ QUẢ</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <span>THỊT CÁ DÂN DÃ</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <span>TRÁI CÂY THEO MÙA</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <span>THỰC PHẨM KHÁC</span>
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
                            <span>BÁC TÔM</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <span>VỀ BÁC TÔM</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span>SẢN PHẨM</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span>TIN TỨC</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <span>BLOG SỐNG XANH</span>
                        </el-menu-item>
                        <el-sub-menu index="6" v-if="user">
                            <template #title>
                                <span>{{ user.name }}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1"><el-icon><User /></el-icon>Cá nhân</el-menu-item>
                                <el-menu-item index="1-2"><el-icon><ShoppingCart /></el-icon>Đơn hàng</el-menu-item>
                                <el-menu-item index="1-3"><el-icon><SwitchButton /></el-icon>Đăng xuất</el-menu-item>
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
</template>
<script lang="ts" setup>
import { inject } from 'vue'
import 'element-plus/theme-chalk/display.css'
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElButton, ElDrawer } from 'element-plus'
import { CircleCloseFilled, ShoppingCart, Search, SwitchButton } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'

const store = useStore();
const router = useRouter();
const emitter = inject("emitter");

const visible = ref(false);
const visibleMenu = ref(false);
const search = ref('');
const activeIndex = ref('1');
const activeName = ref('first')
const checkScreen = ref(window.innerWidth);

onMounted(async() => {
    window.addEventListener('resize', () => {checkScreen.value = window.innerWidth} );
    await getMyInfo();
    await getCart();
})
onUnmounted(() => { 
    window.removeEventListener('resize', () => {checkScreen.value = window.innerWidth})
})


async function getCart() {
    let params = {
        product_id: '',
        quantity: ''
    }
    let user = JSON.parse(JSON.stringify(store.state.auth))
    
    if (user) {
        await store.dispatch('home/cartData', params);
    } else {
        return
    }
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

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
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