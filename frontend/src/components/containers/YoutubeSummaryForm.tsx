import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/appContext';

const YoutubeSummaryForm = () => {
  const { error, getYoutubeSummary } = useAppContext();
  const [formData, setFormData] = useState({
    videoUrl: '',
  });

  const handleOnSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      const videoId = formData.videoUrl
        .split('?')[1]
        .split('&')
        .find((param) => param.startsWith('v='))
        ?.split('=')[1]!;
      getYoutubeSummary({ videoId });
    },
    [formData, getYoutubeSummary]
  );

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, videoUrl: e.target.value });
    },
    [formData]
  );

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center lg:h-[80vh] lg:max-h-[30rem] mt-20 mb-10 pt-24 relative overflow-hidden bg-slate-900"
    >
      <div className="max-w-3xl mx-auto px-6 relative mb-16 text-center py-4">
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
            className="font-bold rounded-lg text-white border-2 border-purple-500 hover:bg-gray-900 px-6 py-4 transition duration-300 w-full lg:w-auto"
            value="Generate Notes"
          />
        </form>
        <p className="mt-4 text-gray-300 text-lg">Quick and Simple</p>
      </div>
    </section>
  );
};

export default YoutubeSummaryForm;
