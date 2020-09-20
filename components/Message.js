import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Comment, Avatar } from 'antd';
import ImagesZoom from './imagesZoom';

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
const Message = ({ contents, me, Users }) => {
  const [viewSlider, setViewSlider] = useState(false);
  const [initialSlide, setInitialSlide] = useState(null);
  const onCloseSlider = () => {
    setViewSlider(false);
  };
  const onOpenSlider = (id) => () => {
    setInitialSlide(id);
    console.log(id);
    setViewSlider(true);
  };
  let lastChattedUser = 0;
  const usersObj = useMemo(() => {
    const obj = {};
    Users.forEach((user) => {
      obj[user.id] = user;
    });
    return obj;
  }, [Users]);
  // 일단 만들고 나중에 플레그로 newImage 이런거 추가 예정
  const images = useMemo(() => {
    return contents.filter((e) => e.type === 'image');
  }, [contents]);
  const createView = (elements) => () =>
    elements.map((item, index) => {
      if (item.userId === me.id) {
        lastChattedUser = me.id;
        return (
          <MyMessageWrap key={index}>
            <MyMessageBox>
              {item.type === 'image' ? (
                <img src={item.content} width='200' onClick={onOpenSlider(item.content)} />
              ) : (
                item.content
              )}
            </MyMessageBox>
          </MyMessageWrap>
        );
      } else if (item.userId === lastChattedUser) {
        return (
          <SameUserMessageWrap key={index}>
            <AnotherMessageBox>
              {item.type === 'image' ? (
                <img src={item.content} width='200' onClick={onOpenSlider(item.content)} />
              ) : (
                item.content
              )}
            </AnotherMessageBox>
          </SameUserMessageWrap>
        );
      } else {
        lastChattedUser = item.userId;
        return (
          <CustomComment
            key={index}
            avatar={
              <Avatar src={usersObj[item.userId].profileImage}>
                {usersObj[item.userId].nickname[0].toUpperCase()}
              </Avatar>
            }
            author={<span style={{ color: '#111111' }}>{usersObj[item.userId].nickname}</span>}
            content={
              <div>
                <AnotherMessageBox>
                  {item.type === 'image' ? (
                    <img src={item.content} width='200' onClick={onOpenSlider(item.content)} />
                  ) : (
                    item.content
                  )}
                </AnotherMessageBox>
              </div>
            }
          />
        );
      }
    });

  const View = useMemo(createView(contents), [contents]);
  return (
    <>
      {View}
      {viewSlider ? (
        <ImagesZoom onClose={onCloseSlider} images={images} initialSlide={initialSlide} />
      ) : null}
    </>
  );
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
