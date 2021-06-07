import React from 'react';
import { View, Text,Image,StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import {HomeStack,CricketStack,MoreCricketStack,FootballStack,TennisStack} from './StackRoute';

const tabBarOtions = {
  activeTintColor: '#cc0202',
  inactiveTintColor: '#000',
  labelStyle: {
    fontSize: 12,
    marginBottom:4,
  },
  keyboardHidesTabBar: true
 
}

const Tabs = () =>{
  return (
    <Tab.Navigator tabBarOptions={tabBarOtions} >
      <Tab.Screen name="Home" component={HomeStack}  options={{
          tabBarIcon: ({focused}) => (
            <Image
                resizeMode={'cover'}
                source={focused ? require('../assets/icons/homer.png') : require('../assets/icons/home.png')}
                style={styles.bottomIcon}
              />
          ) }}
          
          /> 
      <Tab.Screen name="Cricket" component={CricketStack} options={{
          tabBarIcon: ({focused}) => (
            <Image
                resizeMode={'cover'}
                source={focused ? require('../assets/icons/c.png') : require('../assets/icons/cricket.png')}
                style={styles.bottomIcon}
              />
          ) }} />
      <Tab.Screen name="Football" component={FootballStack} options={{
          tabBarIcon: ({focused}) => (
            <Image
                resizeMode={'contain'}
                source={focused ? require('../assets/icons/f.png') : require('../assets/icons/football.png')}
                style={styles.bottomIcon}
              />
          ) }} />
      <Tab.Screen name="Tennis" component={TennisStack} options={{
          tabBarIcon: ({focused}) => (
            <Image
                resizeMode={'contain'}
                source={focused ? require('../assets/icons/te.png') : require('../assets/icons/tb.png')}
                style={styles.bottomIcon}
              />
          ) }} />
        <Tab.Screen name="More" component={MoreCricketStack} options={{
          tabBarIcon: ({focused}) => (
            <Image
                resizeMode={'contain'}
                source={focused ? require('../assets/icons/hamburger.png') : require('../assets/icons/hamburger.png')}
                style={styles.bottomIcon}
              />
          ) }} />
    </Tab.Navigator>
  );
}

export default Tabs;


const styles = StyleSheet.create({
  bottomIcon:{
      height:22,
      width:22,
      padding:0,
      marginTop:5
  }
})