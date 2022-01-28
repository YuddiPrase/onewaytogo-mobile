import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import MemberCardScreen from './MemberCardView';

export default compose(
  connect(
    (state) => ({
      userData: state.app.userData,
      isConnect: state.app.isConnect
    }),
    { 
    }
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(MemberCardScreen);
