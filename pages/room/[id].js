import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import socketio from 'socket.io-client';
import ChattingLayout from '../../components/ChattingLayout';
import { loadMydata } from '../../actions/user';
import wrapper from '../../store/configureStore';

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
  const room = useSelector((state) =>
    state.room.Rooms.find((e) => {
      return e.id === id;
    })
  );

  useEffect(() => {
    if (id && me) {
      socket.emit('init', { id, name: me.nickname });
      socket.on('message', (data) => {
        setData(data);
      });
    }
  }, [id, me]);

  if (!me) {
    return null;
  }

  return <ChattingLayout data={data} socket={socket} me={me} room={room} />;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie || '' : '';
  Axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }
  await Promise.all([context.store.dispatch(loadMydata())]);
});

export default ChattingRoom;
