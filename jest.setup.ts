import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllMocks();
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.warn = () => {};
});

import { configure } from '@testing-library/react';

const shouldSkipDOMDump = true;
if (shouldSkipDOMDump) {
  configure({
    getElementError: (message, container) => {
      const err = new Error(message!);
      err.name = 'TestingLibraryElementError';
      err.stack = null!; // no huge DOM dump
      return err;
    },
  });
}

// Mock window.matchMedia for tests that might use responsive design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo for JSDOM compatibility
Object.defineProperty(Element.prototype, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Also mock it on window just in case
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});
