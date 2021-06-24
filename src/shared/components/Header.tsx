import 'styles/header.scss';
import React from 'react';
import { Navbar, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Header = () => (
  <Row className="menu">
    <Navbar className="gray darken-2">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h6 className="h6-text">
          <FontAwesomeIcon className="icon" icon="home" />
          Home
        </h6>
      </Link>
      <Link className="item-menu" to="/quiz" style={{ textDecoration: 'none' }}>
        <h6 className="h6-text">
          <FontAwesomeIcon className="icon" icon="question-circle" />
          Quiz
        </h6>
      </Link>
    </Navbar>
  </Row>
);

export default Header;
