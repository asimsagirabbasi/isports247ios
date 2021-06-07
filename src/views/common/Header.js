import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native';
import {primaryColor} from '../../styles/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header = React.memo(() => {
    const navigation = useNavigation();
    const [isLogin,setIsLogin] = useState(false);
    useEffect(()=>{
        AsyncStorage.getItem('@islogin').then((resp)=>{
            const resplogin = resp?true:false;
            setIsLogin(resplogin);
        })
    },[])
    
    
    return (
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:6,justifyContent:'center'}}>
                    <Image style={styles.logo} 
                    source={require('../../assets/images/splash.png')}
                    />
                </View>
                <TouchableOpacity onPress={()=>isLogin?navigation.navigate('Stream'):navigation.navigate('Login')} >
                    <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Image style={styles.livelogo} 
                        resizeMode="contain"
                        source={require('../../assets/images/live.png')}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    <View style={styles.bell}>
                        <Icons name="bell" color="#fff" size={18} />
                    </View>
                </View>
            </View>       
    )
})

export default Header;

const styles = StyleSheet.create({
    header:{
        height:50,
        backgroundColor:'#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 5,
        shadowColor:'#ccc'
    },
    logo:{
        width: 125,height:50
    },
    livelogo:{
        width: 125,height:40,

    },
    bell:{
        width:26,height:26,
        borderRadius:50,
        backgroundColor: primaryColor,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    }
})