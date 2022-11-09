import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ imgURL, tags, modalToggle }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') modalToggle();
  };

  const onClose = e => {
    if (e.currentTarget === e.target) modalToggle();
  };

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={imgURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  modalToggle: PropTypes.func.isRequired,
};
