import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CricketRoute from './cricket';
import Tabs from './TabRoute';
const Route = () =>{
    return(
    <NavigationContainer>
            <Tabs />
    </NavigationContainer>
    );
}

export default Route;