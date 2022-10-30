<template>
    <div>
        <div class="account">
            <div class="tittle">
                <h2>Thông tin tài khoản</h2>
            </div>
            <div class="form-account">
                <form>
                    <el-row :gutter="50">
                        <el-col :span="16">
                            <div class="name">
                                <div class="title">Họ tên</div>
                                <el-form-item>
                                    <el-input v-model="account.name" />
                                    <span v-if="errors.name" style="color:red; font-size: 13px">{{ errors.name[0]
                                    }}</span>
                                </el-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Số điện thoại</div>
                                <el-form-item>
                                    <el-input v-model="account.phone" />
                                    <span v-if="errors.phone" style="color:red; font-size: 13px">{{ errors.phone[0]
                                    }}</span>
                                </el-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Email</div>
                                <el-form-item>
                                    <el-input v-model="account.email" />
                                    <span v-if="errors.email" style="color:red; font-size: 13px">{{ errors.email[0]
                                    }}</span>
                                </el-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Mật khẩu mới</div>
                                <el-form-item>
                                    <el-input type="password" v-model="password" />
                                    <span v-if="errors.password" style="color:red; font-size: 13px">{{
                                            errors.password[0]
                                    }}</span>
                                </el-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Nhập lại mật khẩu mới</div>
                                <el-form-item>
                                    <el-input type="password" v-model="retype" />
                                    <span v-if="errors.retype" style="color:red; font-size: 13px">{{ errors.retype[0]
                                    }}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="upload">
                                <div class="image">
                                    <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                                        class="avatar-uploader" :show-upload-list="false" :before-upload="() => false"
                                        @change="handleChange">
                                        <img style="width:100px; height: 100px" v-if="imageUrl" :src="imageUrl"
                                            alt="avatar" />
                                        <div v-else>
                                            <plus-outlined />
                                            <div class="ant-upload-text">Upload</div>
                                        </div>
                                    </a-upload>
                                </div>
                                <div style="text-align:center">Ảnh đại diện</div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="btn">
                        <a-button @click="updateUser">Thay đổi</a-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { PlusOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

import api from '../../../api/home';

const store = useStore();
const router = useRouter();

const account = ref('')
const password = ref('')
const retype = ref('')
const errors = ref([])
const imageUrl = ref('')
const fileList = ref([])

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

onMounted(() => {
    account.value = store.state.auth.user
    imageUrl.value = store.state.auth.user.image
})

const handleChange = (info: any) => {
    if (info.file) {
        // Get this url from response in real world.
        getBase64(info.fileList[0].originFileObj, base64Url => {
            imageUrl.value = base64Url;
        });
    }
}

const updateUser = async () => {
    let data = JSON.parse(JSON.stringify(account.value));
    
    let params = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: password.value,
        retype: retype.value
    }
    const formData = new FormData();
    for (let i = 0; i < Object.values(params).length; i++) {
        formData.append(Object.keys(params)[i], Object.values(params)[i]);
    }
    if (fileList.value.length !== 0) {
        formData.append('image', fileList.value[0].originFileObj);
    }
    await api.updateUser(formData)
    .then((res: any) => {
        if (res.status === false) {
            errors.value = res.errors;
        } else {
            ElMessage({
                message: 'Cập nhật tài khoản thành công',
                type: 'success',
            })
        }
    })
    .catch((error: any) => {
        ElMessage.error('Có lỗi xảy ra, vui lòng thử lại')
    })
}
</script>
<style lang="scss">
.account {
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 0px;

    .tittle {
        text-align: center;
    }

    .upload {
        .image {
            padding: 50px 100px 0px 95px;
        }
    }

    .btn {
        text-align: center;

        button {
            background-color: #d82e4d;
            color: #ffffff;
            font-size: 18px;
            line-height: 22px;
        }
    }

    .ant-input-number {
        width: 100%;
    }
}
</style>