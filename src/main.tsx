import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from './routes/Root';
import './index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  import('../src/mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .then(() => {
      const router = createBrowserRouter([
        {
          path: '/',
          element: <Root />,
          loader: rootLoader(queryClient),
        },
      ]);

      root.render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </React.StrictMode>
      );
    });
} else {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      loader: rootLoader(queryClient),
    },
  ]);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
