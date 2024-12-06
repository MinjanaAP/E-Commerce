import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../../utils/baseURL';

const ContactMessages = () => {
    const [allMessages, setAllMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null); // For modal

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${getBaseUrl()}/api/contact/all`);
                setAllMessages(response.data);
            } catch (err) {
                setError('Failed to fetch messages.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const handleReply = (email) => {
        alert(`Reply to ${email}`);
    };

    const handleSeeMore = (message) => {
        setSelectedMessage(message);
    };

    const closeModal = () => {
        setSelectedMessage(null);
    };

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            <section className="py-1 bg-blueGray-50">
                <div className="w-full px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        {/* Header */}
                        <div className="flex justify-between border-b px-4 py-2">
                            <h2 className="font-semibold text-indigo-500 px-4 py-2">
                                All Messages
                            </h2>
                        </div>

                        {/* Message Table */}
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Email
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Message
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allMessages.map((message, index) => (
                                        <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {message.name}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {message.email}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {message.message.split(' ').length > 4 ? (
                                                    <>
                                                        {message.message.split(' ').slice(0, 4).join(' ')}...{' '}
                                                        <button
                                                            className="text-indigo-500 hover:underline"
                                                            onClick={() => handleSeeMore(message.message)}
                                                        >
                                                            See More
                                                        </button>
                                                    </>
                                                ) : (
                                                    message.message
                                                )}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <button
                                                    onClick={() => handleReply(message.email)}
                                                    className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                                                >
                                                    Reply
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal for full message */}
            {selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Full Message</h3>
                        <p className="text-gray-700">{selectedMessage}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactMessages;
