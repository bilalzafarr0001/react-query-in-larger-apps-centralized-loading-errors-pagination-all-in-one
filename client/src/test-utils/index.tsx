import { RenderResult, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactElement } from 'react';
// import { defaultQueryClientOptions } from '../react-query/queryClient';

const generateQueryClient = () => {
  return new QueryClient();
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient = client ?? generateQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

//from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks

export const createQueryClientWrapper = (): React.FC => {
  const queryClient = generateQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
