import '@/styles/fonts';
import '@/styles/index.css';

import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import { App } from '@/App';
import { queryClientConfig } from '@/configs/queryClientConfig';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClientConfig}>
    <App />
  </QueryClientProvider>
);
