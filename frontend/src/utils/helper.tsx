import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';

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

export const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Copied to clipboard');
    })
    .catch(() => {
      toast.error('Failed to copy');
    });
};

export const scrollToBottom = (id: string) => {
  const container = document.getElementById(id)!;
  container.scrollTop = container.scrollHeight;
};
