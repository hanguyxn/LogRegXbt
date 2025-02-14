import Button from "@/components/Button.vue";

export default {
  title: 'My Components/Button', 
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'text' },
    text: { control: 'text' },
    btnClass: { control: 'text' },
    isDisable: { control: 'boolean' },
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary Button',
  btnClass: 'btn btn-primary',
};

export const Outline = Template.bind({});
Outline.args = {
  text: 'Outline Button',
  btnClass: 'btn btn-outline',
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled Button',
  btnClass: 'btn btn-primary',
  isDisable: true,
};
