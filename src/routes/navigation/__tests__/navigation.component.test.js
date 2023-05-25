import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.util';

import Navigation from '../navigation.component';

describe('Navigation Component tests', () => {
  test('should render a Sign in link and not a Sign out Link if there is no current user', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { currentUser: null },
    });

    const signInLinkElement = screen.getByText(/sign in/i);
    const signOutLinkElement = screen.queryByText(/sign out/i);

    expect(signInLinkElement).toBeInTheDocument();
    expect(signOutLinkElement).toBeNull();
  });

  test('should render a Sign out Link and not a Sign in link if there is a current user', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { user: { currentUser: {} } },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    const signInLinkElement = screen.queryByText(/sign in/i);

    expect(signOutLinkElement).toBeInTheDocument();
    expect(signInLinkElement).toBeNull();
  });

  test('should render not render a cart dropdown if isCartOpen is false', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { cart: { isCartOpen: false, cartItems: [] } },
    });

    const dropdownText = screen.queryByText(/your cart is empty/i);
    expect(dropdownText).toBeNull();
  });

  test('should render a cart dropdown if isCartOpen is true', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { cart: { isCartOpen: true, cartItems: [] } },
    });

    const dropdownText = screen.getByText(/checkout/i);
    expect(dropdownText).toBeInTheDocument();
  });
});
