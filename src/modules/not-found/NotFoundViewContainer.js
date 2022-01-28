// @flow
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import NotFoundScreen from './NotFoundView';
import { getAuth } from '../AppState';

export default compose(
  connect(
    null,
    { 
      getAuth,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getAuth();
    },
  }),
)(NotFoundScreen);
