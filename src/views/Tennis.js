import React,{useState,useEffect} from 'react';
import { View, Text , FlatList,Dimensions,StyleSheet, ScrollView, ImageBackground,Image,ActivityIndicator,TouchableOpacity} from 'react-native';
import Layout from './common/Layout';
import {apiReq,apis,appURL} from '../utils/api';
import { primaryColor } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('window');
import Matchslide from "./cricket/SliderBanner";
import styles from '../styles/styles';

const Tennis = () => {
    const [bannerOne,setBannerOne] = useState([]);
    const [blogs,setBlogs] = useState([]);
    const [loading,setLoading] = useState(true);
    const [banners,setBanners] = useState([]);
    const navigation = useNavigation();


    useEffect(()=>{
        apiReq.get(apis.tennisslide)
        .then((response)=>{
            setBannerOne(response.data.randomoneblog);
            setBlogs(response.data.randomblogs);
            setBanners(response.data.blogs);
            setLoading(false);
        }).catch((error)=>{
            console.log('error',error.response);
        });
    },[]);

    
    return loading ? <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>
    : 
    (
        
        <ScrollView style={{marginTop:0}}>
            <View style={{backgroundColor:'#fff',marginTop:0,paddingHorizontal:15,paddingBottom:10}}> 
                <View style={[styles.flexRow,{marginVertical:5}]}>
                    <View style={[styles.primaryBackground,{width:5,height:30}]}></View>
                    <View style={{justifyContent:'center'}}><Text style={[styles.smallHeadingCaption,{marginLeft:10}]}>Breaking News</Text></View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Blogdetail',{bannerOne:bannerOne,appURL:appURL})}>

                <ImageBackground source={{uri:appURL+bannerOne.image}} style={[{height:160}]} imageStyle={{borderRadius:10,resizeMode:'stretch'}} >
                    <View style={styles.cardSingleContainer}>
                        <Text style={styles.cardSingleContainerMainSmallHeading} numberOfLines={1}>{bannerOne.blog_title}</Text>
                        <Text style={styles.cardSingleContainerMainSmallHeading}>{bannerOne.tag}</Text>
                    </View>
                </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:15,marginVertical:10,height:200}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('Blogdetail',{bannerOne:blogs[0],appURL:appURL})}>
                <View style={{flex:1,backgroundColor:'#fff',padding:10,flex:1,marginRight:4,borderRadius:5,elevation:5,shadowOffset:1}}>
                    <View style={{flex:2}}>
                    <ImageBackground source={{uri:appURL+blogs[0].image}} style={{height:'100%',width:'100%'}} imageStyle={{borderRadius:10,resizeMode:'cover'}}>
                     
                     </ImageBackground>
                    </View>
 
                    <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={styles.smallHeadingCaption} numberOfLines={2}>{blogs[0].blog_title}</Text>
                            <Text style={styles.smallHeadingCaptionDesc}>{blogs[0].tag}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('Blogdetail',{bannerOne:blogs[1],appURL:appURL})}>

                <View  style={{flex:1,backgroundColor:'#fff',padding:10,flex:1,marginLeft:4,borderRadius:5,elevation:5}} >
                    <View style={{flex:2}}>
                    <ImageBackground source={{uri:appURL+blogs[1].image}} style={{height:'100%',width:'100%'}} imageStyle={{borderRadius:10,resizeMode:'cover'}}>
                    </ImageBackground>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={styles.smallHeadingCaption} numberOfLines={2}>{blogs[1].blog_title}</Text>
                            <Text style={styles.smallHeadingCaptionDesc}>{blogs[1].tag} </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>

            <View style={{backgroundColor:'#fff',marginVertical:5,paddingBottom:0,elevation:5,marginHorizontal:15,borderRadius:5}}> 
                <View style={[styles.flexRow,{marginVertical:5,marginHorizontal:15}]}>
                    <View style={[styles.primaryBackground,{width:5,height:30}]}></View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={[styles.smallHeadingCaption,{marginLeft:10}]} numberOfLines={1}>Tennis</Text>
                        <Text style={[{marginLeft:10,fontSize:10,color:'#626467'}]} numberOfLines={1}>Match Summary</Text>

                        </View>
                </View>
                {banners.map((item,index)=>{
                    return(
            <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('Blogdetail',{bannerOne:item,appURL:appURL})} key={index}>

                        <View  style={{padding:10,marginLeft:4,height:120}} key={index}>
                        <View style={{flex:1,flexDirection:'row'}}>
                             <View style={{flex:1}}>
                                 <ImageBackground source={{uri:appURL+item.image}} style={{height:'100%',width:'100%'}} imageStyle={{borderRadius:25,resizeMode:'cover'}}>
                                 </ImageBackground>
                             </View>
                             <View style={{flex:2,marginLeft:10}}>
                                 <Text style={styles.smallHeadingCaption} numberOfLines={2}>{item.blog_title}</Text>
                                 <Text style={[styles.smallHeadingCaptionDesc,{marginTop:10,lineHeight:16}]} numberOfLines={3}>{item.description.replace(/<\/?[^>]+(>|$)/g, "")} </Text>
                             </View>
                        </View>
                     </View>
                     </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
            

    
        
    )
}


export default Tennis;