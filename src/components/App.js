import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { GlobalStyle } from 'GlobalStyle';

import { Header } from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GetImages } from './GetImages';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Layout } from 'Layout/Layout.styled';

export const App = () => {
  const [data, setData] = useState(null);
  const [dataTotal, setDataTotal] = useState([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!data) {
      return;
    }
    setLoading(true);

    setError(null);

    GetImages({ data, page })
      .then(data => {
        if (data.hits.length === 0) {
          setEmpty(true);
        }
        setPage(page);
        setDataTotal(prevState => [...prevState, ...data.hits]);
        setTotal(data.total);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [data, page]);

  const addPage = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = data => {
    setData(data);
    setDataTotal([]);
    setTotal(1);
    setPage(1);
    setLoading(false);
    setError(null);
    setShowModal(false);
    setEmpty(false);
  };

  const openModal = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header onSubmit={handleFormSubmit} />
        {loading && <Loader />}

        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Something went wrong: {error}!
          </h2>
        )}

        {empty && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry, there are no images matching your search query. Please try
            again.
          </h2>
        )}

        {dataTotal && (
          <ImageGallery imageData={dataTotal} openModal={openModal} />
        )}

        {total / 12 > page && <ButtonLoadMore addPage={addPage} />}

        {showModal && (
          <Modal closeModal={closeModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </Layout>
    </>
  );
};
