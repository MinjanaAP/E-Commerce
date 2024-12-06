import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Register from '../../src/Components/Register';
import { useRegisterUserMutation } from '../../src/redux/features/auth/authApi';

// Mock the `useRegisterUserMutation` hook
vi.mock('../../src/redux/features/auth/authApi', () => ({
    useRegisterUserMutation: vi.fn(),
}));

// Mock the `useNavigate` function from `react-router-dom`
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Register Component', () => {
    let mockRegisterUser;

    beforeEach(() => {
        mockRegisterUser = vi.fn();
        useRegisterUserMutation.mockReturnValue([mockRegisterUser, { isLoading: false }]);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('navigates to login page on successful registration', async () => {
        // Mock the resolved value for `unwrap()`
        mockRegisterUser.mockReturnValueOnce({
            unwrap: vi.fn().mockResolvedValueOnce({}),
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        // Fill the form
        fireEvent.change(screen.getByTestId('username-input'), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByTestId('password-input'), {
            target: { value: 'password123' },
        });

        // Click register
        fireEvent.click(screen.getByTestId('register-button'));

        // Wait for navigation
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });
});

describe('Register Component', () => {
    let mockRegisterUser;

    beforeEach(() => {
        mockRegisterUser = vi.fn();
        useRegisterUserMutation.mockReturnValue([mockRegisterUser, { isLoading: false }]);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the form correctly', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(screen.getByTestId('username-input')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('register-button')).toBeInTheDocument();
    });

    it('displays error message on registration failure', async () => {
        mockRegisterUser.mockRejectedValueOnce(new Error('Registration failed'));

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByTestId('username-input'), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByTestId('password-input'), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByTestId('register-button'));

        await waitFor(() =>
            expect(screen.getByTestId('error-message')).toHaveTextContent('Registration failed')
        );
    });

    it('disables the register button when loading', () => {
        useRegisterUserMutation.mockReturnValue([mockRegisterUser, { isLoading: true }]);

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const registerButton = screen.getByTestId('register-button');
        expect(registerButton).toBeDisabled();
    });
});
