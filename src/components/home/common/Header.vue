<template>
    <div class="header-webview" v-if="checkScreen > 850">
        <div class="header-top">
            <div class="content">
                <el-row :gutter="20">
                    <el-col :span="9"><div class="grid-content ep-bg-purple" />
                        <div>
                            <el-icon><LocationFilled /></el-icon>
                            Location | 
                            <el-icon><Promotion /></el-icon> 
                            Contact | 
                            <el-icon><PhoneFilled /></el-icon> 
                            0386132297</div>
                    </el-col>
                    <el-col :span="6" :offset="9"><div class="grid-content ep-bg-purple"/>Đăng nhập/Đăng ký</el-col>
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
                            <el-badge :value="12" class="item-badge">
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
    <div v-else class="header-webview">
        abc
    </div>
    <el-drawer v-model="visible" :show-close="false" :size="'30%'">
        <template #header="{ close }">
            <div class="icon-close">
                <el-icon @click="close" :size="30"><CloseBold /></el-icon>
            </div>
        </template>
        <div class="cart-title">Giỏ hàng</div>
        <div class="cart">
            <div class="cart-content">
                <div class="cart-content-left">
                    <div class="img">
                        <img src="@/assets/images/1.jpg" alt="">
                    </div>
                    <div class="product">
                        <div class="product-name">
                            Bánh bao mộc
                        </div>
                        <div class="product-price">
                            1 x 30.000đ
                        </div>
                    </div>
                </div>
                <div class="btn-close">
                    <el-icon :size="30"><CircleClose /></el-icon>
                </div>
            </div>
            <div class="cart-content">
                <div class="cart-content-left">
                    <div class="img">
                        <img src="@/assets/images/1.jpg" alt="">
                    </div>
                    <div class="product">
                        <div class="product-name">
                            Bánh bao mộc
                        </div>
                        <div class="product-price">
                            1 x 30.000đ
                        </div>
                    </div>
                </div>
                <div class="btn-close">
                    <el-icon :size="30"><CircleClose /></el-icon>
                </div>
            </div>
            <div style="height:1px; background: #c3b3b3; margin:20px 0px"/>
            <div class="total-money">Tổng tiền: 30.000đ</div>
            <div style="height:1px; background: #c3b3b3; margin:20px 0px" />
            <div class="form-button">
                <el-button class="btn-cart" :size="30" round>XEM GIỎ HÀNG</el-button>
                <el-button class="btn-checkout" :size="30" round>THANH TOÁN</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'
import { CircleCloseFilled, ShoppingCart, Search } from '@element-plus/icons-vue'
const visible = ref(false);
const search = ref('');
const activeIndex = ref('1');
const checkScreen = ref(window.innerWidth);
watch(checkScreen, () => {
    console.log("Data count vừa thay đổi");
});
onMounted(() => {
    window.addEventListener('resize', () => {checkScreen.value = window.innerWidth} )
})
onUnmounted(() => {
    window.removeEventListener('resize', () => {checkScreen.value = window.innerWidth})
})

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  console.log(screen.width);
  
}



</script>
<style lang="scss" scoped>
    .header-webview {
        .header-top, .header-bottom {
            background: #7a4f3f;
            color: #ffffff;
        }
        .header-top {
            // height: 40px;
            .content {
                padding: 10px 0px;
            }
        }
        .header-center {
            .content {
                padding: 20px 0px;
                .el-content {
                    padding: 0px 5px;
                    .header-infomation {
                        display: flex;
                        height: 100%;
                        align-items: center;
                    }
                }
                .cart {
                    .item-badge {
                        .el-button {
                            padding: 16px 16px;
                            span {
                                font-weight: bold;
                                font-size: 17px;
                            }
                        }
                    } 
                }
            }
        }
        .header-bottom {
            .el-menu--horizontal {
                border-bottom: none;
            }
            .el-menu {
                background-color: none !important;
            }
            .el-menu-item {
                color: #ffffff;
                &:hover {
                    background: #74d443;
                }
            }
            .el-menu--horizontal>.el-sub-menu .el-sub-menu__title {
                color: #ffffff;
            }
            .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .el-menu {
                    width: 100%;
                }
                .search {
                    .el-input__wrapper {
                        border-radius: 20px;
                    }
                }
            }
        }
        .content {
            margin: 0 auto;
            max-width: 1200px;
        }
    }
    .cart {
        .cart-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            border-radius: 10px;
            padding: 10px;
            margin: 10px 0px;
            cursor: pointer;
            .cart-content-left {
                display: flex;
                .product {
                    padding: 0px 20px;
                    .product-name {
                        color: #74d443;
                        font-size: 18px;
                        padding: 0px 0px 10px 0px;
                    }
                }
                .img {
                    img {
                        width: 70px;
                        height: 70px;
                    }
                }
            }
            &:hover {
                .btn-close {
                    display: block;
                }
            }
            .btn-close {
                display: none;
            }
        }
        .total-money {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
        .form-button {
            .btn-cart {
                background-color: #7a4f3f;
                color: #ffffff;
                font-size: 17px;
                margin: 5px 0px;
                padding: 22px 0px;
                width: 100%;
                font-weight: bold;
            }
            .btn-checkout {
                background-color: #74d443;
                color: #ffffff;
                font-size: 17px;
                margin: 5px 0px;
                padding: 22px 0px;
                width: 100%;
                font-weight: bold;
            }
        }
    }
    .cart-title {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        margin: 0px 0px 20px 0px;

    }
    .icon-close {
        text-align: right;
        .el-icon {
            cursor: pointer;
        }
    }
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
</style>