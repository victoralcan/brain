import React from 'react';
import brain from '../content/images/brain.png';
import { connect } from 'react-redux';
import { Col, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import { IRootState } from 'shared/reducers';
import { getQuestoesComParametros } from 'shared/reducers/openTrivia.reducer';
import { RouteComponentProps } from 'react-router-dom';

interface IQuizProps extends StateProps, DispatchProps, RouteComponentProps {}

interface IQuizState {
  actualQuestionIndex: number;
  correctAnswers: number;
  actualSelectedAnswer: string;
}

export interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}

class Quiz extends React.Component<IQuizProps, IQuizState> {
  constructor(props) {
    super(props);
    this.state = {
      actualQuestionIndex: 0,
      correctAnswers: 0,
      actualSelectedAnswer: '',
    };
  }

  componentDidMount() {
    const { selectedCategoria, selectedDifficulty } = this.props;
    this.props.getQuestoesComParametros(selectedCategoria, selectedDifficulty);
  }

  nextQuestion = () => {
    const { actualQuestionIndex, actualSelectedAnswer, correctAnswers } = this.state;
    const size = this.props.questoesComParametros.length;
    this.setState({
      correctAnswers: actualSelectedAnswer === 'correct' ? correctAnswers + 1 : correctAnswers,
    });
    if (actualQuestionIndex + 1 === size) {
      this.props.history.push(`/result/${actualSelectedAnswer === 'correct' ? correctAnswers + 1 : correctAnswers}`);
    } else {
      this.setState({
        actualQuestionIndex: actualQuestionIndex + 1,
      });
    }
  };

  render() {
    const { questoesComParametros } = this.props;
    const { actualQuestionIndex } = this.state;
    const actualQuestion = questoesComParametros[actualQuestionIndex];
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        {questoesComParametros.length > 0 && (
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Row>
                <img src={brain} alt="Brain" />
              </Row>
              <Row>
                <h2>Question {actualQuestionIndex + 1}</h2>
              </Row>
              <Row>
                <span>{actualQuestion.question}</span>
              </Row>
              <Row>
                <FormGroup tag="fieldset">
                  <legend>Select a answer</legend>
                  {actualQuestion.incorrect_answers.map((answer) => {
                    return (
                      <FormGroup key={answer} check>
                        <Label check>
                          <Input
                            type="radio"
                            onChange={() => this.setState({ actualSelectedAnswer: 'wrong' })}
                            name="answer"
                          />
                          {answer}
                        </Label>
                      </FormGroup>
                    );
                  })}
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="answer"
                        onChange={() => this.setState({ actualSelectedAnswer: 'correct' })}
                      />
                      {actualQuestion.correct_answer}
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Row>
              <Row>
                <Button onClick={this.nextQuestion} color="success">
                  {actualQuestionIndex + 1 === questoesComParametros.length ? 'Finish' : 'Next'}
                </Button>
              </Row>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  selectedDifficulty: store.openTrivia.selectedDifficulty,
  selectedCategoria: store.openTrivia.selectedCategoria,
  questoesComParametros: store.openTrivia.questoesComParametros,
});
const mapDispatchToProps = {
  getQuestoesComParametros,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
