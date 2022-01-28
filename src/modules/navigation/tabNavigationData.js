import HomeScreen from '../home/HomeViewContainer';
import EventActivityScreen from '../event-activity/EventActivityViewContainer';
import ProfileScreen from '../profile/ProfileViewContainer';
import HistoryScreen from '../history/HistoryViewContainer';

const tabNavigationData = [
  {
    name: 'Beranda',
    component: HomeScreen,
    iconActive: require('@images/icons/beranda-active.png'),
    iconInactive: require('@images/icons/beranda-inactive.png'),
  },
  {
    name: 'Antar Paket',
    component: EventActivityScreen,
    iconActive: require('@images/icons/antar-paket-active.png'),
    iconInactive: require('@images/icons/antar-paket-inactive.png'),
  },
  {
    name: 'Riwayat',
    component: HistoryScreen,
    iconActive: require('@images/icons/history-active.png'),
    iconInactive: require('@images/icons/history-inactive.png'),
  },
  {
    name: 'Profil',
    component: ProfileScreen,
    iconActive: require('@images/icons/profil-active.png'),
    iconInactive: require('@images/icons/profil-inactive.png'),
  },
];

export default tabNavigationData;
