import axios from 'axios';
import { useState } from 'react';
import { FormDataInterface } from '../components/formWrapper';

export const useFetchNotes = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiUrl = process.env.REACT_APP_BACKEND_SERVICE_BASE_URL;
  const endpoint = process.env.REACT_APP_YOUTUBE_API_ENDPOINT;

  console.log("test", apiUrl, endpoint)

  const invokeNotesApi = async (formData: FormDataInterface) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}${endpoint}`,{ ...formData },{ headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }});
      setData(response.data?.notes);
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