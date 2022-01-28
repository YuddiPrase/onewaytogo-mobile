// Initial state
const initialState = {
  isLoading: false,
};

// Action types
const LOGIN_START = 'LoginDashboardState/LOGIN_START';
const LOGIN_SUCCESS = 'LoginDashboardState/LOGIN_SUCCESS';
const LOGIN_FAILED = 'LoginDashboardState/LOGIN_FAILED';

// Action creators

// Reducer
export default function LoginDashboardStateReducer(state = initialState, action = {}) {
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
