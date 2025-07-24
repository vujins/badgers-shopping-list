import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { App } from '../../App';
import { mockSuccessfulFetch } from '../mocks/api-mocks';

const renderAndWaitForApp = async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: '🍽️ Recipe Planner & Shopping List', level: 1 })).toBeInTheDocument();
  });
};

describe('Recipe Planner App', () => {
  beforeEach(() => {
    global.fetch = mockSuccessfulFetch();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders without crashing and shows main heading', async () => {
    await renderAndWaitForApp();
  });
});
