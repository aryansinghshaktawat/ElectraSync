import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EVMSimulator from '../src/components/VirtualJourney/EVMSimulator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).AudioContext = jest.fn().mockImplementation(() => ({
  createOscillator: jest.fn().mockReturnValue({
    type: '',
    frequency: { setValueAtTime: jest.fn() },
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  }),
  destination: {},
  currentTime: 0,
}));

describe('EVMSimulator', () => {
  it('renders candidates', () => {
    render(<EVMSimulator />);
    expect(screen.getByText('Candidate A')).toBeInTheDocument();
    expect(screen.getByText('Candidate B')).toBeInTheDocument();
    expect(screen.getByText('Candidate C')).toBeInTheDocument();
  });

  it('handles voting process correctly', async () => {
    jest.useFakeTimers();
    render(<EVMSimulator />);
    
    const voteBtn = screen.getByTestId('vote-btn-c1');
    
    act(() => {
      fireEvent.click(voteBtn);
    });

    // Check if flashing effect starts
    expect(screen.getByTestId('flash-effect')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Receipt should show and VVPAT popup should be visible
    await waitFor(() => {
      expect(screen.getByTestId('vvpat-popup')).toBeInTheDocument();
      const receipt = screen.getByTestId('receipt-modal');
      expect(receipt).toBeInTheDocument();
      expect(receipt).toHaveTextContent('Candidate A');
      expect(receipt).toHaveTextContent('Party Alpha');
    });

    const closeBtn = screen.getByRole('button', { name: /Close Receipt/i });
    act(() => {
      fireEvent.click(closeBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('receipt-modal')).not.toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });
});
