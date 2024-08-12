import React, { useEffect, useRef, useState } from "react";

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);

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
  }, []);

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setCameraActive((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Video Call</h1>

      <div className="flex space-x-6">
        <div
          className="relative w-[500px] h-[500px] bg-black rounded-lg overflow-hidden cursor-pointer"
          onClick={toggleCamera}
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <button
              className={`bg-white text-gray-800 p-2 rounded-full ${
                !cameraActive && "opacity-50"
              }`}
            >
              🎥
            </button>
            <button className="bg-white text-gray-800 p-2 rounded-full">
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
