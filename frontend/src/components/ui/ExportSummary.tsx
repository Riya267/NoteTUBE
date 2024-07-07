import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { Summary, VideoId } from '../../types';

interface ExportButtonProps extends Summary, VideoId {
  type: 'text';
}

const ExportButton: React.FC<ExportButtonProps> = ({
  summary,
  videoId,
  type,
}) => {
  const handleExport = () => {
    switch (type) {
      case 'text':
        exportAsTextFile();
        break;
      default:
        break;
    }
  };

  const exportAsTextFile = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${videoId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="py-2 px-4 lg:px-6 text-base lg:text-lg rounded-md bg-gray-500 border-2 border-gray-500 hover:border-slate-800 hover:bg-gray-900 text-white flex items-center mb-2 lg:mb-0 lg:mr-2"
      onClick={handleExport}
    >
      <FaDownload className="mr-2" />
      Download {type.toUpperCase()} File
    </button>
  );
};

export default ExportButton;
