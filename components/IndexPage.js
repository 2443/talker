import { Button, List, Avatar, Modal, Badge } from 'antd';
import SearchBox from '../components/SearchBox';
import { useSelector, useDispatch } from 'react-redux';
import { filterUsers } from '../actions/user';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const border = { borderBottom: '1px solid lightgray' };
const Home = ({ me }) => {
  const dispatch = useDispatch();
  const { Users, filteredUsers } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const controlModalVisible = (yn) => () => {
    setModalVisible(yn);
  };
  return (
    <>
      <SearchBox placeholder={`친구 (${Users.length})`} action={filterUsers} />
      <List
        header={
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={me.profileImage}>{me.nickname[0].toUpperCase()}</Avatar>}
              title={me.nickname}
              description={me.statusMessage}
              style={{ margin: '10px' }}
            />
          </List.Item>
        }
        size='small'
        bordered={true}
        dataSource={filteredUsers.length ? filteredUsers : Users}
        renderItem={(item) => (
          <List.Item style={border}>
            <List.Item.Meta
              avatar={<Avatar src={item.profileImage}>{item.nickname[0].toUpperCase()}</Avatar>}
              title={item.nickname}
              description={item.statusMessage}
              style={{ margin: '10px' }}
            />
          </List.Item>
        )}
      ></List>
      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Badge count={5}>
          <Avatar shape='square' icon={<PlusOutlined />} onClick={controlModalVisible(true)} />
          <Modal
            title='친구 추가'
            visible={modalVisible}
            footer={[]}
            onCancel={controlModalVisible(false)}
            onOk={controlModalVisible(false)}
          ></Modal>
        </Badge>
      </div>
    </>
  );
};

export default Home;
