import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import IndexPage from '../components/IndexPage';
import RoomsPage from '../components/RoomsPage';
import SettingPage from '../components/SettingPage';
import { Input } from 'antd';
import SearchBox from '../components/SearchBox';
import { List, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUsers, filterUsers, loadMydata } from '../actions/user';
import wrapper from '../store/configureStore';
import { useRouter } from 'next/router';
import Axios from 'axios';

const { Search } = Input;

const border = { borderBottom: '1px solid lightgray' };
const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { Users, me, filteredUsers } = useSelector((state) => state.user);

  const [page, setPage] = useState('main');

  useEffect(() => {
    if (!me) {
      router.push('/login');
    }
  }, [me]); // 후에 SSR로 변경

  return (
    <AppLayout page={page} setPage={setPage} index='1' me={me}>
      {page === 'main' && <IndexPage me={me} />}
      {page === 'rooms' && <RoomsPage me={me} />}
      {page === 'setting' && <SettingPage me={me} />}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie || '' : '';
  Axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }
  await Promise.all([context.store.dispatch(loadUsers()), context.store.dispatch(loadMydata())]);
});

export default Home;
