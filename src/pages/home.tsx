import React from 'react';
import brain from '../content/images/brain.png';
import quiz from '../content/images/quiz.png';
import question from '../content/images/interrogacao.png';

import '../styles/pages/home.scss';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

interface IHomeProps extends StateProps, DispatchProps {}

class Home extends React.Component<IHomeProps> {
  render() {
    return (
      <>
        <div className="d-flex h-25 align-items-center justify-content-center">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}></Col>
            <img src={question} alt="Question" />
            <img src={brain} alt="Brain" />
            <img src={question} alt="Question" />
          </Row>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <h1>BRAIN TRAIN</h1>
        </div>
        <div className="d-flex h-25 align-items-center justify-content-center">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}></Col>
            <img src={question} alt="Question" />
            <img src={quiz} alt="Quiz" />
            <img src={question} alt="Question" />
          </Row>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Row>
            <Button color="success" tag={Link} to="/menu" className="button-play" size="lg">
              Play
            </Button>
          </Row>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Row>
            {/* <Button color="primary" tag={Link} to="/menu" className="button-menu">
              Menu
            </Button> */}
            {/* <Button color="warning" tag={Link} to="/result" className="button-result">
              Result
            </Button> */}
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
