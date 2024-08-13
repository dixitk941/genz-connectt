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
      <div className="sidebar">
        <a href="#" onClick={() => console.log('openvideo')} data-toggle="tooltip" data-placement="right" title="Dashboard">
          <i className="fas fa-desktop fa-lg" />
        </a>
        <a href="#" onClick={() => console.log('openboard')} data-toggle="tooltip" data-placement="right" title="White Board">
          <i className="fas fa-file-signature fa-lg" />
        </a>
        <a href="#" onClick={() => console.log('opengit')} data-toggle="tooltip" data-placement="right" title="GitHub">
          <i className="fab fa-github fa-2x" />
        </a>
        <a href="#" onClick={() => console.log('openlab')} data-toggle="tooltip" data-placement="right" title="Virtual Environment">
          <i className="fas fa-laptop-code fa-lg" />
        </a>
        <a href="#" onClick={() => console.log('openchat')} data-toggle="tooltip" data-placement="right" title="Chat">
          <i className="fas fa-comment fa-lg" />
        </a>
        <a href="#" onClick={() => console.log('opensettings')} data-toggle="tooltip" data-placement="right" title="Toggle Controls">
          <i className="fas fa-sliders-h fa-lg" />
        </a>
      </div>
      <div className="footer row" id="setting">
        <div className="col-md-4 my-auto">
          <button disabled id="toggleCamera">
            <i id="toggleCameraIcon" className="fa fa-video-camera" aria-hidden="true" />
          </button>
        </div>
        <div className="col-md-4 my-auto">
          <button disabled id="toggleMic">
            <i id="toggleMicIcon" className="fa fa-microphone" aria-hidden="true" />
          </button>
        </div>
        <div className="col-md-4" style={{ backgroundColor: 'red' }}>
          <button disabled id="hangupBtn">
            <i className="material-icons mdc-button__icon mt-3" aria-hidden="true">call_end</i>
            <span className="mdc-button__label" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;