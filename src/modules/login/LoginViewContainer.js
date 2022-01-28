import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LoginScreen from './LoginView';
import { login } from './LoginState';
import {
  setAppOpened,
  getAuth,
} from '../AppState';

export default compose(
  connect(
    (state) => ({
      isLoading: state.login.isLoading,
      isConnect: state.app.isConnect,
    }),
    {
      login,
      setAppOpened,
      getAuth,
    },
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(LoginScreen);
