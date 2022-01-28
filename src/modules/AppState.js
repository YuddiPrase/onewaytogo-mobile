import { Endpoints } from "@services";
import { getAuthorization } from '@helpers/Storage';
import GetLocation from 'react-native-get-location';
import { ToastAndroid, Alert } from 'react-native';
import { DESTROY_SESSION } from "../redux/types";

export const initialState = {
  isLoad: false,
  isFirstOpen: true,
  session: null,
  tokenPN: null,
  userData: null,
  dashboardData: null,
  auth: null,
  isConnect: true,
  currentPosition: null,
  isLoadingCurrentPosition: true,
  dataTermsAndConditions: null,
  isLoadingTermsAndConditions: false,
  dataPrivacyPolicy: null,
  isLoadingPrivacyPolicy: false,
}

export const START = 'AppState/START';
export const END = 'AppState/END';
export const SET_FIRST_OPEN = 'AppState/SET_FIRST_OPEN';
export const CONNECTION = 'AppState/CONNECTION';
export const LOADING_CURRENT_POSITION = 'AppState/LOADING_CURRENT_POSITION';
export const CURRENT_POSITION = 'AppState/CURRENT_POSITION';
export const GET_AUTH = 'AppState/GET_AUTH';
export const SESSION_SET = 'AppState/SESSION_SET';
export const TOKEN_SET = 'AppState/TOKEN_SET';
export const USER_SET = 'AppState/USER_SET';
export const DASHBOARD_SET = 'AppState/DASHBOARD_SET';
export const PROVINCES_SET = 'AppState/PROVINCES_SET';
export const CITIES_SET = 'AppState/CITIES_SET';
export const DISTRICTS_SET = 'AppState/DISTRICTS_SET';
export const SUBDISTRICTS_SET = 'AppState/SUBDISTRICTS_SET';
export const AREA_LOADING = 'AppState/AREA_LOADING';

export const LOADING_TERMS_AND_CONDITIONS = 'AppState/LOADING_TERMS_AND_CONDITIONS';
export const RETRIEVE_TERMS_AND_CONDITIONS = 'AppState/RETRIEVE_TERMS_AND_CONDITIONS';
export const LOADING_PRIVACY_POLICY = 'AppState/LOADING_PRIVACY_POLICY';
export const RETRIEVE_PRIVACY_POLICY = 'AppState/RETRIEVE_PRIVACY_POLICY';

export function setAppOpened(value) {
  return {
    type: SET_FIRST_OPEN,
    payload: value
  };
}

export function isConnection(isBool, props, recursiveCount = 1) {
  return ((dispatch, getState) => {
    return new Promise((resolve, reject) => {
    dispatch({ type: CONNECTION, payload: isBool });
    dispatch({ type: LOADING_CURRENT_POSITION, payload: true });

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      dispatch({ type: CURRENT_POSITION, payload: location });
      ToastAndroid.show('Access Allowed', ToastAndroid.SHORT);
      resolve(true);
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
      if (code === 'CANCELLED') {
        // Alert.alert('Location cancelled by user or by another request');
      }
      if (code === 'UNAVAILABLE') {
          // Alert.alert('Location service is disabled or unavailable');
        GetLocation.openGpsSettings();
      }
      if (code === 'TIMEOUT') {
          // Alert.alert('Location request timed out');
      }
      if (code === 'UNAUTHORIZED') {
        // Alert.alert('Location Authorization denied');
        // GetLocation.openGpsSettings();
        if (recursiveCount < 4) {
          // console.warn('recursiveCount', recursiveCount);
          setTimeout(() => {
            const count = recursiveCount + 1;
            props.isConnection(isBool, props, count);
          }, 1000);
        } else {
          Alert.alert(
            'Izinkan Mitra-OneWayToGo mengakses lokasi perangkat ini',
            'Izinkan akses lokasi hanya saat aplikasi digunakan',
            [
              {
                text: 'Buka Pengaturan Aplikasi',
                onPress: () => {
                  GetLocation.openAppSettings();
                  setTimeout(() => { props.isConnection(isBool, props, 5) },1000);
                }
              },
            ],
          );

        }
      }
      dispatch({ type: CURRENT_POSITION, payload: null });
      dispatch({ type: LOADING_CURRENT_POSITION, payload: false });
      reject(code);
    })
    });
  })
}

export function updateLocation() {
  return (dispatch, getState) => {
    const longlat = getState().app?.currentPosition;
    if (longlat && longlat.latitude && longlat.longitude) {
      const body = {
        latitude: longlat?.latitude.toString() || '',
        longitude: longlat?.longitude.toString() || '',
      }
      Endpoints.updateLocation(body).then((res) => {
      }).catch((ex) => {
        console.warn('err 001-11',ex)
      });
    }
  }
}

