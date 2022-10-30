import axios from 'axios';
export default {
    // CÁC API CHO PHẦN ĐĂNG NHẬP, ĐĂNG KÝ, ......

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

    // đăng xuất
    logout() {
        const url = `${process.env.webmyphamapi}api/auth/logout`;
        const token = {token: localStorage.getItem('token')};
        return new Promise((resolve, reject) => {
            axios.post(url, token, {}, {
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

    //đăng ký
    register(data) {
        const url = `${process.env.webmyphamapi}api/auth/register`;
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

    //Lấy lại mật khẩu
    forgot(data) {
        const url = `${process.env.webmyphamapi}api/reset-password`;
        return new Promise((resolve, reject) => {
            axios.post(url, data).then((response) => {
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
    reset(data) {
        const url = `${process.env.webmyphamapi}api/reset`;
        return new Promise((resolve, reject) => {
            axios.post(url, data).then((response) => {
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
    loginFacebook:() => {
        const url = `${process.env.webmyphamapi}login-facebook`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
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
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // lấy danh sách đơn hàng
    getCart: (data) => {
        const url = `${process.env.webmyphamapi}api/get-cart`;
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

    // lấy danh sách category đổ vào header
    getCategory: () => {
        const url = `${process.env.webmyphamapi}api/category`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    //Lấy slide
    getSlide: () => {
        const url = `${process.env.webmyphamapi}api/home-slide`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    //sản phẩm
    getProduct: () => {
        const url = `${process.env.webmyphamapi}api/home-product`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    // lấy sản phẩm giảm giá
    productsDiscount: () => {
        const url = `${process.env.webmyphamapi}api/product-discount`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    // lấy sản phẩm bán chạy
    productsSelling: () => {
        const url = `${process.env.webmyphamapi}api/product-selling`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    //lấy danh sách voucher màn thanh toán
    listVoucher: () => {
        const url = `${process.env.webmyphamapi}api/list-voucher`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    // Lấy ra danh sách thương hiệu
    getBrand: () => {
        const url = `${process.env.webmyphamapi}api/brand`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    //lấy chi tiết sản phẩm
    productDetail: (data) => {
        const url = `${process.env.webmyphamapi}api/product-detail`;
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
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // lấy đánh giá sản phẩm
    rating: (data) => {
        const url = `${process.env.webmyphamapi}api/rating?page=` + data.page;
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                user_id: localStorage.getItem('user_id'),
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    // api đánh giá sản phẩm với đơn đã mua hàng
    userRate: (data) => {
        const url = `${process.env.webmyphamapi}api/user-rate`;
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                user_id: localStorage.getItem('user_id'),
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
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
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // lấy comment sản phẩm
    comment: (data) => {
        const url = `${process.env.webmyphamapi}api/comment?page=` + data.page;
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                user_id: localStorage.getItem('user_id'),
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    // Cập nhật thông tin người dùng
    updateUser: (data) => {
        const url = `${process.env.webmyphamapi}api/auth/update-user`;
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                headers: {
                    'Content-Type': 'application/json',
                },
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
}