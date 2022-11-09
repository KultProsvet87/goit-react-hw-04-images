import { ImageGalleryItems } from 'components/ImageGalleryItems/ImageGalleryItems';
import { Modal } from 'components/Modal/Modal';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const modal = document.querySelector('#modal-root');

export const ImageGallery = ({ galleryItems }) => {
  const [imgURL, setImgURL] = useState('');
  const [tags, setTags] = useState('');

  const onImgClick = (imgURL, tags) => {
    setImgURL(imgURL);
    setTags(tags);
  };

  const modalToggle = () => {
    setImgURL('');
    setTags('');
  };

  return (
    <>
      <ul className="ImageGallery">
        {galleryItems.map(item => (
          <ImageGalleryItems
            key={item.id}
            tags={item.tags}
            webformatURL={item.webformatURL}
            largeImageURL={item.largeImageURL}
            onImgClick={onImgClick}
          />
        ))}
      </ul>
      {imgURL &&
        createPortal(
          <Modal imgURL={imgURL} tags={tags} modalToggle={modalToggle} />,
          modal
        )}
    </>
  );
};

ImageGallery.propTypes = {
  galleryItems: PropTypes.arrayOf(PropTypes.object),
};
