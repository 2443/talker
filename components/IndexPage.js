import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Input } from 'antd';
import SearchBox from '../components/SearchBox';
import { List, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUsers, filterUsers, loadMydata } from '../actions/user';
import wrapper from '../store/configureStore';
import { useRouter } from 'next/router';
import Axios from 'axios';

const { Search } = Input;

const border = { borderBottom: '1px solid lightgray' };
const Home = ({ me }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { Users, filteredUsers } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      router.push('/login');
    }
  }, [me]); // 후에 SSR로 변경

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
    </>
  );
};

export default Home;
