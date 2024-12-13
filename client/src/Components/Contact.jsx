import React, { useState } from 'react';
import { getBaseUrl } from '../utils/baseURL';
import './Contact.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, phone, message };

        try {
            const response = await fetch(`${getBaseUrl()}/api/contact/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccessMessage('Your message has been sent successfully!');
                setErrorMessage('');
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                const result = await response.json();
                setErrorMessage(result.message || 'Failed to send your message.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error submitting the contact form:', error);
            setErrorMessage('An error occurred while sending your message. Please try again later.');
            setSuccessMessage('');
        }
    };

    return (
        <section className="contact-container">
            <div className="contact-form-wrapper">
                <h2 className="contact-title">Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="contact-input"
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email Address"
                        required
                        className="contact-input"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your Phone Number"
                        required
                        className="contact-input"
                    />
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your Message"
                        required
                        rows="4"
                        className="contact-textarea"
                    ></textarea>

                    {successMessage && (
                        <p className="success-message">{successMessage}</p>
                    )}

                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}

                    <button type="submit" className="contact-submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;