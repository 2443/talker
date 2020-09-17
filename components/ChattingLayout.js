import React, { useCallback, useState, useEffect, useRef } from 'react';
import { PageHeader, Input, Button, Modal, Avatar, Form, Space } from 'antd';
import { RightOutlined, SettingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import Message from './Message';
import useInput from '../hooks/useInput';
import { updateRoom, uploadRoomImage } from '../actions/room';
import { useDispatch } from 'react-redux';
import { REMOVE_ROOM_IMAGE } from '../reducers/room';

const { Search } = Input;

const CustomPageHeader = styled(PageHeader)`
  background-color: #ffffff;
  position: fixed;
  width: 100vw;
  z-index: 9999;
`;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const ChattingLayout = ({ data, socket, chattingRoom, me }) => {
  const dispatch = useDispatch();
  const [message, setMessage, changeMessage] = useInput('');
  const [inputName, setInputName, changeInputName] = useInput(chattingRoom.name);
  const [id, setId] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const imageInput = useRef();

  const { Users } = chattingRoom;
  const [contents, setContents] = useState([]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch(uploadRoomImage(imageFormData));
  });

  const onClickImageRemove = useCallback(() => {
    dispatch({
      type: REMOVE_ROOM_IMAGE,
    });
  });

  const controlModalVisible = (yn) => () => {
    setModalVisible(yn);
  };

  const onClickSendMessage = useCallback(() => {
    console.log(message);
    if (!!message.trim()) {
      socket.emit('message', { User: me, content: message, roomId: chattingRoom.id });
      setContents(contents.concat({ User: me, content: message }));
      setMessage('');
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 100);
      }, 50);
    }
  }, [message]);

  const onSubmit = useCallback(() => {
    dispatch(
      updateRoom({ id: chattingRoom.id, roomImage: chattingRoom.roomImage, name: inputName })
    );
    setModalVisible(false);
  }, [chattingRoom.roomImage, inputName]);

  useEffect(() => {
    const item = window.localStorage.getItem(chattingRoom.id);
    console.log('item', item);
    setContents(item ? JSON.parse(item) : []);
  }, []);

  useEffect(() => {
    if (!!data) {
      console.log(data);
      setContents(contents.concat(data));
    }
  }, [data]);

  useEffect(() => {
    window.localStorage.setItem(chattingRoom.id, JSON.stringify(contents));
  }, [contents]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#7FDBFF' }}>
      <CustomPageHeader
        title={chattingRoom.name}
        avatar={{ src: chattingRoom.roomImage }}
        extra={<Button onClick={controlModalVisible(true)} icon={<SettingOutlined />} />}
      />
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
      <Modal
        title='설정'
        visible={modalVisible}
        footer={
          <Button type='primary' onClick={onSubmit}>
            확인
          </Button>
        }
        onCancel={controlModalVisible(false)}
        onOk={controlModalVisible(false)}
      >
        <Form {...formLayout} style={{ marginTop: '15px' }} name='nest-messages' labelAlign='right'>
          <Form.Item label='대표 이미지'>
            <Space>
              <Avatar src={chattingRoom.roomImage?.replace(/\/thumb\//, '/original/')} size='large'>
                {chattingRoom.name[0].toUpperCase()}
              </Avatar>

              <input type='file' hidden name='image' ref={imageInput} onChange={onChangeImages} />
              <Button onClick={onClickImageUpload} type='primary'>
                변경
              </Button>
              <Button danger onClick={onClickImageRemove}>
                삭제
              </Button>
            </Space>
          </Form.Item>
          <Form.Item label='방 제목' rules={[{ required: true }]}>
            <Input value={inputName} onChange={changeInputName} maxLength={30} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

ChattingLayout.propTypes = {};

export default ChattingLayout;
