import PropTypes from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ imageData, openModal }) => {
  return (
    <Gallery>
      <ImageGalleryItem images={imageData} openModal={openModal} />
    </Gallery>
  );
};

ImageGallery.propTypes = {
  imageData: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
}