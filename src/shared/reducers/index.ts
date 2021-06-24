import { combineReducers } from 'redux';
import openTrivia, { OpenTriviaState } from './openTrivia.reducer';

export interface IRootState {
  readonly openTrivia: OpenTriviaState;
}

const rootReducer = combineReducers<IRootState>({
  openTrivia,
});

export default rootReducer;
