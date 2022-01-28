import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import RequestUpgradeScreen from './RequestUpgradeView';
import { 
  storeRequestUpgrade,
} from './RequestUpgradeState';

import { getUser } from '../../../AppState';

export default compose(
  connect(
    (state) => {
    return ({
      isLoading: state.requestUpgrade.isLoading,
    })},
    {
      storeRequestUpgrade,
      getUser,
    },
  ),
  lifecycle({
  }),
)(RequestUpgradeScreen);
