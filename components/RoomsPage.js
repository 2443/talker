import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import SearchBox from '../components/SearchBox';
import { List, Avatar, Button, Checkbox, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { loadRooms, filterRooms, createRoom } from '../actions/room';
import Link from 'next/link';
import Modal from 'antd/lib/modal/Modal';
import { filterUsers } from '../actions/user';
import { PlusOutlined } from '@ant-design/icons';
import useInput from '../hooks/useInput';

const border = { borderBottom: '1px solid lightgray' };

const Room = () => {
  const dispatch = useDispatch();
  const { Rooms, filteredRooms, loading, done } = useSelector((state) => state.room);
  const { Users } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomTitle, setRoomTitle, changeRoomTitle] = useInput('');

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
        setRoomUsers(roomUsers.filter((userId) => userId !== e.target.value));
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

  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  return (
    <>
      <SearchBox action={filterRooms} />
      <List
        size='large'
        bordered={true}
        dataSource={filteredRooms.length ? filteredRooms : Rooms}
        renderItem={(item) => (
          <Link href={`/room/${item.id}`}>
            <a>
              <List.Item style={border}>
                <List.Item.Meta
                  avatar={<Avatar src={item.roomImage} />}
                  title={item.name}
                  description={item.lastMessage}
                  style={{ margin: '10px' }}
                />
              </List.Item>
            </a>
          </Link>
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
