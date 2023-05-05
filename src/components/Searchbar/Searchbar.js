import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  Searchbar,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export const Header = ({ onSubmit }) => {
  const [data, setData] = useState('');

  const handleDataChange = event => {
    setData(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (data === '') {
      toast.error('Please enter a value !');
      return;
    }
    onSubmit(data);
    setData('');
  };

  return (
    <Searchbar>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch />
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          value={data}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleDataChange}
        />
      </Form>
    </Searchbar>
  );
};
