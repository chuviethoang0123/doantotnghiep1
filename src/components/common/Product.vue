<template>
    <div class="product">
      <el-card class="card-product" :body-style="{ padding: '10px' }">
          <img
            :src="product.image"
            class="image"
            @click="redirectProduct(product.id)"
          />
          <div style="padding: 14px; position: relative">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-desc">{{ product.description }}</div>
            <div class="bottom">
              <div v-if="product.discount">
                <span class="money">{{ $filters.formatVND(product.price - ((product.discount / 100) * product.price)) }}&emsp;</span>
                <span class="sale"><del>{{ $filters.formatVND(product.price) }}</del></span>
              </div>
              <div v-else>
                  <span class="money">{{ $filters.formatVND(product.price) }}</span>
              </div>
            </div>
            <div class="icon-card" @click="addToCart(product.id)">
              <img width="30" height="30" src="@/assets/images/add-to-card.png" alt="">
            </div>
          </div>
      </el-card>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
defineProps({
  product: Object
})
const store = useStore();
const router = useRouter();
const addToCart = (id: string) => {
  if (store.state.auth.user) {
    let params = {
      product_id: id,
      quantity: 1
    };

    store.dispatch('home/cartData', params);
    ElMessage({
      message: 'Thêm vào giỏ hàng thành công',
      type: 'success',
    })
  } else {
    
  }
}
const redirectProduct = (id: String) => {
  router.push('/product/product-detail/' + id);
}
</script>

<style lang="scss">
.product {
  margin: 10px 0px;
  .card-product {
    &:hover .image {
      -ms-transform: scale(1.1); /* IE 9 */
      -webkit-transform: scale(1.1); /* Safari 3-8 */
      transform: scale(1.1); 
    }
    &:hover .icon-card {
      display: inline;
    }
    .image {
      transition: transform .3s;
    }
    .product-name {
      overflow: hidden;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 600;
      padding: 5px 0px;
    }
    .product-desc {
      padding: 5px 0px;
    }
    .bottom {
      padding: 5px 0px;
      .money {
        color: #d82e4d;
        font-weight: 600;
      }
    }
    .icon-card {
      display: none;
      position: absolute;
      bottom: 15%;
      right: 5%;
      cursor: pointer;

      img {
        width: 40px !important;
        height: 40px !important;
      }
    }
  }
}
.time {
  font-size: 12px;
  color: #999;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}
</style>