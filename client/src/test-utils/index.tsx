import { RenderResult, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { ReactElement } from 'react';
import { generateQueryClient } from '../react-query/queryClient';

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();
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
