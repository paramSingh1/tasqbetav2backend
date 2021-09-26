import React from "react";

const Title = () => {
  return (
    <>
      <div class="row">
        <div class="col-lg-6">
          <h1 class="big-heading">Check Tasks Off Everyday.</h1>
          <a href="../user/signup.html">
            <button class="btn btn-lg btn-dark download-button" type="button">
              Create Free Account
            </button>
          </a>
          <a href="../user/login.html">
            <button
              class="btn btn-lg btn-outline-light download-button"
              type="button"
            >
              Sign in
            </button>
          </a>
        </div>
        <div class="title-image-div col-lg-6">
          <img class="title-image" src="images/landing.svg" alt="todo" />
        </div>
      </div>
    </>
  );
};

export default Title;
