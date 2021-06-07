import React,{useState,useEffect} from 'react';
import { View, Text , FlatList,StyleSheet, ScrollView, ImageBackground,Image,ActivityIndicator,TouchableOpacity,Dimensions,TextInput,KeyboardAvoidingView} from 'react-native';
import {apiReq,apis,appURL} from '../utils/api';
import { primaryColor,whiteLightGrey } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage, hideMessage } from "react-native-flash-message";
import Video from 'react-native-video';
const popUp = (msg,desc) => {
    showMessage({
        message:msg,
        description: desc,
        type: "default",
        floating:true
      });
}
const StreamVideo = ({route})=>{
    const [livematch,setLivematch] = useState([]);
    const navigation = useNavigation();
    const {id} = route.params;
    return ( <WebView source={{ uri:`https://tvlivestreaming.online/live_tv_app/index.html?eventId=${id}`}} />)
}
export default StreamVideo;
var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 100,
      left: 0,
      bottom: 0,
      right: 0,
      width:width,
      height:300,
      flex:1
    },
  });