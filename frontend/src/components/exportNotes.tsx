import React from 'react';
import jsPDF from 'jspdf';
import { marked } from 'marked';
import { NotesWrapperProps } from './notesWrapper';
import { FaDownload } from 'react-icons/fa';

const ExportOptions: React.FC<NotesWrapperProps> = ({ notes, videoId }) => {
  const handleExport = (format: string) => {
    switch (format) {
      case 'text':
        exportAsTextFile();
        break;
      case 'pdf':
        exportAsPDF();
        break;
      case 'evernote':
        exportToEvernote();
        break;
      case 'googlekeep':
        exportToGoogleKeep();
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

  const exportToEvernote = () => {
    window.open(
      'evernote://create?title=Notes&content=' + encodeURIComponent(notes),
      '_blank'
    );
  };

  const exportToGoogleKeep = () => {
    window.open(
      'https://keep.google.com/#note/' + encodeURIComponent(notes),
      '_blank'
    );
  };

  return (
    <div className="py-3 px-6 text-xl rounded-md bg-green-400 text-white flex items-center space-x-2">
      <select
        id="exportOptions"
        className="text-black py-1 px-2 rounded bg-green-400"
        onChange={(e) => handleExport(e.target.value)}
      >
        <option value="" className="text-red-400">
          Export
        </option>
        <option value="text">Text File</option>
        <option value="pdf">PDF</option>
        <option value="evernote">Evernote</option>
        <option value="googlekeep">Google Keep</option>
      </select>
    </div>
  );
};

export default ExportOptions;
