import React,{useState,useEffect} from 'react';
import { View, Text ,Dimensions,Image, TouchableOpacity, FlatList,ActivityIndicator, ScrollView,SafeAreaView } from 'react-native';
import Layout from '../common/Layout';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

import styles from '../../styles/styles';
import {primaryColor,whiteLightGrey} from '../../styles/theme';

import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import Icons  from 'react-native-vector-icons/AntDesign';
import {apiReq,apis,appURL} from '../../utils/api';
import {Accordion} from 'native-base';

const ListMatch = ({item}) => (
  <View>
    <View style={{ backgroundColor:whiteLightGrey,paddingHorizontal:20,height:80,paddingVertical:20}}>
        <View style={[styles.flex1,styles.flexRow,{}]}>
                    <View style={{flexDirection:'row'}}>
                        <View >
                          <Text style={[styles.matchScoreText,{color:'#ec0606'}]}>{item.item.over}.{item.item.ball}</Text>
                        </View>
                        <View style={{marginHorizontal:10}}>
                            <View>  
                                <Text style={{color:'#000',fontSize:12,paddingRight:50}} numberOfLines={4}>{item.item.commentary}</Text>
                            </View>
                            <View>  
                                <Text numberOfLines={1} style={{color:'#ccc'}}></Text>
                            </View>
                        </View>
                    </View>
                    
        </View>
    </View>

</View> 
);
const ListMatchComplete = ({item}) => {
    return item.item.event=='overend'?
        (
            <View style={{ backgroundColor:primaryColor,paddingHorizontal:20,height:40,paddingVertical:10}}>
                <View style={{flexDirection:'row'}}>
                          <View >
                            <Text style={[styles.matchScoreText,{color:'#fff'}]}></Text>
                          </View>
                          <View style={{marginHorizontal:10}}>
                              <View>  
                                  <Text style={{color:'#fff',fontSize:12,paddingRight:50,fontWeight:'bold'}} numberOfLines={1}>{item.item.commentary}</Text>
                              </View>
                              <View>  
                                  <Text numberOfLines={1} style={{color:'#ccc'}}></Text>
                              </View>
                          </View>
                      </View>
            </View> 
        )
    :
    (<View>
      <View style={{ backgroundColor:whiteLightGrey,paddingHorizontal:20,height:80,paddingVertical:20}}>
          <View style={[styles.flex1,styles.flexRow,{}]}>
                      <View style={{flexDirection:'row'}}>
                          <View >
                            <Text style={[styles.matchScoreText,{color:'#ec0606'}]}>{item.item.over}.{item.item.ball}</Text>
                          </View>
                          <View style={{marginHorizontal:10}}>
                              <View>  
                                  <Text style={{color:'#000',fontSize:12,paddingRight:50}} numberOfLines={4}>{item.item.commentary}</Text>
                              </View>
                              <View>  
                                  <Text numberOfLines={1} style={{color:'#ccc'}}></Text>
                              </View>
                          </View>
                      </View>
                      
          </View>
      </View>
  
  </View>
  )}

