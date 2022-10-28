<template>
    <div class="product-detail" v-if="isLoading">
        <div class="product-breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item href="">
                    <home-outlined />
                </a-breadcrumb-item>
                <a-breadcrumb-item href="">
                    <span>{{ product.category.name }}</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>{{ product.product.name }}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="product-main">
            <a-row :gutter="16">
                <a-col :span="19">
                    <a-row :gutter="16">
                        <a-col :span="11">
                            <a-carousel arrows dots-class="slick-dots slick-thumb">
                                <template #customPaging="props">
                                    <a>
                                        <img :src="getImgUrl(props.i)" />
                                    </a>
                                </template>
                                <div v-for="(item, index) in product.product_image" :key="index">
                                    <img v-bind:src="getImage(index)" />
                                </div>
                            </a-carousel>
                        </a-col>
                        <a-col :span="13">
                            <div class="main-content">
                                <div class="brand">{{ product.brand }}</div>
                                <div class="product-name">{{ product.product.name }}</div>
                                <div class="status">Tình trạng: <span v-if="product.warehouse">còn hàng</span><span v-else>hết hàng</span></div>
                                <div class="rating">
                                    <a-rate v-model:value="product.rate.sum" disabled />
                                    <span class="text">({{product.rate.count}})</span>
                                </div>
                                <hr width="85%" align="left">
                                <div class="money">
                                    <div v-if="product.product.discount">
                                        <span class="sale">{{ formatVND(product.product.price -
                                                ((product.product.discount / 100) * product.product.price))
                                        }}&emsp;</span>
                                        <span class="origin"><del>{{ formatVND(product.product.price) }}</del></span>
                                        <span class="precent">{{ product.product.discount }}%</span>
                                    </div>
                                    <div v-else>
                                        <span class="money">{{ formatVND(product.product.price) }}</span>
                                    </div>
                                </div>
                                <div class="save" v-if="product.product.discount">(Tiết kiệm: <span>{{
                                        formatVND(product.product.price - (product.product.price -
                                            ((product.product.discount / 100) * product.product.price)))
                                }}</span>)</div>
                                <div class="quantity">
                                    <div class="text">Số lượng:</div>
                                    <div class="quantity-toggle">
                                        <a-button shape="circle" @click="reduction">
                                            <template #icon>
                                                <minus-outlined />
                                            </template>
                                        </a-button>
                                        <a-input class="input-quantity" v-model:value="quantity" disabled />
                                        <a-button shape="circle" @click="plus">
                                            <template #icon>
                                                <plus-outlined />
                                            </template>
                                        </a-button>
                                    </div>
                                </div>
                                <div class="add-to-cart">
                                    <a-button v-if="product.warehouse" @click="addToCart(product.product.id)">Thêm vào giỏ hàng
                                        <shopping-cart-outlined />
                                    </a-button>
                                </div>
                                <div class="payment">
                                    <div class="text">Phương thức thanh toán</div>
                                    <div class="img">
                                        <img width="40" height="40" src="../../../assets/images/vnpay.png" alt="">
                                        <img width="60" height="40" src="../../../assets/images/paypal.jpg" alt="">
                                        <img width="40" height="40" src="../../../assets/images/momo.png" alt="">
                                    </div>
                                </div>
                                <div class="describe">{{ product.product.description }}</div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <div class="info-product">
                            <h2>Thông tin sản phẩm</h2>
                            <div class="product-content" :class="{ active: isActive }" v-html="product.product.content">
                            </div>
                            <div class="read-more">
                                <a-button v-if="!isActive" @click="readMore">Xem thêm >></a-button>
                                <a-button v-else @click="readMore">Thu gọn</a-button>
                            </div>
                        </div>
                    </a-row>
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane key="1" tab="Đánh giá">
                            <a-row :gutter="16" v-for="item in rating.data" :key="item.index">
                                <div class="rate">
                                    <div class="rate-info">
                                        <a-avatar :src="item.image" :size="45">
                                            <template v-if="!item.image" #icon>
                                                <UserOutlined />
                                            </template>
                                            <!-- <img v-if="item.image" v-bind:src="item.image" alt=""> -->
                                        </a-avatar>
                                        <div class="info">
                                            <div class="name">{{ item.name }}</div>
                                            <div class="value">
                                                <a-rate :value="item.rate_scores" disabled />
                                            </div>
                                            <div v-if="item.date" class="date">{{ formatDate(item.date) }}</div>
                                        </div>
                                    </div>
                                    <div class="rate-comment">{{ item.rate_comment }}</div>
                                </div>
                            </a-row>
                            <Pagination v-show="rating.last_page > 1" @paginate="ratings"
                                :totalPage="rating.last_page" />
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="Bình luận" force-render>
                            <a-row :gutter="16">
                                <div class="comment">
                                    <h2>Bình luận sản phẩm</h2>
                                    <a-list class="comment-list" item-layout="horizontal" :data-source="comment.data">
                                        <template #renderItem="{ item }">
                                            <a-list-item>
                                                <a-comment :author="item.author">
                                                    <template #avatar>
                                                        <a-avatar :src="item.avatar" :size="45">
                                                            <template v-if="!item.avatar" #icon>
                                                                <UserOutlined />
                                                            </template>
                                                            <!-- <img v-if="item.image" v-bind:src="item.image" alt=""> -->
                                                        </a-avatar>
                                                    </template>
                                                    <template #actions>
                                                        <span v-for="(action, index) in item.actions" :key="index">{{
                                                                action
                                                        }}</span>
                                                    </template>
                                                    <template #content>
                                                        <p>
                                                            {{ item.content }}
                                                        </p>
                                                    </template>
                                                    <template #datetime>
                                                        <a-tooltip :title="formatDate(item.datetime)">
                                                            <span>{{ formatDate(item.datetime) }}</span>
                                                        </a-tooltip>
                                                    </template>
                                                </a-comment>
                                            </a-list-item>
                                        </template>
                                    </a-list>
                                </div>
                            </a-row>
                            <a-row>
                                <a-comment>
                                    <template #avatar>
                                        <a-avatar :src="$store.state.auth.user.image" alt="Han Solo" />
                                    </template>
                                    <template #content>
                                        <a-form-item>
                                            <a-textarea v-model:value="valueComment" :rows="1" :col="20" />
                                        </a-form-item>
                                        <a-form-item>
                                            <a-button html-type="submit" type="primary" @click="handleSubmitComment">
                                                Bình luận
                                            </a-button>
                                        </a-form-item>
                                    </template>
                                </a-comment>
                            </a-row>
                            <Pagination v-if="comment.last_page > 1" @paginate="comments"
                                :totalPage="comment.last_page" />
                        </a-tab-pane>
                    </a-tabs>
                </a-col>

                <a-col :span="5">
                    <div class="voucher">
                        <a-card title="Voucher">
                            <a-card-grid v-for="(item, index) in listVoucher" :key="item.index"
                                style="width: 100%; text-align: center">
                                <div class="coupon">
                                    <div class="image">
                                        <img width="100" height="50" v-bind:src="item.image" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="title">NHẬP MÃ: {{ item.code }}</div>
                                        <div class="describe">
                                            {{ item.name }}
                                        </div>
                                        <div class="condition">
                                            <a @click="showVoucher(index)">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </a-card-grid>
                        </a-card>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="list-card">
            <div class="card-title">
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: right;"></div>
                <div class="text">Dành cho bạn</div>
                <div class="hr"><hr style="border: 1px solid #62AF31; width: 70%; float: left;"></div>
            </div>
            <el-row :gutter="24">
                <el-col
                    v-for="item in getProduct"
                    :key="item"
                    :xs="12" :sm="6"
                >
                    <Product :product="item"/>
                </el-col>
            </el-row>
        </div>
        <a-modal v-model:visible="visible" :title="'NHẬP MÃ:' + voucher.code">
            <div class="code">Mã khuyến mãi: {{ voucher.code }}</div>
            <div class="condition">
                <div class="describe">{{ voucher.describe }}</div>
                <div class="min">Đơn tối thiểu: {{ formatVND(voucher.minimum_order) }} - Tối đa {{
                        formatVND(voucher.discount_amount)
                }}</div>
                <div class="quantity">Mỗi khách hàng được sử dụng tối đa {{ voucher.quantity }} lần</div>
                <div class="start_date">Ngày bắt đầu: {{ formatDate(voucher.start_date) }} </div>
                <div class="end_date">Ngày kết thúc: {{ formatDate(voucher.end_date) }} </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { HomeOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue';
import api from "../../../api/home";
import Pagination from '../../../components/common/Pagination.vue';
import Product from '../../../components/common/Product.vue';
import moment from 'moment';
const baseUrl =
    'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/';
export default {
    name: "ProductDetail",
    components: {
        HomeOutlined,
        MinusOutlined,
        PlusOutlined,
        ShoppingCartOutlined,
        UserOutlined,
        Pagination,
        Product
    },

    data() {
        return {
            baseUrl,
            quantity: 1,
            rate: 4,
            product: '',
            isLoading: false,
            isActive: false,
            listVoucher: '',
            getProduct: '',
            visible: false,
            voucher: '',
            activeKey: '2',
            rating: '',
            valueComment: '',
            comment: '',
        };
    },

    created() {
        this.productsDetail();
        this.vouchers();
        this.getProducts();
        this.ratings();
        this.comments();
    },

    methods: {
        getImgUrl(i) {
            return this.product.product_image[i];
        },

        getImage(index) {
            return this.product.product_image[index];
        },

        reduction() {
            if (this.quantity === 1) {
                return false;
            }
            this.quantity--
        },

        plus() {
            this.quantity++
        },

        async productsDetail() {
            this.isLoading = false;
            let id = this.$route.params.id;
            let res = await api.productDetail({ id: id });
            this.product = res;
            this.isLoading = true;
        },

        async vouchers() {
            let res = await api.listVoucher();
            this.listVoucher = res;
        },

        async getProducts() {
            let res = await api.getProduct();
            this.getProduct = res.product.slice(0, 4);
        },

        addToCart(id) {
            if (this.$store.state.auth.user) {
                let params = {
                    product_id: id,
                    quantity: this.quantity
                };

                this.$store.dispatch('home/cartData', params);
                this.$message.success('Thêm vào giỏ hàng thành công');
            } else {
                this.$message.error('Bạn chưa đăng nhập');
            }
        },

        readMore() {
            if (this.isActive === false) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        },

        showVoucher(index) {
            this.visible = true;
            this.voucher = this.listVoucher[index];
        },

        async ratings(data) {
            let params = {
                page: data ? data : 1,
                product_id: this.$route.params.id,
                user_id: this.$store.state.auth.user.id ? this.$store.state.auth.user.id : localStorage.getItem('user_id')
            }
            let res = await api.rating(params);
            this.rating = res;
        },

        async comments(data) {
            let params = {
                page: data ? data : 1,
                product_id: this.$route.params.id,
                value: data ? '' : this.valueComment,
                user_id: this.$store.state.auth.user.id ? this.$store.state.auth.user.id : localStorage.getItem('user_id')
            }
            let res = await api.comment(params);
            this.comment = res;
        },

        handleSubmitComment() {
            if (!localStorage.getItem('token')) {
                this.$message.error('Bạn chưa đăng nhập');
                return false;
            }
            this.comments();
            this.valueComment = '';
        },

        redirectProduct(id) {
            this.$router.push('/product/product-detail/' + id);
        },

        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },

        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        }
    },

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/pageHome/product-detail.scss";
</style>
<style lang="scss">
.product-detail {
    .ant-card-grid {
        padding: 7px;
    }

    .ant-card-head-title {
        text-align: center !important;
        color: #d82e4d;
        font-weight: bold;
        font-size: 20px;
    }

    .ant-input[disabled] {
        color: #000000;
    }

    .ant-rate-star-second {
        color: #7b7b7b;
    }

    .read-more {
        text-align: center;
        margin-top: 20px;

        button {
            border-radius: 15px;
            color: #d82e4d;
            border-color: #d82e4d;
            font-weight: bold;

            &:hover {
                color: #ffffff;
                background-color: #d82e4d;
            }
        }
    }

    .for-you {
        .ant-card-head-title {
            color: #d82e4d;
            font-size: 20px;
            font-weight: 800;
        }

        .ant-card-meta-detail {
            padding: 20px 0px;
            text-align: left;
        }

        .ant-card-grid {
            text-align: left !important;
            height: 100%;
            cursor: pointer;
        }

        .ant-card-grid-hoverable:hover .icon-card {
            display: inline;
        }

        .ant-card-meta-description>div {
            text-overflow: ellipsis;
            overflow: hidden;
            width: 185px;
            height: 1.2em;
            white-space: nowrap;
        }
    }

    .value {
        .anticon-star {
            font-size: 11px !important;
        }

        .ant-rate {
            line-height: 10px;
        }
    }

    .ant-form-item {
        width: 300px !important;
    }

    .ant-comment-inner {
        padding: 0 !important;
    }

}
</style>
<style scoped>
.ant-carousel :deep(.slick-dots) {
    position: relative;
    height: auto;
}

.ant-carousel :deep(.slick-slide img) {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
}

.ant-carousel :deep(.slick-arrow) {
    display: none !important;
}

.ant-carousel :deep(.slick-thumb) {
    bottom: 0px;
}

.ant-carousel :deep(.slick-thumb li) {
    width: 60px;
    height: 45px;
}

.ant-carousel :deep(.slick-thumb li img) {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
}

.ant-carousel :deep .slick-thumb li.slick-active img {
    filter: grayscale(0%);
}

.slick-slide img {
    height: 400px !important;
}
</style>
