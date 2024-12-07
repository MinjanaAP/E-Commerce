import React, { useState } from 'react';
import { getBaseUrl } from '../utils/baseURL';


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
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-md border shadow bg-white mx-auto p-8 rounded-md">
                <h2 className="text-2xl font-semibold pb-5 text-center">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email Address"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your Phone Number"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                    />
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your Message"
                        required
                        rows="4"
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
                    ></textarea>

                    {successMessage && (
                        <p className="text-green-500 text-center">{successMessage}</p>
                    )}

                    {errorMessage && (
                        <p className="text-red-500 text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
