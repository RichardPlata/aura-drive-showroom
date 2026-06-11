import {
  FiMusic,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiBluetooth,
  FiVolume2,
} from "react-icons/fi";

export default function MediaScreen() {
  return (
    <section className="figma-media-screen">
      <div className="figma-media-art">
        <FiMusic />
      </div>

      <div className="figma-media-info">
        <span>Now Playing</span>
        <h2>Night Drive</h2>
        <p>AURA Sound System</p>

        <div className="figma-progress">
          <span />
        </div>

        <div className="figma-media-controls">
          <button><FiSkipBack /></button>
          <button className="active"><FiPause /></button>
          <button><FiSkipForward /></button>
        </div>
      </div>

      <div className="figma-media-side">
        <FiBluetooth />
        <strong>Connected</strong>
        <small>Ricardo's Phone</small>

        <div className="figma-volume">
          <FiVolume2 />
          <span />
        </div>
      </div>
    </section>
  );
}