import { useEffect, useState } from 'react';
import { VideoId, Summary } from '../types';

export const useFetchSummary = () => {
  const [summary, setSummary] = useState('');
  const [videoId, setVideoId] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const apiUrl = process.env.REACT_APP_BACKEND_SERVICE_BASE_URL || '';
  const summaryEndpoint = process.env.REACT_APP_YOUTUBE_API_ENDPOINT ?? '';
  const chatEndpoint = process.env.REACT_APP_CHAT_API_ENDPOINT ?? '';

  const saveSummaryInBrowser = ({
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
      if (
        error instanceof DOMException &&
        error.name === 'QuotaExceededError'
      ) {
        console.warn(
          'LocalStorage quota exceeded. Attempting to free up space...'
        );
        removeOldestItem();
        saveSummaryInBrowser({ summary, videoId });
      } else {
        console.error('Failed to save preferences:', error);
      }
    }
  };

  const removeOldestItem = (): void => {
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

  const loadPreferences = (key: string): (Summary & VideoId) | null => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const Summary = JSON.parse(storedValue) as Summary & VideoId;
      return Summary;
    }
    return null;
  };

  const getYoutubeSummary = async (formData: VideoId) => {
    setIsLoading(true);
    setError(null);
    try {
      const videoId = formData.videoId;
      let localstorageData = loadPreferences(videoId);

      if (localstorageData) {
        setSummary(localstorageData.summary);
        setVideoId(videoId);
        setIsLoading(false);
      } else {
        const newEventSource = new EventSource(
          `${apiUrl}${summaryEndpoint}?videoId=${videoId}`
        );
        newEventSource.onmessage = (event) => {
          console.log('event', event.data);
          const data = JSON.parse(event.data);
          setSummary(data?.summary);
          setVideoId(data?.videoId);
          setIsLoading(false);
        };
        newEventSource.onerror = () => {
          setIsLoading(false);
          setError('Failed to fetch Summary');
          newEventSource.close();
        };
        setEventSource(newEventSource);
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred while fetching Summary');
    }
  };

  const getChatResponse = async ({
    videoId,
    prompt,
  }: {
    videoId: string;
    prompt: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const newEventSource = new EventSource(
        `${apiUrl}${chatEndpoint}?videoId=${videoId}&prompt=${prompt}`
      );
      newEventSource.onmessage = (event) => {
        console.log('event', event.data);
        const data = JSON.parse(event.data);
        setChatResponse(data?.chatResponse);
        setIsLoading(false);
      };
      newEventSource.onerror = () => {
        setIsLoading(false);
        setError('Failed to fetch Chat Response');
        newEventSource.close();
      };
      setEventSource(newEventSource);
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred while fetching Chat Response');
    }
  };

  useEffect(() => {
    if (summary) {
      saveSummaryInBrowser({ summary, videoId });
    }
  }, [summary]);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return {
    summary,
    videoId,
    chatResponse,
    error,
    isLoading,
    getYoutubeSummary,
    getChatResponse,
  };
};
