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



const TriangleLeft = ({color}) => {
    return <View style={[styles.triangle,{ borderBottomColor: color}]} />;
  };
  
const showMenu = (menu,setPage)=>{
    setPage(menu);
}
const VerticalBar = React.memo(({page,label,setPage,activepage,image}) => {
    return (
    <View style={{height:70,width:'100%'}}>
        <TouchableOpacity onPress={()=>{showMenu(activepage,setPage)}} style={{flex:1,paddingVertical:15,flexDirection:'row'}}>
            <View style={{alignItems:'center',flex:1}}>
                <View style={{flexDirection:'row',justifyContent:'center',width:'100%',height:'100%'}}>
                    <View style={{flex:7,alignItems:'center',height:'100%',backgroundColor:'transparent'}}>
                        <Image
                            resizeMode="contain"
                            source={image}
                            style={{width:35,height:35,marginLeft:10,resizeMode:'cover'}}
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
})
const CricketMenu = React.memo(({navigation}) => {
    const [page,setPage] = useState('live');
    return (
        <SafeAreaView  style={[styles.mainLayout,{marginTop:0}]}>
          
            <View style={[styles.layoutSpacing,{flex:1}]}>
            <View style={styles.flex1}>
                <View style={[styles.primaryBackground,{height:'20%',position:'absolute',width:'100%'}]}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:13,marginHorizontal:30,marginTop:20}}>Quick Links</Text>
                </View>
                <View style={{backgroundColor:'#fff',marginHorizontal:20,borderRadius:25,height:'90%',zIndex:9999,top:60,left:0,flexDirection:'row'}}>
                    <View style={{backgroundColor:whiteLightGrey,borderTopLeftRadius:25,borderBottomLeftRadius:25,flex:1,borderColor:'rgba(0,0,0,0.35)',elevation:5}}>
                       <VerticalBar key={1} activepage='live' label="Live Scores" setPage={setPage} page={page} image={require('../../assets/icons/scoreboardm.png')} />
                       <VerticalBar key={2} activepage='series' label="Series" setPage={setPage} page={page} image={require('../../assets/icons/trophy.png')} />
                       <VerticalBar key={3} activepage='news' label="News" setPage={setPage} page={page} image={require('../../assets/icons/contract.png')} /> 
                                             
                    </View>
                    <View style={{flex:3}}>
                    {page=='live' &&
                        <LiveScoreMenuContent  navigation={navigation} />
                    }
                    {page=='series' &&
                        <SeriesMenuContent />
                    }
                    {page=='news' &&
                        <NewsMenuContent />
                    }
                    </View>
                </View>
            </View>
        </View>
        </SafeAreaView>
        
    )
})

export default CricketMenu;