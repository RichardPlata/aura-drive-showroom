import { FiPhone, FiMessageCircle, FiUser, FiBluetooth } from "react-icons/fi";

const contacts = ["Home", "Mom", "Sister", "Father"];

export default function PhoneScreen() {
  return (
    <section className="figma-phone-screen">
      <div className="figma-phone-header">
        <div>
          <span>Phone</span>
          <h2>Ricardo Plata</h2>
          <p>Bluetooth connected</p>
        </div>

        <div className="phone-orb">
          <FiBluetooth />
        </div>
      </div>

      <div className="phone-contact-list">
        {contacts.map((contact) => (
          <button key={contact}>
            <FiUser />
            <span>{contact}</span>
            <FiPhone />
          </button>
        ))}
      </div>

      <div className="phone-actions">
        <button className="active"><FiPhone /> Call</button>
        <button><FiUser /> Contacts</button>
        <button><FiMessageCircle /> Messages</button>
      </div>
    </section>
  );
}