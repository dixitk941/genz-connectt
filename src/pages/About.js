import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">About GenZ Connect</h1>
      <p className="text-lg mb-4 max-w-2xl text-center">
        Welcome to GenZ Connect, the ultimate platform for connecting with like-minded individuals. Our mission is to create a space where you can share ideas, collaborate on projects, and build meaningful relationships.
      </p>
      <p className="text-lg mb-4 max-w-2xl text-center">
        At GenZ Connect, we believe in the power of community and the importance of staying connected in today's fast-paced world. Whether you're looking to network with professionals, find a study group, or just make new friends, we've got you covered.
      </p>
      <p className="text-lg mb-4 max-w-2xl text-center">
        Join us and be a part of a vibrant community that values creativity, innovation, and collaboration. Let's connect, learn, and grow together!
      </p>
      <footer className="mt-8 text-center">
        <p>© 2023 GenZ Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;