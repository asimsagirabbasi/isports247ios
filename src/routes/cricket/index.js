import React from 'react';
import {View,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../views/Home';
const CricketHomeStack = createStackNavigator();

const CricketRoute = () =>{
    return(
    <CricketHomeStack.Navigator>
        <CricketHomeStack.Screen name="Home" component={Home} />
    </CricketHomeStack.Navigator>
    );

}

export default CricketRoute;

