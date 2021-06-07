import React,{useState,useEffect} from 'react';
import { View, Text ,Dimensions,Image, TouchableOpacity, FlatList,ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import Layout from '../common/Layout';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;
import axios from 'axios';
import styles from '../../styles/styles';
import {primaryColor,whiteLightGrey} from '../../styles/theme';

import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import Icons  from 'react-native-vector-icons/AntDesign';
import EIcons  from 'react-native-vector-icons/Entypo';

import {apiReq,apis,appURL} from '../../utils/api';

const initialLayout = { width: Dimensions.get('window').width };

var matchapi = "https://rest.entitysport.com/soccer/";
var token="?token=3ec70d2f8769b1a3bf9546e5e709beb2";

const FirstRoute = ({route}) => {
    const [comms,setComms] = useState([]);
    const {matchid} = route;
       useEffect(()=>{
        axios.get(matchapi+'matches/'+matchid+'/info'+token)
        .then((response)=>{
            setComms(response.data.response.items.commentary.reverse()); 
        }).catch((error)=>{
            console.log('error',error.response);
        }); 
    
       },[comms]);

    return(
    <View style={[styles.tabs,{paddingHorizontal:10}]}>
        <FlatList 
      data={comms}
      keyExtractor={(item,index) => item+index}
      renderItem={(item)=>(
            <View style={{flexDirection:'row',paddingVertical:10}}>
                <View style={{width:5,backgroundColor:item.item.event=='substitution'?'#4caf50':(item.item.event=='goal'?'#000':'#fff'),height:30,marginRight:5}} />
                
                <View style={{marginHorizontal:8,marginVertical:5}}>
                    <Text style={{color:'#6a6a6a'}}>{item.item.time}</Text>
                </View>
                {
                    item.item.event=='goal' && (
                        <View style={{marginHorizontal:5,marginVertical:5}}>
                            <Image source={require('../../assets/icons/goal.png')} style={{height:20,width:20}} />
                        </View>
                    )

                }
                {
                    item.item.event=='substitution' && (
                        <View style={{marginHorizontal:5,marginVertical:5}}>
                            <Image source={require('../../assets/icons/substitution.png')} style={{height:20,width:20}} />
                        </View>
                    )

                }
                
                <View style={{marginVertical:5}}>
                    <Text style={{color:'#6a6a6a'}} numberOfLines={2}>{item.item.sentence}</Text>
                </View>
            </View>
      )}
      ItemSeparatorComponent={()=> <View style={{height:1,backgroundColor:'#eee'}}/>}
      showsVerticalScrollIndicator={false}
      />
    </View>)
}
const SecondRoute = ({route}) => {
    const [events,setEvents] = useState([]);
    const {matchid} = route;
       useEffect(()=>{
        axios.get(matchapi+'matches/'+matchid+'/info'+token)
        .then((response)=>{
            setEvents(response.data.response.items.event.reverse()); 
        }).catch((error)=>{
            console.log('error',error.response);
        }); 
    
       },[events]);
    return(
    <View style={styles.tabs}>
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginVertical:20}}>


        <FlatList showsVerticalScrollIndicator={false}
      data={events}
      keyExtractor={(item,index) => item+index}
      renderItem={(item)=>(
        <View style={{flexDirection:'row',marginVertical:4}}>
            <View style={{flexDirection:'row',width:150}}>
                
                <View>
                    
                {item.item.type!='substitution'?<Text style={{color:'#1d0730',fontSize:13}}>{item.item.pname}</Text>:<Text style={{marginLeft:128}}></Text>}
                {item.item.type=='goal'?(item.item.assists!=null?<Text style={{color:'#737373',fontSize:12}}>{item.item.assists.pname}</Text>:<Text></Text>):<Text></Text>}
                </View> 
                {
                item.item.type=='card'?
                <View style={{height:18,width:13,borderRadius:2,backgroundColor:'#da0707',marginLeft:25}} />
                :<View />
            }
            {
                item.item.type=='goal'?
                <Image source={require('../../assets/icons/football.png')} style={{height:20,width:20,marginHorizontal:6}} />
                :null
            }
            </View>
            <View>
                <EIcons name="dots-three-vertical" color="rgba(151,151,151,.4)" />
                <EIcons name="dots-three-vertical" color="rgba(151,151,151,.4)" />
                <Text style={{color:'#737373',fontSize:16}}>{item.item.time}</Text>

            </View>
            <View style={{flexDirection:'row'}}>
            {
                item.item.type=='substitution'?
                <Image source={require('../../assets/icons/substitution.png')} style={{height:20,width:20,marginHorizontal:6}} />
                :null
            }
               
                    {
                item.item.type=='substitution' &&
                <View>
               <Text style={{color:'#1d0730',fontSize:13}}>{item.item.player_in_name}</Text>
                <Text style={{color:'#737373',fontSize:12}}>{item.item.player_out_name}</Text>
                </View> 
               
                    }
            </View>
        </View>)}
        />

        

        </View>
        
    </View>)
}
const ThirdRoute = ({route}) => {
    const [home,setHome] = useState([]);
    const [away,setAway] = useState([]);
    const [match,setMatch] = useState([]);

    const {matchid} = route;
       useEffect(()=>{
        axios.get(matchapi+'matches/'+matchid+'/info'+token)
        .then((response)=>{
            setHome(response.data.response.items.lineup.home.lineup.player);
            setAway(response.data.response.items.lineup.away.lineup.player);
            setMatch(response.data.response.items.match_info);
            console.log('lineup',response.data.response.items.lineup) 
        }).catch((error)=>{
            console.log('error',error.response);
        }); 
    
       },[home]);
    return(
    <View style={styles.tabs}>
        <ScrollView>
        {
                match.map((item,index)=>(
                 <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:15}}>
                    <View style={{flex:1,marginHorizontal:50}}>
                        <Image source={{uri:item.teams.home.logo}} style={{width:50,height:50}} />
                    </View>
                    <View style={{flex:1,marginHorizontal:50}}>
                        <Image source={{uri:item.teams.away.logo}} style={{width:50,height:50}} />
                    </View>
                </View>
                ))
            }
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flex:1}}>
                    {
                        home.map((i,index)=>(
                            <View style={{marginHorizontal:30,marginVertical:5}} key={index}>   
                                <Text style={{color:'#1d0730',fontSize:15,fontWeight:'bold'}}>{i.pname}</Text>
                                <Text style={{color:'#737373',fontSize:11}}>{i.name}</Text>
                            </View>
                        ))
                    }
                    

                </View>
                <View style={{flex:1}}>
                {
                        away.map((i,index)=>(
                            <View style={{marginHorizontal:30,marginVertical:5}} key={index}>   
                                <Text style={{color:'#1d0730',fontSize:15,fontWeight:'bold'}}>{i.pname}</Text>
                                <Text style={{color:'#737373',fontSize:11}}>{i.name}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
            {/* <View>
                <Text style={{color:'#e20001',fontSize:16,fontWeight:'bold',marginBottom:15}}>Match Official</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginHorizontal:4,color:'#52443b'}}>Referee : </Text>
                    <Text style={{marginHorizontal:4}}></Text>
                </View>
            </View> */}
        </ScrollView>
    </View>)
}
const FourthRoute = ({route}) => {
    const [stats,setStats] = useState([]);
    const [match,setMatch] = useState([]);
    const {matchid} = route;

       useEffect(()=>{
        axios.get(matchapi+'matches/'+matchid+'/statsv2'+token)
        .then((response)=>{
            setStats(response.data.response.items.statistics);
            setMatch(response.data.response.items.match_info);
        }).catch((error)=>{
            console.log('error',error.response);
        }); 
    
       },[stats]);
    return(
    <View style={styles.tabs}>
        <ScrollView>
        <View style={{marginHorizontal:2,marginVertical:15}}>

            {
                stats.map((i,index)=>(         
            <View style={{marginVertical:5}} key={'e'+index}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:8}}>
                <Text style={{textAlign:'left',marginLeft:25,color:'#e20001',fontWeight:'bold',fontSize:15}}>{i.home}</Text>
                    <Text style={{textAlign:'center',fontWeight:'700',color:'#5b5b5b',fontSize:15,textTransform:'uppercase'}}>{i.name}</Text>
                    <Text style={{textAlign:'right',marginRight:25,color:'#e20001',fontWeight:'bold',fontSize:15}}>{i.away}</Text>
                </View>
                <View style={{flexDirection:'row',height:14,backgroundColor:'#ededed',flexDirection:'row',marginHorizontal:20}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                        {
                            i.name=='Ball possession'?
                            [...Array(Math.floor(i.home/10))].map((i,index)=>(<View style={{width:8,height:14,backgroundColor:'#041bb7',borderColor:'#ededed',borderWidth:1,marginHorizontal:1}} key={'c'+index} />))
                            :
                            [...Array(i.home)].map((i,index)=>(<View style={{width:8,height:14,backgroundColor:'#041bb7',borderColor:'#ededed',borderWidth:1,marginHorizontal:1}} key={'d'+index} />))

                        }
                        
                    </View>
                    <View style={{flex:1,flexDirection:'row',marginHorizontal:20}}>
                        {   
                            i.name=='Ball possession'?
                            [...Array(Math.floor(i.away/10))].map((i,index)=>(<View style={{width:8,height:14,backgroundColor:'#041bb7',borderColor:'#ededed',borderWidth:1,marginHorizontal:1}} key={'a'+index} />))
                            :
                            [...Array(i.away)].map((i,index)=>(<View style={{width:8,height:14,backgroundColor:'#041bb7',borderColor:'#ededed',borderWidth:1,marginHorizontal:1}} key={'b'+index} />))


                        }
                    </View>
                </View>
            </View>
                ))
            }
            <View style={{margin:15}}>
                {/* <Text style={{color:'#e20001',fontSize:16,fontWeight:'bold',marginBottom:15}}>Match Official</Text> */}
                {match.map((i,idex)=>(
                    <View>
                    <View style={{flexDirection:'row'}} key={'com'+idex}>
                        <Text style={{marginHorizontal:6,color:'#52443b',fontWeight:'bold',fontSize:16}}>Tournament </Text>
                        <Text style={{marginHorizontal:6,fontSize:16}}>{i.competition.cname}</Text>
                    </View>

                    <View style={{flexDirection:'row'}} key={idex}>
                        <Text style={{marginHorizontal:6,color:'#52443b',fontWeight:'bold',fontSize:16}}>Stadium </Text>
                        <Text style={{marginHorizontal:6,fontSize:16}}>{i.venue.name}</Text>
                    </View>
                    <View style={{flexDirection:'row'}} key={idex}>
                        <Text style={{marginHorizontal:6,color:'#52443b',fontWeight:'bold',fontSize:16}}>Match Time </Text>
                        <Text style={{marginHorizontal:6,fontSize:16}}>{i.competition.startdate}</Text>
                    </View>
</View>
                        
                ))
}
            </View>
        </View>
        </ScrollView>
    </View>)
}
const FifthRoute = ({route}) => {
    const {matchid} = route;
    const [comms,setComms] = useState([]);
    return(
    <View style={styles.tabs}>
      <Text>Third</Text>
    </View>)
}
const FScoreCardDetail = ({route,navigation}) => {
    const { id } = route.params;
    const [index, setIndex] = useState(0);
    const [matchid,setMatchId] = useState(id);
    const Loader = () => <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>;

    const [matchinfo,setMatchInfo] = useState([]);
    const [matchinfodata,setMatchInfoData] = useState([]);
    const [loader,setLoader] = useState(true);

    useEffect(()=>{
        axios.get(matchapi+'matches/'+id+'/info'+token)
        .then((response)=>{
            setMatchInfo(response.data.response);
            //console.log('info',response.data.response);
            setLoader(false);
        }).catch((error)=>{
            setLoader(false);
            console.log('error',error.response);
        }); 

    },[matchinfo]);
    const [routes] = useState([
        { key: 'first', title: 'Commentary', matchid:id,matchinfo:matchinfo},
        { key: 'second', title: 'Overview' ,matchid:id},
        { key: 'third', title: 'Lineups' ,matchid:id},
        { key: 'fourth', title: 'Stats',matchid:id},
        //{ key: 'fifth', title: 'Table',matchid:id },
      ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third:ThirdRoute,
        fourth:FourthRoute,
       // fifth:FifthRoute
      });
      const renderTabBar = props => (
          <TabBar
          renderLabel={({ route, focused, color }) => (
              <Text style={{ color:'#000', margin: 0,fontWeight:'bold',fontSize:14 }}>
                {route.title}
              </Text>
            )}
            {...props}
            indicatorStyle={{ backgroundColor: primaryColor,}}
            style={{ backgroundColor:whiteLightGrey}}
            contentContainerStyle={{marginHorizontal:0}}
            indicatorContainerStyle={{}}
          />
        ); 
    return ( 
    <SafeAreaView  style={[styles.mainLayout,{marginTop:0}]}>
          
        <View style={[styles.layoutSpacing,{flex:1}]}>
        
            <View style={[styles.flex1,{elevation:1,borderRadius:0,backgroundColor:'#fff'}]}>
                <View style={[{height:'5%',width:'100%',flexDirection:'row',paddingLeft:20,marginBottom:0,backgroundColor:'#a00001'}]}>
                  <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                      <Icon name="arrow-back-ios"  size={18} color="#fff"/> 
                    </TouchableOpacity>
                  </View>
                   <View >
                   <Text style={[{fontWeight:'bold',fontSize:13,marginHorizontal:5,marginTop:20,color:'#fff'}]}> 
                      Back 
                      </Text>
                   </View>   
                </View>
                <View style={{height:'95%'}}>
                <View>
                {loader?<Loader/>:
                matchinfo.items.match_info.map((item,index)=>{
                return (
                    <View style={{height:180, borderBottomColor:'#efefef',paddingHorizontal:20,backgroundColor:'#a00001'}} key={index}>
    
    <View style={{flexDirection:'row',marginTop:10}}>
        <View style={{marginHorizontal:5}}>
            <Image source={{uri:item.teams.home.logo}} style={{width:50,height:50}} />
        </View>
        <View style={{marginHorizontal:5}}>
            <Image source={{uri:item.teams.away.logo}} style={{width:50,height:50}} />
        </View>
    </View>
  
  <View style={[styles.flex1,styles.flexRow,{justifyContent:'space-between',alignItems:'center'}]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{justifyContent:'center'}} >
                          <Text style={styles.footbalteamname}>{item.teams.home.fullname}</Text>
                        </View>
                    </View>
                    
                    <View style={{width:40,height:40,backgroundColor:'#e20001'}}>
                        <Text style={{fontSize:26,color:'#fff',fontWeight:'bold',textAlign:'center'}}>{item.result.home}</Text>
                    </View>
    </View>
    <View style={[styles.flex1,styles.flexRow,{justifyContent:'space-between',alignItems:'center'}]}>
    <View style={{flexDirection:'row'}}>
                        <View style={{justifyContent:'center'}} >
                          <Text style={styles.footbalteamname}>{item.teams.away.fullname}</Text>
                        </View>
                    </View>
                    <View style={{width:40,height:40,backgroundColor:'#e20001'}}>
                        <Text style={{fontSize:26,color:'#fff',fontWeight:'bold',textAlign:'center'}}>{item.result.away}</Text>
                    </View>
    </View>

</View>
                )
                })
                }
    


</View>
<TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    
    />
</View>
                
</View>



        </View>
    </SafeAreaView>     
    )
}


export default FScoreCardDetail;