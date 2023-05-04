import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, openModal }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <GalleryItem key={id} onClick={event => openModal(largeImageURL, tags)}>
          <GalleryItemImage loading="lazy" src={webformatURL} alt={tags} />
        </GalleryItem>
      ))}
    </>
  );
};

ImageGalleryItem.propType = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
