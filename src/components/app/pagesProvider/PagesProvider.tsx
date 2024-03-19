import React, { useContext, useMemo, useState } from 'react';
import { PageType } from 'shared/types';

export interface PagesProviderProps {
  children: React.ReactNode;
}

interface PagesContextProps {
  page: PageType;
  changePage: (page: PageType) => void;
}

export const PagesContext = React.createContext<PagesContextProps | null>(null);

export const usePage = (): PagesContextProps => {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const PagesProvider = ({ children }: PagesProviderProps) => {
  const [page, setPage] = useState<PageType>(PageType.CHAT);

  const contextValue = useMemo(() => {
    const changePage = (newPage: PageType) => {
      setPage(newPage);
    };
    return { page, changePage };
  }, [page]);

  return (
    <PagesContext.Provider value={contextValue}>
      {children}
    </PagesContext.Provider>
  );
};
export default PagesProvider;
