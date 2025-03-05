<script setup>
import { ref, h } from 'vue'
import { Input, Button, Select, Row, Col, DatePicker } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const props = defineProps({
    filters: {
        type: Array,
        required: true
    },
    searchPlaceholder: {
        type: String,
        default: 'Tìm kiếm'
    },
    showCreatedAt: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['search'])

const searchQuery = ref('')
const createdAt = ref(null)

const emitSearch = () => {
    // Kiểm tra nếu filters rỗng
    if (!props.filters || props.filters.length === 0) {
        console.log('Filters is empty');
        emit('search', {
            searchQuery: searchQuery.value,
            filters: {},
            createdAt: props.showCreatedAt ? createdAt.value : null
        });
        return;
    }

    // Reduce ra mảng mới gồm filter key và value, bỏ các phần khác
    const filterValues = props.filters.reduce((previous, current) => {
        previous[current.key] = current.value;
        return previous;
    }, {});

    // Emit truyền searchQuery và filter value lên component cha để component cha call api
    emit('search', {
        searchQuery: searchQuery.value,
        filters: filterValues,
        createdAt: props.showCreatedAt ? createdAt.value : null
    });
    // console.log(searchQuery.value, filterValues);
}

</script>

<template>
    <Row>
        <Col flex="1 1 auto">
        <Input :prefix="h(SearchOutlined)" @keyup.enter="emitSearch" @blur="emitSearch" v-model:value="searchQuery"
            :placeholder="searchPlaceholder" style="min-width: 300px; margin-right: 12px" />
        </Col>
        <Col flex="0 1 auto" v-for="filter in filters" :key="filter.key">
        <Select v-model:value="filter.value" :placeholder="filter.placeholder" style="margin-left: 3px; width: 150px;">
            <Select.Option :value="null">Tất cả</Select.Option>
            <Select.Option v-for="option in filter.options" :key="option.value" :value="option.label">
                {{ option.label }}
            </Select.Option>
        </Select>
        </Col>
        <Col flex="0 1 auto" v-if="showCreatedAt">
        <DatePicker v-model:value="createdAt" placeholder="Chọn ngày tạo" style="margin-left: 3px; width: 150px;" />
        </Col>
        <Col flex="0 1 auto">
        <Button @click="emitSearch" type="primary" style="margin-left: 12px">Lưu bộ lọc</Button>
        </Col>
    </Row>
</template>

<style scoped>
.margin-left {
    margin: 8px;
}
</style>
