import React from "react";
import "../CSS/Landing.css";
import {
  Features,
  Footer,
  Navbar,
  Press,
  Pricing,
  Testimonials,
  Title,
} from "../Components/Landing";
const Landing = () => {
  return (
    <div>
      <section class="colored-section" id="title">
        <div class="container-fluid">
          <Navbar />
          {/* <!-- Nav Bar --> */}
          <Title />
          {/* <!-- Title --> */}
        </div>
      </section>

      {/* <!-- Features --> */}
      <Features />
      {/* <!-- Testimonials --> */}
      <Testimonials />
      {/* <!-- Press --> */}
      <Press />
      {/* <!-- Pricing --> */}
      <Pricing />
      {/* <!-- Footer --> */}
      <Footer />
    </div>
  );
};

export default Landing;
