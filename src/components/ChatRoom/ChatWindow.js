import { Button, Avatar, Tooltip, Form, Input, Alert } from 'antd';
import styled from 'styled-components';
import { UserAddOutlined } from '@ant-design/icons';
import { useContext, useMemo, useState } from 'react';
import Message from './Message';
import { AppContext } from '../../contexts/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../contexts/AuthProvider';
import useFireStore from '../../hooks/useFireStore';

const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }

        &__description {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-border: 0;
    }
`;

const ChatWindow = () => {
    const { selectedRoom, members, setIsInviteMemberVisible } =
        useContext(AppContext);

    const {
        user: { uid, displayName, photoURL }
    } = useContext(AuthContext);

    const [inputValue, setInputValue] = useState('');

    const [form] = Form.useForm();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        });

        form.resetFields(['message']);
    };

    const condition = useMemo(
        () => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom.id
        }),
        [selectedRoom.id]
    );

    const messages = useFireStore('messages', condition);

    return (
        <WrapperStyled>
            {selectedRoom.id ? (
                <>
                    <HeaderStyled>
                        <div className='header__info'>
                            <p className='header__title'>{selectedRoom.name}</p>
                            <span className='header__description'>
                                {selectedRoom.description}
                            </span>
                        </div>
                        <ButtonGroupStyled>
                            <Button
                                type='text'
                                icon={<UserAddOutlined />}
                                onClick={() => setIsInviteMemberVisible(true)}>
                                Mời
                            </Button>
                            <Avatar.Group size='small' maxCount={2}>
                                {members.map((member) => (
                                    <Tooltip
                                        title={member.displayName}
                                        key={member.id}>
                                        <Avatar src={member.photoURL}>
                                            {member.photoURL
                                                ? ''
                                                : member.displayName
                                                      ?.chatAt(0)
                                                      .toUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </ButtonGroupStyled>
                    </HeaderStyled>

                    <ContentStyled>
                        <MessageListStyled>
                            {messages.map((mes) => (
                                <Message
                                    key={mes.id}
                                    text={mes.text}
                                    displayName={mes.displayName}
                                    createdAt={mes.createdAt}
                                    photoURL={mes.photoURL}
                                />
                            ))}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name='message'>
                                <Input
                                    placeholder='Nhập tin nhắn...'
                                    bordered={false}
                                    autoComplete='off'
                                    onChange={handleInputChange}
                                    onPressEnter={handleOnSubmit}
                                    value={inputValue}
                                />
                            </Form.Item>
                            <Button type='primary' onClick={handleOnSubmit}>
                                Gửi
                            </Button>
                        </FormStyled>
                    </ContentStyled>
                </>
            ) : (
                <Alert
                    message='Hãy chọn phòng'
                    type='info'
                    showIcon
                    style={{ margin: 5 }}
                    closable
                />
            )}
        </WrapperStyled>
    );
};

export default ChatWindow;
