import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Comment, Avatar } from 'antd';

const CustomComment = styled(Comment)`
  padding: 0;
  margin-left: 10px;
  > div {
    padding: 0;
    margin: 0;
  }
`;

const SameUserMessageWrap = styled.div`
  margin-left: 54px;
`;

const AnotherMessageBox = styled.div`
  display: inline-block;
  border-radius: 15px;
  padding: 7px 15px;
  margin-bottom: 5px;
  background-color: #ffffff;
`;

const MyMessageWrap = styled.div`
  text-align: right;
  margin-right: 10px;
`;

const MyMessageBox = styled.div`
  display: inline-block;
  border-radius: 15px;
  padding: 7px 15px;
  margin-bottom: 5px;

  background-color: #ffdc00;
`;
const Message = ({ contents, me }) => {
  let lastChattedUser = 0;
  const createView = (elements) => () =>
    elements.map((item) => {
      console.log('render item');
      if (item.User.id === me.id) {
        lastChattedUser = me.id;
        return (
          <MyMessageWrap key={item.id}>
            <MyMessageBox>{item.content}</MyMessageBox>
          </MyMessageWrap>
        );
      } else if (item.User.id === lastChattedUser) {
        return (
          <SameUserMessageWrap key={item.id}>
            <AnotherMessageBox>{item.content}</AnotherMessageBox>
          </SameUserMessageWrap>
        );
      } else {
        lastChattedUser = item.User.id;
        return (
          <CustomComment
            key={item.id}
            avatar={<Avatar>{item.User.nickname[0].toUpperCase()}</Avatar>}
            author={<span style={{ color: '#111111' }}>{item.User.nickname}</span>}
            content={
              <div>
                <AnotherMessageBox>{item.content}</AnotherMessageBox>
              </div>
            }
          />
        );
      }
    });

  const View = useMemo(createView(contents), [contents]);
  return <>{View}</>;
};

Message.propTypes = {
  contents: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    User: PropTypes.object.isRequired,
  }).isRequired,
};
export default Message;
