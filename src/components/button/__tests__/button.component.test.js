import { render, screen } from '@testing-library/react';

import Button from '../button.component';

describe('button tests', () => {
  test('should render base button when nothing is passed', () => {
    render(<Button>Test</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('base');
  });

  test('should render google-sign-in button when passed google button type', () => {
    render(<Button buttonType="google">Test</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('google-sign-in');
  });

  test('should render inverted button when passed inverted button type', () => {
    render(<Button buttonType="inverted">Test</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('inverted');
  });

  test('should be disabled if isLoading is true', () => {
    render(<Button isLoading>Test</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});
