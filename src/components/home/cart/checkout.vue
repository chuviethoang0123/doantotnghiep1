<template>
    <div class="home-checkout">
        <el-row :gutter="50">
            <el-col :span="15">
                <div class="info-order">Thông tin đặt hàng</div>
                <div class="info-order-content">
                    <span class="note-text">Bạn cần nhập đầy đủ các thông tin có dấu *</span>
                    <div class="text">
                        <el-input v-model="name" placeholder="Họ và tên *" />
                        <div class="errors" v-if="listErrors.name">{{ listErrors.name[0] }}</div>
                    </div>
                    <div class="text">
                        <el-input v-model="phone" placeholder="Số điện thoại *" />
                        <div class="errors" v-if="listErrors.phone">{{ listErrors.phone[0] }}</div>
                    </div>

                    <div class="text">
                        <div class="address">
                            <el-row :gutter="16">
                                <el-col :span="8">
                                    <el-select v-model="province" placeholder="Tỉnh/Thành phố *">
                                        <el-option value="">
                                            Tỉnh/Thành phố *
                                        </el-option>
                                        <el-option v-for="item in city"
                                            :value="item.ProvinceID"
                                            :label="item.ProvinceName"
                                            :key="item.ProvinceID" />
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-select v-model="huyen" placeholder="Quận/Huyện *">
                                        <el-option value="">
                                            Quận/Huyện *
                                        </el-option>
                                        <el-option v-for="item in district" 
                                            :value="item.DistrictID"
                                            :label="item.DistrictName"
                                            :key="item.index" />
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-select v-model="phuong" placeholder="Phường/Xã *">
                                        <el-option value="">
                                            Phường/Xã *
                                        </el-option>
                                        <el-option v-for="item in ward" 
                                            :value="item.WardCode"
                                            :label="item.WardName"
                                            :key="item.index" />
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
                        <el-input v-model="mail" placeholder="Email *" />
                        <div class="errors" v-if="listErrors.email">{{ listErrors.email[0] }}</div>
                    </div>

                    <el-input v-model="note" placeholder="Ghi chú" type="textarea"/>
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
                                    <span class="text">{{item.name}} </span>
                                    <span>x {{item.quantity}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <div v-if="item.discount" class="value">{{ $filters.formatVND((item.price - ((item.discount / 100) * item.price)) * item.quantity) }}</div>
                                    <div v-else class="value">{{ $filters.formatVND(item.price * item.quantity) }}</div>
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
                                <div class="value">- {{ state.okVoucher.discount_price ? $filters.formatVND(state.okVoucher.discount_price) : '0đ' }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div class="text">Phí vận chuyển:</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="value">{{ state.shipPrice.total ? $filters.formatVND(state.shipPrice.total) : '' }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div class="text">Thanh toán:</div>
                            </el-col>
                            <el-col :span="12">
                                <div v-if="!state.okVoucher.discount_price" class="value">{{ state.shipPrice.total ? $filters.formatVND(carts.sum_price + state.shipPrice.total) : $filters.formatVND(carts.sum_price) }}</div>
                                <div v-else class="value">{{ state.shipPrice.total ? new $filters.formatVND(carts.sum_price - state.okVoucher.discount_price + state.shipPrice.total) : $filters.formatVND(carts.sum_price - state.okVoucher.discount_price) }}</div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="payment-format">
                        <div class="text">Hình thức thanh toán: {{ selectPayment }}</div>
                        <div class="select-payment">
                            <el-radio-group v-model="selectPayment">
                                <el-radio-button label="shipcode">
                                    <img width="35" height="35" src="../../../assets/images/shipcode.png" alt="">
                                </el-radio-button>
                                <el-radio-button label="vnpay">
                                    <img width="35" height="35" src="../../../assets/images/vnpay.png" alt="">
                                </el-radio-button>
                                <el-radio-button label="momo">
                                    <img width="35" height="35" src="../../../assets/images/momo.jpg" alt="">
                                </el-radio-button>
                                <el-radio-button label="paypal">
                                    <img width="35" height="35" src="../../../assets/images/paypal.jpg" alt="">
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-dialog class="select-voucher" v-model="visible" width="600px">
            <template #title>
                <div class="title">
                    Chọn voucher
                </div>
                <div class="search">
                    <div class="text">Mã voucher</div>
                    <el-input v-model="selectVoucher"
                        placeholder="Nhập mã Voucher cần áp dụng" size="large">
                        <template #append>
                            <el-button @click="checkVoucher" :icon="Search" />
                        </template>
                    </el-input>
                </div>
                <div class="message-error" style="margin-top: 20px; text-align: center"
                    v-if="messageError">
                    <!-- <close-circle-outlined @click="closeError" /> -->
                    <span style="color: red;">{{ messageError }}</span>
                </div>
            </template>
            <template #footer>
                <el-button key="back" @click="handleCancel">Trở lại</el-button>
                <el-button key="submit" type="primary" @click="checkVoucher">Đồng ý</el-button>
            </template>
            <el-radio-group v-model="selectVoucher">
                <el-radio-button :label="item.code" v-for="item in state.listVoucher" :key="item.index"
                    :disabled="item.status === false">
                    <div class="select-voucher">
                        <img width="100" v-bind:src="item.image" alt="">
                        <div class="content">
                            <div class="voucher-code">{{ item.code }}</div>
                            <div class="describe">{{ item.name }} - Đơn tối thiểu {{ new
                                    Intl.NumberFormat('de-DE', {
                                        style: 'currency', currency: 'VND'
                                    }).format(item.minimum_order)
                            }}</div>
                            <div class="end-date">HSD: {{ item.end_date }}</div>
                            <div class="click-detail">Chi tiết</div>
                        </div>
                    </div>
                </el-radio-button>
            </el-radio-group>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, computed, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import api from "../../../api/home";
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
const visible = ref(false);
const selectVoucher = ref('');
const messageError = ref('');

const listErrors = ref({});
const selectPayment = ref('shipcode');

const state = reactive({
    service: [],
    listVoucher: [],
    shipPrice: {
        cod_fee: 0,
        coupon_value: 0,
        document_return: 0,
        double_check: 0,
        insurance_fee: 0,
        pick_station_fee: 0,
        r2s_fee: 0,
        service_fee: 0,
        total: 0,
    },
    okVoucher: {
        discount_price: 0,
        voucher_id: ''
    }
})

onMounted(() => {
    getCity();
    vouchers();
})

//computed
const carts = computed(() => {
    let shoppingCart = JSON.parse(JSON.stringify(store.state.home.cartData))
    if (shoppingCart) {
        return JSON.parse(JSON.stringify(store.state.home.cartData));
    }
});

watch(() => province.value, (first, second) => {
    let params = {
        province_id: first
    }
    getDistrict(params);
});
watch(() => huyen.value, (first, second) => {
    let params = {
        district_id: first
    }
    getWard(params);

    let params1 = {
        shop_id: 2448165,
        from_district: 3303,
        to_district: huyen.value,
    }
    getService(params1);
});
watch(() => phuong.value, (first, second) => {
    let data = {
        service_id: state.service[0].service_id,
        insurance_value: store.state.home.cartData.sum_price,
        coupon: null,
        from_district_id: 3303,
        to_district_id: huyen.value,
        to_ward_code: phuong.value,
        height: 15,
        length: 15,
        weight: 1000,
        width: 15
    }
    shippingOrder(data);
});

// function
const payment = async () => {
    let params = {
        user_id: store.state.auth.user.id,
        type: selectPayment.value,
        name: name.value,
        phone: phone.value,
        email: mail.value,
        province: province.value,
        district: huyen.value,
        ward: phuong.value,
        total: state.shipPrice.total + store.state.home.cartData.sum_price - state.okVoucher.discount_price,
        pay_ship: state.shipPrice.total,
        voucher_id: state.okVoucher.voucher_id ? state.okVoucher.voucher_id : null,
        note: note.value
    }
    if (selectPayment.value === 'shipcode') {
        let res = await api.payment(params);
        if (res.status === true) {
            ElMessage({
                message: 'Đặt hàng thành công',
                type: 'success',
            })
            router.push({
                name: 'Cart',
                query: {
                    step: 2
                }
            })
        } else {
            if (res.errors) {
                listErrors.value = res.errors;
            } else {
                ElMessage.error(res.message);
            }
        }
    } else {
        if (selectPayment.value === 'vnpay' || selectPayment.value === 'momo') {
            let res = await api.payment(params);
            if (res.status === true) {
                window.location = res.data;
            } else {
                listErrors.value = res.errors;
            }
        } else {
            if (selectPayment.value === 'paypal') {
                ElMessage.error('Tính năng đang phát triển, chưa hỗ trợ thanh toán');
                return false;
            }
        }
    }
}

const showModal = () => {
    visible.value = true
}

const getCity = async () => {
    let res = await api.getCity();
    city.value = res;
}

const getDistrict = async (params: Object) => {
    let res = await api.getDistrict(params);
    district.value = res;
}

const getWard = async (params: Object) => {
    let res = await api.getWard(params);
    ward.value = res;
}

const getService = async (params: Object) => {
    let res = await api.getService(params);
    state.service = res;
}

const shippingOrder = async (data: Object) => {
    let res = await api.shippingOrder(data);
    state.shipPrice = res;
}
const vouchers = async () => {
    let res = await api.listVoucher();
    state.listVoucher = res;
}

const checkVoucher = async () => {
    let params = {
        user_id: store.state.auth.user.id,
        code_voucher: selectVoucher.value,
        price: store.state.home.cartData.sum_price
    };
    let res = await api.checkVoucher(params);
    if (res.status === true) {
        state.okVoucher = res.data;
        visible.value = false;
        messageError.value = '';
    } else {
        messageError.value = res.message;
    }
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
        .text {
            padding: 10px 0px;
            .el-input__wrapper {
                border-radius: 10px;
            }
        }
        .el-select {
            width: 100%;
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
                margin-right: 20px;
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
    .errors {
        color: red;
        text-align: left;
    }
}
.select-voucher {
    display: flex;
    width: 530px;
    .title {
        font-size: 20px;
    }
    .search {
        display: flex;
        align-items: center;
        margin-top: 20px!important;
        .text {
            width: 25%;
            font-size: 16px;
        }
    }
    .content {
        padding: 0 0 0 10px;
        text-align: left;
        div {
            padding: 5px 0px;
        }
    }
    .el-radio-button {
        padding: 10px 0px;
    }
    .el-radio-button__inner {
        border-left: none !important;
    }
}
</style>