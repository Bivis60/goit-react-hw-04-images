import { ToastContainer } from 'react-toastify';
// import { Component } from 'react';
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

// export class App extends Component {
//   state = {
//     data: null,
//     dataTotal: [],
//     total: 1,
//     page: 1,
//     loading: false,
//     error: null,
//     showModal: false,
//     empty: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const prevData = prevState.data;
//     const currentData = this.state.data;
//     const page = this.state.page;
//     const prevStatePage = prevState.page;

//     if (prevData !== currentData || prevStatePage !== page) {
//       this.setState({ loading: true });

//       if (this.state.error) {
//         this.setState({ error: null });
//       }

//       GetImages({ currentData, page })
//         .then(data => {
//           if (data.hits.length === 0) {
//             this.setState({ empty: true });
//           }
//           this.setState(prevState => ({
//             page: prevState.page,
//             dataTotal: [...prevState.dataTotal, ...data.hits],
//             total: data.total,
//           }));
//         })
//         .catch(error => this.setState({ error: error.message }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   addPage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleFormSubmit = data => {
//     this.setState({
//       data,
//       dataTotal: [],
//       total: 1,
//       page: 1,
//       loading: false,
//       error: null,
//       showModal: false,
//       empty: false,
//     });
//   };

//   openModal = (largeImageURL, tags) => {
//     this.setState({ showModal: true, largeImageURL, tags });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const {
//       loading,
//       dataTotal,
//       total,
//       page,
//       error,
//       empty,
//       showModal,
//       largeImageURL,
//       tags,
//     } = this.state;

//     return (
//       <>
//         <GlobalStyle />
//         <Layout>
//           <Header onSubmit={this.handleFormSubmit} />
//           {loading && <Loader />}

//           {error && (
//             <h2 style={{ textAlign: 'center' }}>
//               Something went wrong: {error}!
//             </h2>
//           )}

//           {empty && (
//             <h2 style={{ textAlign: 'center' }}>
//               Sorry, there are no images matching your search query. Please try
//               again.
//             </h2>
//           )}

//           {dataTotal && (
//             <ImageGallery imageData={dataTotal} openModal={this.openModal} />
//           )}

//           {total / 12 > page && <ButtonLoadMore addPage={this.addPage} />}

//           {showModal && (
//             <Modal closeModal={this.closeModal}>
//               <img src={largeImageURL} alt={tags} />
//             </Modal>
//           )}

//           <ToastContainer position="top-center" autoClose={3000} />
//         </Layout>
//       </>
//     );
//   }
// }

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
  // useEffect(() => {}, []);
  // useEffect(() => {
  //   if (page === 0) return;

  //   const fetchImagesByQuery = async data => {
  //     setLoading(true); // показуємо лоадер
  //     setError(null); // очищаємо помилку

  //     try {
  //       const response = await GetImages(data, page);
  //       setDataTotal(prevState => [...prevState, ...response.hits]);
  //       setPage(Math.ceil(response.totalHits / 12));
  //       response.totalHits === 0 && setEmpty(true); // якщо результатів немає, то відображаємо сповіщення
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false); // прибираємо лоадер
  //     }
  //   };

  //   fetchImagesByQuery(data);
  // }, [page, data]);

  useEffect(() => {
    if (page === 0) {
      return;
    }
    setLoading(true);

    setError(null);

    GetImages({ data, page })
      .then(data => {
        if (data.hits.length === 0) {
          setEmpty(true);
        }
        console.log('Page:', page);
        console.log('data:', data);
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
