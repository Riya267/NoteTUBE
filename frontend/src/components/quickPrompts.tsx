import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';
import { FaCopy } from 'react-icons/fa';
import { ChatArrayInterface, QuickPromptsProps } from '../types';
import { quickPrompts } from '../utils/constants';
import { copyToClipboard, scrollToBottom } from '../utils/helper';
import remarkGfm from 'remark-gfm';
import { useAppContext } from '../context/appContext';

const QuickPrompts: React.FC = () => {
  const { videoId, chatResponse, getChatResponse, error, isLoading } =
    useAppContext();
  const [input, setInput] = useState('');
  const [chats, setChats] = useState<ChatArrayInterface[] | []>([]);
  const [streamedResponse, setStreamedResponse] = useState<string>('');

  useEffect(() => {
    if (chatResponse) {
      console.log('chatResponse', chatResponse);
      setStreamedResponse(chatResponse);
    }
  }, [chatResponse]);

  useEffect(() => {
    if (streamedResponse) {
      setChats((prevChats) => {
        const lastChat = prevChats[prevChats.length - 1];
        if (lastChat && lastChat.role === 'SYSTEM') {
          const updatedChats = [...prevChats];
          updatedChats[updatedChats.length - 1] = {
            ...lastChat,
            content: streamedResponse,
          };
          return updatedChats;
        } else {
          return [
            ...prevChats,
            {
              role: 'SYSTEM',
              content: streamedResponse,
            },
          ];
        }
      });
    }
  }, [streamedResponse]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (chats.length > 0) scrollToBottom('chatsWrapper');
  }, [chats]);

  const handleOnSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      setChats([
        ...chats,
        {
          role: 'USER',
          content: input,
        },
      ]);
      getChatResponse({ videoId: videoId, prompt: input });
    },
    [input, getChatResponse]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [input]
  );

  return (
    <div className="p-4 lg:w-[800px] self-center bg-gray-900 mb-20">
      <h1 className="text-2xl font-bold mb-4 text-cyan-50">Quick prompts</h1>
      <div className="flex flex-wrap justify-center lg:justify-start">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => {
              setChats([
                ...chats,
                {
                  role: 'USER',
                  content: prompt.label,
                },
              ]);
              getChatResponse({ videoId: videoId, prompt: prompt.label });
            }}
            className="bg-white border border-gray-300 rounded p-2 shadow-sm hover:shadow-md focus:outline-none m-5"
          >
            {prompt.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-white">Ask a question</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="flex">
            <label htmlFor="queryInput" className="sr-only">
              Write your query for this youtube video
            </label>
            <input
              id="queryInput"
              type="text"
              placeholder="Write your query for this youtube video"
              className="w-full border border-gray-300 rounded p-2 mt-2 mr-5"
              aria-label="Query input"
              required
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="text-white rounded p-2 mt-2 px-4 bg-brown"
            >
              Ask
            </button>
          </div>
        </form>
      </div>
      {chats.length > 0 && (
        <div
          id="chatsWrapper"
          className="w-full h-64 max-h-[800px] bg-lime-100 my-5 rounded-[10px] flex flex-col overflow-y-auto"
        >
          {chats.map((chat) => {
            return chat.role === 'USER' ? (
              <p className="w-[70%] p-3 pl-5 max-h-64 bg-white self-end rounded-[10px] rounded-tr-none m-3">
                {chat.content}
              </p>
            ) : (
              <div
                className="w-[70%] p-3 pl-5 bg-lime-200 rounded-[10px] rounded-tl-none m-3"
                id="chatsContainer"
              >
                <Markdown remarkPlugins={[remarkGfm]} className="text-black">
                  {chat.content}
                </Markdown>
                <button
                  className="float-right -mb-1 -mr-1 shadow-md shadow-black-300 p-2"
                  onClick={() => copyToClipboard(chat.content)}
                >
                  <FaCopy size={25} color="black" />
                </button>
              </div>
            );
          })}
          {isLoading && (
            <div
              className="overflow-y-auto max-h-64 w-[70%] p-3 pl-5 h-fit bg-lime-200 rounded-full rounded-tl-none m-3"
              id="chatsContainer"
            >
              <div className="flex items-center">
                <p className="text-slate-900 ml-2">Typing...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickPrompts;
