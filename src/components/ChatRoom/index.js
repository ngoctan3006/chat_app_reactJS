import { Row, Col } from 'antd';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';

const ChatRoom = () => {
    return (
        <div>
            <Row>
                <Col span={8}>
                    <Sidebar />
                </Col>
                <Col span={16}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    );
};

export default ChatRoom;
