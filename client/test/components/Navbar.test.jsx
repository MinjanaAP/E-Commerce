import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/redux/features/auth/authSlice';
import Navbar from '../../src/Components/Navbar';
import cartReducer from '../../src/redux/features/cart/cartSlice'; // Assuming you have a cart slice

const renderWithProviders = (ui, { preloadedState = {}, store = configureStore({ reducer: { auth: authReducer, cart: cartReducer }, preloadedState }) } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Navbar component with links and logo', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Fashion House/i)).toBeInTheDocument();
  });

  it('shows user dropdown menu when user is logged in', async () => {
    const preloadedState = {
      auth: { user: { profileImage: '', role: 'user' } },
      cart: { products: [] },
    };

    renderWithProviders(<Navbar />, { preloadedState });

    const avatar = screen.getByRole('img');
    fireEvent.click(avatar);

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Profile/i)).toBeInTheDocument();
      expect(screen.getByText(/Logout/i)).toBeInTheDocument(); // Assuming Logout link is present
    });
  });

  it('renders login icon when user is not logged in', () => {
    const preloadedState = {
      auth: { user: null },
      cart: { products: [] },
    };

    renderWithProviders(<Navbar />, { preloadedState });

    expect(screen.getByLabelText(/login/i)).toBeInTheDocument(); // Assuming login icon is rendered
  });
});
