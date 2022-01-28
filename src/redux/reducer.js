import { combineReducers } from 'redux';
import { DESTROY_SESSION } from "./types";

// ## Generator Reducer Imports
import login from '../modules/login/LoginState';
import register from '../modules/register/RegisterState';

import eventActivity from '../modules/event-activity/EventActivityState';
import profile from '../modules/profile/ProfileState';
import notifications from '../modules/notifications/NotificationsState';
import userActivities from '../modules/my-account/user-activities/UserActivitiesState';
import accountInfo from '../modules/my-account/account-info/AccountInfoState';
import verificationKTA from '../modules/my-account/account-info/verification-kta/VerificationKTAState';
import requestUpgrade from '../modules/my-account/account-info/request-upgrade/RequestUpgradeState';

import app from '../modules/AppState';

const appReducer = combineReducers({
  // ## Generator Reducers,
  login: (state, action) => login(state, action),
  register: (state, action) => register(state, action),
  app: (state, action) => app(state, action),
  eventActivity: (state, action) => eventActivity(state, action),
  profile: (state, action) => profile(state, action),
  notifications: (state, action) => notifications(state, action),
  userActivities: (state, action) => userActivities(state, action),
  accountInfo: (state, action) => accountInfo(state, action),
  verificationKTA: (state, action) => verificationKTA(state, action),
  requestUpgrade: (state, action) => requestUpgrade(state, action),
});

const rootReducer = (state, action) => {

  // Clear all data in redux store to initial.
  if (action.type === DESTROY_SESSION) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
