import React,{useEffect,useState} from 'react';
import {InteractionManager, View, Text , FlatList,Dimensions,StyleSheet, ScrollView, ImageBackground,Image,ActivityIndicator, TouchableOpacity,SafeAreaView} from 'react-native';
import {Body} from 'native-base';
import Layout from './common/Layout';
import styles from '../styles/styles';

const WIDTH = Dimensions.get('window');
import {apiReq,apis,appURL} from '../utils/api';
import { primaryColor } from '../styles/theme';
import SliderBanner from './cricket/SliderBanner';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import axios from 'axios';
var matchapi = "https://rest.entitysport.com/v2/";
var token="?token=941c744388c7a15576a8bdbad07ac356";
const today = new Date()
const cdate = new Date(today)
const pdate = new Date(today)
cdate.setMonth( cdate.getMonth() + 1 );
pdate.setMonth( pdate.getMonth() + 1 );

cdate.setDate(cdate.getDate() + 2)
pdate.setDate(pdate.getDate() - 1)

const cdateD = cdate.getFullYear()+'-'+cdate.getMonth()+'-'+cdate.getDate();
const prevdateD = pdate.getFullYear()+'-'+pdate.getMonth()+'-'+pdate.getDate();
 

const Home = () => {
    const [bannerOne,setBannerOne] = useState([]);
    const [blogs,setBlogs] = useState({});
    const [blogs1,setBlogs1] = useState({});
    const [blogs2,setBlogs2] = useState({});

    const [loading,setLoading] = useState(true);
    const [banners,setBanners] = useState([]);
    const [sliderArr,setSliderArr] = useState([]);
    const navigation = useNavigation();
     
    useEffect(()=>{
        InteractionManager.runAfterInteractions(() => {
                apiReq.get(apis.home).then((response)=>{
                setBannerOne(response.data.randomoneblog);
                setBlogs(response.data.randomblogs);
                setBlogs1(response.data.randomblogs1);
                setBlogs2(response.data.randomblogs2);
                setBanners(response.data.banners);
                setLoading(false);
            }).catch((error)=>{
                setLoading(false);
            });
                axios.get(matchapi+'matches'+token+'&date='+prevdateD+'_'+cdateD+'&per_page=50')
        .then((response)=>{
            setSliderArr(response.data.response.items)
        }).catch((error)=>{
        });
        
        });
    },[]);

    { 
        return loading ? <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>
    : 
    (
        <SafeAreaView  style={[styles.mainLayout,{marginTop:10}]}>
        <View style={[styles.layoutSpacing,{flex:1}]}>
            <View style={{marginLeft:5}}> 
            
                <FlatList data={sliderArr}  renderItem={(item,index)=>(item.item.format!=5 && item.item.format!=4 ? <SliderBanner item={item} key={index} />:null)}
                    horizontal={true} showsHorizontalScrollIndicator={false}
                    keyExtractor={(item,index)=>item+index}  
                />
            </View>
            <ScrollView style={{backgroundColor:'#fff',marginTop:10,paddingHorizontal:15}}>  
            
                <TouchableOpacity onPress={()=>navigation.navigate('Blogdetail',{bannerOne:bannerOne,appURL:appURL})}>
                <ImageBackground source={{uri:appURL+bannerOne.image}} style={[styles.cardSingle]} imageStyle={{borderRadius:10,resizeMode:'cover',marginTop:10}} >
                    <View style={styles.cardSingleContainer}>
                        <Text style={styles.cardSingleContainerMainHeading} numberOfLines={2}>{bannerOne.blog_title}</Text>
                        <Text style={styles.cardSingleContainerSubHeading}>{bannerOne.tag}</Text>
                    </View>
                </ImageBackground>
                </TouchableOpacity>
                <View style={[styles.flexRow,{marginVertical:10,height:260}]}>
                    <View style={[styles.flex1,{marginRight:5,justifyContent:'center'}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Blogdetail',{bannerOne:blogs,appURL:appURL})}>
                        <ImageBackground source={{uri:appURL+blogs.image}} style={{height:'100%',width:'100%'}} imageStyle={{borderRadius:25,resizeMode:'cover'}}>
                            <View style={styles.cardSingleContainer}>
                                <View style={{width:70,height:25,borderRadius:50,backgroundColor:'#0223cc',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>{blogs.blog_cat.name}</Text>
                                </View>
                                <Text style={styles.cardSingleContainerMainHeading} numberOfLines={2}>{blogs.blog_title}</Text>
                                <Text style={styles.cardSingleContainerSubHeading}>{blogs.tag}</Text>
                            </View>
                        </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.flex1]}>
                        <View style={[styles.flex1,{justifyContent:'center',marginBottom:5}]}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Blogdetail',{bannerOne:blogs1,appURL:appURL})}>
                            <ImageBackground source={{uri:appURL+blogs1.image}} style={{height:'100%',width:'100%'}} imageStyle={{borderRadius:25,resizeMode:'cover'}}>
                                <View style={styles.cardSingleContainer}>
                                <View style={{width:70,height:25,borderRadius:50,backgroundColor:'#cc0202',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>{blogs1.blog_cat.name}</Text>
                                </View>
                                    <Text style={styles.cardSingleContainerMainHeading} numberOfLines={3}>{blogs1.blog_title}</Text>
                                    {/* <Text style={styles.cardSingleContainerSubHeading}>{blogs1.tag}</Text> */}
                                </View>
                            </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.flex1,{justifyContent:'center',marginTop:5}]}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Blogdetail',{bannerOne:blogs2,appURL:appURL})}>
                            <ImageBackground source={{uri:appURL+blogs2.image}} style={{height:'100%',width:'100%'}} imageStyle={{borderRadius:25,resizeMode:'cover'}}>
                                <View style={styles.cardSingleContainer}>
                                <View style={{width:100,height:25,borderRadius:50,backgroundColor:'#f5b507',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>{blogs2.blog_cat.name}</Text>
                                </View>
                                    <Text style={styles.cardSingleContainerMainHeading} numberOfLines={3}>{blogs2.blog_title}</Text>
                                    {/* <Text style={styles.cardSingleContainerSubHeading}>{blogs2.tag}</Text> */}
                                </View>
                            </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <FlatList data={banners}  renderItem={(item,index) => (<VSlider item={item.item} appURL={appURL} key={index} />) } 
            showsVerticalScrollIndicator={false}
                    keyExtractor={(item,index)=>item+index}  
                />      
            </ScrollView>
                          
           
        </View>
        </SafeAreaView>
    
    )}
}


const VSlider = React.memo(({item}) =>{
    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={()=>navigation.navigate('Blogdetail',{bannerOne:item,appURL:appURL})} style={{flex:1}}>
    
    <View style={[styles.flexRow,{marginVertical:10,height:200}]}>
          <View style={[styles.flex1,{marginRight:5,justifyContent:'center'}]}>
        <ImageBackground source={{uri:appURL+item.image}} style={{height:'100%',width:'100%'}} imageStyle={{borderRadius:10,resizeMode:'cover'}}>
            <View style={styles.cardSingleContainer}>
                {/* <Text style={styles.cardSingleContainerMainHeading} numberOfLines={2}>{item.blog_title}</Text> */}
                <Text style={styles.cardSingleContainerSubHeading}>{item.tag}</Text>
            </View>
        </ImageBackground>
    </View>
    <View style={[styles.flex1,{marginHorizontal:5}]}>
            <View style={{marginVertical:10}}>
                <View style={{width:20,height:20}}>
                    <Image source={require('../assets/icons/group-icon-png.png')} resizeMode="contain" style={{width:20,height:20}}/>
                </View>
                <Text style={{fontSize:14,color:'#626467'}}  numberOfLines={1}>Editors Choice</Text>
            </View>
            <View>
                <Text style={{fontSize:16,fontWeight:'bold',marginBottom:6}}  numberOfLines={2}>{item.blog_title}</Text>
                <Text style={{fontSize:12,color:'#626467'}} numberOfLines={3}>{item.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            </View>
            <View style={[styles.flexRow,{marginTop:10}]}>
            <View style={{width:30,height:30}}>
                    <Image source={require('../assets/icons/group-icon-png.png')} resizeMode="cover" style={{width:20,height:20}}/>
                </View>
                <View>
                <Text style={{fontSize:14,color:'#000',fontWeight:'bold'}}>Admin</Text>

                </View>
            </View>
    </View>
</View>
</TouchableOpacity>

)
})

export default Home;