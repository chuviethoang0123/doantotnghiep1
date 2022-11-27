<template>
    <div class="cart-checkout">
        <div class="step-bar">
            <el-steps :space="200" :active="stepActive" simple>
                <el-step title="Giỏ hàng" :icon="Edit" />
                <el-step title="Thanh toán" :icon="UploadFilled" />
                <el-step title="Thành công" :icon="Picture" />
            </el-steps>
        </div>
        <div v-show="stepActive === 0" class="cart">
            <el-row :gutter="17">
                <el-col :span="17" style="padding-right: 30px; border-right: 1px dashed #c6bdbd;">
                    <Cart />
                </el-col>
                <el-col :span="7" style="padding-left: 30px;">
                    <TotalCart />
                </el-col>
            </el-row>
        </div>
        <div v-show="stepActive === 1" class="checkout">
            <Checkout />
        </div>
        <div v-show="stepActive === 2" class="success-checkout">
            success
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue';
import Cart from '../../../components/home/cart/cart.vue';
import Checkout from '../../../components/home/cart/checkout.vue';
import TotalCart from '../../../components/home/cart/totalCart.vue';

import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore();
const router = useRouter();
const route = useRoute();

const stepActive = ref(0);

watch(() => route.query.step, (val:any) => {
    stepActive.value = val ? Number(val) : 0
},{immediate:true});
</script>
<style lang="scss" scoped>
.cart-checkout {
    margin: 30px 0px 0px 0px;
    .step-bar {
        margin: 40px 0px;
        .el-steps--simple {
            border-radius: 25px;
        }
    }
}
</style>