const FirstRoute = ({route}) => {
 const {matchid} = route;
 const [scorecard,setScoreCard] = useState([]);
 const [batsmen,setBatsmen] = useState([]);
 const [bowlers,setBowlers] = useState([]);
 const [ps,setPs] = useState([]);
 const [fows,setFows] = useState([]);
 const [recents,setRecents] = useState([]);
 const [innrr,setInnrr] = useState([]);






 const [loader,setLoader] = useState(true);
 const Loader = () => (<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>);
 
    useEffect(()=>{
        apiReq.get(apis.scorecard(matchid))
        .then((response)=>{
            setScoreCard(response.data.scorecards);
            setBatsmen(response.data.batsmen);
            setBowlers(response.data.bowlers);
            setPs(response.data.ps);
            setFows(response.data.fows);
            setRecents(response.data.recents);
            setInnrr(response.data.innrr);
            setLoader(false);

        }).catch((error)=>{
            setLoader(false);
            console.log('error',error.response);
        });  
    },[scorecard]);

    

    return loader?<Loader />:(<View style={styles.tabdetail}>
      <View>
            <View>
            <View style={{flexDirection:'row',backgroundColor:whiteLightGrey,justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
                <View style={{ flex: 5, alignSelf: 'stretch'}} >
                    <Text style={styles.scorecardheading}>Batsmen</Text>
                </View> 
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>R</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>B</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>4s</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>6s</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>SR</Text>
                </View>
            </View>
            <View style={{borderTopColor:'#ccc',borderTopWidth:2}}>
                {batsmen.map((item,index)=>{
                    return (               
            <View key={index} style={{flexDirection:'row',backgroundColor:'#f3f5ff',justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
            <View style={{ flex: 5, alignSelf: 'stretch'}} >
                <Text style={[styles.scorecarddesc,{color:'#ec0606'}]}>{item.name} <Text style={{color:'#666',fontSize:10}}>({item.batting=='false'?'Out':'Not Out'}) {item.dismissal}</Text></Text>
            </View> 
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text style={styles.scorecarddesc}>{item.runs}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text style={styles.scorecarddesc}>{item.balls_faced}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text style={styles.scorecarddesc}>{item.fours}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text style={styles.scorecarddesc}>{item.sixes}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text style={styles.scorecarddesc}>{item.strike_rate}</Text>
            </View>
        </View> )
                })}
            </View>
            </View>

            <View>
            <View style={{flexDirection:'row',backgroundColor:whiteLightGrey,justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
                <View style={{ flex: 5, alignSelf: 'stretch'}} >
                    <Text style={styles.scorecardheading}>Bowlers</Text>
                </View> 
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>O</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>M</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>R</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>W</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>ECON</Text>
                </View>
            </View>
            <View style={{borderTopColor:'#ccc',borderTopWidth:2}}>
            {bowlers.map((item,index)=>{
                 return (<View key={index} style={{flexDirection:'row',backgroundColor:'#f3f5ff',justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
                 <View style={{ flex: 5, alignSelf: 'stretch'}} >
                     <Text style={[styles.scorecarddesc,{color:'#ec0606'}]}>{item.name}</Text>
                 </View> 
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.overs}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.maidens}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.runs_conceded}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.wickets}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.econ}</Text>
                 </View>
             </View>)
        })}
           
            </View>
            </View>

            <View style={{paddingVertical:10,marginRight:15}}>
                <View style={{marginHorizontal:10,marginVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.scorecarddesc,styles.notesdesc,{fontWeight:'bold'}]}>P'Ship : </Text>
                        <Text style={[styles.scorecarddesc,styles.notesdesc,]} numberOfLines={4}>{ps}</Text>
                    </View>
                </View>

                <View style={{marginHorizontal:10,marginVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.scorecarddesc,styles.notesdesc,{fontWeight:'bold'}]}>Fows : </Text>
                        <Text style={[styles.scorecarddesc,styles.notesdesc]}>{fows}</Text>
                    </View>
                </View>
            </View>
      </View>
      <View style={{backgroundColor:'#fff',paddingVertical:15,paddingHorizontal:10,borderTopColor:'#ccc',borderTopWidth:1}}>
            
            <Text style={{fontWeight:'bold',fontSize:14}}>RECENT </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {recents.map((item)=><View style={{backgroundColor:whiteLightGrey,padding:8,margin:6,elevation:2}}><Text style={{fontWeight:'bold',color:'#666'}}>{item.score}</Text></View>)} 
            </ScrollView>
            
      </View>  
      {/* {recents.map((item)=><Text style={{backgroundColor:'red',width:12}}>{item.score}</Text>)} */}
            {/* <FlatList 
      data={recents}
      keyExtractor={(item,index) => item+index}
      renderItem={ (item)=> (<Text item={item} style={{flexDirection:'row'}}>{item.item.score}</Text>)}
      ItemSeparatorComponent={()=>(<Text>,</Text>)}
      showsVerticalScrollIndicator={false}
      /> */}
  </View>
)};


const SecondRoute = ({route}) =>{
    const {matchid} = route;
    const [innrr,setInnrr] = useState([]);
    const Loader = () => (<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>);
       useEffect(()=>{
           apiReq.get(apis.scorecard(matchid))
           .then((response)=>{
               setInnrr(response.data.innrr);
           }).catch((error)=>{
                             
               console.log('error',error.response);
           });  
       },[innrr]);
      const renderHeader = (item, expanded)=>{
        return (
          <View style={{
            flexDirection: "row",
            padding: 10,
            
            alignItems: "center" ,
            backgroundColor: "#fff" }}>
                {expanded
              ? <Icons style={{ fontSize: 18,color:primaryColor }} name="down" />
              : <Icons style={{ fontSize: 18,color:primaryColor }} name="up" />}
            <Text style={{ fontWeight: "bold" }}>
              {" "}{item.name}
            </Text>
            
          </View>
        );
      }
    const renderContent = (item)=>{
        return (
          <View>
            <View style={{}}>
            <View>
            <View style={{flexDirection:'row',backgroundColor:whiteLightGrey,justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
                <View style={{ flex: 5, alignSelf: 'stretch'}} >
                    <Text style={styles.scorecardheading}>Batsmen</Text>
                </View> 
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>R</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>B</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>4s</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>6s</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>SR</Text>
                </View>
            </View>
            <View style={{borderTopColor:'#ccc',borderTopWidth:2}}>

            {item.batsmen.map((item,index)=>{
                    return (               
            <View key={index} style={{flexDirection:'row',backgroundColor:'#f3f5ff',justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
                <View style={{ flex: 5, alignSelf: 'stretch'}} >
                    <Text style={[styles.scorecarddesc,{color:'#ec0606'}]}>{item.name} <Text style={{color:'#666',fontSize:10}}>({item.batting=='false'?'Out':'Not Out'}) {item.dismissal}</Text></Text>
                </View> 
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecarddesc}>{item.runs}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecarddesc}>{item.balls_faced}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecarddesc}>{item.fours}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecarddesc}>{item.sixes}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecarddesc}>{item.strike_rate}</Text>
                </View>
            </View> )
            })}

            </View>
            </View>

            <View>
            <View style={{flexDirection:'row',backgroundColor:whiteLightGrey,justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
                <View style={{ flex: 5, alignSelf: 'stretch'}} >
                    <Text style={styles.scorecardheading}>Bowlers</Text>
                </View> 
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>O</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>M</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>R</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>W</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.scorecardheading}>ECON</Text>
                </View>
            </View>
            <View style={{borderTopColor:'#ccc',borderTopWidth:2}}>
            {item.bowlers.map((item,index)=>{
                 return (<View key={index} style={{flexDirection:'row',backgroundColor:'#f3f5ff',justifyContent:'center',overflow:'hidden',paddingVertical:10,paddingHorizontal:10}}>
                 <View style={{ flex: 5, alignSelf: 'stretch'}} >
                     <Text style={[styles.scorecarddesc,{color:'#ec0606'}]}>{item.name}</Text>
                 </View> 
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.overs}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.maidens}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.runs_conceded}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.wickets}</Text>
                 </View>
                 <View style={{ flex: 1, alignSelf: 'stretch' }} >
                     <Text style={styles.scorecarddesc}>{item.econ}</Text>
                 </View>
             </View>)
        })}


            </View>
            </View>

            <View style={{paddingVertical:10}}>
            <View style={{marginHorizontal:10,marginVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.scorecarddesc,styles.notesdesc,{fontWeight:'bold'}]}>Extras: </Text>
                        <Text style={[styles.scorecarddesc,styles.notesdesc]}>Byes :{item.extra_runs.byes}, Leg Byes: {item.extra_runs.legbyes}, Wides: {item.extra_runs.wides}, No Balls: {item.extra_runs.noballs}, Total:{item.extra_runs.total}</Text>
                    </View>
                </View>
                <View style={{marginHorizontal:10,marginVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.scorecarddesc,styles.notesdesc,{fontWeight:'bold'}]}>Did Not Bat: </Text>
                        <Text style={[styles.scorecarddesc,styles.notesdesc,{paddingRight:80}]}>
                            {item.did_not_bat.map((item,index)=><Text key={index}>{item.name} ,</Text>)}
                        </Text>
                    </View>
                </View>

                <View style={{marginHorizontal:10,marginVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.scorecarddesc,styles.notesdesc,{fontWeight:'bold'}]}>Last Wicket: </Text>
                        <Text style={[styles.scorecarddesc,styles.notesdesc]}>{item.last_wicket.name}, Runs: {item.last_wicket.runs}, Balls Faced: {item.last_wicket.balls}</Text>
                    </View>
                </View>
            </View>
      </View>
      
        
          </View>
        );
      }
    return(
  <View style={styles.tabs}>
      <Accordion dataArray={innrr} expanded={[0]} 
       animation={true}
       renderHeader={renderHeader}
       renderContent={renderContent}
       />
  </View>
)};

