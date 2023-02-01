import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { renderWithQueryClient } from '../../../test-utils';
import { AllStaff } from '../AllStaff';
import { QueryClientProvider, setLogger } from 'react-query';
import { generateQueryClient } from 'react-query/queryClient';

test('renders response from query', async () => {
  renderWithQueryClient(<AllStaff />);

  const staffNames = await screen.findAllByRole('heading', {
    name: /divya|sandra|michael|mateo/i,
  });
  expect(staffNames).toHaveLength(4);
});

test('handles query error', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/staff', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  // suppress errors
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
  });

  const queryClient = generateQueryClient();
  const options = queryClient.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  queryClient.setDefaultOptions(options);

  render(
    <QueryClientProvider client={queryClient}>
      <AllStaff />
    </QueryClientProvider>,
  );
  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('Request failed with status code 500');
});
