import Showroom from "./components/Showroom";
import "./App.css";

function App() {
  return (
    <main className="app">
      <div className="title">
        <h1>AURA Drive</h1>
        <p>Interactive HID Showroom</p>
      </div>

      <Showroom />
    </main>
  );
}

export default App;