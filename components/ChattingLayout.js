import React, { useCallback, useState, useEffect } from 'react';
import { PageHeader, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import Message from './Message';
import useInput from '../hooks/useInput';

const { Search } = Input;

const CustomPageHeader = styled(PageHeader)`
  background-color: #ffffff;
  position: fixed;
  width: 100vw;
  z-index: 9999;
`;

const ChattingLayout = ({ data, socket, room, me }) => {
  const [message, setMessage, changeMessage] = useInput('');
  const [id, setId] = useState(10);
  const [contents, setContents] = useState(() => {
    try {
      const item = window.localStorage.getItem(room.id);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const onClickSendMessage = useCallback(() => {
    console.log(message);
    if (!!message.trim()) {
      socket.emit('message', { User: me, content: message, roomId: room.id });
      setContents(contents.concat({ User: me, content: message }));
      setMessage('');
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 100);
      }, 50);
    }
  }, [message]);

  useEffect(() => {
    if (!!data) {
      console.log(data);
      setContents(contents.concat(data));
    }
  }, [data]);

  useEffect(() => {
    window.localStorage.setItem(room.id, JSON.stringify(contents));
  }, [contents]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#7FDBFF' }}>
      <CustomPageHeader title={room.name} avatar={{ src: room.roomImage }} />
      <div style={{ height: '70px' }}>해더 공백 블럭</div>

      <div style={{ paddingTop: '10px' }}>
        <Message contents={contents} me={me} />
      </div>

      <div style={{ height: '30px' }}></div>
      <Search
        value={message}
        onChange={changeMessage}
        style={{ position: 'fixed', bottom: 0 }}
        enterButton={<RightOutlined />}
        onSearch={onClickSendMessage}
      />
    </div>
  );
};

ChattingLayout.propTypes = {};

export default ChattingLayout;
