import React from 'react';
import jsPDF from 'jspdf';
import { marked } from 'marked';
import { NotesWrapperProps } from './notesWrapper';
import { FaDownload } from 'react-icons/fa';

const ExportButton: React.FC<NotesWrapperProps & { type: string }> = ({
  notes,
  videoId,
  type,
}) => {
  const handleExport = (format: string) => {
    switch (format) {
      case 'text':
        exportAsTextFile();
        break;
      case 'pdf':
        exportAsPDF();
        break;
      default:
        break;
    }
  };

  const exportAsTextFile = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${videoId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportAsPDF = () => {
    const html = marked(notes);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html as string, 'text/html');
    const walker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT);

    const textList: string[] = [];
    let currentNode = walker.currentNode;

    while (currentNode) {
      textList.push(currentNode.textContent || '');
      currentNode = walker.nextNode() as Node;
    }
    const pdfdoc = new jsPDF();
    pdfdoc.text(textList.join('\n'), 25, 25);
    pdfdoc.save(`notes-${videoId}.pdf`);
  };

  return (
    <button
      className="py-2 px-4 lg:px-6 text-base lg:text-lg rounded-md bg-gray-500 border-2 border-gray-500 hover:border-slate-800 hover:bg-gray-900 text-white flex items-center mb-2 lg:mb-0 lg:mr-2"
      onClick={() => handleExport(type)}
    >
      <FaDownload className="mr-2" />
      Download {type} File
    </button>
  );
};

export default ExportButton;
