import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import SearchBox from '../components/SearchBox';
import { List, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadRooms, filterRooms } from '../actions/room';

const border = { borderBottom: '1px solid lightgray' };

const Room = () => {
  const dispatch = useDispatch();
  const { Rooms, filteredRooms } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  return (
    <AppLayout index='2'>
      <SearchBox action={filterRooms} />
      <List
        size='large'
        bordered={true}
        dataSource={filteredRooms.length ? filteredRooms : Rooms}
        renderItem={(item) => (
          <List.Item style={border}>
            <List.Item.Meta
              avatar={<Avatar src={item.roomImage} />}
              title={item.name}
              description={item.lastMessage}
              style={{ margin: '10px' }}
            />
          </List.Item>
        )}
      ></List>
    </AppLayout>
  );
};

export default Room;
