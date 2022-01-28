import SInfo from 'react-native-sensitive-info';

const sInfoPreferenceKey = {
	sharedPreferencesName: 'onewaytogo',
	keychainService: 'owtg'
};

const setAuthorization = async value => {
	try {
    await SInfo.setItem('authorization', JSON.stringify(value), sInfoPreferenceKey);
	} catch (error) {
		console.error('Error Saving Data', error);
	}
};

const getAuthorization = async () => {
	try {
		const auth = await SInfo.getItem('authorization', sInfoPreferenceKey);
		if (auth !== null) {
			return JSON.parse(auth);
		}
		return null;
	} catch (error) {
		console.error('Error Retrieving Data', error);
		return null;
	}
};

const removeAuthFromStorage = async () => {
	try {
		// await SInfo.deleteItem('otp_expiry', qzkSharefPreferences);
		// await SInfo.deleteItem('session', qzkSharefPreferences);
		// await SInfo.deleteItem('fcmToken', qzkSharefPreferences);
		// await SInfo.deleteItem('profile', qzkSharefPreferences);
		// await SInfo.deleteItem('qUser', qzkSharefPreferences);
		await SInfo.deleteItem('authorization', sInfoPreferenceKey);
		return true;
	} catch (err) {
		console.error('Error while removing data', err);
		return false;
	}
};

export {
  setAuthorization,
  getAuthorization,
  removeAuthFromStorage,
}