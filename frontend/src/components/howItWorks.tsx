import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="my-12 mx-6 rounded-full rounded-tl-none bg-gray-900 py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          How It Works
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          NoteTube leverages AI capabilities to generate concise notes from
          YouTube videos. Follow these simple steps to get your summarized
          notes:
        </p>
        <ol className="list-decimal list-inside text-gray-300 text-lg space-y-4">
          <li className="bg-slate-900 p-8 rounded-full rounded-tr-none border border-dashed">
            <strong>Paste Video URL:</strong> Copy and paste the URL of the
            YouTube video you want to transcribe into our easy-to-use interface.
          </li>
          <li className="bg-slate-900 p-8 rounded-full rounded-tr-none border border-dashed">
            <strong>Click Generate Notes:</strong> Simply click the button, and
            NoteTube will swiftly process the video to create a text-based
            summary of key points.
          </li>
          <li className="bg-slate-900 p-8 rounded-full rounded-tr-none border border-dashed">
            <strong>Copy and Use:</strong> With just a click, the summarized
            notes will be copied to your clipboard for easy reference.
          </li>
          <li className="bg-slate-900 p-8 rounded-full rounded-tr-none border border-dashed">
            <strong>Export and Use:</strong> Choose your preferred format (PDF
            or text) from the dropdown menu, and download the summarized notes
            for offline use.
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
