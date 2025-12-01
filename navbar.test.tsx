import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar from '@/components/navbar/Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority: _priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock the popup component
jest.mock('@/components/reusable/common/CarbonJourneyPopup', () => ({
  __esModule: true,
  default: ({ open, onClose }: { open: boolean; onClose: () => void }) =>
    open ? (
      <div data-testid="carbon-popup">
        <button onClick={onClose}>Close Popup</button>
      </div>
    ) : null,
}));

describe('Navbar', () => {
  // Helper to set window width
  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo and brand name', () => {
    render(<Navbar />);
    expect(screen.getByAltText('SalesTaxCorp Logo')).toBeInTheDocument();
    expect(screen.getByText('SalesTaxCorp')).toBeInTheDocument();
  });

  it('renders desktop navigation links on larger screens', () => {
    setWindowWidth(1024);
    render(<Navbar />);
    expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Free Nexus Review').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Resources Library').length).toBeGreaterThan(0);
  });

  it('shows the "Get Quote" button on desktop', () => {
    setWindowWidth(1024);
    render(<Navbar />);

    const getQuoteButtons = screen.getAllByText('Get Quote');
    expect(getQuoteButtons.length).toBeGreaterThan(0);
  });

  it('opens and closes the mobile menu', () => {
    setWindowWidth(768);
    render(<Navbar />);

    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toBeInTheDocument();

    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0);

    // Close menu
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('closes the mobile menu when a link is clicked', () => {
    setWindowWidth(768);
    render(<Navbar />);

    // Open menu
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();

    // Click a link
    const pricingLink = screen.getAllByRole('link', { name: 'Pricing' }).at(-1)!;
    fireEvent.click(pricingLink);

    // Menu should be closed
    // Use queryBy... because the element should not be in the DOM
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument();
  });

  it('opens the CarbonJourneyPopup when "Get Quote" is clicked', () => {
    render(<Navbar />);
    
    expect(screen.queryByTestId('carbon-popup')).not.toBeInTheDocument();

    // Use getAllByText because the button is rendered for both mobile and desktop
    const getQuoteButtons = screen.getAllByText('Get Quote');
    
    // Click the first one we find
    fireEvent.click(getQuoteButtons[0]);

    expect(screen.getByTestId('carbon-popup')).toBeInTheDocument();
  });

  it('opens the popup from the mobile menu and closes the menu', () => {
    setWindowWidth(768);
    render(<Navbar />);

    // Open menu
    fireEvent.click(screen.getByLabelText('Open menu'));

    // Grab the mobile-specific Get Quote button (the overlay renders after opening).
    const getQuoteButtons = screen.getAllByRole('button', { name: 'Get Quote' });
    const mobileQuoteButton = getQuoteButtons[getQuoteButtons.length - 1];
    expect(mobileQuoteButton).toBeInTheDocument();
    fireEvent.click(mobileQuoteButton!);

    expect(screen.getByTestId('carbon-popup')).toBeInTheDocument();
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument();
  });
});
