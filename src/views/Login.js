import React,{useState,useEffect} from 'react';
import { View, Text , FlatList,StyleSheet, ScrollView, ImageBackground,Image,ActivityIndicator,TouchableOpacity,Dimensions,TextInput,KeyboardAvoidingView} from 'react-native';
import {apiReq,apis,appURL} from '../utils/api';
import { primaryColor,whiteLightGrey } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage, hideMessage } from "react-native-flash-message";

const popUp = (msg,desc) => {
    showMessage({
        message:msg,
        description: desc,
        type: "default",
        floating:true
      });
}
export const getItem = async(item) => {
    try {
        const value = await AsyncStorage.getItem(item);
        return JSON.parse(value);
    } catch (error) {
        return null;
    }
};

export const setItem = async(item,value)=>{
    try {
        await AsyncStorage.setItem(item, JSON.stringify(value));
    } catch (error) {
        console.log("SetItem error ",error)
        return null;
    }
}
const Login = ()=>{
const navigation = useNavigation();
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [msg, setMsg] = useState("");
const [showmsg, setShowMsg] = useState(false);
const [userData, setUserData] = useState({});
const [device, setDevice] = useState("");

useEffect(()=>{
    checkPermission();
    const user =  AsyncStorage.getItem('userData')
},[])

const checkPermission = async() => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
        devicetoken = await messaging().getToken()
    
        await AsyncStorage.setItem('token', JSON.stringify(devicetoken));
        setDevice(devicetoken)
        //console.warn(device);
    }
    else getPermission() 
} 

const storeUser = async(userresp) =>{
    await AsyncStorage.setItem('userData', userresp);
}

const getPermission = async() => {
    messaging().requestPermission()
    .then(() => {
        checkPermission()
    })
    .catch(error => {
        // User has rejected permissions  
    });
} 
const Logincall = () =>{
    const saveData = async (userdata) => {
        try {
          await AsyncStorage.setItem('@userData',JSON.stringify(userdata))
          //alert('Data successfully saved')
        } catch (e) {
         // alert('Failed to save the data to the storage')
        }
      }
      const saveDataLogin = async (userdata) => {
        try {
          await AsyncStorage.setItem('@islogin',userdata)
          //alert('Data successfully saved')
        } catch (e) {
         // alert('Failed to save the data to the storage')
        }
      }
      const readData = async () => {
        try {
          const userData = await AsyncStorage.getItem('@userData');
          //alert(userData);
        } catch (e) {
          //alert('Failed to fetch the data from storage')
        }
      }
    
    if(name.length<=0){
     setMsg('Email is Mendatory');
     setShowMsg(true);
     return ;   
    }else if(password.length<=0){
        setMsg('Password is Mendatory');
     setShowMsg(true);
        return ;   
    }else{
        setMsg('');
     setShowMsg(false);
     
        const data = `name=${name}&password=${password}&token=${device}`;
        apiReq.get(apis.login(data))
        .then((response)=>{
            var userresp = response.data.user;
            setUserData(userresp);
            saveData(userresp);
            popUp('Isport247',response.data.message);
            if(response.data.isLogin){
                saveDataLogin('1');
                navigation.navigate('Stream');
            }
            
        }).catch((error)=>{
            popUp('Isport247','Something went wrong');
            ///console.log('error6',error.response);
        });
    }
}
    return (
        <View>
            <View  style={{width:width,height:'30%'}}>
                <ImageBackground source={require('../assets/images/login.jpg')} resizeMode="cover" style={{flex:1,justifyContent:'center'}} >
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:30,fontWeight:'bold'}}>Isports247</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{height:'71%',width:width,backgroundColor:'#fff',borderTopEndRadius:15,borderTopLeftRadius:15,top:-10,paddingVertical:50}}>
                <View style={{marginVertical:0}}>
                    <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>Login</Text>
                </View>
               
                <View style={{marginTop:30,width:'86%'}}>
                <KeyboardAvoidingView enabled>
                    <View style={{backgroundColor:'#fefeff',borderTopRightRadius:80,borderBottomWidth:0.5,borderBottomColor:'#efefef',height:80,elevation:5,zIndex:0}}>
                        <TextInput style={{marginVertical:20,width:'80%',marginHorizontal:20}} placeholder="Email" value={name} onChangeText={text=>setName(text)}/>
                    </View>
                    <TouchableOpacity onPress={()=>Logincall()} style={{position:'absolute',top:45,zIndex:1,elevation:6,right:-20}}>
                    <View style={{height:70,width:70,backgroundColor:primaryColor,borderRadius:50,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                       
                            <Icon name="arrow-right-alt" color="#fff" size={40} />
                        
                    </View>
                    </TouchableOpacity>
                    <View style={{backgroundColor:'#fefeff',borderBottomRightRadius:80,borderBottomWidth:0.5,borderBottomColor:'#efefef',height:80,elevation:5,zIndex:0}}>
                        <TextInput   style={{marginVertical:20,width:'80%',marginHorizontal:20}} placeholder="Password" value={password} onChangeText={text=>setPassword(text)} secureTextEntry={true}/>
                    </View>
                    {showmsg && <Text style={{color:primaryColor,margin:10}}>{msg}</Text>}
                    </KeyboardAvoidingView>
                </View>

                    <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={{marginTop:30,width:'40%',backgroundColor:'#fefeff',borderTopRightRadius:80,borderBottomRightRadius:80,elevation:5,padding:25}}>
                            <Text style={{color:primaryColor,fontSize:20,fontWeight:'bold'}}>Register</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}
export default Login;