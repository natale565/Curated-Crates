import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App'

it('renders with the h1 content as Deploy to Render', () => {
  render(<App />);

  const element = screen.getByText(/Welcome to Curated Crates/i);
  expect(element).toBeInTheDocument();
})