import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input, Comment, Avatar, PageHeader } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import styled from '@emotion/styled';
import Message from '../../components/Message';
import { useSelector } from 'react-redux';
import socketio from 'socket.io-client';
import Socket from '../../components/Socket';
import ChattingLayout from '../../components/ChattingLayout';

const socket = socketio.connect('http://localhost:4000', {});
(() => {
  socket.on('welcome', (msg) => {
    console.log(msg);
  });
})();

const ChattingRoom = () => {
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
    socket.emit('init', { id, name: me.nickname });
    socket.on('message', (data) => {
      setData(data);
    });
  }, []);

  if (!id) {
    return null;
  }

  return <ChattingLayout data={data} socket={socket} me={me} room={room} />;
};

export default ChattingRoom;
