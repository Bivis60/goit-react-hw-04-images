import { Blocks } from 'react-loader-spinner';
import { Spyner } from './Loader.styled';

export const Loader = () => {
  return (
    <Spyner>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </Spyner>
  );
};
