import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import CheckStatusScreen from './CheckStatusView';

export default compose(
  connect(
    (state) => ({}),
    {}
  ),
  lifecycle({
  }),
)(CheckStatusScreen);
