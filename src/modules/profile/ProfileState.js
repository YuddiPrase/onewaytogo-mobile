
import { Endpoints } from '@services';
import { setAuthorization } from '@helpers/Storage';
import { DESTROY_SESSION } from "../../redux/types";

// Initial state
const initialState = {
  isLoading: false,
};

// Actions
const STORE_PROFILE_START = 'ProfileState/STORE_PROFILE_START';
const STORE_PROFILE_SUCCESS = 'ProfileState/STORE_PROFILE_SUCCESS';
const STORE_PROFILE_FAILED = 'ProfileState/STORE_PROFILE_FAILED';

const LOGOUT_SUCCESS = 'ProfileState/LOGOUT_SUCCESS';

// Action creators


export function logout(props) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: STORE_PROFILE_START });
      Endpoints.logout().then((res) => {
        dispatch({ type: LOGOUT_SUCCESS });
        setAuthorization('removeToken');
        props.getAuth();
        props.navigation?.replace('Login Dashboard');
        dispatch({ type: DESTROY_SESSION });
        resolve(res);
      }).catch((ex) => {
        dispatch({ type: STORE_PROFILE_FAILED });
        console.warn('err',ex);
        setAuthorization('removeToken');
        props.getAuth();
        props.navigation?.replace('Login Dashboard');
        reject(ex);
      });
    });
  }
}

// Reducer
export default function ProfileStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE_PROFILE_START:
      return { ...state, isLoading: true };
    case STORE_PROFILE_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_PROFILE_FAILED:
      return { ...state, isLoading: false };
    case LOGOUT_SUCCESS:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
