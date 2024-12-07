import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TimelineStep from '../../src/Components/TimelineSteps.jsx';


describe('TimelineStep Component', () => {
    const mockStep = {
        label: 'Step 1',
        status: 'completed',
    };

    const mockOrder = {
        updatedAt: '2024-12-03T12:00:00Z',
    };

    const mockIcon = {
        iconName: 'check-circle',
        bgColor: 'green-500',
        textColor: 'white',
    };

    const mockDescription = 'This is a test description.';

    it('renders the component with the correct data', () => {
        render(
            <TimelineStep
                step={mockStep}
                order={mockOrder}
                isCompleted={true}
                isCurrent={false}
                isLastStep={false}
                icon={mockIcon}
                description={mockDescription}
            />
        );

        expect(screen.getByTestId('timeline-step')).toBeInTheDocument();
        expect(screen.getByTestId('step-label')).toHaveTextContent('Step 1');
        expect(screen.getByTestId('step-time')).toHaveTextContent(
            new Date(mockOrder.updatedAt).toLocaleString()
        );
        expect(screen.getByTestId('step-description')).toHaveTextContent(
            'This is a test description.'
        );
    });

    it('applies the correct styles based on completion status', () => {
        render(
            <TimelineStep
                step={{ ...mockStep, status: 'pending' }}
                order={mockOrder}
                isCompleted={false}
                isCurrent={true}
                isLastStep={true}
                icon={mockIcon}
                description={mockDescription}
            />
        );

        const icon = screen.getByTestId('step-icon');
        expect(icon).toHaveClass('bg-red-700 text-red-100');
        const connector = screen.queryByTestId('connector');
        expect(connector).not.toBeInTheDocument(); // No connector for the last step
    });

    it('handles null updatedAt gracefully', () => {
        render(
            <TimelineStep
                step={mockStep}
                order={{ updatedAt: null }}
                isCompleted={false}
                isCurrent={false}
                isLastStep={false}
                icon={mockIcon}
                description={mockDescription}
            />
        );

        expect(screen.getByTestId('step-time')).toHaveTextContent('Time');
    });

    it('renders correct icon and styles for current step', () => {
        render(
            <TimelineStep
                step={{ ...mockStep, status: 'processing' }}
                order={mockOrder}
                isCompleted={false}
                isCurrent={true}
                isLastStep={false}
                icon={mockIcon}
                description={mockDescription}
            />
        );

        const icon = screen.getByTestId('step-icon');
        expect(icon).toHaveClass('bg-blue-600 text-blue-100');
    });
});
