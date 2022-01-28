
import { Endpoints } from '@services';
import { ToastAndroid } from 'react-native';

// Initial state
const initialState = {
  isLoading: false,
  dataUpdate: null,
};

// Actions
const STORE_ACCOUNT_INFO_START = 'AccountInfoState/STORE_ACCOUNT_INFO_START';
const STORE_ACCOUNT_INFO_SUCCESS = 'AccountInfoState/STORE_ACCOUNT_INFO_SUCCESS';
const STORE_ACCOUNT_INFO_FAILED = 'AccountInfoState/STORE_ACCOUNT_INFO_FAILED';
const STORE_ACCOUNT_INFO_UPDATE_SUCCESS = 'AccountInfoState/STORE_ACCOUNT_INFO_UPDATE_SUCCESS';

// Action creators

export function updateAccount(body, props) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
      dispatch({ type: STORE_ACCOUNT_INFO_START });
      Endpoints.storeProfile(body).then((res) => {
        // console.warn('updateAccount', res)
        if (res) {
          if (res?.data?.status) {
            dispatch({ type: STORE_ACCOUNT_INFO_UPDATE_SUCCESS, payload: res.data });
            if (res?.data?.is_otp) {
              props?.navigation?.navigate('OTP', { type: 'update-account', email: res?.data?.email, ktaNumber: body.kta_number });
            }
          } else {
            ToastAndroid.show(JSON.stringify(res?.data), ToastAndroid.SHORT);
          }
        }
        dispatch({ type: STORE_ACCOUNT_INFO_FAILED });
        resolve(res?.data || { data: [] });
      }).catch((ex) => {
        dispatch({ type: STORE_ACCOUNT_INFO_FAILED });
        console.warn('err', ex);
        reject(false);
      });
    });
  }
}

export function updateProfile(body, props) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
      dispatch({ type: STORE_ACCOUNT_INFO_START });
      Endpoints.storeProfile(body).then((res) => {
        // console.warn('updateAccount', res)
        if (res) {
          props.getUser();
          props?.navigation?.pop();
        }
        dispatch({ type: STORE_ACCOUNT_INFO_FAILED });
        resolve(res);
      }).catch((ex) => {
        dispatch({ type: STORE_ACCOUNT_INFO_FAILED });
        console.warn('err', ex);
        reject(ex);
      });
    });
  }
}

// Reducer
export default function AccountInfoStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE_ACCOUNT_INFO_START:
      return { ...state, isLoading: true };
    case STORE_ACCOUNT_INFO_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_ACCOUNT_INFO_FAILED:
      return { ...state, isLoading: false };
    case STORE_ACCOUNT_INFO_UPDATE_SUCCESS:
      // const nextPage = (action.page + 1);
      return { 
        ...state,
        isLoading: false,
        dataUpdate: action.payload,
      };
    default:
      return state;
  }
}
