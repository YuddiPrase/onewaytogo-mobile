import { Endpoints } from '@services';
// Initial state
const initialState = {
  isLoading: false,
};

// Action types
const START = 'TermsConditionsState/START';

// Action creators

// Reducer
export default function TermsConditionsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case START:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
