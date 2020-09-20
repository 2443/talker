import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Modal } from 'antd';
import { MessageOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

const UserModal = ({ visible, onClose, user }) => {
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
          <Avatar size='large' icon={<MessageOutlined />}></Avatar>
          <p>1:1 대화</p>
        </div>
        <div style={{ display: 'inline-block', padding: 10 }}>
          <Avatar size='large' icon={<UserAddOutlined />}></Avatar>
          <p>친구삭제</p>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
