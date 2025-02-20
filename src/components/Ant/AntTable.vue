<script setup>
import { computed, defineProps, watch } from 'vue';
import { Checkbox } from 'ant-design-vue';

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  tableColumn: {
    type: Array,
    default: () => []
  },
  paginationNumber: {
    type: Number,
    default: 5
  }
});
const pagination = computed(() => ({
  pageSize: props.paginationNumber,
  current: 1
}));

const handleTableChange = (pag) => {
  pagination.value.current = pag.current;
  pagination.value.pageSize = pag.pageSize;
};
watch(() => props.tableData, (newData) => {
  console.log('Dữ liệu bảng:', newData);
});
</script>

<template>
  <a-table :dataSource="tableData" :columns="tableColumn" :pagination="pagination" @change="handleTableChange" bordered>
    <template #bodyCell="{ text, column, record }">
      <template v-if="column.key === 'checkbox'">
        <Checkbox />
      </template>

      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>
