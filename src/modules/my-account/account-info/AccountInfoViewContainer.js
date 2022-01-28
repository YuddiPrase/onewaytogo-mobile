import { connect } from 'react-redux';
import { compose } from 'recompose';

import AccountInfoScreen from './AccountInfoView';
import { 
  updateAccount,
  updateProfile,
} from './AccountInfoState';
import { getUser } from '../../AppState';

export default compose(
  connect(
    (state) => {
    return ({
      isLoading: state.accountInfo.isLoading,
      dataIndex: state.accountInfo.dataIndex,
      indexPage: state.accountInfo.indexPage,
      indexPerPage: state.accountInfo.indexPerPage,
      userData: state.app.userData,
    })},
    { 
      updateAccount,
      updateProfile,
      getUser,
    }
  ),
)(AccountInfoScreen);
