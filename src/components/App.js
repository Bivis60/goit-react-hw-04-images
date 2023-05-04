import { ToastContainer } from 'react-toastify';
import { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';

import { Header } from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GetImages } from './GetImages';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Layout } from 'Layout/Layout.styled';

export class App extends Component {
  state = {
    data: null,
    dataTotal: [],
    total: 1,
    page: 1,
    loading: false,
    error: null,
    showModal: false,
    empty: false,
  };

  componentDidUpdate(_, prevState) {
    const prevData = prevState.data;
    const currentData = this.state.data;
    const page = this.state.page;
    const prevStatePage = prevState.page;

    if (prevData !== currentData || prevStatePage !== page) {
      this.setState({ loading: true });

      if (this.state.error) {
        this.setState({ error: null });
      }

      GetImages({ currentData, page })
        .then(data => {
          if (data.hits.length === 0) {
            this.setState({ empty: true });
          }
          this.setState(prevState => ({
            page: prevState.page,
            dataTotal: [...prevState.dataTotal, ...data.hits],
            total: data.total,
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  addPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = data => {
    this.setState({
      data,
      dataTotal: [],
      total: 1,
      page: 1,
      loading: false,
      error: null,
      showModal: false,
      empty: false,
    });
  };

  openModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      loading,
      dataTotal,
      total,
      page,
      error,
      empty,
      showModal,
      largeImageURL,
      tags,
    } = this.state;

    return (
      <>
        <GlobalStyle />
        <Layout>
          <Header onSubmit={this.handleFormSubmit} />
          {loading && <Loader />}

          {error && <h2 style={{ textAlign: 'center' }}>Something went wrong: {error}!</h2>}

          {empty && (
            <h2 style={{ textAlign: 'center' }}>
              Sorry, there are no images matching your search query. Please try
              again.
            </h2>
          )}

          {dataTotal && (
            <ImageGallery imageData={dataTotal} openModal={this.openModal} />
          )}

          {total / 12 > page && <ButtonLoadMore addPage={this.addPage} />}

          {showModal && (
            <Modal closeModal={this.closeModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}

          <ToastContainer position="top-center" autoClose={3000} />
        </Layout>
      </>
    );
  }
}
