import axios from "axios";

export default {
    // Báo cáo
    responseTime: (data) => {
        const url = `${process.env.webthucphamapi}admin/dashboard`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    
    //Slide
    listSlide: (data) => {
        const url = `${process.env.webthucphamapi}admin/slide/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteSlide: (data) => {
        const url = `${process.env.webthucphamapi}admin/slide/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createSlide: (data) => {
        const url = `${process.env.webthucphamapi}admin/slide/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    updateSlide: (data) => {
        const url = `${process.env.webthucphamapi}admin/slide/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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

    //Category
    listCategory: (data) => {
        const url = `${process.env.webthucphamapi}admin/category/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteCategory: (data) => {
        const url = `${process.env.webthucphamapi}admin/category/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createCategory: (data) => {
        const url = `${process.env.webthucphamapi}admin/category/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    updateCategory: (data) => {
        const url = `${process.env.webthucphamapi}admin/category/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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

    //Brand
    listBrand: (data) => {
        const url = `${process.env.webthucphamapi}admin/brand/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteBrand: (data) => {
        const url = `${process.env.webthucphamapi}admin/brand/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createBrand: (data) => {
        const url = `${process.env.webthucphamapi}admin/brand/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    updateBrand: (data) => {
        const url = `${process.env.webthucphamapi}admin/brand/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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

    //Voucher
    listVoucher: (data) => {
        const url = `${process.env.webthucphamapi}admin/voucher/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteVoucher: (data) => {
        const url = `${process.env.webthucphamapi}admin/voucher/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createVoucher: (data) => {
        const url = `${process.env.webthucphamapi}admin/voucher/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    detailVoucher: (data) => {
        const url = `${process.env.webthucphamapi}admin/voucher/detail`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    updateVoucher: (data) => {
        const url = `${process.env.webthucphamapi}admin/voucher/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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

    //Product
    listProduct: (data) => {
        const url = `${process.env.webthucphamapi}admin/product/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteProduct: (data) => {
        const url = `${process.env.webthucphamapi}admin/product/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createProduct: (data) => {
        const url = `${process.env.webthucphamapi}admin/product/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    detailProduct: (data) => {
        const url = `${process.env.webthucphamapi}admin/product/detail`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    updateProduct: (data) => {
        const url = `${process.env.webthucphamapi}admin/product/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    deleteImage: (data) => {
        const url = `${process.env.webthucphamapi}admin/product/delete-image`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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

    //order
    getListOrder: (data) => {
        const url = `${process.env.webthucphamapi}admin/order/list`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    getOrder: (data) => {
        const url = `${process.env.webthucphamapi}admin/order/detail`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    changeAction: (data) => {
        const url = `${process.env.webthucphamapi}admin/order/change-action`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    cancelOrder: (data) => {
        const url = `${process.env.webthucphamapi}admin/order/cancel-order`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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

    //Kho hàng
    searchProduct: (data) => {
        const url = `${process.env.webthucphamapi}admin/import/get-product`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },

    importWarehouse:(data) => {
        const url = `${process.env.webthucphamapi}admin/import/import-warehouse`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },

    //User
    listUser: (data) => {
        const url = `${process.env.webthucphamapi}admin/user/list`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    updateRole: (data) => {
        const url = `${process.env.webthucphamapi}admin/user/update-role`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    deleteUser: (data) => {
        const url = `${process.env.webthucphamapi}admin/user/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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
    createUser: (data) => {
        const url = `${process.env.webthucphamapi}admin/user/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
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