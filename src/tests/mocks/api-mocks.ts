const mockData = {};

export const mockSuccessfulFetch = () => {
  return jest.fn().mockImplementation((url: string | Request) => {
    const path = typeof url === 'string' ? url : url.url;
    const cleanPath = path.replace('http://localhost:3002', '');

    if (cleanPath.includes('/api/')) {
      return Promise.resolve({
        ok: true,
        json: async () => mockData,
      });
    }
    return Promise.resolve({
      ok: true,
      json: async () => ({}),
    });
  });
};
