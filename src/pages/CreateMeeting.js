import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);

const CreateMeeting = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [meetingDetails, setMeetingDetails] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to create a meeting.');
      return;
    }

    const meetingId = uuidv4();
    const link = `https://genzconnectt.app/room/${meetingId}`;

    // Store details in Firebase
    await setDoc(doc(collection(db, 'meetings'), meetingId), {
      name,
      username,
      email,
      meetingDetails,
      meetingLink: link,
      createdAt: serverTimestamp(),
      userId: user.uid
    });

    setMeetingLink(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create Meeting Room</h1>
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="meetingDetails" className="block text-sm font-medium mb-2">Meeting Details</label>
              <textarea
                id="meetingDetails"
                value={meetingDetails}
                onChange={(e) => setMeetingDetails(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 focus:outline-none"
            >
              Create Meeting
            </button>
          </form>
        ) : (
          <p className="text-center">Please log in to create a meeting.</p>
        )}
        {meetingLink && (
          <div className="mt-6 p-4 bg-gray-700 rounded">
            <h2 className="text-lg font-semibold">Meeting Link</h2>
            <p className="text-green-500">{meetingLink}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMeeting;