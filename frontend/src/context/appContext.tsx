import { createContext, useContext, ReactNode } from 'react';
import { useFetchSummary } from '../customHooks/useFetchSummary';
import { AppContextState } from '../types';

const AppContext = createContext<AppContextState | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({
  children,
}: ContextProviderProps): JSX.Element => {
  const {
    error,
    isLoading,
    getYoutubeSummary,
    getChatResponse,
    chatResponse,
    summary,
    videoId,
  } = useFetchSummary();

  const contextValue: AppContextState = {
    getYoutubeSummary,
    chatResponse,
    getChatResponse,
    error,
    isLoading,
    summary,
    videoId,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};
