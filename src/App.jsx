import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './NavMenu';
import ItemDetail from './ItemDetail';
import AdminPanel from './AdminPanel';
import { useState } from 'react';
import './App.css';

function App() {
  const [navVisible, setNavVisible] = useState(true);

  return (
    <div className="appcontainer">
      <Router>
        <button className="navbutton" onClick={() => setNavVisible(!navVisible)}>
          ☰
        </button>
        <div className={`sidebar ${!navVisible ? 'hidden' : ''}`}>
          <NavMenu />
        </div>
        <div className="main">
          <Routes>
            <Route path="/" element={
              <div className="home">
                <div className="header">
                  <h1>SCP FOUNDATION</h1>
                  <h2>SECURE, CONTAIN, PROTECT</h2>
                </div>
                <br></br>
                <div className="dots">
                  <p>.................................................................................</p>
                </div>
                <br></br>
                <div className="classified">
                  <p>THE FOLLOWING FILES HAVE BEEN CLASSIFIED</p>
                  <div className="ts">TOP SECRET</div>
                  <p>BY ORDER OF THE EZYKIEL "ONLY" WAIBA</p>
                </div>

                <div className="warning">
                  <h2>WARNING:</h2>
                  <p>ANY NON-AUTHORIZED PERSONNEL ACCESSING THESE FILES WILL BE IMMEDIATELY TERMINATED THROUGH DEVILISH HOLY MONK KILL AGENT.</p>
                  <p>ACCESSING WITHOUT PROPER MEMETIC INOCULATION WILL RESULT IN IMMEDIATE CARDIAC ARREST FOLLOWED BY DEATH.</p>
                  <div className="finalwarning">YOU HAVE BEEN WARNED.</div>
                </div>
              </div>
            } />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
