import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationCheck from '../src/components/VirtualJourney/RegistrationCheck';

describe('RegistrationCheck', () => {
  it('renders input and verify button', () => {
    render(<RegistrationCheck />);
    expect(screen.getByPlaceholderText('e.g., VOTE-12345')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Verify Voter ID/i })).toBeInTheDocument();
  });

  it('displays success message after typing and verifying', () => {
    render(<RegistrationCheck />);
    const input = screen.getByTestId('voter-id-input');
    const button = screen.getByRole('button', { name: /Verify Voter ID/i });
    
    fireEvent.change(input, { target: { value: 'VOTE-123' } });
    fireEvent.click(button);

    expect(screen.getByTestId('verification-success')).toBeInTheDocument();
    expect(screen.getByText(/Voter Verified Successfully/i)).toBeInTheDocument();
  });

  it('does not display success if input is empty', () => {
    render(<RegistrationCheck />);
    const button = screen.getByRole('button', { name: /Verify Voter ID/i });
    
    fireEvent.click(button);

    expect(screen.queryByTestId('verification-success')).not.toBeInTheDocument();
  });
});
