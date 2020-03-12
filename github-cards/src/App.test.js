import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders github title', () => {
  const { getByText } = render(<App title="Github Cards"/>);
  const linkElement = getByText(/GitHub Cards/i);
  expect(linkElement).toBeInTheDocument();
});
