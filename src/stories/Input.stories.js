import Input from "@/components/Input.vue"
import { components } from "storybook/internal/components"


export default {
    title: "My Components/Input",
    tags: ['autodocs'],
    component: Input,
    argTypes:{
        type: { control: 'text' },
        placeholder: { control: 'text' },
        class: { control: 'text' },
        required: { control: 'boolean' }
    }
}

const Template = (args) => ({
    components: {Input},
    setup(){
        return {args}
    },
    template: "<Input v-bind='args'/>"
})


export const Default = Template.bind({})
Default.args = {
    type: 'text',
    placeholder: 'Input here',
    class: 'input',
    required: false
}

export const Checkbox = Template.bind({})
Checkbox.args = {
    type: 'checkbox',
    class: 'input',
    required: false
}

export const Radio = Template.bind({})
Radio.args = {
    type: 'radio',
    class: 'input',
    required: false
}