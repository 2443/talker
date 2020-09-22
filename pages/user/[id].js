import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import socketio from 'socket.io-client';
import ChattingLayout from '../../components/ChattingLayout';
import { loadMydata } from '../../actions/user';
import wrapper from '../../store/configureStore';
import Axios from 'axios';
import { getUser, loadRoom } from '../../actions/room';

const socket = socketio.connect('http://localhost:4000', {});
(() => {
  socket.on('welcome', (msg) => {
    console.log(msg);
  });
})();

const ChattingRoom = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const { chattingRoom } = useSelector((state) => state.room);
  chattingRoom.name = chattingRoom.Users[0].nickname;
  chattingRoom.roomImage = chattingRoom.Users[0].profileImage;

  const isLoggedIn = !!me;

  useEffect(() => {
    if (isLoggedIn) {
      socket.emit('init', { id: chattingRoom.id, name: me.nickname });
      socket.on('message', (data) => {
        setData(data);
      });
    }
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [me]);

  if (!isLoggedIn) {
    return null;
  }

  return <ChattingLayout data={data} socket={socket} me={me} chattingRoom={chattingRoom} />;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie || '' : '';
  Axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }
  const { id } = context.query;

  await Promise.all([context.store.dispatch(loadMydata()), context.store.dispatch(getUser(id))]);
});

export default ChattingRoom;
