<template>
    <div class="forgot-password">
        <div class="forgot-title">Thay đổi mật khẩu</div>
        <el-form
            ref="forgotPassword"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="140px"
            :label-position="'left'"
            class="demo-ruleForm"
        >
            <el-form-item label="Password" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Nhập lại Password" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <div class="form-btn">
                    <el-button type="primary" @click="submitForm(forgotPassword)">Xác nhận</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import api from "../../../api/home";

const forgotPassword = ref<FormInstance>()
const router = useRouter()
const route = useRoute()

const ruleForm = reactive({
  pass: '',
  checkPass: '',
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập Password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!forgotPassword.value) return
      forgotPassword.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập lại Password'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Password nhập lại không khớp!"))
  } else {
    callback()
  }
}

const rules = reactive({
  pass: [
    { required: true, message: 'Vui lòng nhập Password', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu tối thiểu phải có 8 ký tự', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  checkPass: [
    { required: true, message: 'Vui lòng nhập lại Password', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ],
})

const submitForm = async () => {
    let params = {
        token: route.query.token,
        password: ruleForm.pass,
        retype: ruleForm.checkPass
    }
    await api.reset(params).then((res) => {
        if (res.status === true) {
            ElMessage({
                message: 'Thay đổi mật khẩu thành công',
                type: 'success',
            })
            router.push({ name: 'Login' });
        } else {
            ElMessage.error(res.message)
        }
    }).catch((error) => { ElMessage.error('Có lỗi xảy ra') });
}
</script>
<style lang="scss" scoped>
.forgot-password {
    max-width: 500px;
    margin: 0 auto;
    .forgot-title {
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
}
</style>