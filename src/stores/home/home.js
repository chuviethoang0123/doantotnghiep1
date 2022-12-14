import api from '../../api/home'

export const home = {
    namespaced: true,
    state: {
        cartData: {
            carts: [],
            sum_quantity: 0
        },
        categoryProduct: {},
        getCart: {},
    },
    getters: {
        cartData: state => state.cartData,
        categoryProduct: state => state.categoryProduct,
        getCart: state => state.getCart,
    },
    mutations: {
        cartData(state, data) {
            if (data) {
                state.cartData = data
            } else {
                state.cartData = {
                    carts: [],
                    sum_quantity: 0
                }
            }
        },
        categoryProduct(state, data) {
            state.categoryProduct = data
        },
        getCart(state, data) {
            state.getCart = data
        },
    },
    actions: {
        cartData: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.cartData({
                        user_id: rootGetters['auth/user'].id ? rootGetters['auth/user'].id : localStorage.getItem('user_id'),
                        product_id: data.product_id,
                        quantity: data.quantity,
                        type: data.type
                    });
                    commit('cartData', res);
                    resolve(res)
                } catch (error) {
                    if (!rootGetters['auth/user'].id) {
                        commit('cartData');
                    }
                    reject(error);
                }
            });
        },
        categoryProduct: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.categoryProduct({
                        search: data.searchValue,
                        category_id: data.category_id,
                        brand: data.filter.brand,
                        total: data.filter.total,
                        arrange: data.arrange
                    });
                    commit('categoryProduct', res);
                    resolve(res)
                } catch (error) {
                    reject(error);
                }
            });
        },

        getCart: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.getCart({
                        user_id: data.user_id,
                        status: data.status,
                    });
                    commit('getCart', res);
                    resolve(res)
                } catch (error) {
                    reject(error);
                }
            });
        },
        
    },
}