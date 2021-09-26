import React from "react";

const Pricing = () => {
  return (
    <>
      <section class="white-section" id="pricing">
        <h2 class="section-heading">A Plan to Suit Every Need</h2>
        <p>
          Simple and affordable price plans to make sure you complete every
          task.
        </p>

        <div class="row">
          <div class="pricing-column col-lg-4 col-md-6">
            <div class="card">
              <div class="card-header">
                <h3>Basic</h3>
              </div>
              <div class="card-body">
                <h2 class="price-text">$20 / mo</h2>
                <p>50 SMS Notifications</p>
                <p>50 Email Notifications</p>
                <p>Archive Completed Tasks</p>
                <p class="invisible-text">Invisible text</p>
                <a href="../user/signup.html">
                  <button
                    class="btn btn-lg btn-outline-dark col-12"
                    type="button"
                    style={{ color: "green" }}
                  >
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="pricing-column col-lg-4 col-md-6">
            <div class="card">
              <div class="card-header">
                <h3>Value</h3>
              </div>
              <div class="card-body">
                <h2 class="price-text">$30 / mo</h2>
                <p>100 SMS Notifications</p>
                <p>100 Email Notifications</p>
                <p>Archive Completed Tasks</p>
                <p class="invisible-text">Invisible text</p>
                <a href="../user/signup.html">
                  <button
                    class="btn btn-lg btn-outline-dark col-12"
                    type="button"
                    style={{ color: "green" }}
                  >
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div class="pricing-column col-lg-4">
            <div class="card">
              <div class="card-header">
                <h3>Ultimate</h3>
              </div>
              <div class="card-body">
                <h2 class="price-text">$60 / mo</h2>
                <p>Share Tasks with other Users</p>
                <p>Unlimited SMS Notifications</p>
                <p>Unlimited Email Notifications</p>
                <p>Archive Completed Task</p>
                <a href="../user/signup.html">
                  <button
                    class="btn btn-lg btn-outline-dark col-12"
                    type="button"
                    style={{ color: "green" }}
                  >
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
