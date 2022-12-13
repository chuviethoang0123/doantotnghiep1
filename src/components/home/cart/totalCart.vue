<template>
    <div class="total-cart">
        <div class="title">Cộng giỏ hàng</div>
        <el-row :gutter="24">
            <el-col :span="12">
                <div class="provisional">Tạm tính</div>
            </el-col>
            <el-col :span="12">
                <div class="total-text">{{ $filters.formatVND(carts.sum_price) }}</div>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <div class="provisional">Tổng</div>
            </el-col>
            <el-col :span="12">
                <div class="total-text">{{ $filters.formatVND(carts.sum_price) }}</div>
            </el-col>
        </el-row>
        <el-button class="btn-checkout" size="large" round @click="redirectCart">THANH TOÁN</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, computed, reactive } from 'vue'

import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore();
const router = useRouter();

const carts = computed(() => {
    let shoppingCart = JSON.parse(JSON.stringify(store.state.home.cartData))
    if (shoppingCart) {
        return JSON.parse(JSON.stringify(store.state.home.cartData));
    }
});

const redirectCart = () => {
    router.push({
        name: 'Cart',
        query: {
            step: 1
        }
    })
}
</script>
<style lang="scss" scoped>
.total-cart {
    .title {
        font-size: 18px;
        font-weight: 600;
        padding: 0px 0px 20px 0px;
    }
    .provisional {
        font-weight: 600;
    }
    .total-text {
        text-align: right;
    }
    .btn-checkout {
        margin: 30px 0px 0px 0px !important;
        background-color: #74d443;
        color: #ffffff;
        font-size: 17px;
        margin: 5px 0px;
        width: 100%;
        font-weight: bold;
    }
}
</style>
