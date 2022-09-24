<template>
    <div class="layout">
        <div class="webthucpham-layout">
            <div class="webthucpham-main-content">
                <div class="webthucpham-header">
                    <Header></Header>
                </div>
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
import Header from "../../../components/home/common/Header.vue";
import Footer from "../../../components/home/common/Footer.vue";

export default {
    name: "HomeLayout",
    components: {Footer, Header},
}
</script>

<style lang="scss" scoped>
    .webthucpham-layout {
        display: flex;
        // height: 100vh;

        .webthucpham-main-content {
            flex: auto;
            min-width: 1200px;
            .webthucpham-header {
                position: relative;
                z-index: 2;
            }
            .webthucpham-content {
                /*padding: 20px;*/
                // max-height: calc(100vh - 60px);
                overflow: hidden auto;
                background: #ffffff;
                padding-bottom: 100px;
            }

            .webthucpham-footer {
                flex-shrink: 0;
                // height: 60px;
                width: 100%;
                background: #FFFFFF;
            }
        }
    }
</style>
