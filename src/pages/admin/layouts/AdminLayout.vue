<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <Sidebar />
            </el-aside>
            <el-container>
                <el-header>
                    <Header />
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <Footer />
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts">
import Header from "../../../components/admin/common/HeaderAdmin.vue";
import Footer from "../../../components/admin/common/FooterAdmin.vue";
import Sidebar from "../../../components/admin/common/SidebarAdmin.vue";
export default {
    name: 'AdminLayout',
    components: {Header, Footer, Sidebar},
}
</script>