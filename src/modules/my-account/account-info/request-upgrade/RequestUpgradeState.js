import { Endpoints } from '@services';
import { setAuthorization } from '@helpers/Storage';

// Initial state
const initialState = {
  isLoading: false,
};

// Actions
const STORE_REQUEST_UPGRADE_START = 'RequestUpgradeState/STORE_REQUEST_UPGRADE_START';
const STORE_REQUEST_UPGRADE_SUCCESS = 'RequestUpgradeState/STORE_REQUEST_UPGRADE_SUCCESS';
const STORE_REQUEST_UPGRADE_FAILED = 'RequestUpgradeState/STORE_REQUEST_UPGRADE_FAILED';

// Action creators

export function storeRequestUpgrade(payload, props) {
  return (dispatch, getState) => {
    dispatch({ type: STORE_REQUEST_UPGRADE_START });
    Endpoints.requestUpgradeAccount(payload).then((res) => {
      dispatch({ type: STORE_REQUEST_UPGRADE_SUCCESS });
      if (res) {
        props.getUser();
        ToastAndroid.show('Successful!', ToastAndroid.SHORT);
        props.navigation?.popToTop();
      }
    }).catch((ex) => {
      dispatch({ type: STORE_REQUEST_UPGRADE_FAILED });
      console.warn('err',ex)
    });
  }
}

// Reducer
export default function RequestUpgradeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE_REQUEST_UPGRADE_START:
      return { ...state, isLoading: true };
    case STORE_REQUEST_UPGRADE_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_REQUEST_UPGRADE_FAILED:
      return { ...state, isLoading: false };
    default:
      return initialState;
  }
}
