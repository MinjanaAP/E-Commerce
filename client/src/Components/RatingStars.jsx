import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({ rating }) => {
    // Ensure the rating is a number between 0 and 5
    const validRating = Math.min(Math.max(Math.round(rating), 0), 5);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                data-testid={`star-${i}`}
                className={`ri-star${i <= validRating ? '-fill' : '-line'}`}
            ></span>
        );
    }

    return <div className="product__rating">{stars}</div>;
};

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default RatingStars;
