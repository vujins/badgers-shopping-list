import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { App } from '../../App';
import { mockSuccessfulFetch } from '../mocks/api-mocks';

const renderAndWaitForApp = async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'Azure Web Apps Guide', level: 1 })).toBeInTheDocument();
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
