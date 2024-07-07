import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import { FaCopy } from 'react-icons/fa';
import ExportButton from './exportSummary';
import { copyToClipboard, scrollToBottom } from '../utils/helper';
import { youtubeEmbedUrl } from '../utils/constants';
import remarkGfm from 'remark-gfm';
import { useAppContext } from '../context/appContext';

const SummaryWrapper: React.FC = () => {
  const { videoId, summary } = useAppContext();

  useEffect(() => {
    scrollToBottom('notesContainer');
  }, [summary]);

  return (
    <section className="bg-red-500 flex flex-col relative mt-20 py-20 overflow-hidden bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-gray-900 shadow-md rounded-lg p-4">
          <div className="flex items-center mb-4">
            <span className="h-2 w-2 bg-red-400 rounded-full mr-2"></span>
            <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></span>
            <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
          </div>
          <div className="overflow-y-auto h-64" id="notesContainer">
            <Markdown remarkPlugins={[remarkGfm]} className="text-white">
              {summary}
            </Markdown>
          </div>
          <div className="mt-4 flex flex-col lg:flex-row lg:justify-between">
            <button
              className="py-2 px-4 lg:px-6 text-base lg:text-lg rounded-md border-2 border-gray-500 bg-gray-500 hover:border-slate-800 hover:bg-gray-900 text-white flex items-center mb-2 lg:mb-0 lg:mr-2"
              onClick={() => copyToClipboard(summary)}
            >
              <FaCopy className="mr-2" />
              Copy Summary
            </button>
            <ExportButton summary={summary} videoId={videoId} type="text" />
            <ExportButton summary={summary} videoId={videoId} type="pdf" />
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <iframe
            className="w-full h-64 md:h-full object-cover"
            title="Youtube player"
            src={`${youtubeEmbedUrl}/${videoId}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default SummaryWrapper;
