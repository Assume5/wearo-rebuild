import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col">
        <p className="title">About PICKO</p>
        <p className="footer-link">
          <a href="#">About Us</a>
        </p>
        <p className="footer-link">
          <a href="#">Privacy Statement</a>
        </p>
        <p className="footer-link">
          <a href="#">Terms Of Use</a>
        </p>
      </div>

      <div className="footer-col">
        <p className="title">Service</p>
        <p className="footer-link">
          <Link to="/services/order-status">Order Status</Link>
        </p>
      </div>

      <div className="footer-col">
        <div className="social">
          <p className="title">Social</p>
          <p className="footer-link">
            <a href="#">
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faFacebookSquare} size="2x" />
            </a>
          </p>
          <p className="footer-link">
            <a href="#">
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faTwitter} size="2x" />
            </a>
          </p>
          <p className="footer-link">
            <a href="#">
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faInstagram} size="2x" />
            </a>
          </p>
        </div>
        <br />
        <div className="newsletter">
          <p className="title">Join The Family</p>
          <p>Sign Up For News And Exclusive Deals</p>
          <div className="newsletter-button">
            <input type="email" name="email-address" id="email-address" placeholder="Email" />
            <button>
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
