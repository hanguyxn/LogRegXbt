import Layout from '@/layouts/Layout.vue';
import AntMenu from '@/components/Ant/AntMenu.vue';
import { RouterLink } from 'vue-router';
import { Button } from 'ant-design-vue';

export default {
  title: 'My Components/Layout',
  component: Layout,
};

const Template = (args) => ({
  components: { Layout, AntMenu, RouterLink, Button },
  setup() {
    return { args };
  },
  template: `
    <Layout>
      <template #nav>
        <p style="padding: 10px; background: #f0f2f5;">Navigation Slot</p>
      </template>
      <template #content>
        <p style="text-align: center; font-size: 18px;">Main Content Slot</p>
      </template>
    </Layout>
  `,
});

export const Default = Template.bind({});
Default.args = {};
