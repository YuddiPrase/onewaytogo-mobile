import React from 'react';
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import { env } from '@config/Constants';
import { getAuthorization, setAuthorization } from '@helpers/Storage';
import { Alert } from '@components';
import { resetTo, navigationRef } from '../../modules/GlobalNavigation';

const request = async (options) => {

  const client = axios.create({
    baseURL: env.serverHost + '/',
  });
  const getAuth = await getAuthorization();
  if (getAuth && getAuth.access_token) {
    if (options.headers) {
      options['headers'] = {
        ...options.headers,
        Accept: 'application/json',
        Authorization: 'Bearer ' + getAuth.access_token,
      };
    } else {
      options['headers'] = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getAuth.access_token,
      };
    }
  } else {
    options['headers'] = {
      Accept: 'application/json'
    };
  }
  const onSuccess = (response) => {
    if (__DEV__) {
      console.debug('Request Successful!', response);
    }

    return response.data;
  }
  const onError = (error) => {
    if (__DEV__) {
      console.warn('Request Error', {error});
    }
    if (error?.response?.status === 401) {
      try {
        const currentRoute = navigationRef.current?.getCurrentRoute();
        if (currentRoute?.name !== 'Login Dashboard') {
          setAuthorization('removetoken');
          resetTo('Login Dashboard', 'init-state');
          ToastAndroid.show("401 #Not_authorized", ToastAndroid.SHORT);
        }
      } catch (ex) {
        console.warn('ex123', ex)
      }
    } else
    if (error?.response?.status === 403) {
      ToastAndroid.show("403 #Forbidden", ToastAndroid.SHORT);
    } else
    if (error?.response?.status === 404) {
      ToastAndroid.show("404 #Not_found", ToastAndroid.SHORT);
    } else
    if (error?.response?.status === 422) {
      Alert.callAlert(null, Object.values(error?.response?.data?.errors)[0][0] || error?.response?.data?.message || 'Terjadi Kesalahan Data');
    } else
    if (error?.response?.status === 429) {
      ToastAndroid.show("429 #Not_found", ToastAndroid.SHORT);
    } else
    if (error?.response?.status === 500) {
      Alert.callAlert(null, 'Maaf atas kejadian ini, Kami akan segera memperbaikinya');
    } else {
      ToastAndroid.show("#"+error?.response?.status + '#' +(error?.response?.data?.message), ToastAndroid.SHORT);
    }

    return Promise.reject(error?.response || error?.message);
  }
  if (options.headers['Content-Type'] == 'multipart/form-data') {
    return new Promise((resolve, reject) => {
    // this works
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", function() {
      if(this.readyState === 4 && this.status == 200) {
        console.warn('xhr',this.responseText);
        onSuccess(this);
        resolve(this);
      } else {
        if (this.readyState === 4) {
          console.warn('err', this);
          reject(this);
        }
      }
    });
    request.open(options.method, env.serverHost + '/' + options.url);

    request.setRequestHeader('Authorization', 'Bearer ' + getAuth.access_token);
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.send(options.data);
    });
  } else {
  return client(options)
    .then(onSuccess)
    .catch(onError);
  }
};

export default request;
