/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from "react-native-bootsplash";
import Route from './src/routes';
import SplashScreen from './src/views/Splash';
import FlashMessage from "react-native-flash-message";
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [splash,setSplash] = useState(true);
  useEffect(()=>{
      setTimeout(()=>{
        setSplash(false);
      },0)
      
  })
  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
  
    // Get the token
    const token = await messaging().getToken();
  
    // Save the token
    //await postToApi('/users/1234/tokens', { token });
  }
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };
     messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage.notification,
            );
            navigation.navigate(remoteMessage.data.type);
          });
      
          // Check whether an initial notification is available
          messaging()
            .getInitialNotification()
            .then(remoteMessage => {
              if (remoteMessage) {
                console.log(
                  'Notification caused app to open from quit state:',
                  remoteMessage.notification,
                );
                setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
              }
            });

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);
  
  return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#cc0202" />
          <Route />
          <FlashMessage position="bottom" style={{marginBottom:60}} />
      </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
 
});
export default App;
