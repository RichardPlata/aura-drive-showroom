import { useState } from "react";
import {
  FiPhone,
  FiMessageCircle,
  FiUser,
  FiBluetooth,
  FiPhoneCall,
  FiPhoneOff,
  FiMic,
  FiVolume2,
} from "react-icons/fi";

const contacts = [
  { name: "Mom", type: "Mobile" },
  { name: "Home", type: "Saved place" },
  { name: "Sister", type: "Mobile" },
  { name: "Father", type: "Mobile" },
];

export default function PhoneScreen() {
  const [callState, setCallState] = useState("incoming");

  return (
    <section className="phone-premium-screen">
      <div className="phone-premium-header">
        <div>
          <span>Phone</span>
          <h2>Ricardo</h2>
       <p>
      {callState === "active"
        ? "Call in progress · Bluetooth audio"
        : "Bluetooth connected"}
       </p>
       </div>

      <div className="phone-premium-orb">
       <FiBluetooth />
       </div>
      </div>

      <div className="phone-call-card">
        <div className="phone-avatar">
          <FiUser />
        </div>

        <div>
          <small>{callState === "active" ? "Connected" : "Incoming"}</small>
          <strong>Mom</strong>
          <span>{callState === "active" ? "00:42" : "Mobile"}</span>
        </div>

        {callState === "incoming" ? (
          <div className="phone-call-actions">
            <button className="decline" onClick={() => setCallState("missed")}>
              <FiPhoneOff />
            </button>

            <button className="accept" onClick={() => setCallState("active")}>
              <FiPhoneCall />
            </button>
          </div>
        ) : (
          <div className="phone-active-actions">
            <button>
              <FiMic />
            </button>
            <button>
              <FiVolume2 />
            </button>
            <button className="decline" onClick={() => setCallState("incoming")}>
              <FiPhoneOff />
            </button>
          </div>
        )}
      </div>

      <div className="phone-contact-grid">
        {contacts.map((contact) => (
          <button key={contact.name}>
            <FiUser />
            <div>
              <strong>{contact.name}</strong>
              <span>{contact.type}</span>
            </div>
            <FiPhone />
          </button>
        ))}
      </div>

      <div className="phone-message-preview">
        <FiMessageCircle />
        <div>
          <strong>Voice message</strong>
          <span>1 new message · Tap to play when parked</span>
        </div>
      </div>
    </section>
  );
}