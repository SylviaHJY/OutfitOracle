import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doFeedback } from "../firebase/FirebaseFunctions";

import "./Feedback.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await doFeedback(feedback);
    setFeedback("");
    alert("Thank you for your feedback!");
  };

  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToFAQ = () => {
    navigate("/faq");
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-text">
          <span>Wardrobe Wizard</span>
        </div>
        <div className="header-label">
          <span>Slay Every Day</span>
        </div>
      </header>
      <div className="feedback">
        <h2>User Feedback</h2>
        <p>
          This page is an opportunity for you to help us change our app for the
          better. <br></br>
          <br></br>
          Wardrobe Wizard is in its early stages and we'd love your input on
          anything that could improve your experience! <br></br>
        </p>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="inputBox">
            <label htmlFor="feedback">Please Enter Feedback Here:</label>
            <textarea
              id="feedback"
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={6}
              cols={50}
              required
            ></textarea>
          </div>
          <div className="inputBox">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
      <footer className="footer">
        <button className="goHome" onClick={redirectToHome}>
          Return To Homepage
        </button>

        <button className="needFAQ" onClick={redirectToFAQ}>
          Frequently Asked Questions
        </button>
      </footer>
    </div>
  );
};

export default Feedback;
