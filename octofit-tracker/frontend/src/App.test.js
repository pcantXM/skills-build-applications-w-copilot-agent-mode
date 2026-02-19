import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders clickable title and homepage welcome message', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const titleLink = screen.getByRole('link', { name: /octofit tracker/i });
  expect(titleLink).toBeInTheDocument();
  expect(titleLink).toHaveAttribute('href', '/');

  const welcomeMessage = screen.getByText(/welcome to octofit tracker!/i);
  expect(welcomeMessage).toBeInTheDocument();
});
