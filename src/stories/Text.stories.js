import Text from "@/components/Text.vue";

export default {
  title: 'My Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    textType: { control: 'text' },
  },
};

const Template = (args) => ({
  components: { Text },
  setup() {
    return { args };
  },
  template: '<Text v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  text: 'Default Text',
};

export const Larger = Template.bind({});
Larger.args = {
  text: 'Larger Text',
  textType: 'larger',
};

export const Small = Template.bind({});
Small.args = {
  text: 'Small Text',
  textType: 'small',
};
