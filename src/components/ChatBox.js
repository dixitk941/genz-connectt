// src/components/ChatBox.js
import React, { useState, useRef, useEffect } from 'react';

const ChatBox = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
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

  return (
    <div className="p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="border border-gray-300 p-2 rounded-lg mb-4">
        <video ref={localVideoRef} autoPlay muted className="w-full rounded-lg mb-2" />
        <video ref={remoteVideoRef} autoPlay className="w-full rounded-lg" />
      </div>
      <input type="text" className="mt-2 w-full p-2 border border-gray-300 rounded-lg" placeholder="Type a message..." />
    </div>
  );
};

export default ChatBox;