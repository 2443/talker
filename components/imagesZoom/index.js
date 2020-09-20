import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay,
  Header,
  CloseBtn,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  GlobalStyle,
} from './styles';

function ImagesZoom({ images, onClose, initialSlide }) {
  const init = images.findIndex((image) => image.content === initialSlide);
  const [currentSlide, setCurrentSlide] = useState(init);
  return (
    <Overlay>
      <GlobalStyle />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={init}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v, index) => (
              <ImgWrapper key={index}>
                <img src={v.content.replace(/\/thumb\//, '/original/')} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            {images.length ? (
              <div>
                {currentSlide + 1}/{images.length}
              </div>
            ) : null}
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
}

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
