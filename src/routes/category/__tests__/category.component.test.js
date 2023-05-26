import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.util';

import Category from '../category.component';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ category: 'mens' }),
}));

describe('Category Component tests', () => {
  test('should render a Spinner if isLoading is true', () => {
    renderWithProviders(<Category />, {
      preloadedState: { categories: { isLoading: true, categories: [] } },
    });

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('should render products if isLoading is false and there are products present', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              items: [
                { id: 1, name: 'Product A' },
                { id: 2, name: 'Product B' },
              ],
            },
          ],
        },
      },
    });

    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();

    const product1Element = screen.getByText(/product a/i);
    expect(product1Element).toBeInTheDocument();
  });
});
