import './App.css';
import logo from './logo.svg';

import Navbar from "./Navbar";
<<<<<<< Updated upstream
import AboutUs from "./AboutUs";
import Contact from './Contact';
import MemberLogin from './Member Login';
import Team from './Team';
=======
import Home from "./Navbar/Home";
import AboutUs from "./Navbar/AboutUs";
import Contact from './Navbar/Contact';
import MemberLogin from './Navbar/MemberLogin';
import Team from './Navbar/Team';
import Profile from './Navbar/Profile';
>>>>>>> Stashed changes

import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <main>
      <div className="App">
        <Navbar />

        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<MemberLogin />} />
            <Route path="/team" element={<Team />} />
          </Routes>
      </BrowserRouter>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      </div>
    </main>
  );
}

export default App;
