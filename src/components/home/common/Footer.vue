<template>
    <div>
        <div class="footer-webview">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="12" :md="6">
                    <h2>Về chúng tôi</h2>
                    <div class="logo">
                        <img style="width: 80%; height: 70px" src="@/assets/images/icon-logo.png" alt="">
                    </div>
                    <div class="info">Cung cấp sản phẩm chất lượng từ các thị trường và thương hiệu hàng đầu</div>
                    <div class="address">
                        <el-icon><Location /></el-icon> Địa chỉ: Nguyên Hanh, Văn Tự, Thường Tín, Hà Nội
                    </div>
                    <div class="phone">
                        <el-icon><Phone /></el-icon> Số điện thoại: 0386132297
                    </div>
                    <div class="email">
                        <el-icon><ChatLineRound /></el-icon> Email: dungvm@wru.vn
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6">
                    <h2>Chính sách</h2>
                    <div class="policy">
                        <p>Giới thiệu</p>
                        <p>Chương trình khuyến mãi</p>
                        <p>Hệ thống cửa hàng</p>
                        <p>Hướng dẫn đặt hàng</p>
                        <p>Kiểm tra đơn hàng</p>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6">
                    <h2>Hỗ trợ khách hàng</h2>
                    <div class="support">
                        <p>Thông tin liên hệ</p>
                        <p>Chính sách giao hàng</p>
                        <p>Chính sách đổi hàng</p>
                        <p>Chính sách bảo mật</p>
                        <p>Điều khoản dịch vụ</p>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6">
                    <h2>Đăng kí nhận tin</h2>
                    <div class="register">
                        <el-input v-model:value="search" :placeholder="'Nhập email...'" enter-button :suffix-icon="Search"/>
                    </div>
                    <h2>Phương thức thanh toán</h2>
                    <div class="img" style="margin-bottom: 15px">
                        <img width="40" height="40" src="../../../assets/images/vnpay.png" alt="">
                        <img width="60" height="40" src="../../../assets/images/paypal.jpg" alt="">
                        <img width="40" height="40" src="../../../assets/images/momo.png" alt="">
                    </div>
                    <div class="check">
                        <img style="width:50%" src="https://bizweb.dktcdn.net/100/426/076/themes/860693/assets/logo_bct.png?1652326456240"
                            alt="">
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Location, Phone, ChatLineRound } from '@element-plus/icons-vue'
const search = ref('')
</script>

<style lang="scss">
    .footer-webview {
        margin: auto;
        max-width: 1200px;
        padding: 35px;
        h2 {
            color: #ffffff;
        }
        .logo {
            margin: 20px 0px;
        }
    }
</style>