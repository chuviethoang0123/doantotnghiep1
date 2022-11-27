<template>
    <div class="home-checkout">
        <el-row :gutter="50">
            <el-col :span="15">
                <div class="info-order">Thông tin đặt hàng</div>
                <div class="info-order-content">
                    <span class="note-text">Bạn cần nhập đầy đủ các thông tin có dấu *</span>
                    <div class="text">
                        <el-input v-model:value="name" placeholder="Họ và tên *">
                            <template #prefix>
                                <!-- <user-outlined type="user" /> -->
                            </template>
                        </el-input>
                        <div class="errors" v-if="listErrors.name">{{ listErrors.name[0] }}</div>
                    </div>
                    <div class="text">
                        <el-input v-model:value="phone" placeholder="Số điện thoại *">
                            <template #prefix>
                                <!-- <phone-outlined type="phone" /> -->
                            </template>
                        </el-input>
                        <div class="errors" v-if="listErrors.phone">{{ listErrors.phone[0] }}</div>
                    </div>

                    <div class="text">
                        <div class="address">
                            <el-row :gutter="16">
                                <el-col :span="8">
                                    <el-select v-model:value="province">
                                        <el-option value="">
                                            Tỉnh/Thành phố *
                                        </el-option>
                                        <el-option v-for="item in city" :value="item.ProvinceID"
                                            :key="item.index">
                                            {{ item.ProvinceName }}
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-select v-model:value="huyen">
                                        <el-option value="">
                                            Quận/Huyện *
                                        </el-option>
                                        <el-option v-for="item in district" :value="item.DistrictID"
                                            :key="item.index">
                                            {{ item.DistrictName }}
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-select v-model:value="phuong">
                                        <el-option value="">
                                            Phường/Xã *
                                        </el-option>
                                        <el-option v-for="item in ward" :value="item.WardCode"
                                            :key="item.index">
                                            {{ item.WardName }}
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <div class="errors">
                                <div v-if="listErrors.province">{{ listErrors.province[0] }}</div>
                                <div v-if="listErrors.district">{{ listErrors.district[0] }}</div>
                                <div v-if="listErrors.ward">{{ listErrors.ward[0] }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="text">
                        <el-input v-model:value="mail" placeholder="Email *">
                            <!-- <template #prefix>
                                <mail-outlined type="mail" />
                            </template> -->
                        </el-input>
                        <div class="errors" v-if="listErrors.email">{{ listErrors.email[0] }}</div>
                    </div>

                    <el-input v-model:value="note" placeholder="Ghi chú" type="textarea"/>
                    <el-button @click="showModal">Chọn hoặc nhập mã giảm giá</el-button><br>
                    <el-button class="btn-submit" @click="payment">Xác nhận và đặt hàng</el-button>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="info-payment">
                    <div class="title-info">Đơn hàng của bạn</div>
                    <div class="product">
                        <div class="title">Sản phẩm</div>
                        <div class="product-content">
                            <el-row v-for="(item,index) in carts.carts" :key="index">
                                <el-col :span="12">
                                    <div class="text">{{item.name}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="value">{{ $filters.formatVND(item.price) }}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="content">
                        <el-row>
                            <el-col :span="12">
                                <div class="text">Tổng</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="value">{{ $filters.formatVND(carts.sum_price) }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div class="text">Mã giảm giá:</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="value">- {{ okVoucher.discount_price ? $filters.formatVND(okVoucher.discount_price) : '0đ' }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div class="text">Phí vận chuyển:</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="value">{{ shipPrice.total ? $filters.formatVND(shipPrice.total) : '' }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div class="text">Thanh toán:</div>
                            </el-col>
                            <el-col :span="12">
                                <div v-if="!okVoucher.discount_price" class="value">{{ shipPrice.total ? $filters.formatVND(carts.sum_price + shipPrice.total) : $filters.formatVND(carts.sum_price) }}</div>
                                <div v-else class="value">{{ shipPrice.total ? new $filters.formatVND(carts.sum_price - okVoucher.discount_price + shipPrice.total) : $filters.formatVND(carts.sum_price - okVoucher.discount_price) }}</div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="payment-format">
                        <div class="text">Hình thức thanh toán: {{ selectPayment }}</div>
                        <div class="select-payment">
                            <el-radio-group v-model:value="selectPayment">
                                <el-radio-button value="shipcode">
                                    <img width="35" height="35" src="../../../assets/images/shipcode.png" alt="">
                                </el-radio-button>
                                <el-radio-button value="vnpay">
                                    <img width="35" height="35" src="../../../assets/images/vnpay.png" alt="">
                                </el-radio-button>
                                <el-radio-button value="momo">
                                    <img width="35" height="35" src="../../../assets/images/momo.jpg" alt="">
                                </el-radio-button>
                                <el-radio-button value="paypal">
                                    <img width="35" height="35" src="../../../assets/images/paypal.jpg" alt="">
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore();
const router = useRouter();

const listProduct = ref({});
const name = ref('');
const phone = ref('');
const mail = ref('');
const note = ref('');
const city = ref('');
const district = ref('');
const ward = ref('');
const province = ref('');
const huyen = ref('');
const phuong = ref('');
const service = ref('');
const shipPrice = ref('');

const listErrors = ref({});
const okVoucher = reactive({
    discount_price: 0,
})
const selectPayment = ref('');



//computed
const carts = computed(() => {
    let shoppingCart = JSON.parse(JSON.stringify(store.state.home.cartData))
    if (shoppingCart) {
        return JSON.parse(JSON.stringify(store.state.home.cartData));
    }
});

// function
const payment = () => {

}

const showModal = () => {

}
</script>
<style lang="scss" scoped>
::v-deep.home-checkout {
    .info-order {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 10px;
    }

    .info-order-content {
        text-align: center;
        button {
            margin-top: 30px;
            border-radius: 15px;
            color: #7a4f3f;
            border-color: #7a4f3f;
            font-weight: bold;

            &:hover {
                color: #ffffff;
                background-color: #7a4f3f;
            }
        }

        .btn-submit {
            width: 100%;
            background-color: #74d443;
            color: #ffffff;
        }
    }
    .info-payment {
        .title-info {
            font-weight: bold;
            font-size: 18px;
            padding: 0px 0px 25px 0px;
        }
        .content {
            .el-row {
                border-bottom: 1px solid #e5e5e5;
                padding: 5px 0px;
                .text {
                    font-weight: 600;
                }
                .value {
                    text-align: right;
                    font-weight: 600;
                }
            }
        }
    }
    .product {
        border-bottom: 1px solid #e5e5e5;
        margin: 0;
        .title {
            font-weight: 600;
            padding: 0px 0px 10px 0px;
        }
        .product-content {
            margin: 0px 0px 10px 10px;
        }
        .el-row {
            .text {
                color: #7a4f3f;
            }
            .value {
                text-align: right;
                font-weight: 600;
            }
        }
    }
    .payment-format {
        .text {
            padding: 10px 0px;
            font-weight: 600;
        }
        .el-radio-button__inner {
            padding: 2px;
        }
    }
}
</style>