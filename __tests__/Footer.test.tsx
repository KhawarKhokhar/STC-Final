import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer/Footer';

describe('Footer', () => {
  it('renders the footer text', () => {
    render(<Footer />);
    // Add more specific checks for your footer content here
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });
});