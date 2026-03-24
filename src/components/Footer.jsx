import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Reducing Littering in Rouse Hill</h3>
            <p>A school project dedicated to improving our local environment through awareness and community action.</p>
            <div className="social-links">
              <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/issue">The Issue</Link></li>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/help">How You Can Help</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Take Action</h3>
            <ul className="footer-links">
              <li><Link to="/help#pledge">Take the Pledge</Link></li>
              <li><Link to="/help#feedback">Give Feedback</Link></li>
              <li><Link to="/about#contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Reducing Littering in Rouse Hill. A School UX Project.</p>
        </div>
      </div>
    </footer>
  )
}
