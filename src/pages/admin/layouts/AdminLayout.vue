<template>
    <div class="layout">
        <div class="webthucpham-header">
            <Header></Header>
        </div>
        <div class="webthucpham-layout">
            <div class="webthucpham-sidebar">
                <Sidebar></Sidebar>
            </div>
            <div class="webthucpham-main-content">
                <div class="webthucpham-content">
                    <router-view></router-view>
                </div>
                <div class="webthucpham-footer">
                    <Footer></Footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "../../../components/admin/common/Sidebar.vue";
import Header from "../../../components/admin/common/Header.vue";
import Footer from "../../../components/admin/common/Footer.vue";

export default {
    name: "AdminLayout",
    components: { Footer, Header, Sidebar },
}
</script>

<style lang="scss" scoped>
.webthucpham-layout {
    display: flex;
    height: 100vh;

    .webthucpham-sidebar {
        height: 100%;
    }

    .webthucpham-main-content {
        // flex: auto;
        width: 100%;

        .webthucpham-header {
            position: relative;
            z-index: 2;
        }

        .webthucpham-content {
            /*padding: 20px;*/
            max-height: calc(100vh - 60px);
            overflow: hidden auto;
            height: 100%;
            background: #f1eded;
        }

        .webthucpham-footer {
            padding: 20px;
            flex-shrink: 0;
            width: 100%;
            background: #FFFFFF;
        }
    }
}
</style>
