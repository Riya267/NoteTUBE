import Card from './whyCard';
import { TbTool } from 'react-icons/tb';
import { PiNotepadBold } from 'react-icons/pi';
import { HiCurrencyDollar } from 'react-icons/hi2';

function CardGrid() {
  return (
    <section id="why" className="bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-slate-50 font-bold text-3xl sm:text-4xl mb-8">
          Why use NoteTube?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            icon={<TbTool className="text-4xl text-blue-500" />}
            title="No installations or setup"
            description="Simply provide a YouTube video URL to get instant summarized notes, without the need for any software installations or complex setups."
          />
          <Card
            icon={<HiCurrencyDollar className="text-4xl text-green-500" />}
            title="Free of Charge"
            description="Enjoy the convenience of generating summarized notes from YouTube videos at no cost, making learning accessible for everyone."
          />
          <Card
            icon={<PiNotepadBold className="text-4xl text-yellow-500" />}
            title="One-click AI summary"
            description="Get concise and comprehensive notes with a single click, leveraging the power of ChatGPT to summarize YouTube videos efficiently."
          />
        </div>
      </div>
    </section>
  );
}

export default CardGrid;
