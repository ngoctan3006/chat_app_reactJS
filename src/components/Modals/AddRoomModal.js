import { Form, Input, Modal } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import { addDocument } from '../../firebase/services';

const AddRoomModal = () => {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid }
    } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
        form.resetFields();

        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    };

    return (
        <div>
            <Modal
                title='Tạo phòng'
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item label='Tên phòng' name='name'>
                        <Input placeholder='Nhập tên phòng' />
                    </Form.Item>
                    <Form.Item label='Mô tả' name='description'>
                        <Input.TextArea placeholder='Nhập mô tả' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddRoomModal;
