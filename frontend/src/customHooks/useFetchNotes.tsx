import axios from 'axios';
import { useState } from 'react';
import { type FormDataInterface } from '../components/formWrapper';
import { type NotesWrapperProps } from '../components/notesWrapper';

const saveNotesInBrowser = ({ notes, videoId }: NotesWrapperProps): void => {
  const item = {
    notes,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(videoId, JSON.stringify(item));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn(
        'LocalStorage quota exceeded. Attempting to free up space...'
      );
      removeOldestItem();
      saveNotesInBrowser({ videoId, notes });
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
    console.log(`Removed oldest item: ${oldestKey}`);
  }
};

const loadPreferences = (key: string): NotesWrapperProps | null => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    const notes = JSON.parse(storedValue) as NotesWrapperProps;
    console.log(notes);
    return notes;
  }
  return null;
};

export const useFetchNotes = () => {
  const [data, setData] = useState<NotesWrapperProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiUrl = process.env.REACT_APP_BACKEND_SERVICE_BASE_URL;
  const endpoint = process.env.REACT_APP_YOUTUBE_API_ENDPOINT;

  const invokeNotesApi = async (formData: FormDataInterface) => {
    setIsLoading(true);
    setError(null);
    const videoId = new URL(formData?.youtubeUrl).searchParams.get('v') ?? '';
    try {
      let localstorageData = loadPreferences(videoId);
      let notesData: NotesWrapperProps = { notes: '', videoId };

      if (localstorageData) {
        notesData = { notes: localstorageData.notes, videoId };
        setData(notesData);
      } else {
        const response = await axios.request({
          url: `${apiUrl}${endpoint}`,
          method: 'post',
          data: { ...formData },
        });
        notesData = { ...response.data };
        setData(notesData);
        saveNotesInBrowser(notesData);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'An error occurred');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, invokeNotesApi };
};
