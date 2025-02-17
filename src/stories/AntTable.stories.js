import AntTable from '@/components/Ant/AntTable.vue';

export default {
  title: 'My Components/AntTable',
  component: AntTable,
  tags: ['docs'],
  argTypes: {
    paginationNumber: { control: { type: 'number' } },
    tableColumn: {control: {type: 'array'}},
    tableData: {control: {type: 'array'}}
  }
};

const Template = (args) => ({
  components: { AntTable },
  setup() {
    return { args };
  },
  template: `<AntTable v-bind="args"/>`
});

export const Default = Template.bind({});
Default.args = {
  paginationNumber: 5,
  tableData:[
    { key: '1', name: 'Không vc', sold: -2, createdAt: '09/12/2024' },
    { key: '2', name: 'Buộc tóc hoa tháng 11!!!!', sold: 987, createdAt: '10/05/2024' },
    { key: '3', name: 'Váy xinh 2 tmt', sold: 986, createdAt: '10/05/2024' },
    { key: '4', name: 'test payment', sold: 72, createdAt: '23/04/2024' },
    { key: '5', name: 'Hoa tươi', sold: 22088, createdAt: '17/04/2024' },
    { key: '6', name: 'Test kcn 1', sold: 34324, createdAt: '16/04/2024' },
    { key: '7', name: 'Test Hoa 2', sold: 85, createdAt: '16/04/2024' }
  ],
  tableColumn: [
        { title: "", dataIndex: 'checkbox', key: 'checkbox' },
        { title: 'Sản phẩm', dataIndex: 'name', key: 'name' },
        { title: 'Có thể bán', dataIndex: 'sold', key: 'sold' },
        { title: 'Nhãn hiệu', dataIndex: 'brand', key: 'brand' },
        { title: 'Ngày khởi tạo', dataIndex: 'createdAt', key: 'createdAt' }
    ]
};
