import React from 'react';
import { render, screen } from '@testing-library/react';
import LayoutWrapper from '@/components/ui/LayoutWrapper';

// Mock pathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Light mocks for layout children to keep the test focused
jest.mock('@/components/navbar/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('@/components/footer/Footer', () => () => <div data-testid="footer" />);
jest.mock('@/components/ui/ChatWidget', () => () => <div data-testid="chat-widget" />);

describe('LayoutWrapper', () => {
  const { usePathname } = jest.requireMock('next/navigation') as {
    usePathname: jest.Mock;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows nav/chat/footer on public routes', () => {
    usePathname.mockReturnValue('/');

    render(
      <LayoutWrapper>
        <div>content</div>
      </LayoutWrapper>,
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('chat-widget')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('hides nav/chat/footer on admin-like routes', () => {
    usePathname.mockReturnValue('/dashboard');

    render(
      <LayoutWrapper>
        <div>content</div>
      </LayoutWrapper>,
    );

    expect(screen.queryByTestId('navbar')).toBeNull();
    expect(screen.queryByTestId('chat-widget')).toBeNull();
    expect(screen.queryByTestId('footer')).toBeNull();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
