import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Comment, Avatar, PageHeader } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import styled from '@emotion/styled';
import Message from '../../components/Message';
import { useSelector } from 'react-redux';

const CustomPageHeader = styled(PageHeader)`
  background-color: #ffffff;
  position: fixed;
  width: 100vw;
  z-index: 9999;
`;

const { Search } = Input;
const ChattingRoom = () => {
  const [message, setMessage, changeMessage] = useInput('');
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  let id2 = 9;
  const room = useSelector((state) =>
    state.room.Rooms.find((e) => {
      return e.id === id;
    })
  );
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
    setContents(contents.concat({ id: id2++, User: me, content: message }));
    setMessage('');
  }, [message]);

  if (!id) {
    return null;
  }

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

export default ChattingRoom;
