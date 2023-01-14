import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ url, onClick }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.key === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClick]);

  return (
    <div
      className={styles.Overlay}
      onClick={() => onClick()}
      onKeyPress={e => {
        console.log(e);
      }}
    >
      <div className={styles.Modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
