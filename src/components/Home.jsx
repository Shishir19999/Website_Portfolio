import React, { useEffect, useRef } from "react";
import pdf from "../pdf/Shishir_Sharma_CV.pdf";
import hero from "./data/hero.json";
import Typed from "typed.js";
import AOS from "aos";
import 'aos/dist/aos.css';

const Home = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    AOS.init();

    const options = {
      strings: [
        "Welcome to my profile",
        "My Name is Shishir Sharma",
        "I'm a full stack web developer",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="container home" id="home">
      <div className="left" data-aos="fade-up-right" data-aos-duration="1000">
          <h1 ref={typedRef}></h1>
        <a
          href={pdf}
          download="Shishir_Sharma_CV.pdf"
          className="btn btn-outline-warning my-3"
        >
          Download CV
        </a>
      </div>
      <div className="right">
        <div className="img" data-aos="fade-up-left" data-aos-duration="1000">
          <img src={`./${hero.imgSrc}`} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Home;
