import { render, screen } from '@testing-library/react';

import Button from '../button.component';

describe('button tests', () => {
  test('should render base button when nothing is passed', () => {
    render(<Button>Test</Button>);

    const buttonElement = screen.getByRole('button', { name: /test/i });
    expect(buttonElement).toHaveClass('base');
  });
});
