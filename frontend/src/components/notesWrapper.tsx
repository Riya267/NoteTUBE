import React from 'react';
import Markdown from 'react-markdown';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ExportOptions from './exportNotes';
import ExportButton from './exportNotes';

export interface NotesWrapperProps {
  notes: string;
  videoId: string;
}

const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Notes copied to clipboard');
    })
    .catch(() => {
      toast.error('Failed to copy notes');
    });
};

const NotesWrapper: React.FC<NotesWrapperProps> = ({ notes, videoId }) => {
  return (
    <section className="bg-red-500 flex flex-col relative mt-20 mb-10 py-20 overflow-hidden bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-gray-900 shadow-md rounded-lg p-4">
          <div className="flex items-center mb-4">
            <span className="h-2 w-2 bg-red-400 rounded-full mr-2"></span>
            <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></span>
            <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
          </div>
          <div className="overflow-y-auto h-64">
            <Markdown className="text-white">{notes}</Markdown>
          </div>
          <div className="mt-4 flex flex-col lg:flex-row lg:justify-between">
            <button
              className="py-2 px-4 lg:px-6 text-base lg:text-lg rounded-md border-2 border-gray-500 bg-gray-500 hover:border-slate-800 hover:bg-gray-900 text-white flex items-center mb-2 lg:mb-0 lg:mr-2"
              onClick={() => copyToClipboard(notes)}
            >
              <FaCopy className="mr-2" />
              Copy Notes
            </button>
            <ExportButton notes={notes} videoId={videoId} type="text" />
            <ExportButton notes={notes} videoId={videoId} type="pdf" />
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <iframe
            className="w-full h-64 md:h-full object-cover"
            title="Youtube player"
            src={`https://youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default NotesWrapper;
