import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FAQ.css";

const FAQ = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToFeedback = () => {
    navigate("/feedback");
  };

  return (
    <div className="faq-container">
      <header className="faq-header">
        <div className="faq-header-text">
          <span>Wardrobe Wizard</span>
        </div>
        <div className="faq-header-label">
          <span>Slay Every Day</span>
        </div>
      </header>
      <div className="faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-content">
          <p>
            <span className="faq-question">
              How do I sign up for an account?
            </span>
            <br />
            To register for our service, simply select “register in the upper
            right-hand corner of the home page. This will bring you to our sign
            up page where you can enter your username, email address, and
            desired password. After entering your details and confirming your
            password, submit the form to register for your account.
          </p>
          <p>
            <span className="faq-question">
              How do I add clothing items to my Virtual Closet?
            </span>
            <br />
            To add an item of clothing to your account, you must first have an
            image of that piece of clothing saved to your device. On the home
            page, use the ‘Select Category’ dropdown menu in the middle of the
            screen to choose what type of clothing piece you will be adding.
            Next, click the ‘Choose File’ button and find the image of the piece
            you want to add. Click ‘Confirm Image’ to to remove the background
            and approve the image to add it to your closet page.
          </p>
          <p>
            <span className="faq-question">
              How can I plan outfits for my future outings?
            </span>
            <br />
            On the Closet page, press the Calendar button in the right-hand
            corner. On this page, users can mix and match items that have been
            saved to their closet page to test how new outfits will look and
            plan when they will be utilized.
          </p>
          <p>
            <span className="faq-question">
              How can I view my outfit history?
            </span>
            <br />
            On the Calendar page, you can also view your previously created and
            worn outfits to ensure you are getting the most out of your
            wardrobe!
          </p>
          <p>
            <span className="faq-question">
              How do I reset my password in the event that I forget it?
            </span>
            <br />
            On the Login page, select the ‘Forgot Password?’ button and enter
            the email address associated with your account. You will be sent an
            email with a link. Click the link to change your password.
          </p>
          <p>
            <span className="faq-question">
              Are there any other ways to categorize my clothing items besides
              type?
            </span>
            <br />
            For now our categorization system only uses type, but we are aware
            users may want more options or freeform labeling capability. We are
            considering these features as future additions.
          </p>
          <p>
            <span className="faq-question">
              Is there any way to get in contact with the team to get additional
              help or leave feedback?
            </span>
            <br />
            While you’ve already found the FAQ page, we also have a feedback
            page that allows users to submit constructive criticism. Please use
            this form as an opportunity to share insights with us on how to make
            your experience batter. You can access the feedback page by clicking
            on ‘Provide Feedback’ in the footer of this page and other pages.
          </p>
        </div>
      </div>
      <footer className="faq-footer">
        <button className="faq-goHome" onClick={redirectToHome}>
          Return To Homepage
        </button>

        <button className="faq-giveFeedback" onClick={redirectToFeedback}>
          Provide Feedback
        </button>
      </footer>
    </div>
  );
};

export default FAQ;
