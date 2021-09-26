import React from "react";

const Features = () => {
  return (
    <>
      {" "}
      <section class="white-section" id="features">
        <div class="container-fluid">
          <div class="row">
            <div class="feature-box col-lg-4">
              <i
                class="icon fas fa-heart fa-4x"
                style={{ color: "#ff616d" }}
              ></i>
              <h3 class="feature-title">Easy to use.</h3>
              <p>So user friendly even your grandma could do it.</p>
            </div>
            <div class="feature-box col-lg-4">
              <i
                class="icon fas fa-bullseye fa-4x"
                style={{ color: "#ffa900" }}
              ></i>
              <h3 class="feature-title">Never miss a deadline.</h3>
              <p>
                Get notified by SMS or Email of important tasks and when it's
                due.
              </p>
            </div>
            <div class="feature-box col-lg-4">
              <i
                class="icon fas fa-check-circle fa-4x"
                style={{ color: "#b6c867" }}
              ></i>
              <h3 class="feature-title">Make your life easier.</h3>
              <p>Never worry about missing a deadline.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
