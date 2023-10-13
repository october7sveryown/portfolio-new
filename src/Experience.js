import React from "react";
import { faBriefcase, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Experience = () => {

  const jobRes = [
    'Engaged in the end-to-end development of two web applications, overseeing their entire lifecycle from conceptualization to deployment',
'Spearheaded the creation of highly adaptable and responsive front-end components utilizing the Angular framework, optimizing user experiences across various devices and screen sizes.',
'Utilized Spring Boot, a Java-based framework, to architect and engineer RESTful APIs, effectively handling data communication and integration between the front-end and back-end components of the applications.',
'Assumed responsibility for the design and management of the application databases, ensuring optimal data organization, retrieval, and security measures were in place to uphold data integrity and privacy standards',
'Diligently met project timelines by consistently delivering new features and promptly resolving identified issues and bugs, guaranteeing smooth and uninterrupted application operation'
  ]

  const job2Res=[
    'Took responsibility of complete front-end development of an enterprise application',
    'Created 20+ angular components & developed whole UI of the application',
    'Developed services to handle CRUD operations with API calls',
    'Used Observables & RxJS for seamless interaction between angular components',
    'Performed unit testing & fixed bugs on stipulated timeline'
  ]

  return (
    <section classNameName="Experience">
      <div classNameName="container">
        <div className="accordion accordion-flush" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Software Developer (Sr. Executive - Technology)
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="row">
                  <div className="col-md-3">
                    <h6><FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>&nbsp;Multi Commodity Exchange of India Ltd.</h6>
                  </div>
                  <div className="col-md-3">
                    <h6><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>&nbsp;June 2020 - August 2023</h6>
                  </div>
                </div>
                <ul>
                  {jobRes.map((res)=>{
                    return <li>{res}</li>
                  })}
                </ul>
                <div className="col-md-12">
                <span class="badge rounded-pill text-bg-light">Java</span>
                <span class="badge rounded-pill text-bg-light">Javascript</span>
                <span class="badge rounded-pill text-bg-light">Angular</span>
                <span class="badge rounded-pill text-bg-light">MySQL</span>
                <span class="badge rounded-pill text-bg-light">Spring Boot</span>
                <span class="badge rounded-pill text-bg-light">nginx</span>
                <span class="badge rounded-pill text-bg-light">Bitbucket</span>
                <span class="badge rounded-pill text-bg-light">Jira</span>
                <span class="badge rounded-pill text-bg-light">Confluence</span>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Software Developer (Management Trainee - Technology)
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="row">
                  <div className="col-md-3">
                    <h6><FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>&nbsp;Multi Commodity Exchange of India Ltd.</h6>
                  </div>
                  <div className="col-md-3">
                    <h6><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>&nbsp;June 2019 - May 2020</h6>
                  </div>
                </div>
                <ul>
                  {job2Res.map((res)=>{
                    return <li>{res}</li>
                  })}
                </ul>
                <div className="col-md-12">
                <span class="badge rounded-pill text-bg-light">HTML5</span>
                <span class="badge rounded-pill text-bg-light">CSS3</span>
                <span class="badge rounded-pill text-bg-light">Javascript</span>
                <span class="badge rounded-pill text-bg-light">Angular</span>
                <span class="badge rounded-pill text-bg-light">Bitbucket</span>
                <span class="badge rounded-pill text-bg-light">Jira</span>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Android Developer (Intern)
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="row">
                  <div className="col-md-3">
                    <h6><FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>&nbsp;Moodcafe</h6>
                  </div>
                  <div className="col-md-3">
                    <h6><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>&nbsp;Dec 2018 - February 2019</h6>
                  </div>
                </div>
                <ul>
                  <li>Contributed in the mobile app development of Moodcafe</li>
                </ul>
                <div className="col-md-12">
                <span class="badge rounded-pill text-bg-light">Java</span>
                <span class="badge rounded-pill text-bg-light">Android Development</span>
                <span class="badge rounded-pill text-bg-light">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
