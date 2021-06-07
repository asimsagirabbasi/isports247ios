import React,{useEffect,useState} from 'react';
import { View, Text , FlatList,Dimensions,StyleSheet, ScrollView, ImageBackground,Image,ActivityIndicator,TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import { primaryColor } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('window');
import {apiReq,apis,appURL} from '../../utils/api';

const SliderBanner = ({item}) =>{
    //console.log('itemmmm---->',item.item.title);
    let ts = new Date(item.item.timestamp_start*1000);
    const navigation = useNavigation();
    
    return (

        <View style={[styles.card]}>
           <TouchableOpacity style={{flex:1}} onPress={()=>item.item.status!=1?navigation.navigate('ScoreboardDetail',{'id':item.item.match_id}):''}>
                <View style={[styles.flex1]}>
                    <View style={[styles.stadium,styles.flex1,styles.cardSliderContent]}>
                        <View style={[styles.flexRow,styles.flex1,{justifyContent:'space-between'}]}>
                            <View>
                                <Text style={styles.matchIndicator}>{item.item.status_str}</Text>
                            </View>
                        
                            <View><Text style={styles.matchIndicator}>{item.item.status==1?ts.toDateString():''}</Text></View>
                        
                            <View>
                                <Text style={styles.matchScoreText}>{item.item.format_str}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex1,{marginTop:10}]}>
                            <Text style={styles.stadiumText}>{item.item.venue.name}</Text>
                        </View>
                    </View>
                    <View style={[styles.flex1,styles.flexRow,styles.cardSliderContent,{justifyContent:'space-between',alignItems:'center'}]}>
                        <View>
                            <Text style={styles.matchScoreText}>{item.item.teama.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.matchScoreText}>{item.item.teama.scores_full}</Text>
                        </View>
                    </View>
                    <View style={[styles.flex1,styles.flexRow,styles.cardSliderContent,{justifyContent:'space-between',alignItems:'center'}]}>
                        <View>
                            <Text style={styles.matchScoreText}>{item.item.teamb.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.matchScoreText}>{item.item.teamb.scores_full}</Text>
                        </View>
                    </View>
                
                    <View style={[styles.flex1,styles.primaryBackground,styles.matchSliderStatus]}>
                        <Text style={styles.matchSliderStatusText} numberOfLines={1}>{item.item.status_note!=''?item.item.status_note:'Match not started yet.'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
     
    )
}




export default SliderBanner;