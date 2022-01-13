import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgb(82, 38, 83);

    .username {
        color: white;
        margin-left: 5px;
    }
`;

const UserInfo = () => {
    return (
        <WrapperStyled>
            <div>
                <Avatar>T</Avatar>
                <Typography.Text className='username'>Tân</Typography.Text>
            </div>
            <Button ghost>Đăng xuất</Button>
        </WrapperStyled>
    );
};

export default UserInfo;
