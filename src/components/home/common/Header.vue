<template>
    <div class="header-webview">
        <div class="header-top">
            <div class="content">
                <el-row :gutter="20">
                    <el-col :span="9"><div class="grid-content ep-bg-purple" />
                        <div>
                            <el-icon><LocationFilled /></el-icon>
                            Location | 
                            <el-icon><Promotion /></el-icon> 
                            Contact | 
                            <el-icon><PhoneFilled /></el-icon> 
                            0386132297</div>
                    </el-col>
                    <el-col :span="6" :offset="9"><div class="grid-content ep-bg-purple"/>Đăng nhập/Đăng ký</el-col>
                </el-row>
            </div>
        </div>
        <div class="header-center">
            <div class="content">
                abc
            </div>
        </div>
        <div class="header-bottom">
            <div class="content">
                abc
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .header-webview {
        .header-top, .header-bottom {
            background: #4B1F12;
            color: #ffffff;
        }
        .header-top {
            // height: 40px;
            .content {
                padding: 10px 0px;
            }
        }
        .header-center {
            height: 120px;
        }
        .header-bottom {
            height: 60px;
        }
        .content {
            margin: 0 auto;
            max-width: 1200px;
        }
    }
</style>