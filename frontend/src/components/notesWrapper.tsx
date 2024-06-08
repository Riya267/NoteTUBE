import Markdown from 'react-markdown';
import { FaDownload, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
    .catch((err) => {
      toast.error('Failed to copy notes');
    });
};

const downloadNotes = async (
  markdown: string,
  videoId: string
): Promise<void> => {
  try {
    const blob = new Blob([markdown], { type: 'application/text' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${videoId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Download is successful');
  } catch (error) {
    toast.error('Download fails');
  }
};

export default function NotesWrapper({ notes, videoId }: NotesWrapperProps) {
  return (
    <div className="grid grid-rows-3 grid-cols-4 gap-4 w-full m-10 p-10">
      <div className="row-span-3 col-span-2 bg-youtube-notes-container shadow-md shadow-[#EA6DD0] rounded-lg py-4">
        <div className="w-full border-b border-gray-600 flex pb-4">
          <span className="h-4 w-4 bg-red-400 rounded-full ml-2"></span>
          <span className="h-4 w-4 bg-yellow-400 rounded-full ml-2"></span>
          <span className="h-4 w-4 bg-green-400 rounded-full ml-2"></span>
        </div>
        <div className="p-4 overflow-scroll h-[400px]">
          <Markdown className="text-white text-left">{notes}</Markdown>
        </div>
      </div>
      <div className="row-span-2 col-span-2 rounded-md">
        <iframe
          className="h-full w-full object-contain bg-cover bg-no-repeat"
          title="Youtube player"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          src={`https://youtube.com/embed/${videoId}`}
        ></iframe>
      </div>
      <div className="col-span-2 h-[100px] bg-youtube-notes-container rounded-lg flex justify-evenly items-center">
        <button
          className="py-3 px-6 text-xl rounded-md bg-transparent border-2 border-green-400 text-white rounded-3xl flex items-center"
          onClick={() => copyToClipboard(notes)}
        >
          <FaCopy className="mr-2" />
          Copy Notes
        </button>
        <button
          className="py-3 px-6 text-xl rounded-md bg-green-400 text-white rounded-3xl flex items-center"
          onClick={() => downloadNotes(notes, videoId)}
        >
          <FaDownload className="mr-2" /> Download
        </button>
      </div>
    </div>
  );
}
