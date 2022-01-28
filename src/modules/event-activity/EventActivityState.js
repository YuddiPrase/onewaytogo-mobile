
import { Endpoints } from '@services';
import { Alert } from '@components';

// Initial state
const initialState = {
  isLoading: false,
  dataIndex: [],
  dataShow: null,
  dataListComment: [],
  listCommentPage: 1,
  listCommentPerPage: 15,
};

// Actions
const STORE_EVENT_ACTIVITY_START = 'EventActivtyState/STORE_EVENT_ACTIVITY_START';
const STORE_EVENT_ACTIVITY_SUCCESS = 'EventActivtyState/STORE_EVENT_ACTIVITY_SUCCESS';
const STORE_EVENT_ACTIVITY_FAILED = 'EventActivtyState/STORE_EVENT_ACTIVITY_FAILED';
const STORE_EVENT_ACTIVITY_INDEX_SUCCESS = 'EventActivtyState/STORE_EVENT_ACTIVITY_INDEX_SUCCESS';
const STORE_EVENT_ACTIVITY_SHOW_SUCCESS = 'EventActivtyState/STORE_EVENT_ACTIVITY_SHOW_SUCCESS';
const STORE_EVENT_ACTIVITY_LIST_COMMENT_SUCCESS = 'EventActivtyState/STORE_EVENT_ACTIVITY_LIST_COMMENT_SUCCESS';

// Action creators

export function eventActivityIndex(params = null) {
  return (dispatch) => {
    dispatch({ type: STORE_EVENT_ACTIVITY_START });
    Endpoints.eventActivityIndex(params).then((res) => {
      // console.warn('eventActivityIndex', res)
      if (res) {
        dispatch({ type: STORE_EVENT_ACTIVITY_INDEX_SUCCESS, payload: res.data });
      }
      dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
    }).catch((ex) => {
      dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
      console.warn('err eventActivityIndex',ex)
    });
  }
}

export function eventActivityShow(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => { 
      dispatch({ type: STORE_EVENT_ACTIVITY_START });
      Endpoints.eventActivityShow({ id: id }).then((res) => {
        // console.warn('eventActivityShow', res)
        if (res) {
          dispatch({ type: STORE_EVENT_ACTIVITY_SHOW_SUCCESS, payload: res.data });
        }
        dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
        resolve(res.data);
      }).catch((ex) => {
        dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
        console.warn('err eventActivityShow',ex)
        reject(ex);
      });
    });
  }
}

export function eventActivityLike(id) {
  return (dispatch) => {
    dispatch({ type: STORE_EVENT_ACTIVITY_START });
    Endpoints.eventActivityLike({ id: id }).then((res) => {
      // console.warn('eventActivityLike', res)
      dispatch({ type: STORE_EVENT_ACTIVITY_SUCCESS });
    }).catch((ex) => {
      dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
      console.warn('err eventActivityLike',ex)
    });
  }
}

export function eventActivityUnlike(id) {
  return (dispatch) => {
    dispatch({ type: STORE_EVENT_ACTIVITY_START });
    Endpoints.eventActivityUnlike({ id: id }).then((res) => {
      // console.warn('eventActivityUnlike', res)
      dispatch({ type: STORE_EVENT_ACTIVITY_SUCCESS });
    }).catch((ex) => {
      dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
      console.warn('err eventActivityUnlike',ex)
    });
  }
}

export function eventActivityShare(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: STORE_EVENT_ACTIVITY_START });
      Endpoints.eventActivityShare({ id: id }).then((res) => {
        // console.warn('eventActivityShare', res)
        dispatch({ type: STORE_EVENT_ACTIVITY_SUCCESS });
        resolve(true);
      }).catch((ex) => {
        dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
        console.warn('err eventActivityShare',ex)
        reject(null);
      });
  });
  }
}

export function eventActivityListComment(id, isInit = false) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: STORE_EVENT_ACTIVITY_START });
      const params = {
        page: isInit ? 1 : getState().eventActivity.listCommentPage,
        per_page: getState().eventActivity.listCommentPerPage,
      }
      Endpoints.eventActivityListComment({ id: id }, params).then((res) => {
        // console.warn('eventActivityListComment', res)
        dispatch({ type: STORE_EVENT_ACTIVITY_LIST_COMMENT_SUCCESS, payload: res?.data || [], page: params.page });
        resolve(res?.data || { data: [] });
      }).catch((ex) => {
        dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
        console.warn('err eventActivityListComment', ex);
        reject(false);
      });
    });
  }
}

export function eventActivityComment(id, comment) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
    const body = {
      comment: comment
    }
    dispatch({ type: STORE_EVENT_ACTIVITY_START });
    Endpoints.eventActivityComment({ id: id }, body).then((res) => {
      // console.warn('eventActivityComment', res)
      dispatch({ type: STORE_EVENT_ACTIVITY_SUCCESS });
      resolve(true);
    }).catch((ex) => {
      dispatch({ type: STORE_EVENT_ACTIVITY_FAILED });
      console.warn('err eventActivityComment', ex);
      reject(false);
    });
  });
  }
}

// Reducer
export default function EventActivityStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE_EVENT_ACTIVITY_START:
      return { ...state, isLoading: true };
    case STORE_EVENT_ACTIVITY_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_EVENT_ACTIVITY_FAILED:
      return { ...state, isLoading: false };
    case STORE_EVENT_ACTIVITY_INDEX_SUCCESS:
      return { ...state, isLoading: false, dataIndex: action.payload };
    case STORE_EVENT_ACTIVITY_SHOW_SUCCESS:
      return { ...state, isLoading: false, dataShow: action.payload };
    case STORE_EVENT_ACTIVITY_LIST_COMMENT_SUCCESS:
      const nextPage = (action.page + 1);
      return { 
        ...state, 
        isLoading: false, 
        dataListComment: { ...action.payload, data: action.page > 1 ? [ ...state.dataListComment?.data, ...action.payload?.data ] : action.payload?.data },
        /**
         * listCommentPage: jika dataListComment == 15 comment(total row) maka page ditambah 1 (untuk handling load more)
         */
        listCommentPage: (action.payload?.data?.length == state.listCommentPerPage) ? nextPage : action.page,
      };
    default:
      return state;
  }
}
