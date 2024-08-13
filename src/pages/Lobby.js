import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// Initialize Firebase (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyB0AfFZBR-BJZPSNsp11jBkhy7d3TV7rEM",
    authDomain: "notesapp-dixitk941.firebaseapp.com",
    projectId: "notesapp-dixitk941",
    storageBucket: "notesapp-dixitk941.appspot.com",
    messagingSenderId: "702011833511",
    appId: "1:702011833511:web:e1b4a6feffeb1a37736f82",
    measurementId: "G-P6R1JZNXHS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Lobby = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleJoinMeeting = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const q = query(collection(db, 'meetings'), where('meetingLink', '==', meetingLink));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Invalid meeting link. Please check and try again.');
        return;
      }

      // Proceed to join the meeting room
      console.log('Joining meeting with link:', meetingLink, 'and username:', username);
      // Redirect to the meeting room or perform other actions as needed
    } catch (err) {
      console.error('Error verifying meeting link:', err);
      setError('An error occurred while verifying the meeting link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Join Meeting Room</h1>
        <form onSubmit={handleJoinMeeting}>
          <div className="mb-4">
            <label htmlFor="meetingLink" className="block text-sm font-medium mb-2">Meeting Link</label>
            <input
              type="text"
              id="meetingLink"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-green-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 focus:outline-none"
          >
            Join Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;