import React, { useEffect, useRef, useState } from "react";

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(true);

  useEffect(() => {
    // Get access to the camera and microphone
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        // Set the local video stream to the video element
        localVideoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    // Clean up the media stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraActive(videoTrack.enabled);
      }
    }
  };

  const toggleMicrophone = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicActive(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Video Call</h1>

      <div className="flex space-x-6">
        <div
          className="relative w-[700px] h-[500px] bg-black rounded-lg overflow-hidden cursor-pointer"
          onClick={toggleCamera}
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted={!cameraActive}
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <button
              className={`bg-white text-gray-800 p-2 rounded-full ${
                !cameraActive ? "opacity-50" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling camera when clicking the button
                toggleCamera();
              }}
            >
              🎥
            </button>
            <button
              className={`bg-white text-gray-800 p-2 rounded-full ${
                !micActive ? "opacity-50" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling microphone when clicking the button
                toggleMicrophone();
              }}
            >
              🎙️
            </button>
          </div>
        </div>

        <div className="relative w-[500px] h-[500px] bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-white text-6xl">👤</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
