// src/components/VideoConference.js
import React, { useState, useRef, useEffect } from 'react';

const VideoConference = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const startWebRTC = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(localStream);
        localVideoRef.current.srcObject = localStream;

        const pc = new RTCPeerConnection();
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

        pc.ontrack = event => {
          setRemoteStream(event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        peerConnection.current = pc;
      } catch (error) {
        console.error("Error starting WebRTC: ", error);
      }
    };

    startWebRTC();
  }, []);

  const handleStartCall = async () => {
    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      // Send the offer to the remote peer through your signaling server
    } catch (error) {
      console.error("Error starting call: ", error);
    }
  };

  const handleAnswerCall = async (offer) => {
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      // Send the answer to the remote peer through your signaling server
    } catch (error) {
      console.error("Error answering call: ", error);
    }
  };

  const handleReceiveAnswer = async (answer) => {
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Error receiving answer: ", error);
    }
  };

  const toggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !isCameraOn;
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !isMicOn;
    setIsMicOn(!isMicOn);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-lg">
      <div className="w-full h-96 bg-gray-200 mb-4 rounded-lg overflow-hidden">
        <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-96 bg-gray-200 mb-4 rounded-lg overflow-hidden">
        <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover" />
      </div>
      <div className="flex space-x-4 mb-4">
        <button onClick={toggleCamera} className="bg-blue-500 text-white p-2 rounded-lg">
          {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
        </button>
        <button onClick={toggleMic} className="bg-blue-500 text-white p-2 rounded-lg">
          {isMicOn ? 'Turn Mic Off' : 'Turn Mic On'}
        </button>
      </div>
      <button onClick={handleStartCall} className="bg-green-500 text-white p-2 rounded-lg">Start Call</button>
    </div>
  );
};

export default VideoConference;