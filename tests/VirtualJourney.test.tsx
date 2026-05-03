import React from 'react';
import { render, screen } from '@testing-library/react';
import VirtualJourney from '../src/components/VirtualJourney/VirtualJourney';

// Mock the dynamically imported components to avoid act warnings with async loading in simple tests
jest.mock('../src/components/VirtualJourney/EVMSimulator', () => {
  return function DummyEVMSimulator() {
    return <div data-testid="mock-evm">Mock EVM Simulator</div>;
  };
});

describe('VirtualJourney', () => {
  it('renders the virtual journey orchestration correctly', async () => {
    render(<VirtualJourney />);
    
    expect(screen.getByText('Virtual Voter Simulator')).toBeInTheDocument();
    expect(screen.getByText('Step 1: Registration Check')).toBeInTheDocument();
    
    // EVM simulator is lazy loaded but mocked here
    expect(await screen.findByTestId('mock-evm')).toBeInTheDocument();
  });
});
