import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { useState, useMemo, useContext } from 'react';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';
import { AppContext } from '../../contexts/AppProvider';

const DebounceSelect = ({
    fetchOptions,
    debounceTimeout = 300,
    curMembers,
    ...props
}) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}>
            {options.map((opt) => (
                <Select.Option
                    key={opt.value}
                    value={opt.value}
                    title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL
                            ? ''
                            : opt.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                    {`${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
};

const fetchUserList = async (search, currentMembers) =>
    db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) =>
            snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL
                }))
                .filter((opt) => !currentMembers.includes(opt.value))
        );

const InviteMemberModal = () => {
    const {
        selectedRoomId,
        selectedRoom,
        isInviteMemberVisible,
        setIsInviteMemberVisible
    } = useContext(AppContext);

    const [value, setValue] = useState([]);

    const [form] = Form.useForm();

    const handleOk = () => {
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, value.map((val) => val.value)]
        });
        form.resetFields();
        setIsInviteMemberVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsInviteMemberVisible(false);
    };

    return (
        <div>
            <Modal
                title='Mời thêm thành viên'
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        currentMembers={selectedRoom.members}
                        style={{ width: '100%' }}
                    />
                </Form>
            </Modal>
        </div>
    );
};

export default InviteMemberModal;
