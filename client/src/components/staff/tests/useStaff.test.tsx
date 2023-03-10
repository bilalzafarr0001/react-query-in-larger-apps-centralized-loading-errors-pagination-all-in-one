import { act, renderHook } from '@testing-library/react-hooks';
import { createQueryClientWrapper } from '../../../test-utils';
import { useStaff } from '../hooks/useStaff';

test('filter staff', async () => {
  const { result, waitFor } = renderHook(useStaff, {
    wrapper: createQueryClientWrapper(),
  });

  await waitFor(() => result.current.staff.length == 4);
  act(() => result.current.setFilter('Facial'));

  await waitFor(() => result.current.staff.length == 3);
});
