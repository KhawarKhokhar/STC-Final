import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatWidget from '@/components/ui/ChatWidget';

describe('ChatWidget', () => {
  it('renders the chat widget', () => {
    render(<ChatWidget />);
    // Add more specific checks for your chat widget content here
    expect(screen.getByText(/Chat with us/i)).toBeInTheDocument();
  });
});