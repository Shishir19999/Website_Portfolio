import React from "react";
import skills from "./data/skills.json";

const Skills = () => {
  return (
    <>
      <div className="container">
        <h1>SKILLS</h1>
      </div>
      <br />
      <div className="container skills" id="skills">
        <div className="items">
          {skills.map((data, index) => (
            <div
              className="item"
              key={index}
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              <img src={`assets/${data.imageSrc}`} alt="" />
              <h3>{data.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
