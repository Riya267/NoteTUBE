import { Circles } from 'react-loader-spinner';

export const ActivityIndicator = () => {
  return (
    <Circles
      height="80"
      width="80"
      color="#fd4628"
      ariaLabel="loading"
      visible={true}
    />
  );
};
