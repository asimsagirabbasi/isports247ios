import React,{useState,useEffect} from 'react';
import { View, Text ,Dimensions,Image, TouchableOpacity, FlatList,ActivityIndicator ,SafeAreaView} from 'react-native';
import Layout from '../common/Layout';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

import styles from '../../styles/styles';
import {primaryColor,whiteLightGrey} from '../../styles/theme';

import LiveScoreMenuContent from "../cricket/LiveScoreMenuContent";
import SeriesMenuContent from "../cricket/SeriesMenuContent";
import NewsMenuContent from "../cricket/NewsMenuContent";
import { Tab, Tabs } from 'native-base';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import IconFontawesom  from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import {apiReq,apis,appURL} from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";


const popUp = (msg,desc) => {
  showMessage({
      message:msg,
      description: desc,
      type: "default",
      floating:true
    });
}

const notification = async(match_id) =>{
  const userData = await AsyncStorage.getItem('@userData');
  const ud = JSON.parse(userData);
  let id = ud.id;

  const data = `id=${id}&match_id=${match_id}`;
        apiReq.get(apis.notification(data))
        .then((response)=>{
            popUp('Isport247',response.data.message);
        }).catch((error)=>{
            popUp('Error!','Something went wrong');
            console.log('error',error.response);
        });
}
const ListMatch = React.memo(({item,likes}) => {

const navigation = useNavigation();
// const liked = likes.map((like)=>{
//   return like.match_id===item.item.match_id?true:false
// });
let liked = likes.some((l)=> {
  return l.match_id===item.item.match_id
});

const [bell,setBell] = useState(liked);
  return (<TouchableOpacity onPress={()=> item.item.status!=1?navigation.navigate('ScoreboardDetail',{'id':item.item.match_id}):''}>
  <View>
    <View style={{height:150, borderBottomColor:'#efefef',paddingHorizontal:20,paddingTop:15}}>
    <View style={{flex:1}}>

    <View style={[styles.flexRow,styles.flex1,{justifyContent:'space-between'}]}>
      <View>
          <Text style={styles.matchIndicator}>{item.item.status_str}</Text>
      </View>
      <View>
          <Text style={styles.matchScoreText}>{item.item.format_str}</Text>
      </View>
      <View>
          <TouchableOpacity style={{zIndex:999999,height:25,width:25,justifyContent:'center',alignItems:'center'}} onPress={()=>{
            notification(item.item.match_id);
            setBell(!bell);
            }}> 
            <IconFontawesom name='bell' color={bell?'#222':'#999'}  size={16} />
          </TouchableOpacity>
      </View>
    </View>
    <View style={[styles.flex1,{marginTop:5}]}>
        <Text style={{color:'#6e6f70',fontSize:12}} numberOfLines={1}>{item.item.venue.name}</Text>
    </View>
  </View>

    <View style={[styles.flex1,styles.flexRow,{justifyContent:'space-between',alignItems:'center'}]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginHorizontal:5}}>
                          <Image source={{uri:item.item.teama.logo_url}} style={{width:30,height:30,resizeMode:'contain'}} />
                        </View>
                        <View style={{justifyContent:'center'}}>
                          <Text style={styles.matchScoreText}>{item.item.teama.short_name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.matchScoreText}>{item.item.teama.scores_full}</Text>
                    </View>
    </View>
    <View style={[styles.flex1,styles.flexRow,{justifyContent:'space-between',alignItems:'center'}]}>
    <View style={{flexDirection:'row'}}>
                        <View style={{marginHorizontal:5}}>
                          <Image source={{uri:item.item.teamb.logo_url}} style={{width:30,height:30,resizeMode:'contain'}} />
                        </View>
                        <View style={{justifyContent:'center'}}>
                          <Text style={styles.matchScoreText}>{item.item.teamb.short_name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.matchScoreText}>{item.item.teamb.scores_full}</Text>
                    </View>
    </View>
    <View style={{flex:1}}>
      <Text style={{color:'#6e6f70',fontSize:12}} numberOfLines={1}>{item.item.status_note}</Text>
    </View>
</View>

</View> 
</TouchableOpacity>
);
})
RenderSeparator = () => {  
  return (  
      <View  
          style={{  
              height: 1,  
              width: "100%",  
              backgroundColor: "#efefef",
              marginVertical:5  
            
          }}  
      />  
  );  
}; 
const FirstRoute = React.memo((props) =>{ 
  const [livematch,setLivematch] = useState([]);
  const [livematchdata,setLivematchData] = useState([]);
  const [likes,setLike] = useState([]);

  const [loader,setLoader] = useState(true);


  const Loader = () => (<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>);
  const liveScoreRequest = () =>{
      apiReq.get(apis.livescore)
      .then((response)=>{
          setLivematch(response.data.livescoreEntity.items);
      }).catch((error)=>{
          console.log('error',error.response);
      });
  }

  const notifications = async() =>{
  const userData = await AsyncStorage.getItem('@userData');
  const ud = JSON.parse(userData);
  let id = ud.id;

  const data = `id=${id}`;
    apiReq.get(apis.notifications(data))
    .then((response)=>{
      setLike(response.data.likes);
    }).catch((error)=>{
        console.log('error',error);
    });
}

useEffect(()=>{
  liveScoreRequest(); 
  notifications();
  return
},[]);

useEffect(()=>{
  if(livematch.length>0){
    setLivematchData(livematch);
    setLoader(false);
  }
},[livematch]);


return (
  <View style={styles.tabs}>
    <View style={{paddingHorizontal:20,marginTop:20,paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:2}}>
    <Text style={{fontWeight:'bold'}}>Top Events</Text>
    </View>
    {
    loader?<Loader />:
      <FlatList 
      data={livematchdata}
      keyExtractor={(item,index) => item+index}
      renderItem={(item)=><ListMatch  item={item} likes={likes} />}
      ItemSeparatorComponent={()=> <RenderSeparator />}
      showsVerticalScrollIndicator={false}
      />
    }
        
  </View>
)})

