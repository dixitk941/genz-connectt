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
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 p-16 text-center rounded-3xl m-5 shadow-2xl transform transition-transform duration-500 hover:scale-105">
            {/* Glowing effect behind the section */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 blur-3xl rounded-3xl z-0"></div>

            {/* Main content container */}
            <div className="relative z-10">
                <h2 className="text-6xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text mb-12 uppercase tracking-widest">
                    Features
                </h2>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col justify-center items-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800 group"
                        >
                            {/* Glowing number badge */}
                            <span className="bg-gradient-to-r from-green-500 to-purple-500 text-black rounded-full h-14 w-14 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg transform transition-transform group-hover:scale-110">
                                {index + 1}
                            </span>
                            
                            {/* Feature Title */}
                            <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                                {feature.title}
                            </h3>

                            {/* Feature Description */}
                            <p className="text-lg text-gray-300 leading-relaxed text-center max-w-xs">
                                {feature.description}
                            </p>

                            {/* Underline animation on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r from-green-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Abstract floating shapes for uniqueness */}
            <div className="absolute top-8 left-8 w-20 h-20 bg-purple-500 rounded-full opacity-40 blur-2xl animate-float-slow"></div>
            <div className="absolute bottom-8 right-16 w-32 h-32 bg-blue-500 rounded-full opacity-40 blur-3xl animate-float-fast"></div>
        </section>
    );
};

export default Features;
