import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import NotFoundScreen from '../not-found/NotFoundViewContainer';

import { colors, fonts } from '../../styles';

import TabNavigator from './MainTabNavigatorContainer';
import NotificationsScreen from '../notifications/NotificationsViewContainer';
import LoginDashboardScreen from '../login-dashboard/LoginDashboardViewContainer';
import LoginScreen from '../login/LoginViewContainer';
import RegisterScreen from '../register/RegisterViewContainer';
import AssessmentScreen from '../register/assessment/AssessmentViewContainer';
import EventActivityScreen from '../event-activity/EventActivityViewContainer';
import EventActivityDetailScreen from '../event-activity/detail/EventActivityDetailViewContainer';

import UserActivitiesScreen from '../my-account/user-activities/UserActivitiesViewContainer';
import AccountInfoScreen from '../my-account/account-info/AccountInfoViewContainer';
import TermsConditionsScreen from '../my-account/terms-conditions/TermsConditionsViewContainer';
import PrivacyPolicyScreen from '../my-account/privacy-policy/PrivacyPolicyViewContainer';
import CheckStatusScreen from '../register/check-status/CheckStatusViewContainer';
import HistoryDetailScreen from '../history/detail/HistoryDetailViewContainer';
import HistoryScreen from '../history/HistoryViewContainer';

const headerLeftComponent = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 12,
    }}
  >
    <Image
      source={require('@images/icons/arrow-back.png')}
      resizeMode="contain"
      style={{
        height: 20,
      }}
    />
  </TouchableOpacity>
);

const StackNavigationData = [
  {
    name: 'Start',
    component: TabNavigator,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Login Dashboard',
    component: LoginDashboardScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Login',
    component: LoginScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Register',
    component: RegisterScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Assessment',
    component: AssessmentScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Check Status',
    component: CheckStatusScreen,
    headerHide: true,
  },
  {
    name: 'Notifikasi',
    component: NotificationsScreen,
    headerHide: true,
  },
  {
    name: 'Event',
    component: EventActivityScreen,
    headerLeft: headerLeftComponent,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Event Detail',
    component: EventActivityDetailScreen,
    headerHide: true,
  },
  {
    name: 'History',
    component: HistoryScreen,
    headerLeft: headerLeftComponent,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'History Detail',
    component: HistoryDetailScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Info Akun',
    component: AccountInfoScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Aktivitas User',
    component: UserActivitiesScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Syarat dan Ketentuan',
    component: TermsConditionsScreen,
    headerHide: true,
  },
  {
    isDetail: true,
    name: 'Kebijakan Privasi',
    component: PrivacyPolicyScreen,
    headerHide: true,
  },
  {
    name: '404',
    component: NotFoundScreen,
    headerHide: true,
    headerLeft: headerLeftComponent,
    headerBackground: { source: null },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
];

export {
  StackNavigationData
};
