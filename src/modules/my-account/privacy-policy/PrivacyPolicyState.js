import { Endpoints } from '@services';
// Initial state
const initialState = {
  isLoading: false,
};

// Action types
const START = 'PrivacyPolicyState/START';

// Action creators

// Reducer
export default function PrivacyPolicyStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case START:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
