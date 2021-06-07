import React,{useState} from 'react';
import { View, Text , FlatList,Dimensions,StyleSheet, ScrollView, ImageBackground,Image, TouchableOpacity,SafeAreaView } from 'react-native';
import Layout from '../common/Layout';
const arr = [{"id":1},{"id":2}];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

import styles from '../../styles/styles';
import {primaryColor,whiteLightGrey} from '../../styles/theme';

import LiveScoreMenuContent from "../cricket/LiveScoreMenuContent";
import SeriesMenuContent from "../cricket/SeriesMenuContent";
import NewsMenuContent from "../cricket/NewsMenuContent";
import HTML from "react-native-render-html"

import Icon  from 'react-native-vector-icons/MaterialIcons';

const TriangleLeft = ({color}) => {
    return <View style={[styles.triangle,{ borderBottomColor: color}]} />;
  };
  
const showMenu = (menu,setPage)=>{
    setPage(menu);
}
const VerticalBar = React.memo(({page,label,setPage,activepage,image}) => {
    return (
    <View style={{height:75,width:'100%'}}>
        <TouchableOpacity onPress={()=>{showMenu(activepage,setPage)}} style={{flex:1,paddingVertical:15,justifyContent:'center',flexDirection:'row'}}>
            <View style={{alignItems:'center',width:'100%'}}>
                <View style={{flexDirection:'row',justifyContent:'center',width:'100%'}}>
                    <View style={{flex:7,alignItems:'center'}}>
                        <Image
                            resizeMode={'contain'}
                            source={image}
                            style={{width:30,height:30,marginLeft:10}}
                        />
                    </View>
                    <View style={{justifyContent:'center',flex:1}}>
                        <TriangleLeft color={page==activepage?primaryColor:whiteLightGrey} />
                    </View>
                </View>
                <View> 
                    <Text style={{fontSize:12,color:page==activepage?primaryColor:'#000'}}>{label}</Text>
                </View>
            </View>
        </TouchableOpacity> 
    </View>
    );
});
const Blogdetail = React.memo(({navigation,route}) => {
    const [page,setPage] = useState('live');
    const {bannerOne,appURL} = route.params;
    return (
        <SafeAreaView  style={[styles.mainLayout,{marginTop:0}]}>
          
            <View style={[styles.layoutSpacing,{flex:1}]}>

            <View style={styles.flex1}>
                <View style={[{height:'35%',width:'100%',backgroundColor:'transparent'}]}>
                <ImageBackground source={{uri:appURL+bannerOne.image}} style={[styles.cardSingleDetail]} imageStyle={{borderRadius:0,resizeMode:'cover',marginTop:0}} >
                <View style={{justifyContent:'flex-end',margin:15}}>
                  <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                      <Icon name="arrow-back-ios"  size={16} color="#fff"/> 
                    </TouchableOpacity>
                </View>
                </ImageBackground>    
                </View>
                <ScrollView style={{backgroundColor:'#fff',marginHorizontal:0,borderRadius:25,zIndex:9999,top:-10,flex:1}}>
                   
                    <View style={{flex:3}}>
                    <View style={{marginVertical:10,margin:20}}>
                    <Text style={[{backgroundColor:'transparent',color:'#000',borderRadius:25,padding:4,overflow:'hidden',fontSize:12}]}>{bannerOne.tag}</Text>
                        <Text style={[styles.cardSingleContainerMainHeading,{color:'#111'}]} numberOfLines={2}>{bannerOne.blog_title}</Text>  
                    </View>
                        {/* <View style={{marginVertical:10,margin:20}}>
                            <Text style={{fontWeight:'bold',fontSize:16}} numberOfLines={2}>{bannerOne.blog_title}</Text>
                        </View> */}
                        <HTML source={{ html: bannerOne.description}} contentWidth={windowWidth} containerStyle={{marginHorizontal:20}} />
                    
                    </View>
                </ScrollView>
            </View>
        </View>
        </SafeAreaView>
        
    )
});

export default Blogdetail;