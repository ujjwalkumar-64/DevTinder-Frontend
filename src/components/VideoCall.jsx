import React, { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoCall = () => {
    const { targetUserId } = useParams();
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [peerConnection, setPeerConnection] = useState(null);
    const [socket, setSocket] = useState(null);
    let isOfferSet = false;
       const user= useSelector(store=>store.user)
  const userId= user?._id;
    useEffect(() => {
        const socket = createSocketConnection();
        setSocket(socket);

        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("signalData", {
                    userId,targetUserId,
                    signalData: event.candidate,
                });
            }
        };

        // Handle remote track
        pc.ontrack = (event) => {
            console.log("Remote track received:", event.streams[0]);
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        setPeerConnection(pc);

        socket.on("signalDataReceived", async (signalData) => {
            try {
                if (signalData.type === "offer" && pc.signalingState === "have-local-offer" && !isOfferSet) {
                    console.log("Processing offer:", signalData);
                    await pc.setRemoteDescription(new RTCSessionDescription(signalData));
                    isOfferSet = true;

                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    socket.emit("signalData", {
                       userId,targetUserId,
                        signalData: answer,
                    });
                } else if (signalData.type === "answer" && pc.signalingState === "have-remote-offer") {
                    console.log("Processing answer:", signalData);
                    await pc.setRemoteDescription(new RTCSessionDescription(signalData));
                } else if (signalData.candidate) {
                    console.log("Processing ICE candidate:", signalData);
                    await pc.addIceCandidate(new RTCIceCandidate(signalData));
                }
            } catch (error) {
                console.error("Error handling signaling data:", error);
            }
        });

        // Get local media stream
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                // If the connection is closed, create a new one
                if (pc.signalingState === "closed") {
                    console.warn("PeerConnection was closed, creating a new one for tracks.");
                    const newPc = new RTCPeerConnection({
                        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                    });
                    setPeerConnection(newPc);
                    stream.getTracks().forEach((track) => newPc.addTrack(track, stream));
                } else {
                    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
                }
            })
            .catch((error) => {
                console.error("Error accessing media devices:", error);
            });

        // Join the room
        socket.emit("joinRoom",{firstName:user?.firstName,userId,targetUserId})

        return () => {
            if (pc) {
                pc.close();
            }
            if (socket) {
                socket.disconnect();
            }
        };
    }, [userId,targetUserId]);

    const startCall = async () => {
                if (peerConnection.signalingState === "closed") {
            console.warn("PeerConnection is closed; recreating...");
            const newPeerConnection = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            });
            setPeerConnection(newPeerConnection);
        }
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit("signalData", {
           userId,targetUserId,
            signalData: offer,
        });
    };

    return (
        <div className="video-call-container">
            <video ref={localVideoRef} autoPlay playsInline muted className="local-video" />
            <video ref={remoteVideoRef} autoPlay playsInline className="remote-video" />
            <button onClick={startCall} className="btn btn-primary">
                Start Call
            </button>
        </div>
    );
};

export default VideoCall;