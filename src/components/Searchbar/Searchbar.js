import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  Searchbar,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export class Header extends Component {
  state = {
    data: '',
  };

  handleDataChange = event => {
    this.setState({ data: event.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.data === '') {
      toast.error('Please enter a value !');
      return;
    }
    this.props.onSubmit(this.state.data);
    this.setState({ data: '' });
  };

  render() {
    return (
      <Searchbar>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch />
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            value={this.state.data}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleDataChange}
          />
        </Form>
      </Searchbar>
    );
  }
}
