<script setup>
import { reactive, ref, onMounted, watch, h, computed, onBeforeUnmount } from 'vue';
import Layout2 from '@/layouts/Layout2.vue';
import {
    Button,
    Select,
    Table,
    Card,
    Radio,
    Space,
    InputNumber,
    Input,
    Flex,
    Modal
} from 'ant-design-vue';
import {
    SearchOutlined,
    PlusCircleOutlined,
    CarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    CheckOutlined
} from '@ant-design/icons-vue';
import apiClient from '@/axios';
import showMessage from '@/assets/js/message';


const orderForm = reactive({
    products: [],
    discount: 50000,
    shippingFee: 50000,
    total: 0,
    paymentMethod: 0,
    paymentStatus: 'Đã thanh toán',
    shippingStatus: 0,
    customer: {
        name: 'Trinh Trinh Trinh',
        phone: '0123456789',
        address: 'Ngõ 123, Đường ABC, Quận 1, TP.HCM'
    }
});



const finalAmount = computed(() =>
    orderForm.total + orderForm.shippingFee - orderForm.discount
);


const paymentMethods = ref([]);
const fetchPaymentMethods = async () => {
    try {
        const response = await apiClient.get('/orders/payment_method');
        paymentMethods.value = response.data;
        if (paymentMethods.value.length > 0) {
            orderForm.paymentMethod = paymentMethods.value[0].id;
        }
    } catch (error) {
        console.error('Không thể tải danh sách phương thức thanh toán', error);
    }
};


const productList = ref([]);
const fetchProductList = async () => {
    try {
        const response = await apiClient.get('/products');
        productList.value = response.data;
    } catch (error) {
        console.error('Không thể tải danh sách sản phẩm', error);
    }
};



const calculateTotal = () => {
    orderForm.total = orderForm.products.reduce((sum, product) => sum + product.total, 0);
};
watch(orderForm.products, calculateTotal, { deep: true });


const removeProduct = (id) => {
    const index = orderForm.products.findIndex(item => item.id === id);
    if (index !== -1) {
        orderForm.products.splice(index, 1);
        calculateTotal();
    }
};


const handleAddVariant = (product, variantId) => {
    if (!variantId) return;
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return;
    const existing = orderForm.products.find(item => item.id === variant.id);
    if (existing) {
        existing.quantity += 1;
        existing.total = existing.quantity * existing.sellPrice;
    } else {
        orderForm.products.push({
            ...variant,
            productName: product.name,
            productImage: product.image,
            quantity: 1,
            total: variant.sellPrice
        });
    }
    calculateTotal();
};

const productColumns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Chọn biến thể',
        key: 'variant',
        customRender: ({ record }) => {
            return h(Select, {
                placeholder: 'Chọn biến thể',
                style: { width: '200px' },
                onChange: (variantId) => {
                    record.selectedVariantId = variantId;
                }
            }, {
                default: () => record.variants.map(v =>
                    h(Select.Option, { value: v.id }, () =>
                        `${v.color?.name || ''}-${v.size?.name || ''} (${v.sellPrice}đ)`
                    )
                )
            });
        }
    },
    {
        title: 'Thêm',
        key: 'action',
        customRender: ({ record }) => {
            return h(Button, {
                type: 'primary',
                icon: h(PlusCircleOutlined),
                onClick: () => {
                    handleAddVariant(record, record.selectedVariantId);
                }
            }, () => 'Thêm');
        }
    }
];


const orderColumns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'productName',
        key: 'productName',
        customRender: ({ record }) => {
            return h('div', {}, [
                h('img', {
                    src: record.productImage,
                    style: 'width: 30px; margin-right: 6px;'
                }),
                h('span', record.productName)
            ]);
        }
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color',
        key: 'color',
        customRender: ({ text }) => text ? text.name : ''
    },
    {
        title: 'Kích thước',
        dataIndex: 'size',
        key: 'size',
        customRender: ({ text }) => text ? text.name : ''
    },
    {
        title: 'Chất liệu',
        dataIndex: 'material',
        key: 'material',
        customRender: ({ text }) => text ? text.name : ''
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        customRender: ({ record }) => {
            return h(InputNumber, {
                min: 1,
                value: record.quantity,
                onChange: (val) => {
                    record.quantity = val;
                    record.total = record.quantity * record.sellPrice;
                    calculateTotal();
                }
            });
        }
    },
    {
        title: 'Đơn giá',
        dataIndex: 'sellPrice',
        key: 'sellPrice',
        customRender: ({ text }) => text ? `${text.toLocaleString()}đ` : ''
    },
    {
        title: 'Thành tiền',
        dataIndex: 'total',
        key: 'total',
        customRender: ({ text }) => text ? `${text.toLocaleString()}đ` : ''
    },
    {
        title: 'Xóa',
        key: 'delete',
        customRender: ({ record }) => {
            return h(Button, {
                type: 'text',
                danger: true,
                onClick: () => removeProduct(record.id)
            }, () => h(DeleteOutlined));
        }
    }
];

