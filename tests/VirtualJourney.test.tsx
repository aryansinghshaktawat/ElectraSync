import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VirtualJourney from '../src/components/VirtualJourney/VirtualJourney';

// Mock the dynamically imported components to avoid act warnings with async loading in simple tests
jest.mock('../src/components/VirtualJourney/EVMSimulator', () => {
  return function DummyEVMSimulator() {
    return <div data-testid="mock-evm">Mock EVM Simulator</div>;
  };
});

describe('VirtualJourney', () => {
  it('renders the 7-step virtual journey orchestration correctly', async () => {
    render(<VirtualJourney />);
    
    expect(screen.getByText('Virtual Voter Simulator')).toBeInTheDocument();
    expect(screen.getByText('Step 1: Check Eligibility & Register')).toBeInTheDocument();
    expect(screen.getByText('Step 7: Results & Government Formation')).toBeInTheDocument();
    
    // EVM simulator should be rendered when Step 5 is expanded
    const step5Btn = screen.getByText('Step 5: Cast Your Vote (EVM)');
    fireEvent.click(step5Btn);

    expect(await screen.findByTestId('mock-evm')).toBeInTheDocument();
  });
});
