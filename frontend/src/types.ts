export interface VideoId {
  videoId: string;
}

export interface Loading {
  isLoading: boolean;
}
export interface Error {
  error: string | null;
}

export interface Summary {
  summary: string;
}

export interface FormWrapperProps extends Error {
  getYoutubeSummary: (formData: VideoId) => Promise<void>;
}

export interface ChatArrayInterface {
  role: 'USER' | 'SYSTEM';
  content: string;
}

export interface ChatResponseInterface {
  chatResponse: string;
}

export interface QuickPromptsProps
  extends VideoId,
    Error,
    Loading,
    ChatResponseInterface {
  getChatResponse: ({
    videoId,
    prompt,
  }: {
    videoId: string;
    prompt: string;
  }) => Promise<void>;
}

export interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface AppContextState
  extends Summary,
    VideoId,
    QuickPromptsProps,
    FormWrapperProps {}