const formatOrderData = () => {
    return {
        orderCode: `order_${Date.now()}`,
        price: Number(orderForm.total),
        discount: Number(orderForm.discount),
        deliveryCost: Number(orderForm.shippingFee),
        paymentStatus: orderForm.paymentStatus === 'Đã thanh toán' ? 0 : 1,
        orderStatus: orderForm.shippingStatus,
        paymentMethodId: orderForm.paymentMethod,
        area: 'VN',
        address_shipping: orderForm.customer.address,
        customer: orderForm.customer.name,
        items: orderForm.products.map(variant => ({
            varianId: variant.id,
            quantity: variant.quantity
        }))
    };
};

const submitOrder = async () => {
    const orderData = formatOrderData();
    try {
        const response = await apiClient.post('/orders', orderData);
        showMessage('success', 'Đơn hàng đã được tạo thành công');
        console.log('Đơn hàng đã tạo:', response.data);
    } catch (error) {
        showMessage('error', 'Không thể tạo đơn hàng');
        console.error('Lỗi khi tạo đơn hàng:', error);
    }
};


const editMode = reactive({
    name: false,
    phone: false,
    address: false,
    discount: false,
    shippingFee: false,
    productCount: false
});


const modalState = ref(false);


const editDiscount = () => {
    console.log('Sửa giảm giá (F6)');
    editMode.discount = !editMode.discount;
};
const editShippingFee = () => {
    console.log('Sửa phí giao hàng (F7)');
    editMode.shippingFee = !editMode.shippingFee;
};

const handleKeydown = (event) => {
    if (event.key === 'F6') {
        event.preventDefault();
        editDiscount();
    } else if (event.key === 'F7') {
        event.preventDefault();
        editShippingFee();
    }
};

