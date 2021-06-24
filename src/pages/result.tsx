import React from 'react';
import logo from '../content/images/brain.png';

import '../styles/pages/result.scss';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IRootState } from 'shared/reducers';

interface IResultProps extends StateProps, DispatchProps, RouteComponentProps<{ acertos: string }> {}

class Result extends React.Component<IResultProps> {
  render() {
    const { username } = this.props;
    const { acertos } = this.props.match.params;
    return (
      <>
        <div className="d-flex h-25 align-items-center justify-content-center">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}></Col>
            <img src={logo} alt="Brain" />
          </Row>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <h2>Congratulations, {username}!!!</h2>&nbsp;&nbsp;
          <span> You got {acertos} right! </span>
        </div>
        <Row>
          <Button color="success" tag={Link} to="/menu" className="button-play">
            Play again
          </Button>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  username: store.openTrivia.username,
});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Result);
