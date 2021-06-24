import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IQuestion } from 'pages/quiz';

export const ACTION_TYPES = {
  GET_QUESTOES: 'openTrivia/GET_QUESTOES',
  SET_CATEGORIA: 'openTrivia/SET_CATEGORIA',
  SET_DIFFICULTY: 'openTrivia/SET_DIFFICULTY',
  SET_USERNAME: 'openTrivia/SET_USERNAME',
  GET_QNT_PERG_CATEGORIAS: 'openTrivia/GET_QNT_PERG_CATEGORIAS',
  GET_QNT_PERG_TOTAL: 'openTrivia/GET_QNT_PERG_TOTAL',
  GET_TOKEN: 'openTrivia/GET_TOKEN',
  GET_QUESTOES_COM_TOKEN: 'openTrivia/GET_QUESTOES_COM_TOKEN',
  GET_QUESTOES_COM_PARAMETROS: 'openTrivia/GET_QUESTOES_COM_PARAMETROS',
  RESET_TOKEN: 'openTrivia/RESET_TOKEN',
  RESET: 'openTrivia/RESET',
};

const initialState = {
  loading: false,
  getQuestoesSuccess: false,
  getQuestoesError: false,
  getQntPergCategoriaSuccess: false,
  getQntPergCategoriaError: false,
  getQntPergTotalSuccess: false,
  getQntPergTotalError: false,
  getTokenSuccess: false,
  getTokenError: false,
  getQuestoesComTokenSuccess: false,
  getQuestoesComTokenError: false,
  getQuestoesComParametrosSuccess: false,
  getQuestoesComParametrosError: false,
  questoes: [],
  categorias: [
    {
      id: 9,
      name: 'General Knowledge',
    },
    {
      id: 17,
      name: 'Science & Nature',
    },
    {
      id: 20,
      name: 'Mythology',
    },
    {
      id: 15,
      name: 'Entertainment: Video Games',
    },
    {
      id: 18,
      name: 'Science: Computers',
    },
  ],
  qtdPerguntasCategoria: {},
  qtdPerguntasTotal: {},
  token: (undefined as unknown) as string,
  questoesComToken: {},
  questoesComParametros: [] as Array<IQuestion>,
  selectedDifficulty: 'medium',
  selectedCategoria: 18,
  username: '',
};

export type OpenTriviaState = Readonly<typeof initialState>;

// Reducer

