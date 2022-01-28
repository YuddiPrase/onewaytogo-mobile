
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
const STORE_USER_ACTIVITIES_START = 'UserActivitiesState/STORE_USER_ACTIVITIES_START';
const STORE_USER_ACTIVITIES_SUCCESS = 'UserActivitiesState/STORE_USER_ACTIVITIES_SUCCESS';
const STORE_USER_ACTIVITIES_FAILED = 'UserActivitiesState/STORE_USER_ACTIVITIES_FAILED';
const STORE_USER_ACTIVITIES_INDEX_SUCCESS = 'UserActivitiesState/STORE_USER_ACTIVITIES_INDEX_SUCCESS';

// Action creators

export function userActivitiesIndex(search, isInit = false) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
      dispatch({ type: STORE_USER_ACTIVITIES_START });
      const params = null;
      //   page: isInit ? 1 : getState().userActivities.indexPage,
      //   per_page: getState().userActivities.indexPerPage,
      // }
      // if (search) {
      //   params['search'] = search;
      // }
      Endpoints.userActivitiesIndex(params).then((res) => {
        // console.warn('userActivitiesIndex', res)
        if (res) {
          dispatch({ type: STORE_USER_ACTIVITIES_INDEX_SUCCESS, payload: res.data });
        }
        dispatch({ type: STORE_USER_ACTIVITIES_FAILED });
        resolve(res?.data || { data: [] });
      }).catch((ex) => {
        dispatch({ type: STORE_USER_ACTIVITIES_FAILED });
        console.warn('err', ex);
        reject(false);
      });
    });
  }
}

// Reducer
export default function UserActivitiesStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE_USER_ACTIVITIES_START:
      return { ...state, isLoading: true };
    case STORE_USER_ACTIVITIES_SUCCESS:
      return { ...state, isLoading: false };
    case STORE_USER_ACTIVITIES_FAILED:
      return { ...state, isLoading: false };
    case STORE_USER_ACTIVITIES_INDEX_SUCCESS:
      // const nextPage = (action.page + 1);
      return { 
        ...state,
        isLoading: false,
        dataIndex: action.payload,
        // dataIndex: { ...action.payload, data: action.page > 1 ? [ ...state.dataIndex?.data, ...action.payload?.data ] : action.payload?.data },
        // indexPage: (action.payload?.data?.length > (state.indexPerPage - 1)) ? nextPage : action.page,
      };
    default:
      return state;
  }
}
