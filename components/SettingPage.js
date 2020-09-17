import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Form, Input, InputNumber, Button, Avatar, Space } from 'antd';
import { useCallback, useRef } from 'react';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { uploadUserImage, updateUser } from '../actions/user';
import { REMOVE_IMAGE } from '../reducers/user';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label}은(는) 필수입니다!',
};

const Setting = () => {
  const dispatch = useDispatch();
  const { me, loading } = useSelector((state) => state.user);
  const [nickname, setnickname, changeNickname] = useInput(me.nickname);
  const [statusMessage, setStatusMessage, changeStatusMessage] = useInput(me.statusMessage);
  const { profileImage } = me;
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch(uploadUserImage(imageFormData));
  });

  const onClickImageRemove = useCallback(() => {
    dispatch({
      type: REMOVE_IMAGE,
    });
  });

  const onFinish = useCallback(() => {
    dispatch(updateUser({ profileImage, nickname, statusMessage }));
  }, [profileImage, nickname, statusMessage]);

  return (
    <Form
      {...layout}
      style={{ marginTop: '15px' }}
      name='nest-messages'
      onFinish={onFinish}
      validateMessages={validateMessages}
      labelAlign='right'
    >
      <Form.Item label='프로필'>
        <Space>
          <Avatar src={profileImage?.replace(/\/thumb\//, '/original/')} size='large'>
            {me.nickname[0].toUpperCase()}
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
      <Form.Item label='닉네임' rules={[{ required: true }]}>
        <Input value={nickname} onChange={changeNickname} />
      </Form.Item>
      <Form.Item label='상태 메시지'>
        <Input.TextArea value={statusMessage} onChange={changeStatusMessage} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type='primary' htmlType='submit' loading={loading}>
          저장
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Setting;
