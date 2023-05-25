import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.util';
import CartIcon from '../cart-icon.component';

describe('Cart Icon tests', () => {
  test('should use the preloaded state to render', () => {
    // prettier-ignore
    const initialCartIcon = [
      { id: 123, name: 'Item A', imageUrl: 'test.com', price: 10.99, quantity: 2 },
      { id: 456, name: 'Item B', imageUrl: 'test.com', price: 6, quantity: 1 },
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: { cartItems: initialCartIcon },
      },
    });

    const cartItemElement = screen.getByText('3');
    expect(cartItemElement).toBeInTheDocument();
  });
});
