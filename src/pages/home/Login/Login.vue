<template>
    <div class="login">
        <div class="login-title">Đăng nhập</div>
        <el-form
            ref="loginFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="demo-ruleForm"
        >
            <el-form-item label="Tài khoản" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" placeholder="Tên người dùng hoặc Email" :prefix-icon="User" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="Mật khẩu" :prefix-icon="Lock" />
            </el-form-item>
            <el-form-item>
                <div class="form-btn">
                    <el-button type="primary" @click="submitForm(loginFormRef)">Đăng nhập</el-button>
                    <el-button @click="resetForm(loginFormRef)">Reset</el-button>
                </div>
            </el-form-item>
        </el-form>

        <div class="forgot-register">
            <div class="login-facebook">
                <el-button>Đăng nhập bằng facebook</el-button>
            </div>
            <div class="forgot-register">
                <a class="login-form-forgot" @click="openForgot">
                    Quên mật khẩu?
                </a><br>
                Hoặc
                <a @click="register">Đăng ký ngay!</a>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import api from "../../../api/home";

const loginFormRef = ref<FormInstance>()
const store = useStore()
const router = useRouter()
const route = useRoute()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập mật khẩu'))
  } else {
    callback()
  }
}
const validateUser = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập tên người dùng hoặc Email'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  username: ''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  username: [{ validator: validateUser, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            let params = {
                email: ruleForm.username,
                password: ruleForm.pass,
            }
            let res = await api.login(params);
            if (res.status === true) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('user_id', res.data.user_id);
                await store.dispatch('auth/getMyInfo');
                if (res.data.role === 1) {
                    ElMessage({
                        message: 'Đăng nhập thành công',
                        type: 'success',
                    })
                    let params = {
                        product_id: '',
                        quantity: ''
                    }
                    await store.dispatch('home/cartData', params);
                    router.push('/');
                } else {
                    if (res.data.role === 2) {
                        ElMessage({
                            message: 'Đăng nhập thành công',
                            type: 'success',
                        })
                        router.push({ name: 'Dashboard' });
                    } else {
                        ElMessage.error('Đăng nhập thất bại')
                    }
                }
            } else {
                ElMessage.error(res.message);
            }
            
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.login {
    max-width: 500px;
    margin: 0 auto;
    .login-facebook {
        max-width: 300px;
        margin: 0 auto;
        .el-button {
            width: 100%;
            border-radius: 10px;
        }
    }
    .login-title {
        margin: 40px 0px 20px 0px;
        text-align: center;
        font-size: 30px;
        color: red;
        font-weight: bold;
    }
    .el-form {
        padding: 20px;
        .form-btn {
            width: 100%;
            text-align: center;
        }
    }
    .forgot-register {
        text-align: center;
        .login-facebook {
            margin-bottom: 20px;
        }
    }
}
</style>