import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import HistoryDetailScreen from './HistoryDetailView';

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
    componentDidMount() {
    },
  }),
)(HistoryDetailScreen);
