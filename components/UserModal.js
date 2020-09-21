import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Modal } from 'antd';
import {
  MessageOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { oneOnChatAPI } from '../actions/room';
import { deleteFriend } from '../actions/user';

const UserModal = ({ visible, onClose, user }) => {
  const dispatch = useDispatch();

  const onClickOneOnChat = (userId) => async () => {
    const response = await oneOnChatAPI(userId);
  };

  const onClickDeleteFriend = (userId) => () => {
    dispatch(deleteFriend(userId));
    onClose();
  };

  if (!user) {
    return null;
  }
  return (
    <Modal
      bodyStyle={{ textAlign: 'center' }}
      closable={false}
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <Avatar size={128} src={user.profileImage} icon={<UserOutlined />} />
      <p />
      <p>{user.nickname}</p>
      <p>{user.statusMessage}</p>

      <div>
        <div onClick={onClickOneOnChat(user.id)} style={{ display: 'inline-block', padding: 10 }}>
          <Avatar size='large' icon={<MessageOutlined />}></Avatar>
          <p>1:1 대화</p>
        </div>
        <div
          onClick={onClickDeleteFriend(user.id)}
          style={{ display: 'inline-block', padding: 10 }}
        >
          <Avatar size='large' icon={<UserDeleteOutlined />}></Avatar>
          <p>친구삭제</p>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
