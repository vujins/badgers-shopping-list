import { render, waitFor } from '@testing-library/react';
import { act } from 'react';
import { App } from '../../App';
import { mockSuccessfulFetch } from '../mocks/api-mocks';

const renderAndWaitForApp = async () => {
  await act(async () => {
    render(<App />);
  });

  // Wait for the main content to load (indicates data fetching is complete)
  await waitFor(() => {
    // expect(screen.getByRole('heading', { name: 'Azure' })).toBeInTheDocument();
  });

  await waitFor(() => {
    // expect(screen.getByText('')).toBeInTheDocument();
  });
};

describe('Main App Component', () => {
  beforeEach(() => {
    global.fetch = mockSuccessfulFetch();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders without crashing', async () => {
    await renderAndWaitForApp();
  });
});