export default (state: OpenTriviaState = initialState, action): OpenTriviaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_QUESTOES):
    case REQUEST(ACTION_TYPES.GET_QNT_PERG_CATEGORIAS):
    case REQUEST(ACTION_TYPES.GET_QNT_PERG_TOTAL):
    case REQUEST(ACTION_TYPES.GET_TOKEN):
    case REQUEST(ACTION_TYPES.GET_QUESTOES_COM_TOKEN):
    case REQUEST(ACTION_TYPES.GET_QUESTOES_COM_PARAMETROS):
    case REQUEST(ACTION_TYPES.RESET_TOKEN):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_QUESTOES):
      return {
        ...state,
        loading: false,
        getQuestoesError: true,
        getQuestoesSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_QNT_PERG_CATEGORIAS):
      return {
        ...state,
        loading: false,
        getQntPergCategoriaError: true,
        getQntPergCategoriaSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_QNT_PERG_TOTAL):
      return {
        ...state,
        loading: false,
        getQntPergTotalError: true,
        getQntPergTotalSuccess: false,
      };
    case FAILURE(ACTION_TYPES.RESET_TOKEN):
    case FAILURE(ACTION_TYPES.GET_TOKEN):
      return {
        ...state,
        loading: false,
        getTokenError: true,
        getTokenSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_QUESTOES_COM_TOKEN):
      return {
        ...state,
        loading: false,
        getQuestoesComTokenError: true,
        getQuestoesComTokenSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_QUESTOES_COM_PARAMETROS):
      return {
        ...state,
        loading: false,
        getQuestoesComParametrosError: true,
        getQuestoesComParametrosSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.GET_QUESTOES):
      return {
        ...state,
        loading: false,
        getQuestoesError: false,
        getQuestoesSuccess: true,
        questoes: [...action.payload.data.results],
      };
    case SUCCESS(ACTION_TYPES.GET_QNT_PERG_CATEGORIAS):
      return {
        ...state,
        loading: false,
        getQntPergCategoriaError: false,
        getQntPergCategoriaSuccess: true,
        qtdPerguntasCategoria: {
          faceis: action.payload.data.category_question_count.total_easy_question_count,
          dificeis: action.payload.data.category_question_count.total_hard_question_count,
          medias: action.payload.data.category_question_count.total_medium_question_count,
          total: action.payload.data.category_question_count.total_question_count,
        },
      };
    case SUCCESS(ACTION_TYPES.GET_QNT_PERG_TOTAL):
      return {
        ...state,
        loading: false,
        getQntPergCategoriaError: false,
        getQntPergCategoriaSuccess: true,
        qtdPerguntasTotal: {
          pendentes: action.payload.data.overall.total_num_of_pending_questions,
          total: action.payload.data.overall.total_num_of_questions,
          rejeitadas: action.payload.data.overall.total_num_of_rejected_questions,
          verificadas: action.payload.data.overall.total_num_of_verified_questions,
        },
      };
    case SUCCESS(ACTION_TYPES.RESET_TOKEN):
    case SUCCESS(ACTION_TYPES.GET_TOKEN):
      return {
        ...state,
        loading: false,
        getTokenError: false,
        getTokenSuccess: true,
        token: action.payload.data.token,
      };
    case SUCCESS(ACTION_TYPES.GET_QUESTOES_COM_TOKEN):
      return {
        ...state,
        loading: false,
        getQuestoesComTokenError: false,
        getQuestoesComTokenSuccess: true,
        questoesComToken: [...action.payload.data.results],
      };
    case SUCCESS(ACTION_TYPES.GET_QUESTOES_COM_PARAMETROS):
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        getQuestoesComParametrosError: false,
        getQuestoesComParametrosSuccess: true,
        questoesComParametros: [...action.payload.data.results],
      };
    case ACTION_TYPES.SET_CATEGORIA:
      return {
        ...state,
        selectedCategoria: action.payload,
      };
    case ACTION_TYPES.SET_DIFFICULTY:
      return {
        ...state,
        selectedDifficulty: action.payload,
      };
    case ACTION_TYPES.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getQuestoes = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_QUESTOES,
    payload: APIUrl.get('api.php?amount=10'),
  });
};

export const setCategoria = (categoria: number) => ({
  type: ACTION_TYPES.SET_CATEGORIA,
  payload: categoria,
});

export const setDifficulty = (difficulty: string) => ({
  type: ACTION_TYPES.SET_DIFFICULTY,
  payload: difficulty,
});

export const setUsername = (username: string) => ({
  type: ACTION_TYPES.SET_USERNAME,
  payload: username,
});

export const getQtdPerguntasPorCategoria = (categoria: number) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_QNT_PERG_CATEGORIAS,
    payload: APIUrl.get(`api_count.php?category=${categoria}`),
  });
};

export const getQtdPerguntasTotal = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_QNT_PERG_TOTAL,
    payload: APIUrl.get('api_count_global.php'),
  });
};

export const getToken = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_TOKEN,
    payload: APIUrl.get('api_token.php?command=request'),
  });
};

export const getQuestoesComToken = (token: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_QUESTOES_COM_TOKEN,
    payload: APIUrl.get(`api.php?amount=10&token=${token}`),
  });
};

export const resetToken = (token: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.RESET_TOKEN,
    payload: APIUrl.get(`api_token.php?command=reset&token=${token}`),
  });
};

export const getQuestoesComParametros = (categoria: number, dificuldade: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_QUESTOES_COM_PARAMETROS,
    payload: APIUrl.get(`api.php?amount=5&category=${categoria}&difficulty=${dificuldade}&type=multiple`),
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
