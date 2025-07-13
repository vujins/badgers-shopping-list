import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { App } from '../../App';
import { mockSuccessfulFetch } from '../mocks/api-mocks';

// Helper function to wait for the app to fully load with all async operations
const renderAndWaitForApp = async () => {
  await act(async () => {
    render(<App />);
  });

  // Wait for the main content to load (indicates data fetching is complete)
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'Comprehension FY26' })).toBeInTheDocument();
  });

  // Wait for feature areas to be rendered (indicates store state is updated)
  await waitFor(() => {
    expect(screen.getByText('Top of Doc')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
  });
};

describe('Gantt Chart Component', () => {
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
