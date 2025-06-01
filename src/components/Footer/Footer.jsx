import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarker, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark pb-4 pt-4">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="text-yellow mb-3">Foodies</h5>
            <p className="text-dark">
              Delivering happiness through delicious meals. Order your favorite food from local restaurants.
            </p>
            <div className="social-icons mt-4">
              <a href="/" className="text-dark me-3"><FaFacebook /></a>
              <a href="/" className="text-dark me-3"><FaTwitter /></a>
              <a href="/" className="text-dark me-3"><FaInstagram /></a>
              <a href="/" className="text-dark"><FaLinkedin /></a>
            </div>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="text-yellow mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Home</a></li>
              <li><a href="/menu" className="text-dark text-decoration-none">Menu</a></li>
              <li><a href="/orders" className="text-dark text-decoration-none">My Orders</a></li>
              <li><a href="/faq" className="text-dark text-decoration-none">FAQs</a></li>
            </ul>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="text-yellow mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaMapMarker className="me-2 text-primary" />
                123 Food Street, New York, USA
              </li>
              <li className="mb-2">
                <FaPhone className="me-2 text-primary" />
                +1 234 567 890
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2 text-primary" />
                info@foodiedeliver.com
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="text-yellow mb-3">Newsletter</h5>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Button variant="warning" className="w-100">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="text-center border-top pt-3">
            <p className="text-dark mb-0">
              &copy; {new Date().getFullYear()} Foodies. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
