import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: '4b29b417-55d1-4ac8-8c6e-9ac8097097f8',
                ...formData
            })
        });

        const result = await response.json();
        if (result.success) {
            alert('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } else {
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <section className="relative p-10 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-xl m-5 shadow-2xl transform transition-transform duration-500 hover:scale-105">
            {/* Glowing gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 opacity-25 blur-2xl z-0"></div>
            
            {/* Form Content */}
            <div className="relative z-10">
                <h2 className="text-4xl font-extrabold text-white mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
                    Contact Us
                </h2>
                <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-8">
                    <div>
                        <label htmlFor="name" className="block text-left text-white font-bold">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-3 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 bg-gray-800 text-white transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-left text-white font-bold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-3 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 bg-gray-800 text-white transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-left text-white font-bold">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full mt-3 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 bg-gray-800 text-white transition duration-300"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white rounded-lg font-bold hover:bg-gradient-to-r hover:from-blue-400 hover:via-green-500 hover:to-pink-500 transition duration-500 transform hover:scale-105"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Abstract floating shapes */}
            <div className="absolute top-16 left-16 w-20 h-20 bg-pink-500 opacity-30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-16 w-32 h-32 bg-purple-400 opacity-30 rounded-full blur-2xl animate-pulse"></div>
        </section>
    );
};

export default ContactForm;
