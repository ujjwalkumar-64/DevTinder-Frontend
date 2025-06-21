import React, { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const VideoCall = () => {
  const { targetUserId } = useParams();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnectionRef = useRef(null);
  const streamRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Draggable local video state
  const [dragPos, setDragPos] = useState({ x: 16, y: 16 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef();

  // --- WebRTC and socket setup ---
  useEffect(() => {
    const socket = createSocketConnection();
    setSocket(socket);

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerConnectionRef.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signalData", {
          userId,
          targetUserId,
          signalData: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    socket.emit("joinRoom", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("signalDataReceived", async ({ signalData, senderId }) => {
      if (!peerConnectionRef.current) return;
      if (senderId === userId) return;
      try {
        if (signalData.type === "offer") {
          await pc.setRemoteDescription(new window.RTCSessionDescription(signalData));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("signalData", {
            userId,
            targetUserId,
            signalData: answer,
          });
          setCallStarted(true);
        } else if (signalData.type === "answer") {
          await pc.setRemoteDescription(new window.RTCSessionDescription(signalData));
          setCallStarted(true);
        } else if (signalData.candidate) {
          await pc.addIceCandidate(new window.RTCIceCandidate(signalData));
        }
      } catch (err) {
        alert("Failed to process signaling data");
        console.error("Signaling error:", err);
      }
    });

    socket.on("callEnded", () => {
      setCallEnded(true);
      setCallStarted(false);
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      })
      .catch(() => {
        alert("Camera/mic access denied.");
      });

    return () => {
      if (peerConnectionRef.current) peerConnectionRef.current.close();
      if (socket) socket.disconnect();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line
  }, [userId, targetUserId]);

  const startCall = async () => {
    setConnecting(true);
    const pc = peerConnectionRef.current;
    if (!pc) return;
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("signalData", {
        userId,
        targetUserId,
        signalData: offer,
      });
      setConnecting(false);
    } catch (err) {
      alert("Could not start call.");
      setConnecting(false);
    }
  };

  const handleEndCall = () => {
    setCallEnded(true);
    setCallStarted(false);
    if (peerConnectionRef.current) peerConnectionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
    socket.emit("endCall", { userId, targetUserId });
  };

  // --- Draggable logic ---
  // Mouse
  const onMouseDown = (e) => {
    setDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left - dragPos.x,
      y: e.clientY - rect.top - dragPos.y,
    };
    document.body.style.userSelect = "none";
  };
  // Touch
  const onTouchStart = (e) => {
    setDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    dragOffset.current = {
      x: touch.clientX - rect.left - dragPos.x,
      y: touch.clientY - rect.top - dragPos.y,
    };
    document.body.style.userSelect = "none";
  };

  // Mouse move
  const onMouseMove = (e) => {
    if (!dragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left - dragOffset.current.x;
    let y = e.clientY - rect.top - dragOffset.current.y;
    // Clamp within container
    x = clamp(x, 0, rect.width - 128); // 128px default width
    y = clamp(y, 0, rect.height - 80); // 80px default height
    setDragPos({ x, y });
  };
  // Touch move
  const onTouchMove = (e) => {
    if (!dragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    let x = touch.clientX - rect.left - dragOffset.current.x;
    let y = touch.clientY - rect.top - dragOffset.current.y;
    x = clamp(x, 0, rect.width - 128);
    y = clamp(y, 0, rect.height - 80);
    setDragPos({ x, y });
  };

  const stopDrag = () => {
    setDragging(false);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", stopDrag);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDrag);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
    // eslint-disable-next-line
  }, [dragging]);

  // Responsive local video size
  const localVideoWidth = "w-32 sm:w-40 md:w-48"; // 128px, 160px, 192px
  const localVideoHeight = "h-20 sm:h-28 md:h-32"; // 80px, 112px, 128px

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-50 to-cyan-900 px-2">
      <div
        className="relative w-full max-w-3xl aspect-video bg-slate-800 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden"
        ref={containerRef}
      >
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-black rounded-2xl"
        />
        {/* Draggable Local Video */}
        <div
          className={`absolute cursor-move z-10`}
          style={{
            left: dragPos.x,
            top: dragPos.y,
            touchAction: "none"
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`${localVideoWidth} ${localVideoHeight} object-cover border-4 border-indigo-400 rounded-xl shadow-lg bg-black`}
            style={{
              pointerEvents: "none", // Let the parent div handle dragging/touch
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
        {callEnded && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-red-600 bg-opacity-80 text-white px-7 sm:px-12 py-2 sm:py-3 rounded-2xl text-base sm:text-xl font-semibold shadow-lg">
            Call Ended
          </div>
        )}
      </div>
      {/* Controls always below video */}
      <div className="w-full flex justify-center mt-5">
        {!callStarted && !callEnded && (
          <button
            onClick={startCall}
            className="px-7 py-2 sm:px-10 sm:py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-full shadow-lg text-base sm:text-lg transition disabled:opacity-60"
            disabled={connecting}
          >
            {connecting ? "Connecting..." : "Start Call"}
          </button>
        )}
        {callStarted && !callEnded && (
          <button
            onClick={handleEndCall}
            className="px-7 py-2 sm:px-10 sm:py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg text-base sm:text-lg transition"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;