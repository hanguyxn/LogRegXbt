import LoginLayout from "@/layouts/LoginLayout.vue"
export default {
  title: 'My Components/LoginLayout',
  component: LoginLayout,
  tags: ['autodocs'],
};

const Template = (args) => ({
  components: { LoginLayout },
  setup() {
    return { args };
  },
  template: `
    <LoginLayout>
      <div style="padding: 20px; text-align: center;">
        <h2>Welcome to Login Page</h2>
        <p>This is the login form area.</p>
      </div>
    </LoginLayout>
  `,
});

export const Default = Template.bind({})
Default.args = {}