onMounted(() => {
    fetchProductList();
    fetchPaymentMethods();
    window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <Layout2 side="right" title="Tạo đơn hàng">
        <template #customHeader>
            <Button type="primary" @click="submitOrder">Tạo đơn hàng</Button>
        </template>

        <template #main>
            <!-- Modal danh sách sản phẩm -->
            <a-modal style="min-width: 700px;" :open="modalState" @ok="modalState = false" @cancel="modalState = false">
                <Card title="Danh sách sản phẩm">
                    <Table :columns="productColumns" :dataSource="productList" rowKey="id"
                        :pagination="{ pageSize: 5 }">
                        <template #bodyCell="{ text, column, record }">
                            <template v-if="column.key === 'name'">
                                <Flex>
                                    <img style="width: 30px; margin-right: 12px" :src="record.image" alt="" />
                                    <p>{{ record.name }}</p>
                                </Flex>
                            </template>
                        </template>
                    </Table>
                </Card>
            </a-modal>

            <!-- Sản phẩm đã chọn -->
            <Card title="Sản phẩm đã chọn" style="margin-top: 16px;">
                <!-- <a-input placeholder="Tìm kiếm sản phẩm" style="margin-bottom: 16px;"></a-input> -->
                <Table :columns="orderColumns" :dataSource="orderForm.products" rowKey="id" :pagination="false" />
                <a-button @click="modalState = true" type="link" :icon="h(PlusCircleOutlined)">
                    Thêm sản phẩm hoặc dịch vụ tùy chỉnh
                </a-button>
            </Card>

            <!-- Thanh toán -->
            <Card title="Thanh toán" style="margin-top: 16px;">
                <div class="payment-row">
                    <span class="label">Tổng tiền hàng</span>
                    <div class="value">
                        <a style="margin-right: 12px;" @click="editProductCount">{{ orderForm.products.length }} sản
                            phẩm</a>
                        <strong>{{ orderForm.total.toLocaleString() }}đ</strong>
                    </div>
                </div>
                <div class="payment-row">
                    <a @click="editDiscount">Sửa giảm giá (F6)</a>
                    <template v-if="editMode.discount">
                        <Input @blur="editDiscount" v-model:value="orderForm.discount" style="width: 60%" />
                    </template>
                    <template v-else>
                        <strong>{{ Number(orderForm.discount
                        ).toLocaleString() }}đ</strong>
                    </template>
                </div>
                <div class="payment-row">
                    <a @click="editShippingFee">Sửa phí giao hàng (F7)</a>
                    <!-- <strong>{{ orderForm.shippingFee.toLocaleString() }}đ</strong> -->
                    <template v-if="editMode.shippingFee">
                        <Input @blur="editShippingFee" v-model:value="orderForm.shippingFee" style="width: 60%" />
                    </template>
                    <template v-else>
                        <strong>{{ Number(orderForm.shippingFee).toLocaleString() }}đ</strong>
                    </template>
                </div>
                <div class="payment-row">
                    <span class="label">Thuế</span>
                    <strong>0đ</strong>
                </div>
                <div class="payment-row" style="margin-bottom: 16px;">
                    <span class="label">Thành tiền</span>
                    <strong>{{ finalAmount.toLocaleString() }}đ</strong>
                </div>
                <div class="payment-box">
                    <Radio.Group v-model:value="orderForm.paymentStatus" style="width: 100%;">
                        <Space direction="vertical" style="width: 100%;">
                            <Radio value="Đã thanh toán">
                                Đã thanh toán
                            </Radio>
                            <template v-if="orderForm.paymentStatus === 'Đã thanh toán'">
                                <div style="margin-top: 8px;">
                                    <span class="sub-label">Hình thức thanh toán</span>
                                    <Select style="min-width: 150px; margin-left: 8px;"
                                        v-model:value="orderForm.paymentMethod">
                                        <Select.Option v-for="method in paymentMethods" :key="method.id"
                                            :value="method.id">
                                            {{ method.name }}
                                        </Select.Option>
                                    </Select>
                                    <span class="sub-label" style="margin-left: 16px;">Số tiền</span>
                                    <InputNumber style="width: 120px; margin-left: 8px;" v-model:value="finalAmount"
                                        :max="finalAmount" />
                                </div>
                            </template>
                            <Radio value="Thanh toán sau">Thanh toán sau</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </Card>

            <!-- Giao hàng -->
            <Card title="Giao hàng" style="margin-top: 16px;">
                <Radio.Group v-model:value="orderForm.shippingStatus">
                    <Space>
                        <Radio :value="0">
                            <CarOutlined /> Đẩy qua hãng vận chuyển
                        </Radio>
                        <Radio :value="1">
                            <CheckCircleOutlined /> Đã giao hàng
                        </Radio>
                        <Radio :value="2">
                            <ClockCircleOutlined /> Giao hàng sau
                        </Radio>
                    </Space>
                </Radio.Group>
            </Card>
        </template>

        <template #sider>
            <div class="sider">
                <Card title="Khách hàng">
                    <p>
                        Tên:
                        <template v-if="editMode.name">
                            <Input v-model:value="orderForm.customer.name" style="width: 60%" />
                            <Button type="text" @click="editMode.name = false">
                                <CheckOutlined />
                            </Button>
                        </template>
                        <template v-else>
                            <strong>{{ orderForm.customer.name }}</strong>
                            <Button type="text" @click="editMode.name = true">
                                <EditOutlined />
                            </Button>
                        </template>
                    </p>
                    <p>
                        Số điện thoại:
                        <template v-if="editMode.phone">
                            <Input v-model:value="orderForm.customer.phone" style="width: 60%" />
                            <Button type="text" @click="editMode.phone = false">
                                <CheckOutlined />
                            </Button>
                        </template>
                        <template v-else>
                            <strong>{{ orderForm.customer.phone }}</strong>
                            <Button type="text" @click="editMode.phone = true">
                                <EditOutlined />
                            </Button>
                        </template>
                    </p>
                    <p>
                        Địa chỉ giao hàng:
                        <template v-if="editMode.address">
                            <Input v-model:value="orderForm.customer.address" style="width: 60%" />
                            <Button type="text" @click="editMode.address = false">
                                <CheckOutlined />
                            </Button>
                        </template>
                        <template v-else>
                            <strong>{{ orderForm.customer.address }}</strong>
                            <Button type="text" @click="editMode.address = true">
                                <EditOutlined />
                            </Button>
                        </template>
                    </p>
                </Card>
            </div>
        </template>
    </Layout2>
</template>

<style scoped>
.sider {
    padding: 16px;
    margin-left: 12px;
    margin-top: 16px;
    background-color: #fff;
    max-width: 340px;
}

.sider strong {
    white-space: normal;
    word-break: break-word;
}

.payment-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.label {
    color: #888;
}

.value {
    display: flex;
    align-items: center;
}

.sub-label {
    color: #888;
}

.payment-box {
    background-color: #f5f5f5;
    padding: 12px;
    border-radius: 4px;
    margin-top: 8px;
}
</style>
