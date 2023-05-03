import { render, screen } from '@testing-library/react';
import App from './App';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
//afterEach(cleanup);

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 buttons', () => {
  render(<App />);
  const buttonItems = screen.getAllByRole("button");
  expect(buttonItems).toHaveLength(3);
}); */
