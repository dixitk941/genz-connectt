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
        <section className="bg-black p-10 text-center rounded-lg m-5 shadow-2xl">
            <h2 className="text-4xl font-extrabold text-green-500 mb-10">Contact Us</h2>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="name" className="block text-left text-green-500 font-semibold">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-black text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-left text-green-500 font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-black text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-left text-green-500 font-semibold">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-black text-white"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default ContactForm;