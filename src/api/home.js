import axios from 'axios';
export default {
    // CÁC API CHO PHẦN ĐĂNG NHẬP, ĐĂNG KÝ, ......

    //đăng nhập
    login(data) {
        const url = `${process.env.webthucphamapi}api/auth/login`;
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
        const url = `${process.env.webthucphamapi}api/auth/logout`;
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
        const url = `${process.env.webthucphamapi}api/auth/register`;
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
        const url = `${process.env.webthucphamapi}api/reset-password`;
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
        const url = `${process.env.webthucphamapi}api/reset`;
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
        const url = `${process.env.webthucphamapi}login-facebook`;
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
        const url = `${process.env.webthucphamapi}api/get-cart`;
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
        const url = `${process.env.webthucphamapi}api/add-to-cart`;
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
        const url = `${process.env.webthucphamapi}api/category`;
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
        const url = `${process.env.webthucphamapi}api/home-slide`;
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
        const url = `${process.env.webthucphamapi}api/home-product`;
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
        const url = `${process.env.webthucphamapi}api/product-discount`;
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
        const url = `${process.env.webthucphamapi}api/product-selling`;
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
        const url = `${process.env.webthucphamapi}api/list-voucher`;
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
        const url = `${process.env.webthucphamapi}api/brand`;
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
        const url = `${process.env.webthucphamapi}api/product-detail`;
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
        const url = `${process.env.webthucphamapi}api/rating?page=` + data.page;
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
        const url = `${process.env.webthucphamapi}api/user-rate`;
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
        const url = `${process.env.webthucphamapi}api/comment?page=` + data.page;
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
        const url = `${process.env.webthucphamapi}api/auth/update-user`;
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

    // lấy thông tin đơn hàng
    checkOrder: (data) => {
        const url = `${process.env.webthucphamapi}api/info-order`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
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


    // Api vận chuyển tỉnh, thành phố

    getCity: () => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.get(url, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
            }).then((response) => {
                    resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    getDistrict: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    getWard: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    getService: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    shippingOrder: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
              shop_id: 2448165
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    checkVoucher: (data) => {
        const url = `${process.env.webthucphamapi}api/check-voucher`;
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
                    if(response.data.status === false) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // Thanh toán
    payment: (data) => {
        const url = `${process.env.webthucphamapi}api/payment`;
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

    // tìm kiếm sản phẩm
    categoryProduct(data) {
        const url = `${process.env.webthucphamapi}api/category-product`;
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
    
}