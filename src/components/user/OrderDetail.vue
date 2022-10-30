<template>
    <div class="user-order-detail">
        <div class="cart" v-if="carts.length">
            <div class="order-cart" v-for="(cart, index) in carts" :key="index" @click="orderDetail(index)">
                <div class="order-code" style="margin-bottom:10px;"><strong> Đơn hàng: {{ cart[0].code }} <span
                            v-if="props.stt === ''">- {{ cart[0].action }}</span></strong>
                </div>
                <div class="product-order">
                    <el-row :gutter="16" v-for="(item, index) in cart[1]" :key="index"
                        style="padding: 5px 0px; border-bottom: 1px solid #c6bdbd; ">
                        <el-col :span="16">
                            <div class="product">
                                <img width="80" height="80" v-bind:src="item.product_image" alt="">
                                <div class="product_name">
                                    <p>{{ item.product_name }}</p>
                                    <p>x{{ item.quantity }}</p>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="6">
                            <div class="total">
                                <div>
                                    <span class="sale">{{ $filters.formatVND(item.detail_amount) }}&emsp;</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="order-total">
                    Tổng số tiền: {{ $filters.formatVND(cart[0].order_total_money) }}
                </div>
            </div>
        </div>

        <!-- check đơn hàng trống -->
        <div v-else class="cart" style="text-align:center; margin-top: 50px">
            <img src="@/assets/images/order-empty.jpg" alt="">
            <p style="font-size: 20px; color: #d82e4d">Không có đơn hàng nào</p>
        </div>

        <!-- Popup chi tết đơn hàng -->
        <el-dialog
            v-model="visible"
            title="Chi tiết đơn hàng"
            width="70%"
        >
            <div class="condition">
                <el-row :gutter="16" v-for="(item, index) in productOrder[1]" :key="index"
                    style="padding: 5px 0px; border-bottom: 1px solid #c6bdbd; ">
                    <el-col :span="15">
                        <div class="product">
                            <img width="80" height="100" v-bind:src="item.product_image" alt="">
                            <div class="product_name">
                                <p>{{ item.product_name }}</p>
                                <p>x{{ item.quantity }}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="4">
                        <div class="total">
                            <div>
                                <span class="sale">{{ $filters.formatVND(item.detail_amount) }}&emsp;</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="total" v-if="props.stt == '4' && item.rate === true">
                            <el-button type="primary" @click="userRate(item.product_id)">Đánh giá</el-button>
                        </div>
                    </el-col>
                </el-row>
                <div class="detail" style="font-size: 16px">
                    <div class="total-product">Tổng tiền hàng: {{ $filters.formatVND(productOrder[1].reduce((accumulator,
                            current) => accumulator + current.detail_amount, 0))
                    }}</div>
                    <div class="payship">Phí vận chuyển: {{ $filters.formatVND(productOrder[0].pay_ship) }}</div>
                    <div class="voucher" v-if="productOrder[0].voucher">Giảm giá: - {{
                            $filters.formatVND(productOrder[0].voucher)
                    }}</div>
                    <div class="order-total">Tổng tiền thanh toán: {{ $filters.formatVND(productOrder[0].order_total_money) }}
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">Đóng</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- Popup đánh giá sản phẩm đơn hàng -->
        <el-dialog
            v-model="visibleRate"
            title="Đánh giá sản phẩm"
            width="50%"
        >
            <template #footer>
                <el-button key="back" @click="visibleRate = false">Hủy bỏ</el-button>
                <el-button key="submit" type="primary" @click="handleOk">Đánh giá</el-button>
            </template>
            <el-rate v-model="rate" /><br><br>
            <el-input v-if="rate" v-model="rateComment" placeholder="Nhập đánh giá" />
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

import { ref, inject, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

import api from "../../api/home";

const props = defineProps({
  stt: { type: String, default: '' },
})

const emitter = inject("emitter");
const store = useStore();
const router = useRouter();

const id = ref('');
const productOrder = ref({});
const visible = ref(false);
const visibleRate = ref(false);
const rate = ref(0);
const rateComment = ref('');
const productRateId = ref(0);

const carts = computed(() => {
    let shoppingCart = JSON.parse(JSON.stringify(store.state.home.getCart))
    if (shoppingCart) {
        return JSON.parse(JSON.stringify(store.state.home.getCart));
    }
})

onMounted(async() => {
    emitter.on("user_id", (data: any) => {
        id.value = data.id
        getCart(id.value)
    })
})

watch(() => props.stt, (first, second) => {
    getCart(id.value);
});

// các hàm xử lý
const getCart = (id: String) => {
    let params = {
        status: props.stt,
        user_id: id ? id : store.state.auth.myId
    }
    store.dispatch('home/getCart', params);
}

const handleOk = async () => {
    if (rate.value === 0) {
        ElMessage.error('Bạn chưa đánh giá sản phẩm')
    } else {
        let params = {
            product_id: productRateId.value,
            rate: rate.value,
            comment: rateComment.value,
            user_id: store.state.auth.user.id ? store.state.auth.user.id : localStorage.getItem('user_id')
        }

        let res = await api.userRate(params);
        if (res.status === true) {
            router.push({name: 'Home'})
            ElMessage({
                message: 'Cảm ơn bạn đã đánh giá sản phẩm',
                type: 'success',
            })
        } else {
            ElMessage.error('Có lỗi xảy ra, vui lòng thử lại')
        }
    }
}

const orderDetail = (index: number) => {
    productOrder.value = carts.value[index];
    visible.value = true;
}

const userRate = (id: number) => {
    visibleRate.value = true;
    productRateId.value = id;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pageHome/user-order.scss";
</style>