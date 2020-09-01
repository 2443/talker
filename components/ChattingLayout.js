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
  const [contents, setContents] = useState([
    { id: 1, content: '첫 메시지입니당', date: '2020-01-01...', User: { id: 1, nickname: '1번' } },
    {
      id: 2,
      content: '두번째 메시지입니당',
      date: '2020-01-01...',
      User: { id: 1, nickname: '1번' },
    },
    { id: 3, content: '세번째 메시지입니당', date: '2020-01-01...', User: { id: me.id } },
    {
      id: 4,
      content: '네번째 메시지입니당',
      date: '2020-01-01...',
      User: { id: 2, nickname: '2번' },
    },
    {
      id: 5,
      content: '네번째 메시지입니당',
      date: '2020-01-01...',
      User: { id: 2, nickname: '2번' },
    },
    {
      id: 6,
      content: '다섯번째 메시지입니당',
      date: '2020-01-01...',
      User: { id: 2, nickname: '2번' },
    },
    {
      id: 7,
      content: '여섯번째 메시지입니당',
      date: '2020-01-01...',
      User: { id: 3, nickname: '3번' },
    },
    {
      id: 8,
      content: '일곱번째 메시지입니당',
      date: '2020-01-01...',
      User: { id: 4, nickname: '개인주의' },
    },
  ]);
  const onClickSendMessage = useCallback(() => {
    console.log(message);
    socket.emit('message', { User: me, content: message });
    setContents(contents.concat({ User: me, content: message }));
    setMessage('');
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight + 100);
    }, 50);
  }, [message]);

  useEffect(() => {
    if (!!data) {
      console.log(data);
      setContents(contents.concat(data));
    }
  }, [data]);

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
