<template>
    <div class="home-page">
        <div class="banner">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="list-category">
                        <div class="header">
                            DANH MỤC
                        </div>
                        <div class="content">
                            <div class="item" v-for="cate in categories" :key="cate.id">
                                <el-icon><Right /></el-icon>
                                <div class="cate-name">{{cate.name}}</div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <el-carousel :interval="4000" arrow="always">
                        <el-carousel-item v-for="(slide, index) in slides" :key="index">
                            <img style="width:100%; height:400px; border-radius: 20px" :src="slide.image">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </div>
        <div class="infomation">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="info-content">
                        <div class="content">
                            <div class="title">
                                Quy trình thuận tự nhiên
                            </div>
                            <div class="text">
                                Thuận tự nhiên là tôn chỉ của chúng tôi trong quá trình chăn nuôi, trồng cấy các sản phẩm để cung cấp đến người tiêu dung tại hệ thống chuỗi thực phẩm sạch Bác Tôm.
                            </div>
                        </div>
                        <div class="inner-icon">
                            <img src="https://bactom.com/wp-content/uploads/2022/05/banner1.png" alt="">
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="info-content">
                        <div class="content">
                            <div class="title">
                                Quy trình thuận tự nhiên
                            </div>
                            <div class="text">
                                Thuận tự nhiên là tôn chỉ của chúng tôi trong quá trình chăn nuôi, trồng cấy các sản phẩm để cung cấp đến người tiêu dung tại hệ thống chuỗi thực phẩm sạch Bác Tôm.
                            </div>
                        </div>
                        <div class="inner-icon">
                            <img src="https://bactom.com/wp-content/uploads/2022/05/banner2.png" alt="">
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="info-content">
                        <div class="content">
                            <div class="title">
                                Quy trình thuận tự nhiên
                            </div>
                            <div class="text">
                                Thuận tự nhiên là tôn chỉ của chúng tôi trong quá trình chăn nuôi, trồng cấy các sản phẩm để cung cấp đến người tiêu dung tại hệ thống chuỗi thực phẩm sạch Bác Tôm.
                            </div>
                        </div>
                        <div class="inner-icon">
                            <img src="https://bactom.com/wp-content/uploads/2022/05/banner3.png" alt="">
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="flash-sale">
            <el-row :gutter="24">
                <el-col
                    v-for="item in productsDiscount"
                    :key="item"
                    :span="6"
                >
                    <Product :product="item"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Product from '../../../components/common/Product.vue';
import { inject } from 'vue'
import api from "../../../api/home";
import 'element-plus/theme-chalk/display.css'
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { Right } from '@element-plus/icons-vue' 

const categories = ref([]);
const slides = ref([]);
const productsDiscount = ref([]);
const productsSelling = ref([]);
const vouchers = ref([]);

onMounted(async() => {
    getData();
})
const getData = () => {

    const promise1 = api.productsDiscount();
    const promise2 = api.productsSelling();
    const promise3 = api.listVoucher();
    const promise4 = api.getCategory();
    const promise5 = api.getSlide();

    Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function(values) {
        productsDiscount.value = values[0].productDiscount;
        productsSelling.value = values[1].productsSelling;
        vouchers.value = values[2];
        categories.value = values[3];
        slides.value = values[4].slide;
    });
}

</script>
<style lang="scss" scoped>
.home-page {
    margin-top: 30px;
    .banner {
        margin: 20px 0px;
        .list-category {
            border: 1px solid #cfc3c3;
            border-top: none;
            border-radius: 20px;
            height: 100%;
            .header {
                line-height: 30px;
                border: 1px solid;
                border-radius: 15px;
                text-align: center;
                background: #7a4f3f;
                color: #ffffff;
                border-top: none;
                font-weight: bold;
                padding: 2px 0px;
            }
            .content {
                padding: 20px;
                .item {
                    font-size: 18px;
                    line-height: 25px;
                    padding: 3px 0px;
                    display: flex;
                    align-items: center;

                    .cate-name {
                        margin: 0px 0px 0px 10px;
                    }
                }
            }
        }
    }
    .infomation {
        margin: 70px 0px;
        .info-content {
            height: 250px; 
            border: 1px solid #7a4f3f;
            position: relative;
            .content {
                text-align: center;
                padding: 20px 30px;
                .title {
                    font-size: 20px;
                    font-weight: bold;
                    padding: 40px 0px 20px 0px;
                }
                .text {
                    font-size: 17px;
                }
            }
            .inner-icon {
                position: absolute;
                top: -36px;
                left: 42%;
                background: #ffffff;
                img {
                    padding: 11px;
                    border: 2px solid #7a4f3f;
                    border-radius: 99%;
                    max-width: 100%;
                }
            }
        }
    }
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
</style>
<style lang="scss">
.el-carousel__container {
    height: 400px !important;
}
.el-carousel__item.is-active.is-animating {
    height: 400px !important;
}
</style>