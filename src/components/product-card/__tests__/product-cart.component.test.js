import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.util';
import ProductCard from '../product-card.component';

describe('Product Card tests', () => {
  test('should add the product item when Product Cart button is clicked', () => {
    // prettier-ignore
    const mockProduct = { id: 1, name: 'Product A', imageUrl: 'test.com', price: 10 };

    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      { preloadedState: { cart: { cartItems: [] } } }
    );

    const addToCartButtonElement = screen.getByText(/add to cart/i);
    fireEvent.click(addToCartButtonElement);

    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
