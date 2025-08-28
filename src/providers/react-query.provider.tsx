'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider as LibQueryClientProvider } from '@tanstack/react-query';

const queryClientConfig = {
  defaultOptions: {},
};

export const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient(queryClientConfig);

  return (
    <LibQueryClientProvider client={queryClient}>
      {children}
    </LibQueryClientProvider>
  );
};