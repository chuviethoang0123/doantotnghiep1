<template>
    <div class="table-product">
        <el-row :gutter="16" class="title-header">
            <el-col :span="7">Sản phẩm</el-col>
            <el-col :span="2"></el-col>
            <el-col :span="5">Đơn giá</el-col>
            <el-col :span="5">Số lượng</el-col>
            <el-col :span="4">Số tiền</el-col>
            <el-col :span="1"></el-col>
        </el-row>
        <el-row :gutter="16" v-for="(item, index) in carts.carts" :key="item.id"
            style="padding: 5px 0px; border-bottom: 1px solid #c6bdbd; ">
            <el-col :span="7">
                <div class="product">
                    <img width="60" height="60" v-bind:src="item.image" alt="">
                    <div class="product_name">{{ item.name }}</div>
                </div>
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="5">
                <div class="money">
                    <div v-if="item.discount">
                        <span class="sale">{{ $filters.formatVND(item.price - ((item.discount / 100) * item.price)) }}&emsp;</span>
                        <span class="origin"><del>{{ $filters.formatVND(item.price) }}</del></span>
                    </div>
                    <div v-else>
                        <span class="money">{{ $filters.formatVND(item.price) }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="5" class="quantity">
                <div class="quantity-toggle">
                    <el-button type="success" @click="reduction(item.id, index)" :icon="Minus" circle/>
                    <el-input class="input-quantity" v-model:value="item.quantity" disabled />
                    <el-button type="success" @click="plus(item.id, index)" :icon="Plus" circle/>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="total">
                    <div v-if="item.discount">
                        <span class="sale">{{ $filters.formatVND((item.price - ((item.discount / 100) * item.price)) * item.quantity) }}&emsp;</span>
                    </div>
                    <div v-else>
                        <span class="money">{{ $filters.formatVND(item.price) }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="1" class="icon-delete">
                <a @click="deleteProduct(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 30 30" width="25px"
                        height="25px">
                        <path
                            d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
                    </svg>
                </a>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, computed, reactive } from 'vue'
import {Plus, Minus} from '@element-plus/icons-vue'
import api from "../../../api/home";
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore();
const router = useRouter();

const selectVoucher = ref('');

const listProduct = ref({
    carts: [],
    sum_price: '',
    sum_quantity: '',
});


//computed
const carts = computed(() => {
    let shoppingCart = JSON.parse(JSON.stringify(store.state.home.cartData))
    if (shoppingCart) {
        listProduct.value = JSON.parse(JSON.stringify(store.state.home.cartData))
        return JSON.parse(JSON.stringify(store.state.home.cartData));
    }
});

//function
const reduction = (product_id: String, index: number) => {
    if (listProduct.value.carts[index].quantity <= 1) {
        return false;
    } else {
        listProduct.value.carts[index].quantity--
        let params = {
            type: 'update',
            quantity: listProduct.value.carts[index].quantity,
            product_id: product_id
        }
        store.dispatch('home/cartData', params);
        setTimeout(() => checkVoucher(), 1500);
        // this.checkVoucher();
    }
}
const plus = (product_id: String, index: number) => {
    listProduct.value.carts[index].quantity++
    let params = {
        type: 'update',
        quantity: listProduct.value.carts[index].quantity,
        product_id: product_id
    }
    store.dispatch('home/cartData', params);
    setTimeout(() => checkVoucher(), 1500);
    // this.checkVoucher();
}
const deleteProduct = (product_id: string) => {
    let params = {
        type: 'delete',
        quantity: '',
        product_id: product_id
    }
    store.dispatch('home/cartData', params);
}
const checkVoucher = async () => {
    let params = {
        user_id: 1,
        code_voucher: selectVoucher.value,
        price: store.state.home.cartData.sum_price
    };
    let res = await api.checkVoucher(params);
    // if (res.status === true) {
    //     this.okVoucher = res.data;
    //     this.visible = false;
    //     this.messageError = '';
    // } else {
    //     this.messageError = res.message;
    // }
}
</script>
<style lang="scss" scoped>
::v-deep.table-product {
    .el-row {
        align-items: center;
    }
    .product {
        display: flex;
        align-items: center;
        img {
            margin-right: 10px;
        }
    }
    .money {
        margin-top: 15px;

        .sale {
            color: #d82e4d;
            font-size: 16px;
            margin: 3px 17px 0px 0px;
        }

        .origin {
            color: #747071;
            font-size: 14px;
            margin-right: 20px;
        }
    }
    .total {
        .sale {
            color: #d82e4d;
            font-size: 18px;
        }
    }
    .quantity {
        display: flex;
        .quantity-toggle {
            .input-quantity {
                width: 50px;
                .el-input__wrapper {
                    background: #ffffff;
                }
                .el-input__inner {
                    text-align: center;
                }
            }
        }
    }

    .icon-delete {
        padding-top: 6px;
    }
}
</style>