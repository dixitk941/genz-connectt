import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import BurgerMenu from '../components/BurgerMenu';
import VideoConference from '../components/VideoConference';
import ChatBox from '../components/ChatBox';

const Room = () => {
  const { meetingId } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          if (!meetingId) {
            console.error('meetingId is undefined');
            setIsAuthorized(false);
            return;
          }

          console.log('meetingId:', meetingId);

          const meetingDocRef = doc(db, 'meetings', meetingId);
          const meetingDoc = await getDoc(meetingDocRef);

          if (meetingDoc.exists()) {
            console.log('Meeting document data:', meetingDoc.data());
            if (meetingDoc.data().meetingLink === `https://genzconnectt.vercel.app/room/${meetingId}`) {
              setIsAuthorized(true);
            } else {
              console.error('Meeting link does not match');
              setIsAuthorized(false);
            }
          } else {
            console.error('Meeting document does not exist');
            setIsAuthorized(false);
          }
        } catch (error) {
          console.error('Error fetching meeting document:', error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
    });

    return () => unsubscribe();
  }, [meetingId]);

  if (!isAuthorized) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      <BurgerMenu />
      <main className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex flex-col space-y-4">
          <VideoConference user={user} />
          <ChatBox user={user} />
        </div>
      </main>
    </div>
  );
};

export default Room;