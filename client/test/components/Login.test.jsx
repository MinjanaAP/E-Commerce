import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../../src/Components/Login';
import { useLoginUserMutation } from '../../src/redux/features/auth/authApi';
import { setUser } from '../../src/redux/features/auth/authSlice';

// Mock the `useLoginUserMutation` hook
vi.mock('../../src/redux/features/auth/authApi', () => ({
    useLoginUserMutation: vi.fn(),
}));

// Mock Redux's `useDispatch`
const mockDispatch = vi.fn();
vi.mock('react-redux', () => ({
    ...vi.importActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

// Mock `useNavigate` from `react-router-dom`
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});


describe('Login Component - Successful Login', () => {

    let mockLoginUser;

    beforeEach(() => {
        mockLoginUser = vi.fn();
        useLoginUserMutation.mockReturnValue([mockLoginUser, { isLoading: false }]);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
    
    it('navigates to home page on successful login', async () => {
        const mockUserResponse = { token: 'test-token', user: { id: 1, name: 'Test User' } };

        // Mock the `unwrap` method to return the expected response
        mockLoginUser.mockReturnValue({
            unwrap: vi.fn().mockResolvedValueOnce(mockUserResponse),
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Fill the form
        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByTestId('password-input'), {
            target: { value: 'password123' },
        });

        // Click login
        fireEvent.click(screen.getByTestId('login-button'));

        // Wait for dispatch and navigation to be called
        await waitFor(() => {
            // Check if dispatch was called with the correct action
            expect(mockDispatch).toHaveBeenCalledWith(
                setUser({ user: { id: 1, name: 'Test User' } })
            );

            // Check if navigate was called with the home page route
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});


describe('Login Component', () => {
    let mockLoginUser;

    beforeEach(() => {
        mockLoginUser = vi.fn();
        useLoginUserMutation.mockReturnValue([mockLoginUser, { isLoading: false }]);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the login form correctly', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });

    it('displays error message on login failure', async () => {
        mockLoginUser.mockRejectedValueOnce(new Error('Invalid credentials'));

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByTestId('password-input'), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByTestId('login-button'));

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toHaveTextContent(
                'Please provide a valid email and password'
            );
        });
    });

    it('disables the login button when loading', () => {
        useLoginUserMutation.mockReturnValue([mockLoginUser, { isLoading: true }]);

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const loginButton = screen.getByTestId('login-button');
        expect(loginButton).toBeDisabled();
    });
});
