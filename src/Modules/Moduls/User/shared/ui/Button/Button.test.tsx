import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('render button', () => {
    render(<Button>Button</Button>);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  test('render button with themeButton clear', () => {
    render(<Button theme="clear">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('clear');
  });
});
