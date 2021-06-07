import React,{useState,useEffect} from 'react';
import { View, Text , FlatList,StyleSheet, ScrollView, ImageBackground,Image,ActivityIndicator,TouchableOpacity,Dimensions,TextInput,KeyboardAvoidingView} from 'react-native';
import {apiReq,apis,appURL} from '../utils/api';
import { primaryColor,whiteLightGrey } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

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
const Stream = ()=>{
    const [livematch,setLivematch] = useState([]);
    const navigation = useNavigation();
const Streamcall =  async() =>{
        apiReq.get('http://tvlivestreaming.online:3030/gettvlist')
        .then((response)=>{
            const data = response.data.reverse()
            setLivematch(data);
        }).catch((error)=>{
            popUp('Error!','Something went wrong');
        });

}
useEffect(()=>{
    Streamcall();
},[])
    return (
        <ScrollView>
            <Text style={{fontWeight:'bold',textAlign:'center',marginVertical:5,fontSize:16}}>Live Streaming</Text>
            {livematch.map((item,index)=>{
                return (
                <View style={{padding:10}} key={index}>  
                    <View style={{flex:1,backgroundColor:primaryColor,paddingVertical:10,paddingHorizontal:5}}>
                        <Text style={{fontWeight:'bold',fontSize:16,color:'#fff'}}>{item.eventTypeName}</Text>
                    </View>
                    <View>
                    {item.fixtures.map((dt,dtindex)=>{
                        return ( 
                            <TouchableOpacity key={dtindex} onPress={()=>navigation.navigate('StreamVideo',{id:dt.eventId})} style={{backgroundColor:whiteLightGrey,padding:10,borderBottomColor:"#ededee",borderBottomWidth:1}}>                
                                <Text>{dt.eventName}</Text>
                            </TouchableOpacity> 
                        )
                    })}
                    </View>
                </View>
                )
            })}
        </ScrollView>
    )
}
export default Stream;