const SecondRoute = React.memo(() => {
  const [scheduledmatch,setScheduledmatch] = useState([]);
  const [scheduledmatchdata,setScheduledData] = useState([]);
  const [loader,setLoader] = useState(true);
  const [likes,setLike] = useState([]);
  

  const Loader = () => (<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>);
  const sScoreRequest = () =>{
      apiReq.get(apis.livescore)
      .then((response)=>{
        setScheduledmatch(response.data.scheduledEntity.items);
      }).catch((error)=>{
          console.log('error',error.response);
      });
  }
  const notifications = async() =>{
  const userData = await AsyncStorage.getItem('@userData');
  const ud = JSON.parse(userData);
  let id = ud.id;
  const data = `id=${id}`;
    apiReq.get(apis.notifications(data))
    .then((response)=>{
      setLike(response.data.likes);
    }).catch((error)=>{
        console.log('error',error.response);
    });
}
useEffect(()=>{
  sScoreRequest(); 
  notifications();
  return
},[]);

useEffect(()=>{
  if(scheduledmatch.length>0){
    setScheduledData(scheduledmatch);
    setLoader(false);
  }
},[scheduledmatch]);
  return (
  <View style={styles.tabs}>
    <View style={{paddingHorizontal:20,marginTop:20,paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:2}}>
      <Text style={{fontWeight:'bold'}}>Top Events</Text>
    </View>
    {
    loader?<Loader />:
      <FlatList 
      data={scheduledmatchdata}
      keyExtractor={(item,index) => item+index}
      renderItem={(item)=><ListMatch  item={item} likes={likes} />}
      ItemSeparatorComponent={()=> <RenderSeparator />}
      showsVerticalScrollIndicator={false}
      />
    }
  </View>
)
});

const ThirdRoute = React.memo(() => {
  const [completededmatch,setCompletedmatch] = useState([]);
  const [completededmatchdata,setCompletedmatchData] = useState([]);
  const [loader,setLoader] = useState(true);
  const [likes,setLike] = useState([]);
 

  const Loader = () => (<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator  color={primaryColor} size="small"/></View>);
  const cScoreRequest = () =>{
      apiReq.get(apis.livescore)
      .then((response)=>{
        setCompletedmatch(response.data.completedEntity.items);
      }).catch((error)=>{
          console.log('error',error.response);
      });
  }
  const notifications = async() =>{
    const userData = await AsyncStorage.getItem('@userData');
  const ud = JSON.parse(userData);
  let id = ud.id;
  const data = `id=${id}`;
    apiReq.get(apis.notifications(data))
    .then((response)=>{
      setLike(response.data.likes);
    }).catch((error)=>{
        console.log('error',error.response);
    });
}
useEffect(()=>{
  cScoreRequest(); 
  notifications();
  return
},[]);

useEffect(()=>{
  if(completededmatch.length>0){
    setCompletedmatchData(completededmatch);
    setLoader(false);
  }
},[completededmatch]);
  return(
    <View style={styles.tabs}>
      <View style={{paddingHorizontal:20,marginTop:20,paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:2}}>
        <Text style={{fontWeight:'bold'}}>Top Events</Text>
      </View>
      {
      loader?<Loader />:
      <FlatList 
      data={completededmatchdata}
      keyExtractor={(item,index) => item+index}
      renderItem={(item)=><ListMatch  item={item} likes={likes} />}
      ItemSeparatorComponent={()=> <RenderSeparator />}
      showsVerticalScrollIndicator={false}
      />
    }
    </View>
  )})

const initialLayout = { width: Dimensions.get('window').width };

const Scoreboard = React.memo(({navigation}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Live', },
      { key: 'second', title: 'Upcoming' },
      { key: 'third', title: 'Results' },
    ]);
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third:ThirdRoute
    });
    const renderTabBar = props => (
        <TabBar
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color, margin: 0,fontWeight:'bold' }}>
              {route.title}
            </Text>
          )}
          {...props}
          indicatorStyle={{ backgroundColor: 'white',}}
          style={{ backgroundColor: primaryColor}}
          contentContainerStyle={{marginHorizontal:20}}
          indicatorContainerStyle={{width:'40%',marginLeft:'12%'}}
        />
      );
    return (
      <SafeAreaView  style={[styles.mainLayout,{marginTop:0}]}>
          
      <View style={[styles.layoutSpacing,{flex:1}]}>

            <View style={styles.flex1}>
                <View style={[styles.primaryBackground,{height:'5%',width:'100%',flexDirection:'row',paddingLeft:20}]}>
                  <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                      <Icon name="arrow-back-ios"  size={18} color="#fff"/> 
                    </TouchableOpacity>
                  </View>
                   <View style={{}}>
                   <Text style={{color:'#fff',fontWeight:'bold',fontSize:13,marginHorizontal:5,marginTop:20}}> 
                      Scoreboard 
                      </Text>
                   </View>
                    
                </View>
                <View style={{height:'95%'}}>
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
});

export default Scoreboard;