export function getAuth() {
  return (async(dispatch, getState) => {
    const gAuth = await getAuthorization();
    if (gAuth && gAuth.access_token) {
      dispatch({ type: GET_AUTH, payload: gAuth });
    } else {
      dispatch({ type: GET_AUTH, payload: null });
      dispatch({ type: DESTROY_SESSION });
    }
  });
}

export function setSession(data) {
  return {
    type: SESSION_SET,
    payload: data
  }
}

export function getUser() {
  return ((dispatch) => {
    return new Promise((resolve, reject) => {
      Endpoints.getUser().then((res) => {
        // console.warn('getUser', res)
        if (res) {
          dispatch({ type: USER_SET, payload: res.data });
        }
        resolve(res);
      }).catch((ex) => {
        console.warn('err 001',ex);
        reject(ex);
      });
    });
  });
}

export function getDashboard() {
  return ((dispatch) => {
    Endpoints.dashboard().then((res) => {
      // console.warn('dashboard', res)
      if (res) {
        dispatch({ type: DASHBOARD_SET, payload: res.data });
      }
    }).catch((ex) => {
      console.warn('err 002',ex)
    });
  });
}

export function getTermsAndConditions() {
  return ((dispatch) => {
    dispatch({ type: LOADING_TERMS_AND_CONDITIONS, payload: true });
    Endpoints.getTermsAndConditions().then((res) => {
      // console.warn('getTermsAndConditions', res)
      if (res) {
        dispatch({ type: RETRIEVE_TERMS_AND_CONDITIONS, payload: res.data });
      } else {
        dispatch({ type: LOADING_TERMS_AND_CONDITIONS, payload: false });
      }
    }).catch((ex) => {
      console.warn('err 003',ex)
      dispatch({ type: LOADING_TERMS_AND_CONDITIONS, payload: false });
    });
  });
}

export function getPrivacyPolicy() {
  return ((dispatch) => {
    dispatch({ type: LOADING_PRIVACY_POLICY, payload: true });
    Endpoints.getPrivacyPolicy().then((res) => {
      // console.warn('getPrivacyPolicy', res)
      if (res) {
        dispatch({ type: RETRIEVE_PRIVACY_POLICY, payload: res.data });
      } else {
        dispatch({ type: LOADING_PRIVACY_POLICY, payload: false });
      }
    }).catch((ex) => {
      console.warn('err 003-0',ex)
      dispatch({ type: LOADING_PRIVACY_POLICY, payload: false });
    });
  });
}

export function getProvinces() { // NON AUTH TOKEN
  return ((dispatch, getState) => {
    dispatch({ type: AREA_LOADING, payload: true });
    Endpoints.getProvinces().then((res) => {
      // console.warn('res', res)
      if (res) {
        dispatch({ type: PROVINCES_SET, payload: res.data });
      }
      dispatch({ type: AREA_LOADING, payload: false });
    }).catch((ex) => {
      dispatch({ type: AREA_LOADING, payload: false });
      console.warn('err 004',ex)
    });
  })
}

export function getCities(params) { // NON AUTH TOKEN
  return ((dispatch, getState) => {
    dispatch({ type: AREA_LOADING, payload: true });
    Endpoints.getCities(params).then((res) => {
      // console.warn('res', res)
      if (res) {
        dispatch({ type: CITIES_SET, payload: res.data });
      }
      dispatch({ type: AREA_LOADING, payload: false });
    }).catch((ex) => {
      dispatch({ type: AREA_LOADING, payload: false });
      console.warn('err 005',ex)
    });
  })
}

export function getDistricts(params) { // NON AUTH TOKEN
  return ((dispatch, getState) => {
    dispatch({ type: AREA_LOADING, payload: true });
    Endpoints.getDistricts(params).then((res) => {
      // console.warn('res', res)
      if (res) {
      dispatch({ type: DISTRICTS_SET, payload: res.data });
      }
      dispatch({ type: AREA_LOADING, payload: false });
    }).catch((ex) => {
      dispatch({ type: AREA_LOADING, payload: false });
      console.warn('err 006',ex)
    });
  })
}

export function getSubDistricts(params) { // NON AUTH TOKEN
  return ((dispatch, getState) => {
    dispatch({ type: AREA_LOADING, payload: true });
    Endpoints.getSubDistricts(params).then((res) => {
      // console.warn('res', res)
      if (res) {
        dispatch({ type: SUBDISTRICTS_SET, payload: res.data });
      }
      dispatch({ type: AREA_LOADING, payload: false });
    }).catch((ex) => {
      console.warn('err 007',ex)
      dispatch({ type: AREA_LOADING, payload: false });
    });
  })
}

