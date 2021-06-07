import React,{useState,useEffect} from 'react';
import { View, Text , FlatList,StyleSheet, ScrollView, ImageBackground,Image,ActivityIndicator,TouchableOpacity,Dimensions,TextInput,KeyboardAvoidingView} from 'react-native';
import {apiReq,apis,appURL} from '../utils/api';
import { primaryColor,whiteLightGrey } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage, hideMessage } from "react-native-flash-message";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';



const popUp = (msg,desc) => {
    showMessage({
        message:msg,
        description: desc,
        type: "default",
        floating:true,
      });
}
const Signup = ()=>{
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [showmsg, setShowMsg] = useState(false);
    var device;
   
      // Register the device with FCM
    //messaging().registerDeviceForRemoteMessages();
    // Get the token
    //const token =  messaging().getToken();

    const checkPermission = async() => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            device = await messaging().getToken()
            //alert(device);
            //AsyncStorage.setItem('token', JSON.stringify(device));
            console.warn(device);
        }
        else getPermission() 
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
    const Signupcall = async() =>{
        await checkPermission();
        if(name.length<=0){
         setMsg('Name is Mendatory');
         setShowMsg(true);
         return ;   
        }else if(email.length<=0){
            setMsg('Email is Mendatory');
         setShowMsg(true);
            return ;   
        }else if(password.length<=0){
            setMsg('Password is Mendatory');
         setShowMsg(true);
            return ;   
        }else{
            if(name=='' || password=='' || email==''){
                popUp('Validation Error','All fields are mendatory');
                return ;
            }
        setMsg('');
         setShowMsg(false);
            const data = `name=${name}&password=${password}&email=${email}&token=${device}`;
            apiReq.get(apis.signup(data))
            .then((response)=>{
                const userresp = JSON.stringify(response.data);
                //AsyncStorage.setItem('user', userresp);
                console.log('signin data',response.data)
                popUp('Isport247',response.data.message);
                if(response.data.isSignup){
                    navigation.navigate('Login');
                }    
                
            }).catch((error)=>{
                popUp('Error','Something went wrong.');
                console.log('error',error.response);
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
                    <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>Register</Text>
                </View>
              
                <View style={{marginTop:30,width:'86%'}}>
                <KeyboardAvoidingView enabled>
                    <View style={{backgroundColor:'#fefeff',borderTopRightRadius:80,borderBottomWidth:0.5,borderBottomColor:'#efefef',height:80,elevation:5,zIndex:0}}>
                        <TextInput style={{marginVertical:20,width:'80%',marginHorizontal:20}} placeholder="Username" value={name} onChangeText={name=>setName(name)} />
                    </View>
                    <View style={{backgroundColor:'#fefeff',borderBottomWidth:0.5,borderBottomColor:'#efefef',height:80,elevation:5,zIndex:0}}>
                        <TextInput style={{marginVertical:20,width:'80%',marginHorizontal:20}} placeholder="Email" value={email} onChangeText={email=>setEmail(email)}/>
                    </View>
                    <TouchableOpacity onPress={()=>Signupcall()} style={{position:'absolute',top:85,zIndex:1,elevation:6,right:-20}}>
                    <View style={{height:70,width:70,backgroundColor:primaryColor,borderRadius:50,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                       
                            <Icon name="arrow-right-alt" color="#fff" size={40} />
                        
                    </View>
                    </TouchableOpacity>
                   
                    <View style={{backgroundColor:'#fefeff',borderBottomRightRadius:80,borderBottomWidth:0.5,borderBottomColor:'#efefef',height:80,elevation:5,zIndex:0}}>
                        <TextInput   style={{marginVertical:20,width:'80%',marginHorizontal:20}} placeholder="Password" value={password} onChangeText={password=>setPassword(password)} secureTextEntry={true}/>
                    </View>
                    {showmsg && <Text style={{color:primaryColor,margin:10}}>{msg}</Text>}
                    </KeyboardAvoidingView>
                </View>

                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{marginTop:30,width:'40%',backgroundColor:'#fefeff',borderTopRightRadius:80,borderBottomRightRadius:80,elevation:5,padding:25}}>
                            <Text style={{color:primaryColor,fontSize:20,fontWeight:'bold'}}>Login</Text>
                    </TouchableOpacity>
            </View>
           
        </View>
    )
}
export default Signup;