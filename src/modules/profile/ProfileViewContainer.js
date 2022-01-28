import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import ProfileScreen from './ProfileView';

export default compose(
  connect(
    (state) => {
    return ({
    })},
    {
    }
  ),
  lifecycle({
  }),
)(ProfileScreen);
