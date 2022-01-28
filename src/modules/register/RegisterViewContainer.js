import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import RegisterScreen from './RegisterView';
import { checkKTANumber, storeProfile } from './RegisterState';
import { setAppOpened, getAuth, getProvinces, getCities, getDistricts, getSubDistricts } from '../AppState';

export default compose(
  connect(
    (state) => {
    return ({
      isLoading: state.register.isLoading,
    })},
    (dispatch) => ({
      checkKTANumber: (payload, props) => dispatch(checkKTANumber(payload, props)),
      storeProfile: (payload, props, isMember) => dispatch(storeProfile(payload, props, isMember)),
      setAppOpened: (isBool) => dispatch(setAppOpened(isBool)),
      getAuth: () => dispatch(getAuth()),
      getProvinces: () => dispatch(getProvinces()),
      getCities: (params) => dispatch(getCities(params)),
      getDistricts: (params) => dispatch(getDistricts(params)),
      getSubDistricts: (params) => dispatch(getSubDistricts(params)),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.getProvinces();
    },
  }),
)(RegisterScreen);
