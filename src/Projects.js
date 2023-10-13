import React from "react";

export const Projects = () => {
  return (
    <section id="projects">
      <div class="container">
        <div className="row">
        <div class="col-md-3">
            <div class="card project">
              <div class="card-body">
                <h5 class="card-title"><a target="_blank" href="https://automatio.vercel.app">Automatio</a></h5>
                <p class="card-text">
                  Website for a home automation agency
                </p>
                <span class="badge rounded-pill text-bg-light">React</span>
                <span class="badge rounded-pill text-bg-light">JavaScript</span>
                <span class="badge rounded-pill text-bg-light">Bootstrap</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card project">
              <div class="card-body">
                <h5 class="card-title"><a target="_blank" href="https://chat-gpt-react.netlify.app">ChatGPT Clone</a></h5>
                <p class="card-text">
                  Simple ChatGPT clone
                </p>
                <span class="badge rounded-pill text-bg-light">React</span>
                <span class="badge rounded-pill text-bg-light">TypeScript</span>
                <span class="badge rounded-pill text-bg-light">OpenAI</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card project">
              <div class="card-body">
                <h5 class="card-title">Report it!</h5>
                <p class="card-text">
                  Fake news reporting &amp; identification system
                </p>
                <span class="badge rounded-pill text-bg-light">Java</span>
                <span class="badge rounded-pill text-bg-light">Android</span>
                <span class="badge rounded-pill text-bg-light">MongoDB</span>
                <span class="badge rounded-pill text-bg-light">Nodejs</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card project">
              <div class="card-body">
                <h5 class="card-title">Resourcify</h5>
                <p class="card-text">
                  Daily Inward/Outward Transaction Report System
                </p>
                <span class="badge rounded-pill text-bg-light">Java</span>
                <span class="badge rounded-pill text-bg-light">Android</span>
                <span class="badge rounded-pill text-bg-light">PHP</span>
                <span class="badge rounded-pill text-bg-light">MySQL</span>
              </div>
            </div>
          </div>
          
          
        </div>
        <br />
        <div class="row">
        <div class="col-md-3 ">
            <div class="card project">
              <div class="card-body">
                <h5 class="card-title">GIC</h5>
                <p class="card-text">Official app of GTU innovation council</p>
                <span class="badge rounded-pill text-bg-light">Java</span>
                <span class="badge rounded-pill text-bg-light">Android</span>
                <span class="badge rounded-pill text-bg-light">PHP</span>
                <span class="badge rounded-pill text-bg-light">MySQL</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 ">
            <div class="card project">
              <div class="card-body">
                <h5 class="card-title">Invoice generator</h5>
                <p class="card-text">
                  Simple form data into PDF invoice generator
                </p>
                <span class="badge rounded-pill text-bg-light">HTML5</span>
                <span class="badge rounded-pill text-bg-light">CSS3</span>
                <span class="badge rounded-pill text-bg-light">Bootstrap</span>
                <span class="badge rounded-pill text-bg-light">JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
