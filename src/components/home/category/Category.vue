<template>
    <div class="category-left">
        <div class="brand">
            <h1 v-if="$route.params.id && CategoryProduct.category">{{ CategoryProduct.category.category_name }}</h1>
            <h1 v-else>Tìm kiếm</h1>
            <div class="arrange">
                <div class="text">Sắp xếp:</div>
                <div class="select">
                    <a-menu v-model:selectedKeys="current" mode="horizontal">
                        <a-menu-item key="az">Tên A -> Z</a-menu-item>
                        <a-menu-item key="za">Tên Z -> A </a-menu-item>
                        <a-menu-item key="plus">Giá tăng dần </a-menu-item>
                        <a-menu-item key="reduction">Giá giảm dần </a-menu-item>
                    </a-menu>
                </div>
            </div>
            <div class="category-product">
                <div v-if="CategoryProduct.product && CategoryProduct.product.length === 0" class="product">
                    Không tìm thấy sản phẩm
                </div>
                <div v-else class="product">
                    <el-row :gutter="4">
                        <el-col
                            v-for="product in CategoryProduct.product" :key="product.id"
                            :xs="12" :sm="8"
                        >
                            <Product :product="product"/>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Product from '../../../components/common/Product.vue'
export default {
    components: {Product},
    data() {
        return {
            current: ['az'],
            search: {

            }
        }
    },
    computed: {
        CategoryProduct() {
            let shoppingCart = JSON.parse(JSON.stringify(this.$store.state.home.categoryProduct))
            if (shoppingCart) {
                return JSON.parse(JSON.stringify(this.$store.state.home.categoryProduct));
            }
        }
    },
    methods: {
        redirectProduct(id) {
            this.$router.push('/product/product-detail/' + id);
        },
        addToCart(id) {
            let params = {
                product_id: id,
                quantity: 1
            };

            this.$store.dispatch('product/cartData', params);
            this.$message.success('Thêm vào giỏ hàng thành công');
        },
        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        }
    },

    watch: {
        current: {
            handler(val) {
                this.$emit('searchArrange', this.current);
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.category-left {
    .brand {
        .category-product {
            max-height: 750px;
            overflow: auto;
            overflow-x: hidden;
        }

        .arrange {
            display: flex;
            align-items: center;

            .text {
                width: 80px;
                font-size: 17px;
            }

            .select {
                width: 100%;

                .ant-menu-overflow {
                    background-color: #ffffff;
                }
            }
        }
    }
}
</style>