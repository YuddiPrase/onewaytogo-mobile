import { Endpoints } from '@services';
import { setAuthorization } from '@helpers/Storage';

// Initial state
const initialState = {
  isLoading: false,
};

// Action types
const LOGIN_START = 'LoginState/LOGIN_START';
const LOGIN_SUCCESS = 'LoginState/LOGIN_SUCCESS';
const LOGIN_FAILED = 'LoginState/LOGIN_FAILED';

// Action creators
export function login(user, props) {
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_START });
    Endpoints.login(user).then((res) => {
      setAuthorization(res);
      if (res) {
        props.getAuth();
        props.navigation?.reset({
          index: 0,
          routes: [{ name: 'Start' }],
        });
      }
      dispatch({ type: LOGIN_SUCCESS });
    }).catch((ex) => {
      dispatch({ type: LOGIN_FAILED });
      console.warn('err',ex);
    })
  }
}

// Reducer
export default function LoginStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false };
    case LOGIN_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
