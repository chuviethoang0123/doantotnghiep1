import axios from 'axios';
export default {
    //đăng nhập
    login(data) {
        const url = `${process.env.webmyphamapi}api/auth/login`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data);
                } else {
                    resolve(response.data);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // thêm vào giỏ hàng vuex
    cartData: (data) => {
        const url = `${process.env.webmyphamapi}api/add-to-cart`;
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },
}