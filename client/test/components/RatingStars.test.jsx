import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingStars from '../../src/Components/RatingStars';

describe('RatingStars Component', () => {
    it('renders the correct number of filled and unfilled stars for a given rating', () => {
        render(<RatingStars rating={3} />);

        // Check filled stars
        for (let i = 1; i <= 3; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-fill');
        }

        // Check unfilled stars
        for (let i = 4; i <= 5; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-line');
        }
    });

    it('renders all filled stars for a rating of 5', () => {
        render(<RatingStars rating={5} />);

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-fill');
        }
    });

    it('renders all unfilled stars for a rating of 0', () => {
        render(<RatingStars rating={0} />);

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-line');
        }
    });

    it('rounds fractional ratings to the nearest whole number', () => {
        render(<RatingStars rating={3.7} />);

        // Check filled stars
        for (let i = 1; i <= 4; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-fill');
        }

        // Check unfilled stars
        for (let i = 5; i <= 5; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-line');
        }
    });

    it('handles ratings greater than 5 by clamping to 5', () => {
        render(<RatingStars rating={7} />);

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-fill');
        }
    });

    it('handles ratings less than 0 by clamping to 0', () => {
        render(<RatingStars rating={-3} />);

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByTestId(`star-${i}`)).toHaveClass('ri-star-line');
        }
    });
});
