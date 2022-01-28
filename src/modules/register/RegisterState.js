import { Endpoints } from '@services';
import { getAuthorization, setAuthorization } from '@helpers/Storage';
import { Alert } from '@components';

// Initial state
const initialState = {
  isLoading: false,
};

// Actions
const CHECK_KTA_START = 'RegisterState/CHECK_KTA_START';
const CHECK_KTA_SUCCESS = 'RegisterState/CHECK_KTA_SUCCESS';
const CHECK_KTA_FAILED = 'RegisterState/CHECK_KTA_FAILED';
const STORE_REGISTER_START = 'RegisterState/STORE_REGISTER_START';
const STORE_REGISTER_SUCCESS = 'RegisterState/STORE_REGISTER_SUCCESS';
const STORE_REGISTER_FAILED = 'RegisterState/STORE_REGISTER_FAILED';

// Action creators
export function checkKTANumber(payload, props) {
  return (dispatch, getState) => {
    dispatch({ type: CHECK_KTA_START });
    Endpoints.checkKTANumber(payload).then((res) => {
      // console.warn('res', res)
      if (res) {
        props?.navigation?.navigate('OTP', { numberKTA: payload.kta_number });
      }
      dispatch({ type: CHECK_KTA_SUCCESS });
    }).catch((ex) => {
      dispatch({ type: CHECK_KTA_FAILED });
      console.warn('err',ex)
    });
  }
}

export function storeProfile(payload, props, isMember = false) {
  return (dispatch, getState) => {
    dispatch({ type: STORE_REGISTER_START });
    Endpoints.storeProfile(payload).then((res) => {
      dispatch({ type: STORE_REGISTER_SUCCESS });
      if (isMember) {
        setAuthorization(res);
        props.getAuth();
        props.navigation?.reset({
          index: 0,
          routes: [{ name: 'Start' }],
        });
      } else {
        props?.navigation?.navigate('OTP', { type: res.type, email: payload.email })
      }
    }).catch((ex) => {
      dispatch({ type: STORE_REGISTER_FAILED });
      console.warn('err',ex)
    });
  }
}

// Reducer
export default function RegisterStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_KTA_START:
      return { ...state, isLoading: true };
    case CHECK_KTA_SUCCESS:
      return { ...state, isLoading: false };
    case CHECK_KTA_FAILED:
      return { ...state, isLoading: false };
    case STORE_REGISTER_START:
      return { ...state, isLoading: true };
    case STORE_REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_REGISTER_FAILED:
      return { ...state, isLoading: false };
    default:
      return initialState;
  }
}
