import React from "react";
import Navbar from "../../components/Navbar";
import Intro from "./Intro";
import About from "./About";
import Experiences from "./experiences";
import Projects from "./projects";
import Courses from "./courses";
import Contact from "./contact";
import Footer from "./footer";
import Education from "./education";
import Login from "../Admin/login";
//import LeftSider from './leftsider';

const Index = () => (
  <div className="bg-background sm:px-5">
    <Navbar />
    <section id="intro">
      <Intro />
    </section>
    <section id="about">
      <About />
    </section>
    <section id="education" >
      <Education />
    </section>

    <section id="experiences">
      <Experiences />
    </section>
    <section id="projects">
      <Projects />
    </section>
    <section id="courses">
      <Courses />
    </section>
    <section id="contact">
      <Contact />
    </section>
    <Footer />
    
    
  </div>
);

export default Index;
