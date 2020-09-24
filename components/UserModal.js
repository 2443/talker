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
import Link from 'next/link';

const UserModal = ({ visible, onClose, user }) => {
  const dispatch = useDispatch();

  const onClickOneOnChat = (UserId) => async () => {
    const response = await oneOnChatAPI(UserId);
  };

  const onClickDeleteFriend = (UserId) => () => {
    dispatch(deleteFriend(UserId));
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
        <div style={{ display: 'inline-block', padding: 10 }}>
          <Link href={`/user/${user.id}`}>
            <a>
              <Avatar size='large' icon={<MessageOutlined />}></Avatar>
            </a>
          </Link>
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
