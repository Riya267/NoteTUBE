import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Summary, VideoId } from '../types';

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

export const saveSummaryInBrowser = ({
  summary,
  videoId,
}: Summary & VideoId): void => {
  const item = {
    summary,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(videoId, JSON.stringify(item));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn(
        'LocalStorage quota exceeded. Attempting to free up space...'
      );
      removeOldestSummaryFromBrowser();
      saveSummaryInBrowser({ summary, videoId });
    } else {
      console.error('Failed to save preferences:', error);
    }
  }
};

export const removeOldestSummaryFromBrowser = (): void => {
  let oldestKey: string | null = null;
  let oldestTime = Infinity;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const { timestamp } = JSON.parse(localStorage.getItem(key) || '{}');
      if (timestamp && timestamp < oldestTime) {
        oldestTime = timestamp;
        oldestKey = key;
      }
    }
  }

  if (oldestKey) {
    localStorage.removeItem(oldestKey);
  }
};

export const loadSummaryFromBrowser = (
  key: string
): (Summary & VideoId) | null => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    const Summary = JSON.parse(storedValue) as Summary & VideoId;
    return Summary;
  }
  return null;
};
