import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PaymentSuccess from '../../src/Components/PaymentSuccess';

vi.mock('../utils/baseURL', () => ({
    getBaseUrl: () => 'http://mock-api.com',
}));

describe('Loading message test', () => {
    beforeEach(() => {
        global.fetch = vi.fn(); // Mock `fetch`
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('displays a loading message initially', () => {
        render(<PaymentSuccess />);
        expect(screen.getByTestId('loading-message')).toBeInTheDocument();
    });
});


describe('PaymentSuccess Component', () => {
    beforeEach(() => {
        global.fetch = vi.fn(); // Mock `fetch`

        // Mock window.location.search to include a session_id
        Object.defineProperty(window, 'location', {
            value: {
                search: '?session_id=test-session-id',
            },
            writable: true,
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('fetches and displays order data on success', async () => {
        const mockOrder = {
            orderId: '12345',
            status: 'processing',
        };

        fetch.mockResolvedValueOnce(
            Promise.resolve({
                ok: true,
                json: async () => ({ order: mockOrder }),
            })
        );

        render(<PaymentSuccess />);

        await waitFor(() => screen.getByTestId('payment-success'));

        expect(screen.getByText('Payment processing')).toBeInTheDocument();
        expect(screen.getByText('Order Id: 12345')).toBeInTheDocument();
        expect(screen.getByText('Status: processing')).toBeInTheDocument();
    });

    it('renders error message on fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<PaymentSuccess />);

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
        });
    });

    it('renders timeline steps correctly', async () => {
        const mockOrder = {
            orderId: '12345',
            status: 'processing',
        };

        fetch.mockResolvedValueOnce(
            Promise.resolve({
                ok: true,
                json: async () => ({ order: mockOrder }),
            })
        );

        render(<PaymentSuccess />);

        // Wait until `payment-success` element is rendered
        await waitFor(() => expect(screen.getByTestId('payment-success')).toBeInTheDocument());

        // Verify that the timeline steps are rendered
        const timelineSteps = screen.getByTestId('timeline-steps');
        expect(timelineSteps).toBeInTheDocument();

        // Verify individual steps
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('Processing')).toBeInTheDocument();
        expect(screen.getByText('Shipped')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });
});
