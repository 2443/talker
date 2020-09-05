import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Input } from 'antd';
import SearchBox from '../components/SearchBox';
import { List, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUsers, filterUsers } from '../actions/user';

const { Search } = Input;

const border = { borderBottom: '1px solid lightgray' };
const Home = () => {
  const dispatch = useDispatch();
  const { Users, me, filteredUsers } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <>
      <AppLayout index='1'>
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
      </AppLayout>
    </>
  );
};
