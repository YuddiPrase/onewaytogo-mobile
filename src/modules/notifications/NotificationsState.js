
import { Endpoints } from '@services';
import { Alert } from '@components';

// Initial state
const initialState = {
  isLoading: false,
  dataIndex: [],
  dataShow: null,
  indexPage: 1,
  indexPerPage: 15,
};

// Actions
const STORE_NOTIFICATIONS_START = 'NotificationsState/STORE_NOTIFICATIONS_START';
const STORE_NOTIFICATIONS_SUCCESS = 'NotificationsState/STORE_NOTIFICATIONS_SUCCESS';
const STORE_NOTIFICATIONS_FAILED = 'NotificationsState/STORE_NOTIFICATIONS_FAILED';
const STORE_NOTIFICATIONS_INDEX_TEMP = 'NotificationsState/STORE_NOTIFICATIONS_INDEX_TEMP';
const STORE_NOTIFICATIONS_INDEX_SUCCESS = 'NotificationsState/STORE_NOTIFICATIONS_INDEX_SUCCESS';
const STORE_NOTIFICATIONS_SHOW_SUCCESS = 'NotificationsState/STORE_NOTIFICATIONS_SHOW_SUCCESS';

// Action creators

export function notificationsIndex(search, isInit = false) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
      dispatch({ type: STORE_NOTIFICATIONS_START });
      const params = null;
      //   page: isInit ? 1 : getState().notifications.indexPage,
      //   per_page: getState().notifications.indexPerPage,
      // }
      // if (search) {
      //   params['search'] = search;
      // }
      Endpoints.notificationsIndex(params).then((res) => {
        // console.warn('notificationsIndex', res)
        if (res) {
          dispatch({ type: STORE_NOTIFICATIONS_INDEX_SUCCESS, payload: res.data });
        }
        dispatch({ type: STORE_NOTIFICATIONS_FAILED });
        resolve(res?.data || { data: [] });
      }).catch((ex) => {
        dispatch({ type: STORE_NOTIFICATIONS_FAILED });
        console.warn('err', ex);
        reject(false);
      });
    });
  }
}

export function notificationsShow(id, props) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
      dispatch({ type: STORE_NOTIFICATIONS_START });
      Endpoints.notificationsShow({ id: id }).then((res) => {
        // console.warn('notificationsShow', res)
        if (res) {
          dispatch({ type: STORE_NOTIFICATIONS_SHOW_SUCCESS, payload: res.data });
        }
        dispatch({ type: STORE_NOTIFICATIONS_FAILED });
        resolve(res);
      }).catch((ex) => {
        dispatch({ type: STORE_NOTIFICATIONS_FAILED });
        console.warn('err',ex)
        reject(ex);
      });
    });
  }
}

export function notificationsStore(payload, props) {
  return (dispatch, getState) => {
    dispatch({ type: STORE_NOTIFICATIONS_START });
    Endpoints.notificationsStore(payload).then((res) => {
      // console.warn('notificationsStore', res)
      dispatch({ type: STORE_NOTIFICATIONS_SUCCESS });
      if (res) {
        props?.notificationsIndex();
        Alert.callAlert(null, 'Simpan data berhasil');
      }
    }).catch((ex) => {
      dispatch({ type: STORE_NOTIFICATIONS_FAILED });
      console.warn('err',ex)
    });
  }
}

export function notificationsUpdateRead(id, props, index) {
  return (dispatch, getState) => {
    dispatch({ type: STORE_NOTIFICATIONS_INDEX_TEMP, index: index });
    Endpoints.notificationsUpdateRead({ id: id }).then((res) => {
      // console.warn('notificationsStore', res)
      dispatch({ type: STORE_NOTIFICATIONS_SUCCESS });
      if (res) {
        props?.notificationsIndex();
        props?.getUser();
      }
    }).catch((ex) => {
      dispatch({ type: STORE_NOTIFICATIONS_FAILED });
      console.warn('err',ex)
    });
  }
}

// Reducer
export default function NotificationsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE_NOTIFICATIONS_START:
      return { ...state, isLoading: true };
    case STORE_NOTIFICATIONS_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_NOTIFICATIONS_FAILED:
      return { ...state, isLoading: false };
    case STORE_NOTIFICATIONS_INDEX_SUCCESS:
      // const nextPage = (action.page + 1);
      return { 
        ...state,
        isLoading: false,
        dataIndex: action.payload,
        // dataIndex: { ...action.payload, data: action.page > 1 ? [ ...state.dataIndex?.data, ...action.payload?.data ] : action.payload?.data },
        // indexPage: (action.payload?.data?.length > (state.indexPerPage - 1)) ? nextPage : action.page,
      };
    case STORE_NOTIFICATIONS_INDEX_TEMP:
      const dataIndexTemp = state.dataIndex;
      dataIndexTemp.data[action.index]['status'] = 'read';
      return { 
        ...state,
        dataIndex: dataIndexTemp,
      };
    case STORE_NOTIFICATIONS_SHOW_SUCCESS:
      return { ...state, isLoading: false, dataShow: action.payload };
    default:
      return state;
  }
}
