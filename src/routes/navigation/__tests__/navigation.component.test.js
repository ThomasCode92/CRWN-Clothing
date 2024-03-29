import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.util';

import Navigation from '../navigation.component';

import { signOutStart } from '../../../store/user/user.reducer';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));

describe('Navigation Component tests', () => {
  test('should render a Sign in link and not a Sign out Link if there is no current user', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { user: { currentUser: null } },
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

  test('it should dispatch signOutStart action when clicking on the Sign out link', () => {
    const signOutAction = signOutStart();

    renderWithProviders(<Navigation />, {
      preloadedState: { user: { currentUser: {} } },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    fireEvent.click(signOutLinkElement);

    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedDispatch).toHaveBeenCalledWith(signOutAction);

    mockedDispatch.mockClear();
  });
});
