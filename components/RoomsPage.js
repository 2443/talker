import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import SearchBox from '../components/SearchBox';
import { List, Avatar, Button, Checkbox, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { loadRooms, filterRooms, createRoom, delay } from '../actions/room';
import Link from 'next/link';
import Modal from 'antd/lib/modal/Modal';
import { filterUsers } from '../actions/user';
import { PlusOutlined } from '@ant-design/icons';
import useInput from '../hooks/useInput';
import { loadNewChatAPI } from '../actions/chat';
import { LOAD_NEW_CHAT_SUCCESS } from '../reducers/room';

const border = { borderBottom: '1px solid lightgray' };

const Room = () => {
  const dispatch = useDispatch();
  const { Rooms, filteredRooms, loading, done } = useSelector((state) => state.room);
  const { Users } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomTitle, setRoomTitle, changeRoomTitle] = useInput('');
  const [intervalRef, setIntervalRef] = useState(null);

  const friends = useMemo(() => Users.filter((e) => e.state === 'friend'), [Users]);

  const controlModalVisible = (yn) => () => {
    setModalVisible(yn);
    setRoomUsers([]);
    setRoomTitle('');
  };

  const onCheckBoxChange = useCallback(
    (e) => {
      if (e.target.checked) {
        setRoomUsers(roomUsers.concat(e.target.value));
      } else {
        setRoomUsers(roomUsers.filter((UserId) => UserId !== e.target.value));
      }
    },
    [roomUsers]
  );

  const onSubmit = useCallback(() => {
    dispatch(createRoom({ roomUsers, roomTitle }));
    console.log(roomUsers, roomTitle);
  }, [roomUsers, roomTitle]);

  useEffect(() => {
    if (done) {
      setModalVisible(false);
      setRoomUsers([]);
      setRoomTitle('');
    }
  }, [done]);

  const loadNewChat = async (Rooms) => {
    console.log(Rooms);

    try {
      if (Rooms.length) {
        const roomsData = Rooms.map(({ id, lastChatTime }) => ({ RoomId: id, lastChatTime }));
        const result = await loadNewChatAPI({ roomsData });
        console.log(result.data);
        dispatch({
          type: LOAD_NEW_CHAT_SUCCESS,
          payload: result,
        });
      }
    } catch (err) {}
  };
  useEffect(() => {
    dispatch(loadRooms());
    loadNewChat();
  }, []);

  useEffect(() => {
    console.log('in useEffect', Rooms);
    if (intervalRef !== null) {
      clearInterval(intervalRef);
    }
    const ref = setInterval(() => {
      loadNewChat(Rooms);
    }, 5000);
    setIntervalRef(ref);
  }, [Rooms]);

  return (
    <>
      <SearchBox action={filterRooms} />
      <List
        size='large'
        bordered={true}
        dataSource={filteredRooms.length ? filteredRooms : Rooms}
        renderItem={(item) => (
          <>
            {item.isOneOnOne ? (
              <Link href={`/user/${item.Users[0].id}`}>
                <a>
                  <List.Item style={border}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.Users[0].profileImage}>
                          {item.Users[0].nickname[0].toUpperCase()}
                        </Avatar>
                      }
                      title={item.Users[0].nickname}
                      description={item.lastMessage}
                      style={{ margin: '10px' }}
                    />
                  </List.Item>
                </a>
              </Link>
            ) : (
              <Link href={`/room/${item.id}`}>
                <a>
                  <List.Item style={border}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.roomImage}>{item.name[0].toUpperCase()}</Avatar>}
                      title={item.name}
                      description={item.lastMessage}
                      style={{ margin: '10px' }}
                    />
                  </List.Item>
                </a>
              </Link>
            )}
          </>
        )}
      ></List>
      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Avatar shape='square' icon={<PlusOutlined />} onClick={controlModalVisible(true)} />
        <Modal
          title='채팅방 생성'
          visible={modalVisible}
          footer={
            <Button type='primary' onClick={onSubmit} loading={loading}>
              생성
            </Button>
          }
          onCancel={controlModalVisible(false)}
          onOk={controlModalVisible(false)}
        >
          <Input
            placeholder='채팅방 제목'
            required
            value={roomTitle}
            onChange={changeRoomTitle}
            maxLength={30}
          />
          {modalVisible ? (
            <List
              header={null}
              size='small'
              bordered={true}
              dataSource={friends}
              renderItem={(item) => (
                <List.Item style={border}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.profileImage}>{item.nickname[0].toUpperCase()}</Avatar>
                    }
                    title={item.nickname}
                    description={item.statusMessage}
                  />
                  <Checkbox value={item.id} onChange={onCheckBoxChange} />
                </List.Item>
              )}
            ></List>
          ) : null}
        </Modal>
      </div>
    </>
  );
};

export default Room;
