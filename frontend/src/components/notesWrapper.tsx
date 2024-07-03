import Markdown from 'react-markdown';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ExportOptions from './exportNotes';

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

export default function NotesWrapper({ notes, videoId }: NotesWrapperProps) {
  return (
    <div className="w-full">
      <div className="bg-youtube-notes-container shadow-md shadow-[#EA6DD0] rounded-lg py-4">
        <div className="w-full border-b border-gray-600 flex pb-4 px-2">
          <span className="h-4 w-4 bg-red-400 rounded-full ml-2"></span>
          <span className="h-4 w-4 bg-yellow-400 rounded-full ml-2"></span>
          <span className="h-4 w-4 bg-green-400 rounded-full ml-2"></span>
        </div>
        <div className="p-4 overflow-y-auto h-64 md:h-96">
          <Markdown className="text-white text-left">{notes}</Markdown>
        </div>
      </div>
      <div className="rounded-md">
        <iframe
          className="w-full h-64 md:h-96 object-contain bg-cover bg-no-repeat rounded-lg"
          title="Youtube player"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          src={`https://youtube.com/embed/${videoId}`}
        ></iframe>
      </div>
      <div className="bg-youtube-notes-container rounded-lg p-4 flex flex-col ">
        <button
          className="py-2 px-4 md:px-6 text-base md:text-xl rounded-md bg-transparent border-2 border-green-400 text-white flex items-center mb-2 md:mb-0"
          onClick={() => copyToClipboard(notes)}
        >
          <FaCopy className="mr-2" />
          Copy Notes
        </button>
        <ExportOptions notes={notes} videoId={videoId} />
      </div>
    </div>
  );
}
