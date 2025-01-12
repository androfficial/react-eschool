import '@/styles/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import { App } from '@/App';
import { queryClientConfig } from '@/config/queryClientConfig';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClientConfig}>
    <App />
  </QueryClientProvider>
);
