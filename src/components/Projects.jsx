import React from "react";
import project from "./data/projects.json";

const Projects = () => {
  return (
    <>
      <div className="container projects my-3" id="projects">
        <h1>PROJECTS</h1>
        <br />

        <div className="row d-flex justify-content-center align-content-center">
          {project.map((data, index) => (
            <div
              key={index} // Using index as the key
              className="my-4 col-sm-6 col-md-4 col-lg-3 mx-4"
            >
              <div
                className="card bg-dark text-light"
                style={{
                  width: "18rem",
                  border: " 1px solid rgb(20, 20, 14)",
                  boxShadow: "5px 5px 10px 10px rgba(141, 146, 127, 0.5)",
                }}
                data-aos="flip-right"
                data-aos-duration="1000"
              >
                <div className="img d-flex justify-content-center align-content-center p-3">
                  <img
                    src={data.imageSrc}
                    className="card-img-top"
                    alt="..."
                    style={{
                      width: "250px",
                      height: "200px",
                      border: " 1px solid rgb(20, 20, 14)",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text">{data.description}</p>
                  <a href={data.source} className="btn btn-warning">
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
