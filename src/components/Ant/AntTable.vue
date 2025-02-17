<script setup>
import { reactive, watch, defineProps } from 'vue';
import { Checkbox } from 'ant-design-vue';

const props = defineProps({
  tableData: Array,
  tableColumn: Array,
  paginationNumber: {
    type: Number,
    default: 5
  }
});

const pagination = reactive({
  pageSize: props.paginationNumber,
  current: 1
});

watch(() => props.paginationNumber, (newPageSize) => {
  pagination.pageSize = newPageSize;
  pagination.current = 1
});

const handleTableChange = (pag) => {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
};
</script>

<template>
  <a-table 
    :dataSource="tableData" 
    :columns="tableColumn" 
    :pagination="pagination"
    @change="handleTableChange"
    bordered
  >
    <template #bodyCell="{ text, column }">
      <template v-if="column.dataIndex === 'checkbox'">
        <Checkbox />
      </template>
      <template v-else>{{ text }}</template>
    </template>
  </a-table>
</template>
