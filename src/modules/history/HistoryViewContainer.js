import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import HistoryScreen from './HistoryView';

export default compose(
  connect(
    (state) => {
      return ({
      });
    },
    {
    }
  ),
  lifecycle({
  }),
)(HistoryScreen);
