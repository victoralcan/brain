import React from 'react';
import brain from '../content/images/brain.png';
import '../styles/pages/menu.scss';

import { connect } from 'react-redux';
import { Col, Row, FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, Button } from 'reactstrap';
import { IRootState } from 'shared/reducers';
import { setCategoria, setDifficulty, setUsername } from 'shared/reducers/openTrivia.reducer';
import { Link } from 'react-router-dom';

interface IMenuProps extends StateProps, DispatchProps {}

interface IMenuState {
  username: string;
  difficulty: string;
  categoryId?: number;
}

class Menu extends React.Component<IMenuProps, IMenuState> {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      difficulty: props.selectedDifficulty,
      categoryId: props.selectedCategoria,
    };
  }

  componentDidMount() {
    this.setState({
      username: this.props.username,
      difficulty: this.props.selectedDifficulty,
      categoryId: this.props.selectedCategoria,
    });
  }

  savePreferences = () => {
    this.props.setUsername(this.state.username);
    this.props.setCategoria(this.state.categoryId);
    this.props.setDifficulty(this.state.difficulty);
  };

  render() {
    const dificuldades = ['easy', 'medium', 'hard'];
    const { categorias } = this.props;
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Row>
              <img src={brain} alt="Brain" />
            </Row>
            <Row>
              <h2>Menu</h2>
            </Row>
            <Row>
              <FormGroup tag="fieldset" value={this.state.difficulty}>
                <legend>Difficulty</legend>
                {dificuldades.map((dificuldade) => {
                  return (
                    <FormGroup key={dificuldade} check>
                      <Label check>
                        <Input
                          value={dificuldade}
                          onChange={(event) => this.setState({ difficulty: event.target.value })}
                          type="radio"
                          name="dificuldade"
                        />{' '}
                        {dificuldade}
                      </Label>
                    </FormGroup>
                  );
                })}
              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag="fieldset">
                <legend>Category</legend>
                {categorias.map((categoria) => {
                  return (
                    <FormGroup key={categoria.id} check>
                      <Label check>
                        <Input
                          onChange={(event) => this.setState({ categoryId: Number(event.target.value) })}
                          value={categoria.id}
                          type="radio"
                          name="categoria"
                        />{' '}
                        {categoria.name}
                      </Label>
                    </FormGroup>
                  );
                })}
              </FormGroup>
            </Row>
            <Row>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Username </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  value={this.state.username}
                  onChange={(event) => this.setState({ username: event.target.value })}
                ></Input>
              </InputGroup>
            </Row>
            <Row>
              <Button color="success" tag={Link} to="/quiz" onClick={this.savePreferences}>
                Play
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  categorias: store.openTrivia.categorias,
  selectedDifficulty: store.openTrivia.selectedDifficulty,
  selectedCategoria: store.openTrivia.selectedCategoria,
  username: store.openTrivia.username,
});
const mapDispatchToProps = {
  setCategoria,
  setDifficulty,
  setUsername,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
