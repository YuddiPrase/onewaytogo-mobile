import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '@components/CustomTabBar';

import HomeScreen from '../home/HomeViewContainer';
import AvailableInFullVersion from '../availableInFullVersion/AvailableInFullVersionViewContainer';

export default function MainTabs(){

	const tabChangeHandler = (index) => {
		if (index.i === 0) {
		} else if (index.i === 1) {
		} else if (index.i === 2) {
		}
	}

	let scrollableTabView = null;

	return (
		<ScrollableTabView
			onChangeTab={tabChangeHandler}
			ref={(ref) => { scrollableTabView = ref; }}
			tabBarPosition={'bottom'}
			renderTabBar={() => <CustomTabBar titles={[ 'Dashboard', 'Notifications', 'My Profile']} />}
			initialPage={0}
		>
			<HomeScreen parentRef={scrollableTabView} tabLabel="home-circle" />
			<AvailableInFullVersion tabLabel="bell-circle" />
			<AvailableInFullVersion tabLabel="face-profile" />
		</ScrollableTabView>
	);
}
