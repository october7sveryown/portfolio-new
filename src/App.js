import './App.css';
import HeroSection from './HeroSection.js';
import Home from './Home.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeroSection />
      </header>
      <body>
        
      </body>
      <footer>
        <div className='container app-footer'>
        <br/>
          <h5>Find me here</h5>
        <div className='row'>
        <div className='col-md-12'>
          <p><a href="https://instagram.com/october7sveryown"><FontAwesomeIcon icon={faInstagram} /></a></p>
          <p><a href="https://twitter.com/itsyash777"><FontAwesomeIcon icon={faXTwitter} /></a></p>
          <p><a href="https://github.com/october7sveryown"><FontAwesomeIcon icon={faGithub} /></a></p>
          <p><a href="https://linkedin.com/in/yash-thaker"><FontAwesomeIcon icon={faLinkedin} /></a></p>
        </div>
        </div>
        </div>
      </footer>
    </div>
    
  );
}

export default App;
