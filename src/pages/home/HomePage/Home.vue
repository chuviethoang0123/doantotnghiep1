<template>
    <div class="home-page">
        <div class="banner">
            <el-row :gutter="20">
                <el-col :xs="0" :sm="8">
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
                <el-col :xs="24" :sm="16">
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
                <el-col :xs="24" :sm="8">
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
                <el-col :xs="24" :sm="8">
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
                <el-col :xs="24" :sm="8">
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
        <div class="list-card">
            <div class="card-title">
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: right;"></div>
                <div class="text">Flash-sale</div>
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: left;"></div>
            </div>
            <el-row :gutter="24">
                <el-col
                    v-for="item in productsDiscount"
                    :key="item"
                    :xs="12" :sm="6"
                >
                    <Product :product="item"/>
                </el-col>
            </el-row>
        </div>
        <div class="list-card">
            <div class="card-title">
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: right;"></div>
                <div class="text">Sản phẩm bán chạy</div>
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: left;"></div>
            </div>
            <el-row :gutter="24">
                <el-col
                    v-for="item in productsSelling"
                    :key="item"
                    :xs="12" :sm="6"
                >
                    <Product :product="item"/>
                </el-col>
            </el-row>
        </div>
        <div class="list-card">
            <div class="card-title">
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: right;"></div>
                <div class="text">Dành cho bạn</div>
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: left;"></div>
            </div>
            <el-row :gutter="24">
                <el-col
                    v-for="item in productsDiscount"
                    :key="item"
                    :xs="12" :sm="6"
                >
                    <Product :product="item"/>
                </el-col>
            </el-row>
        </div>
        <div class="list-card">
            <div class="card-title">
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: right;"></div>
                <div class="text">Thương hiệu</div>
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: left;"></div>
            </div>
            <Carousel :items-to-show="5" :wrap-around="true">
                <template #slides>
                <Slide style="padding: 0px 10px" v-for="item in brand" :key="item">
                    <img style="width:100%" :src="item.image" alt="">
                </Slide>
                </template>

                <template #addons="{ slidesCount }">
                    <Navigation v-if="slidesCount > 6"/>
                </template>
            </Carousel>
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
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const categories = ref([]);
const slides = ref([]);
const productsDiscount = ref([]);
const productsSelling = ref([]);
const productForYou = ref([]);
const vouchers = ref([]);
const brand = ref([]);

onMounted(async() => {
    getData();
})
const getData = () => {

    const promise1 = api.productsDiscount();
    const promise2 = api.productsSelling();
    const promise3 = api.listVoucher();
    const promise4 = api.getCategory();
    const promise5 = api.getSlide();
    const promise6 = api.getProduct();
    const promise7 = api.getBrand();

    Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7]).then(function(values) {
        productsDiscount.value = values[0].productDiscount;
        productsSelling.value = values[1].productSelling;
        vouchers.value = values[2];
        categories.value = values[3];
        slides.value = values[4].slide;
        productForYou.value = values[5].product;
        brand.value = values[6]
    });
}

</script>
<style lang="scss" scoped>
@import "../../../assets/scss/pageHome/home.scss";
</style>
<style lang="scss">
.home-page { 
    .list-card {
        .carousel__prev, .carousel__next {
            background: #62AF31 !important;
        }
    }
}
.el-carousel__container {
    height: 400px !important;
}
.el-carousel__item.is-active.is-animating {
    height: 400px !important;
}
</style>