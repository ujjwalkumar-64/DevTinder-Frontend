import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/constant";

const CallHistory = () => {
    const [callHistory, setCallHistory] = useState([]);

    useEffect(() => {
        const fetchCallHistory = async () => {
            try {
                const res = await axios.get(`${BaseUrl}/call/history`, { withCredentials: true });
                setCallHistory(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCallHistory();
    }, []);

    return (
        callHistory.length==0 ?(
            <div className='text-center m-4 text-xl'>No call history found.</div>
        )
        :
        <div className="call-history-container">
            <h1 className="text-2xl font-bold m-4 text-center">Call History</h1>
            <ul>
                {callHistory.map((call) => (
                    <li key={call._id} className="call-item">
                        <p>
                            <strong>Caller:</strong> {call.callerId.firstName} {call.callerId.lastName}
                        </p>
                        <p>
                            <strong>Receiver:</strong> {call.receiverId.firstName} {call.receiverId.lastName}
                        </p>
                        <p>
                            <strong>Start Time:</strong> {new Date(call.startTime).toLocaleString()}
                        </p>
                        <p>
                            <strong>End Time:</strong> {call.endTime ? new Date(call.endTime).toLocaleString() : "Ongoing"}
                        </p>
                        <p>
                            <strong>Status:</strong> {call.status}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CallHistory;