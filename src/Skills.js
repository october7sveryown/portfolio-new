import React from 'react'

const Skills = () => {

  const hLanguages=['Java','JavaScript', 'Python', 'SQL'];
  const hFrameworks=['Angular', 'Spring Boot', 'React', 'Bootstrap', 'Nebular UI', 'Material UI', 'LangChain']

  return (
    <section id="skills">
      <div className="row">
        <div className="col-md-2">
          <div class="card">
            <div class="card-header">Programming languages</div>
            <ul class="list-group list-group-flush">
             { hLanguages.map((l)=>{
                return <li>{l}</li>
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div class="card">
            <div class="card-header">Frameworks/libraries</div>
            <ul class="list-group list-group-flush">
             { hFrameworks.map((l)=>{
                return <li>{l}</li>
              })}
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div class="card">
            <div class="card-header">Database</div>
            <ul class="list-group list-group-flush">
             <li>MySQL</li>
             <li>MongoDB</li>
             <li>PostGreSQL</li>
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div class="card">
            <div class="card-header">Version Control</div>
            <ul class="list-group list-group-flush">
             <li>Github</li>
             <li>Bitbucket</li>
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div class="card">
            <div class="card-header">Project management</div>
            <ul class="list-group list-group-flush">
             <li>Jira</li>
             <li>Confluence</li>
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div class="card">
            <div class="card-header">Key</div>
            <ul class="list-group list-group-flush">
             <li>Web Development</li>
             <li>Mobile App Development</li>
             <li>Project management</li>
             <li>API development</li>
             <li>Communication</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills