<template>
    <div>
        <div class="header">
            <Breadcrums :title="'Danh sách đơn hàng'">
            </Breadcrums>
        </div>
        <div class="admin-order">
            <div class="filter-order">
                <OrderFilter :tabStatus="tabStatus" />
            </div>
            <div class="product-table">
                <a-tabs size="small" :active-key="tabStatus" :tabBarGutter="8" @change="changeTab">
                    <a-tab-pane v-for="tab in listTabs" :key="tab.key" :tab="`${tab.name}`">
                        <div class="padding-table">
                            <div class="padding-table">
                                <TableOrder :listOrder="listOrder" :tabStatus="tabStatus" :order="order" @page="page" />
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>
<script>
const listTabs = [
    {
        name: "Đơn mới",
        key: 'order_create',
        total: 0,
    },
    {
        name: "Đang xử lý",
        key: "order_receive",
        total: 0,
    },
    {
        name: "Đang giao hàng",
        key: "order_delivery",
        total: 0,
    },
    {
        name: "Đơn hoàn thành",
        key: "order_finish",
        total: 0,
    },
    {
        name: "Đơn hủy",
        key: "order_cancel",
        total: 0,
    },
];
import { PlusOutlined } from '@ant-design/icons-vue';
import api from '../../../api/admin';
import TableOrder from '../../../components/admin/Order/TableOrder.vue';
import OrderFilter from '../../../components/admin/Order/OrderFilter.vue';
export default {
    name: 'ListOrder',
    components: { TableOrder, OrderFilter, PlusOutlined },
    data() {
        return {
            listTabs,
            tabStatus: 'order_create',
            listOrder: [],
            totalRecord: 0,
            order: {},
        }
    },
    mounted() {
        if (this.$route.query.status) {
            this.tabStatus = this.$route.query.status;
        }
        const {
            startDate,
            endDate,
            textSearch,
            province_id,
            district_id,
            wards_id,
            page,
        } = this.$route.query;
        const data = {
            status: this.tabStatus,
            page: page || 1,
            date_start: startDate,
            date_end: endDate,
            key_search: textSearch,
            province_id,
            district_id,
            wards_id,
        };
        this.getOrder({ ...data });
    },
    methods: {
        changeTab(key) {
            this.tabStatus = key;
            this.$router.push({
                name: "Order",
                query: {
                    ...this.$route.query,
                    status: key
                },
            });
        },
        async getOrder(data) {
            await api.getListOrder(data).then((res) => {
                this.order = res.data;
                this.listOrder = res.data.data.map((order, index) => {
                    const { id, name, code, email, phone, order_time, order_total_money, is_payment } = order;
                    return {
                        index: index + 1,
                        key: id,
                        id: id,
                        name: name,
                        code: code,
                        email: email,
                        phone: phone,
                        order_time: order_time,
                        order_total_money: order_total_money,
                        is_payment: is_payment
                    }
                })
            }).catch((error) => {
                console.log(error);
            })
        },
        page(value) {
            this.page = value
        },
    },
    watch: {
        $route(to) {
            if (to.query.status) {
                this.tabStatus = to.query.status;
            }
            const {
                startDate,
                endDate,
                textSearch,
                p_code,
                d_code,
                v_code,
                page,
            } = to.query;
            const data = {
                status: this.tabStatus,
                date_start: startDate,
                date_end: endDate,
                key_search: textSearch,
                p_code: p_code,
                d_code: d_code,
                v_code: v_code,
                page: page,
            };
            this.getOrder({ ...data });
        },
    }
}
</script>
<style lang="scss" scoped>
.admin-order {
    padding: 30px;

    .header-order {
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 20px;
            margin: 0px 0px 30px 0px;
        }
    }

    .filter-order {
        margin-bottom: 20px;
    }

    .anticon-form {
        color: green;
        font-size: 19px;
    }
}
</style>