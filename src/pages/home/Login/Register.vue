<template>
  <div class="register">
    <div class="title">
        Đăng kí tài khoản
    </div>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        class="demo-ruleForm"
        :size="formSize"
        :label-position="'left'"
        status-icon
    >
        <el-form-item label="Họ Tên" prop="name">
        <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="SDT" prop="phone">
        <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Retype Password" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Đăng ký</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import api from "../../../api/home";


const router = useRouter()


const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  email: '',
  phone: '',
  pass: '',
  checkPass: '',
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
        let params = {
            name: ruleForm.name,
            email: ruleForm.email,
            password: ruleForm.pass,
            retype_password: ruleForm.checkPass,
            phone: ruleForm.phone
        }
        
        let res = await api.register(params);
        if (res.status === true) {
            ElMessage({
                message: 'Đăng ký thành công',
                type: 'success',
            })
            router.push({name: 'Login'});
        } else {
            ElMessage.error(res.message);
        }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập Password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
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

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Vui lòng nhập họ và tên', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Vui lòng nhập Email', trigger: 'blur' },
    { type: 'email', message: 'Vui lòng nhập đúng định dạng Email', trigger: ['blur', 'change'] },
  ],
  phone: [
    { required: true, message: 'Số điện thoại không đúng định dạng', pattern:/(84|0[3|5|7|8|9])+([0-9]{8})\b/, trigger: 'blur' },
    { min: 9, max: 11, message: 'Số điện thoại không đúng định dạng', trigger: 'blur' },
  ],
  pass: [
    { required: true, message: 'Vui lòng nhập Password', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu tối thiểu phải có 8 ký tự', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }],
  checkPass: [
    { required: true, message: 'Vui lòng nhập lại Password', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }],
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.register {
    max-width: 500px;
    margin: 0 auto;
    .title {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        color: #7a4f3f;
        padding: 40px;
    }
}
</style>