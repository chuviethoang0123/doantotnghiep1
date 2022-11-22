<template>
    <div class="user-order">
        <div class="title">Đơn hàng</div>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="Tất cả" name=""></el-tab-pane>
            <el-tab-pane label="Chờ xác nhận" name="1"></el-tab-pane>
            <el-tab-pane label="Chờ lấy hàng" name="2"></el-tab-pane>
            <el-tab-pane label="Đang giao" name="3"></el-tab-pane>
            <el-tab-pane label="Đã giao" name="4"></el-tab-pane>
            <el-tab-pane label="Đã hủy" name="5"></el-tab-pane>
        </el-tabs>
        <OrderDetail :stt="activeName" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import OrderDetail from '../../../components/user/OrderDetail.vue';
const activeName = ref('1')
</script>

<style lang="scss" scoped>
.user-order {
    max-width: 800px;
    margin: 0 auto;
    .title {
        text-align: center;
        font-size: 22px;
        padding: 30px 0px;
        font-weight: bold;
        color: #7a4f3f;
    }
}
</style>
<style lang="scss">
.user-order {
    .el-tabs__nav.is-top {
        width: 100%;
        text-align: center;
        z-index: 1;
    }
    .el-tabs__content {
        display: none;
    }
}
</style>