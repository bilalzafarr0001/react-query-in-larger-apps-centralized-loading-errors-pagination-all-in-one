import { screen } from '@testing-library/react';
import { renderWithQueryClient } from '../../../test-utils';
import { Treatments } from '../Treatments';

test('renders response from query', async () => {
  renderWithQueryClient(<Treatments />);
  const treatmentTitles = await screen.findByRole('Heading', {
    name: 'Massage',
  });
  expect(treatmentTitles).toHaveLength(1);
});
