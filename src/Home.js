import React from 'react'
import ProfImg from './profile-pic (2).png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faDumbbell, faFootball, faMusic, faSoccerBall } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const desc="Hey there, I'm Yash, and I'm no newbie in the tech world (but it always feels like so). I've been playing around with software development for over four years, and it's been quite the rollercoaster. My journey began with an unquenchable curiosity, and now it's more like an obsession to create cool stuff that actually matters. I've had my fair share of adventures, exploring the latest tech, obsessing over writing clean code, and the pure joy of turning ideas into working software. I'm not just a one-trick pony either; I'm good with both the front-end and back-end stuff. I love making things work smoothly for users and building rock-solid systems. So, yeah, I'm your friendly neighborhood developer with some tricks up my sleeve."

  return (
    <>
      <section id='tabContent'>
        <br/>
        <div className='container'>
          <div className='row flex-row-reverse'>
            <div className='col-md-9'>
              <h5>{desc}</h5>
            </div>
            <div className='col-md-3'>
              <div className='img-profile'>
                  <img className='profile-pic' src={ProfImg}/>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className='container'>
          <h4>Stats</h4>
          <div className='row'>
            <div className='col-md-3'>
              <h6>Professional experience</h6>
              <p className='hero-stat'>4+ years</p>
            </div>
            <div className='col-md-3'>
              <h6>Projects developed</h6>
              <p className='hero-stat'>10+</p>
            </div>
            <div className='col-md-3'>
              <h6>Languages worked with</h6>
              <p className='hero-stat'>5+</p>
            </div>
            <div className='col-md-3'>
              <h6>Frameworks worked with</h6>
              <p className='hero-stat'>10+</p>
            </div>
          </div>
        </div>
        <br/>
        <div className='container'>
          <h4>Interests</h4>
          <div className='row'>
            <div className='col-md-3'>
              <h6>Working out</h6>
              <p className='hero-stat'><FontAwesomeIcon icon={faDumbbell}/></p>
            </div>
            <div className='col-md-3'>
              <h6>Movies</h6>
              <p className='hero-stat'>Murder mystery</p>
            </div>
            <div className='col-md-3'>
              <h6>Music</h6>
              <p className='hero-stat'>EDM</p>
            </div>
            <div className='col-md-3'>
              <h6>Football</h6>
              <p className='hero-stat'><FontAwesomeIcon icon={faSoccerBall}/></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;