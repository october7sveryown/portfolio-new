import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home.js";
import Experience from "./Experience.js";
import Skills from "./Skills.js";
import { Projects } from "./Projects.js";
import ChatwithResume from "./ChatwithResume.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  return (
    <div className="jumbotron">
      <h3 className="display-3">Yash Thaker</h3>
      <h5 className="subtitle">Software Developer</h5>
        
      <div className="container">
        <nav className="sticky-top">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              href="#nav-home"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
            Home
            </a>
            {/* <a
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              href="#nav-profile"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Experience
            </a> */}
            <a
              className="nav-link"
              id="nav-project-tab"
              data-bs-toggle="tab"
              href="#nav-project"
              role="tab"
              aria-controls="nav-project"
              aria-selected="false"
            >
              Projects
            </a>
            <a
              className="nav-link"
              id="nav-skills-tab"
              data-bs-toggle="tab"
              href="#nav-skills"
              role="tab"
              aria-controls="nav-skills"
              aria-selected="false"
            >
              Skills
            </a>
            <a
              className="nav-link blink_me"
              href="https://chat-with-resume-app.streamlit.app/"
              role="tab"
              aria-controls="nav-chat"
              aria-selected="false"
            >
              Chat with Resume
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <Home />
          </div>
          {/* <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <Experience/>
          </div> */}
          <div
            className="tab-pane fade"
            id="nav-project"
            role="tabpanel"
            aria-labelledby="nav-project-tab"
          >
            <Projects/>
          </div>
          <div
            className="tab-pane fade"
            id="nav-skills"
            role="tabpanel"
            aria-labelledby="nav-skills-tab"
          >
            <Skills/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
