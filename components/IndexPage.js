import { Button, List, Avatar, Modal, Badge, Popover, Alert, notification } from 'antd';
import SearchBox from '../components/SearchBox';
import { useSelector, useDispatch } from 'react-redux';
import { filterUsers, loadUser, requestAddFriend, responseAddFriend } from '../actions/user';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useCallback, useMemo } from 'react';
import Item from 'antd/lib/list/Item';

const margin10px = { margin: '10px' };
const border = { borderBottom: '1px solid lightgray' };
const Home = ({ me }) => {
  const dispatch = useDispatch();
  const { Users, filteredUsers, searchedUser, loadUserLoading, loadUserDone } = useSelector(
    (state) => state.user
  );
  const usersStates = useMemo(() => {
    const returnObject = {
      friend: [],
      send: [],
      receive: [],
      block: [],
    };
    Users.forEach((e) => returnObject[e.state].push(e));
    return returnObject;
  }, [Users]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onPopoverChange = useCallback(
    (id) => () => {
      if (selectedUser === id) {
        setSelectedUser(null);
      } else {
        setSelectedUser(id);
      }
    },
    [selectedUser]
  );

  const onFriendRequestClick = (id) => () => {
    if (id === me.id) {
      return notification.open({
        message: '자기 자신과는 친구를 할 수 없습니다.',
      });
    }
    dispatch(requestAddFriend(id));
    onPopoverChange(null);
  };

  const onFriendResponseClick = (id, state) => () => {
    dispatch(responseAddFriend({ id, state }));
    onPopoverChange(null);
  };

  const controlModalVisible = (yn) => () => {
    setModalVisible(yn);
  };

  return (
    <>
      <SearchBox placeholder={`친구 (${usersStates.friend.length})`} action={filterUsers} />
      <List
        header={
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={me.profileImage}>{me.nickname[0].toUpperCase()}</Avatar>}
              title={me.nickname}
              description={me.statusMessage}
              style={margin10px}
            />
          </List.Item>
        }
        size='small'
        bordered={true}
        dataSource={filteredUsers.length ? filteredUsers : usersStates.friend}
        renderItem={(item) => (
          <List.Item style={border}>
            <List.Item.Meta
              avatar={<Avatar src={item.profileImage}>{item.nickname[0].toUpperCase()}</Avatar>}
              title={item.nickname}
              description={item.statusMessage}
              style={margin10px}
            />
          </List.Item>
        )}
      ></List>
      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Badge count={usersStates.receive.length}>
          <Avatar shape='square' icon={<PlusOutlined />} onClick={controlModalVisible(true)} />
          <Modal
            title='친구 추가'
            visible={modalVisible}
            footer={[]}
            onCancel={controlModalVisible(false)}
            onOk={controlModalVisible(false)}
          >
            <SearchBox
              placeholder='친구 코드 or 이메일'
              action={loadUser}
              loading={loadUserLoading}
            />
            <List
              header={null}
              size='small'
              bordered={true}
              loading={loadUserLoading}
              dataSource={searchedUser ? [searchedUser] : usersStates.receive}
              renderItem={(item) => (
                <List.Item style={border} key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.profileImage}>{item.nickname[0].toUpperCase()}</Avatar>
                    }
                    title={item.nickname}
                    description={item.statusMessage}
                    style={margin10px}
                  />
                  <Popover
                    content={
                      <>
                        {searchedUser ? (
                          <Button onClick={onFriendRequestClick(item.id)} type='primary'>
                            친구 요청
                          </Button>
                        ) : (
                          <>
                            <Button
                              onClick={onFriendResponseClick(item.id, 'accept')}
                              type='primary'
                            >
                              수락
                            </Button>
                            <Button onClick={onFriendResponseClick(item.id, 'reject')} danger>
                              거절
                            </Button>
                            <Button
                              onClick={onFriendResponseClick(item.id, 'block')}
                              type='primary'
                              danger
                            >
                              차단
                            </Button>
                          </>
                        )}
                      </>
                    }
                    trigger='click'
                    visible={selectedUser === item.id}
                    onVisibleChange={onPopoverChange(item.id)}
                  >
                    <Button type='primary' icon={<UserOutlined />}></Button>
                  </Popover>
                </List.Item>
              )}
            ></List>
          </Modal>
        </Badge>
      </div>
    </>
  );
};

export default Home;
