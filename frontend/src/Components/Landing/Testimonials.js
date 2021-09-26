import React from "react";

const Testimonials = () => {
  return (
    <>
      {" "}
      <section class="colored-section" id="testimonials">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="false"
        >
          <div class="carousel-inner">
            <div class="carousel-item active container-fluid">
              <h2 class="testimonial-text">
                "Since we started using tasq in our company, my team's
                productivity is off the charts!"
              </h2>
              <img
                class="testimonial-image"
                src="images/prash.png"
                alt="man-profile"
              />
              <em>Prashant, India</em>
            </div>
            <div class="carousel-item container-fluid">
              <h2 class="testimonial-text">
                "Best productivity app out there. With tasq I never miss any
                deadlines!"
              </h2>
              <img
                class="testimonial-image"
                src="images/pran.png"
                alt="man-profile"
              />
              <em>Pranish, Australia</em>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
