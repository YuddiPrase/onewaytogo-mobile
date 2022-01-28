import { Endpoints } from '@services';
import { setAuthorization } from '@helpers/Storage';

// Initial state
const initialState = {
  isLoading: false,
};

// Actions
const CHECK_KTA_START = 'VerificationKTAState/CHECK_KTA_START';
const CHECK_KTA_SUCCESS = 'VerificationKTAState/CHECK_KTA_SUCCESS';
const CHECK_KTA_FAILED = 'VerificationKTAState/CHECK_KTA_FAILED';
const STORE_VERIFICATIONKTA_START = 'VerificationKTAState/STORE_VERIFICATIONKTA_START';
const STORE_VERIFICATIONKTA_SUCCESS = 'VerificationKTAState/STORE_VERIFICATIONKTA_SUCCESS';
const STORE_VERIFICATIONKTA_FAILED = 'VerificationKTAState/STORE_VERIFICATIONKTA_FAILED';

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

export function storeVerificationKTA(payload, props, isMember = false) {
  return (dispatch, getState) => {
    dispatch({ type: STORE_VERIFICATIONKTA_START });
    Endpoints.storeProfile(payload).then((res) => {
      dispatch({ type: STORE_VERIFICATIONKTA_SUCCESS });
      if (isMember) {
        setAuthorization(res);
        props.setAppOpened(true);
        props.getAuth();
      } else {
        props?.navigation?.navigate('OTP', { type: res.type, email: payload.email })
      }
    }).catch((ex) => {
      dispatch({ type: STORE_VERIFICATIONKTA_FAILED });
      console.warn('err',ex)
    });
  }
}

// Reducer
export default function VerificationKTAStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_KTA_START:
      return { ...state, isLoading: true };
    case CHECK_KTA_SUCCESS:
      return { ...state, isLoading: false };
    case CHECK_KTA_FAILED:
      return { ...state, isLoading: false };
    case STORE_VERIFICATIONKTA_START:
      return { ...state, isLoading: true };
    case STORE_VERIFICATIONKTA_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_VERIFICATIONKTA_FAILED:
      return { ...state, isLoading: false };
    default:
      return initialState;
  }
}
