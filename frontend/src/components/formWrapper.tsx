import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface FormDataInterface {
  youtubeUrl: string;
}

export interface FormWrapperProps {
  error: string | null;
  invokeNotesApi: (formData: FormDataInterface) => Promise<void>;
}

export default function FormWrapper({
  error,
  invokeNotesApi,
}: FormWrapperProps) {
  const [formData, setFormData] = useState<FormDataInterface>({
    youtubeUrl: '',
  });

  const handleOnSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      invokeNotesApi(formData);
    },
    [formData, invokeNotesApi]
  );

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, youtubeUrl: e.target.value });
    },
    [formData]
  );

  return (
    <div className="w-full p-6 lg:p-10">
      <h2 className="text-3xl lg:text-5xl text-white text-center">
        Quick Notes for{' '}
        <span className="bg-gradient-to-r from-purple-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          YouTube Video
        </span>{' '}
        for free
      </h2>
      <p className="mt-4 text-white text-center">
        Instantly, without uploading any files!
      </p>
      <form
        className="flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 mx-2 lg:mx-6 w-full lg:w-3/4"
        onSubmit={handleOnSubmit}
      >
        <div className="px-2 lg:px-4 mb-4 lg:mb-0 w-full lg:w-auto">
          <input
            type="text"
            className="block w-full p-4 border border-blue-300 rounded-lg bg-transparent text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter YouTube URL... https://www.youtube.com/watch?v=AAABBBCCCDDD"
            required
            onChange={handleInputChange}
          />
        </div>
        <input
          type="submit"
          className="font-bold rounded-full text-center text-white bg-purple-500 hover:bg-purple-600 border-2 border-purple-500 px-6 py-4 transition duration-300"
          value="Generate Notes"
        />
      </form>
      <p className="text-white text-center">Quick and Simple</p>
    </div>
  );
}
