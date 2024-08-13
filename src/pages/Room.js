// src/pages/Room.js
import React from 'react';
import Header from '../components/Header';
import VideoConference from '../components/VideoConference';
import UserList from '../components/UserList';
import ChatBox from '../components/ChatBox';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <Header />
      <main className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex flex-col space-y-4">
          <VideoConference />
          <ChatBox />
        </div>
        <UserList className="flex-none w-full md:w-1/4 bg-white bg-opacity-20 rounded-lg p-4" />
      </main>
    </div>
  );
};

export default HomePage;