export function getListProvinces() { // with AUTH TOKEN
  return ((dispatch, getState) => {
    new Promise((resolve, reject) => {
      dispatch({ type: AREA_LOADING, payload: true });
      Endpoints.getListProvinces().then((res) => {
        // console.warn('getListProvinces', res)
        if (res) {
          dispatch({ type: PROVINCES_SET, payload: res.data });
        }
        dispatch({ type: AREA_LOADING, payload: false });
        resolve(res);
      }).catch((ex) => {
        dispatch({ type: AREA_LOADING, payload: false });
        console.warn('err 008',ex);
        reject(ex);
      });
    });
  })
}

export function getListCities(params) { // with AUTH TOKEN
  return ((dispatch, getState) => {
    new Promise((resolve, reject) => {
      dispatch({ type: AREA_LOADING, payload: true });
      Endpoints.getListCities(params).then((res) => {
        // console.warn('getListCities', res)
        if (res) {
          dispatch({ type: CITIES_SET, payload: res.data });
        }
        dispatch({ type: AREA_LOADING, payload: false });
        resolve(res);
      }).catch((ex) => {
        dispatch({ type: AREA_LOADING, payload: false });
        console.warn('err 009',ex);
        reject(ex);
      });
    });
  })
}

export function getListDistricts(params) { // with AUTH TOKEN
  return ((dispatch, getState) => {
    new Promise((resolve, reject) => {
      dispatch({ type: AREA_LOADING, payload: true });
      Endpoints.getListDistricts(params).then((res) => {
        // console.warn('getListDictricts', res)
        if (res) {
        dispatch({ type: DISTRICTS_SET, payload: res.data });
        }
        dispatch({ type: AREA_LOADING, payload: false });
        resolve(res);
      }).catch((ex) => {
        dispatch({ type: AREA_LOADING, payload: false });
        console.warn('err 010', ex);
        reject(ex);
      });
    });
  })
}

export function getListSubDistricts(params) { // with AUTH TOKEN
  return ((dispatch, getState) => {
    new Promise((resolve, reject) => {
      dispatch({ type: AREA_LOADING, payload: true });
      Endpoints.getListSubDistricts(params).then((res) => {
        // console.warn('getListSubDistricts', res)
        if (res) {
          dispatch({ type: SUBDISTRICTS_SET, payload: res.data });
        }
        dispatch({ type: AREA_LOADING, payload: false });
        resolve(res);
      }).catch((ex) => {
        console.warn('err 011',ex)
        dispatch({ type: AREA_LOADING, payload: false });
        reject(ex)
      });
    });
  })
}


export default function AppStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case START:
      return {
        ...state,
        isLoad: true,
      };
    case END:
      return {
        ...state,
        isLoad: false,
      };
    case SET_FIRST_OPEN:
      return {
        ...state,
        isFirstOpen: action.payload,
      };
    case CONNECTION:
      return {
        ...state,
        isConnect: action.payload
      };
    case CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.payload
      };
    case LOADING_CURRENT_POSITION:
      return {
        ...state,
        isLoadingCurrentPosition: action.payload,
      };
    case GET_AUTH:
      if (action.payload) {
        return {
          ...state,
          auth: action.payload,
        };
      } else {
        return { ...initialState }
      }
    case SESSION_SET:
      return {
        ...state,
        session: action.payload
      };
    case TOKEN_SET:
      return {
        ...state,
        tokenPN: action.payload
      }
    case USER_SET:
      return {
        ...state,
        userData: action.payload
      };
    case DASHBOARD_SET:
      return {
        ...state,
        dashboardData: action.payload
      };
    case PROVINCES_SET: // List Provinsi
      return {
        ...state,
        area: {
          provinces: action.payload,
          cities: null,
          districts: null,
          subDistricts: null,
        }
      };
    case CITIES_SET: // List Kota/Kabupaten
      return {
        ...state,
        area: {
          provinces: state.area.provinces,
          cities: action.payload,
          districts: null,
          subDistricts: null,
        },
      };
    case DISTRICTS_SET: // List Kecamatan
      return {
        ...state,
        area: {
          provinces: state.area.provinces,
          cities: state.area.cities,
          districts: action.payload,
          subDistricts: null,
        }
      };
    case SUBDISTRICTS_SET: // List Kelurahan/Desa
      return {
        ...state,
        area: {
          provinces: state.area.provinces,
          cities: state.area.cities,
          districts: state.area.districts,
          subDistricts: action.payload,
        }
      };
    case LOADING_TERMS_AND_CONDITIONS:
      return {
        ...state,
        isLoadingTermsAndConditions: action.payload
      }
    case RETRIEVE_TERMS_AND_CONDITIONS:
      return {
        ...state,
        dataTermsAndConditions: action.payload,
        isLoadingTermsAndConditions: false,
      }
    case LOADING_PRIVACY_POLICY:
      return {
        ...state,
        isLoadingPrivacyPolicy: action.payload
      }
    case RETRIEVE_PRIVACY_POLICY:
      return {
        ...state,
        dataPrivacyPolicy: action.payload,
        isLoadingPrivacyPolicy: false,
      }
    default:
      return state;
  }
}
