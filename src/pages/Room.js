import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import VideoConference from '../components/VideoConference';
import UserList from '../components/UserList';
import ChatBox from '../components/ChatBox';

const Room = () => {
  const { meetingId } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const meetingDoc = await getDoc(doc(db, 'meetings', meetingId));
        if (meetingDoc.exists() && meetingDoc.data().link === `https://genzconnectt.vercel.app/room/${meetingId}`) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
    });
  }, [meetingId]);

  if (!isAuthorized) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      <main className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex flex-col space-y-4">
          <VideoConference user={user} />
          <ChatBox user={user} />
        </div>
        <UserList className="flex-none w-full md:w-1/4 bg-green-900 bg-opacity-20 rounded-lg p-4" />
      </main>
    </div>
  );
};

export default Room;