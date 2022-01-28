import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import VerificationKTAScreen from './VerificationKTAView';
import { 
  updateAccount,
} from '../AccountInfoState';

export default compose(
  connect(
    (state) => {
    return ({
      isLoading: state.accountInfo.isLoading,
    })},
    {
      updateAccount,
    },
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(VerificationKTAScreen);
