import { Button } from './Button.styled';

export const ButtonLoadMore = ({ addPage }) => {
  return (
    <Button type="button" onClick={addPage}>
      Load more
    </Button>
  );
};
