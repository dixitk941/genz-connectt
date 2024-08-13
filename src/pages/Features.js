import React from 'react';

const Features = () => {
    const features = [
        {
            title: "GitHub Integration",
            description: "Seamlessly sync your repositories and collaborate in real-time with integrated version control right inside your video calls."
        },
        {
            title: "Real-time Code Collaboration",
            description: "Pair program, debug, and build projects together with live coding sessions, complete with syntax highlighting and terminal access."
        },
        {
            title: "Live Video & Audio Conferencing",
            description: "Crystal-clear video and audio with low latency, designed for productive team huddles and brainstorming sessions."
        },
        {
            title: "Interactive Whiteboard",
            description: "Visualize ideas, sketch diagrams, and brainstorm like never before with a collaborative whiteboard that everyone can draw on."
        },
        {
            title: "Instant Messaging & Emojis",
            description: "Keep the conversation flowing with real-time chat, reactions, and a rich library of emojis to express your vibe."
        },
        {
            title: "Screen & Document Sharing",
            description: "Share your screen or documents with the team, perfect for walkthroughs, presentations, and collaborative editing."
        },
        {
            title: "Secure & Encrypted",
            description: "Rest easy knowing your data and conversations are protected with end-to-end encryption and advanced security measures."
        }
    ];

    return (
        <section className="bg-black p-10 text-center rounded-lg m-5 shadow-2xl">
            <h2 className="text-5xl font-extrabold text-green-500 mb-12 uppercase tracking-wider">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800"
                    >
                        <span className="bg-green-500 text-black rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4">
                            {index + 1}
                        </span>
                        <h3 className="text-2xl font-semibold text-green-400 mb-2">{feature.title}</h3>
                        <p className="text-lg text-gray-400 leading-relaxed text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
