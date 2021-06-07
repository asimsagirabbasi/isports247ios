import React,{useEffect} from 'react';
import { View, Text,ImageBackground,StyleSheet } from 'react-native';
import Layout from './common/Layout';
const SplashScreen = () => {
    return (
            <View style={styles.splashView}>
                <ImageBackground source={require('../assets/images/splash.png')} style={styles.image} />
            </View>        
    )
}

const styles = StyleSheet.create({
    splashView:{
        flex:1,
    },
    image: {
        resizeMode:'center',
        justifyContent:'center',
        flex:1,
    
    },
})
export default SplashScreen;