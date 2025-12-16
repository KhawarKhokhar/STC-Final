import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // ensure matchers like toBeInTheDocument work
import CarbonJourneyPopup from '@/components/reusable/common/CarbonJourneyPopup';
import "cross-fetch/polyfill";


describe('CarbonJourneyPopup', () => {
  it('renders when open is true', () => {
    render(<CarbonJourneyPopup open={true} onClose={() => {}} />);
    expect(screen.getByText(/close/i)).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    const { container } = render(
      <CarbonJourneyPopup open={false} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(<CarbonJourneyPopup open={true} onClose={onClose} />);
    fireEvent.click(screen.getByText(/close/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
