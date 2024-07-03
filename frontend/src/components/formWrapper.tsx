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
    <section className="flex flex-col items-center justify-center h-[80vh] max-h-[30rem] mb-[80px] pt-[177px] pb-0 relative overflow-hidden bg-slate-900">
      <div className="max-w-3xl mx-auto px-6 relative mb-16 text-center">
        <h2 className="text-4xl lg:text-5xl text-white font-extrabold">
          Quick Notes for{' '}
          <span className="bg-gradient-to-r from-purple-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            YouTube Video
          </span>{' '}
          for free
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Instantly, without uploading any files!
        </p>
        <form
          className="flex flex-col lg:flex-row items-center justify-center mt-8 w-full space-y-4 lg:space-y-0 lg:space-x-4"
          onSubmit={handleOnSubmit}
        >
          <div className="w-full">
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
            className="font-bold rounded-lg text-white bg-purple-500 hover:bg-purple-600 border-2 border-purple-500 px-6 py-4 transition duration-300 w-full lg:w-auto"
            value="Generate Notes"
          />
        </form>
        <p className="mt-4 text-gray-300 text-lg">Quick and Simple</p>
      </div>
    </section>
  );
}
