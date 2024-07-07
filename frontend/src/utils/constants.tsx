import { HiCurrencyDollar } from 'react-icons/hi2';
import { PiNotepadBold } from 'react-icons/pi';
import { TbTool } from 'react-icons/tb';

export const quickPrompts = [
  { label: '✨ Generate detailed summary' },
  { label: '📜 Generate detailed summary with citations' },
  { label: '📄 Generate key takeaways' },
  { label: '🔗 Generate bullet point highlights' },
  { label: '📋 Extract main points and ideas' },
  { label: '📝 Summarize video for quick review' },
];

export const youtubeEmbedUrl = 'https://youtube.com/embed';

export const howItWorksData = {
  title: 'How It Works',
  description:
    'NoteTube leverages AI capabilities to generate summaries from YouTube videos. Follow these simple steps to get your summaries:',
  steps: [
    {
      id: 1,
      title: 'Paste Video URL:',
      description: `Copy and paste the URL of the YouTube video you want to transcribe into our easy-to-use interface.`,
    },
    {
      id: 2,
      title: 'Click Generate Summary:',
      description:
        'Simply click the button, and NoteTube will swiftly process the video to create a text-based summary of key points.',
    },
    {
      id: 3,
      title: 'Copy and Use:',
      description:
        'With just a click, the summary will be copied to your clipboard for easy reference.',
    },
    {
      id: 4,
      title: 'Export and Use:',
      description: 'Download the summary as a text file for offline use.',
    },
    {
      id: 5,
      title: 'Chat with youtube',
      description:
        'You can also engage with YouTube video content and pose personalized queries.',
    },
  ],
};

export const noteTubeFeatures = [
  {
    id: 1,
    icon: <TbTool className="text-4xl text-blue-500" />,
    title: 'No installations or setup',
    description:
      'Simply provide a YouTube video URL to get instant summaries, without the need for any software installations or complex setups.',
  },
  {
    id: 2,
    icon: <HiCurrencyDollar className="text-4xl text-green-500" />,
    title: 'Free of Charge',
    description:
      'Enjoy the convenience of generating summaries from YouTube videos at no cost, making learning accessible for everyone.',
  },
  {
    id: 3,
    icon: <PiNotepadBold className="text-4xl text-yellow-500" />,
    title: 'One-click AI summary',
    description:
      'Get concise and comprehensive summaries with a single click, leveraging the power of ChatGPT to summarize YouTube videos efficiently.',
  },
];
