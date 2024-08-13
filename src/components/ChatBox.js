import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig'; // Ensure you have this import

const ChatBox = ({ user }) => {
  const { meetingId } = useParams(); // Get meetingId from URL parameters
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'meetings', meetingId, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [meetingId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, 'meetings', meetingId, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        userId: user.uid,
        username: user.displayName
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className="message">
            <strong>{message.username}</strong>: {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;