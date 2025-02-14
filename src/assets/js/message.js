import { message } from "ant-design-vue";


const showMessage = (type='success', content='This is success message') => {
    message.open({
        type: type,
        content: content,
    });
};

export default showMessage