const ThirdRoute = ({route}) => {
    const {matchid} = route;
    const [comms,setComms] = useState([]);
    const Loader = () => (<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>);
       useEffect(()=>{
           apiReq.get(apis.scorecard(matchid))
           .then((response)=>{
            setComms(response.data.comms);
           }).catch((error)=>{
               console.log('error',error.response);
           });  
       },[comms]);
    return(
    <View style={styles.tabs}>
      <FlatList 
      data={comms}
      keyExtractor={(item,index) => item+index}
      renderItem={(item)=><ListMatchComplete item={item} />}
      ItemSeparatorComponent={()=> <View style={{height:1,backgroundColor:'#ddd'}}/>}
      showsVerticalScrollIndicator={false}
      />
    </View>)
}

const initialLayout = { width: Dimensions.get('window').width };

const ScoreCardDetail = React.memo(({route,navigation}) => {
    const { id } = route.params;
    const [index, setIndex] = useState(0);
    const [matchid,setMatchId] = useState(id);
    const [routes] = useState([
      { key: 'first', title: 'Live', matchid:id},
      { key: 'second', title: 'Scorecard' ,matchid:id},
      { key: 'third', title: 'Commentary' ,matchid:id},
    //   { key: 'fourth', title: 'Report' },
    //   { key: 'fifth', title: 'Coverage' },
    ]);
    const Loader = () => <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>;

    const [matchinfo,setMatchInfo] = useState([]);
    const [matchinfodata,setMatchInfoData] = useState([]);
    const [loader,setLoader] = useState(true);
    useEffect(()=>{
        
        apiReq.get(apis.scorecard(matchid))
        .then((response)=>{
            setMatchInfo(response.data.matchInfo);
            setLoader(false);
        }).catch((error)=>{
            setLoader(false);
            console.log('error',error.response);
        }); 

    },[matchinfo]);

//    useEffect(()=>{
// //alert(matchinfo.length)
// console.log('kkk',matchinfo);

//  if(matchinfo){
//     setMatchInfoData(matchinfo);
//     // setLoader(false);
//  }
// },[matchinfo]);
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third:ThirdRoute,
    //   fourth:FirstRoute,
    //   fifth:SecondRoute
    });
    const renderTabBar = props => (
        <TabBar
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color:'#000', margin: 0,fontWeight:'bold' }}>
              {route.title}
            </Text>
          )}
          {...props}
          indicatorStyle={{ backgroundColor: primaryColor,}}
          style={{ backgroundColor:whiteLightGrey}}
          contentContainerStyle={{marginHorizontal:20}}
          indicatorContainerStyle={{}}
        />
      );   
    return ( 
        <SafeAreaView  style={[styles.mainLayout,{marginTop:0}]}>   
        <View style={[styles.layoutSpacing,{flex:1}]}>
        
            <View style={[styles.flex1,{elevation:1,borderRadius:25,backgroundColor:'#fff'}]}>
                <View style={[{height:'5%',width:'100%',flexDirection:'row',paddingLeft:20,marginBottom:5}]}>
                  <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                      <Icon name="arrow-back-ios"  size={18} color="#cc0202"/> 
                    </TouchableOpacity>
                  </View>
                   <View style={{}}>
                   <Text style={[styles.primaryColor,{fontWeight:'bold',fontSize:13,marginHorizontal:5,marginTop:20}]}> 
                      Back 
                      </Text>
                   </View>   
                </View>
                <View style={{height:'95%'}}>
                <View>
                {loader && <Loader/>}
    <View style={{height:160, borderBottomColor:'#efefef',paddingHorizontal:20}}>
    <View style={{flex:1}}>

    <View style={[styles.flexRow,styles.flex1,{justifyContent:'space-between'}]}>
      <View>
          <Text style={styles.matchIndicator}>{matchinfo.status_str}</Text>
      </View>
      <View>
          <Text style={styles.matchScoreText}>{matchinfo.format_str}</Text>
      </View>
    </View>
    <View style={[styles.flex1]}>
        <Text style={{color:'#6e6f70'}} numberOfLines={1}>{matchinfo.length!=0?matchinfo.venue.name:''}</Text>
    </View>
  </View>
  
  <View style={[styles.flex1,styles.flexRow,{justifyContent:'space-between',alignItems:'center'}]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginHorizontal:5}}>
                          <Image source={{uri:matchinfo.length!=0?matchinfo.teama.logo_url:'img'}} style={{width:30,height:30,resizeMode:'contain'}} />
                        </View>
                        <View style={{justifyContent:'center'}} >
                          <Text style={styles.matchScoreText}>{matchinfo.length!=0?matchinfo.teama.short_name:''}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.matchScoreText}>{matchinfo.length!=0?matchinfo.teama.scores_full:''}</Text>
                    </View>
    </View>
    <View style={[styles.flex1,styles.flexRow,{justifyContent:'space-between',alignItems:'center'}]}>
    <View style={{flexDirection:'row'}}>
                        <View style={{marginHorizontal:5}}>
                          <Image source={{uri:matchinfo.length!=0?matchinfo.teamb.logo_url:'url'}} style={{width:30,height:30,resizeMode:'contain'}} />
                        </View>
                        <View style={{justifyContent:'center'}} >
                          <Text style={styles.matchScoreText}>{matchinfo.length!=0?matchinfo.teamb.short_name:''}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.matchScoreText}>{matchinfo.length!=0?matchinfo.teamb.scores_full:''}</Text>
                    </View>
    </View>
    <View style={{flex:1}}>
      <Text style={{color:'#6e6f70'}} numberOfLines={1}>{matchinfo.status_note}</Text>
      <Text style={{color:'#222'}} numberOfLines={1}>{matchinfo.length!=0?matchinfo.competition.title:''}</Text>
    </View>

</View>
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
})

export default ScoreCardDetail;