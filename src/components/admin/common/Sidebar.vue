<template>
  <div class="admin-sidebar" style="width: 256px; height: 100%">
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark"
      :inline-collapsed="collapsed" style="background: #060474">
      <a-menu-item key="1" v-if="!collapsed">
        <div class="logo">
          <img style="width: 150px; height: 60px" src="@/assets/images/icon-logo.png" alt="">
        </div>
      </a-menu-item>
      <a-menu-item key="Dashboard">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="Order" v-if="$store.state.auth.user.role_admin & 1">
        <template #icon>
          <ShoppingCartOutlined />
        </template>
        <span>Đơn hàng</span>
      </a-menu-item>
      <a-menu-item key="Slide" v-if="$store.state.auth.user.role_admin & 2">
        <template #icon>
          <FileImageOutlined />
        </template>
        <span>Slide</span>
      </a-menu-item>
      <a-menu-item key="Product" v-if="$store.state.auth.user.role_admin & 4">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Sản phẩm</span>
      </a-menu-item>
      <a-menu-item key="Voucher" v-if="$store.state.auth.user.role_admin & 8">
        <template #icon>
          <WalletOutlined />
        </template>
        <span>Voucher</span>
      </a-menu-item>
      <a-menu-item key="User" v-if="$store.state.auth.user.role_admin & 16">
        <template #icon>
          <UserOutlined />
        </template>
        <span>Tài khoản</span>
      </a-menu-item>
      <a-menu-item key="Brand" v-if="$store.state.auth.user.role_admin & 32">
        <template #icon>
          <AlertOutlined />
        </template>
        <span>Thương hiệu</span>
      </a-menu-item>
      <a-menu-item key="CategoryAdmin" v-if="$store.state.auth.user.role_admin & 64">
        <template #icon>
          <ProfileOutlined />
        </template>
        <span>Danh mục</span>
      </a-menu-item>
      <a-menu-item key="ImportProduct" v-if="$store.state.auth.user.role_admin & 128">
        <template #icon>
          <ImportOutlined />
        </template>
        <span>Nhập kho</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined, ShoppingCartOutlined, WalletOutlined, UserOutlined, AlertOutlined, ProfileOutlined, FileImageOutlined, ImportOutlined } from '@ant-design/icons-vue';
export default {
  name: "Sidebar",
  inject: ['emitter'],
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    WalletOutlined,
    UserOutlined,
    AlertOutlined,
    ProfileOutlined,
    FileImageOutlined,
    ImportOutlined
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ['2'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    }
  },
  mounted() {
    this.emitter.on("toggle-sidebar", (collapsed) => {
      this.collapsed = collapsed;
    });
  },
  methods: {
    redirectToRouter(name) {
      this.$router.push({ name: name })
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.openKeys = this.collapsed ? [] : this.preOpenKeys;
    }
  },

  watch: {
    selectedKeys: function (oldValue, newValue) {
      this.$router.push({ name: oldValue[0] });
    },
    openKeys: function (oldValue, newValue) {
      this.preOpenKeys = oldValue;
    }
  }
}
</script>
<style lang="scss">
.admin-sidebar {
  width: auto !important;

  .logo {
    img {
      padding: 9px;
    }
  }
  .ant-menu-item {
    color: #ffffff !important;
  }
}

ul.ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark,
ul.ant-menu.ant-menu-root.ant-menu-vertical.ant-menu-inline-collapsed.ant-menu-dark {
  height: 100%;
}
</style>