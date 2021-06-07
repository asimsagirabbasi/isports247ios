import React,{useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles';

const LiveScoreMenuContent = React.memo(({navigation}) =>{
    return (
        <View style={{marginHorizontal:25,marginVertical:20}}>
            <View>
                <Text style={{fontWeight:'bold',fontSize:16,textTransform:'uppercase'}}>Live Scores</Text>
            </View>

            <View style={{marginTop:10}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Scoreboard')}}>
                    <Text style={{fontWeight:'bold',fontSize:14}}>Live Scores Home</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:10}}>
                <View style={{marginVertical:10}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Scoreboard')}}>
                        <Text>Week View</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical:10}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Scoreboard')}}>
                        <Text>Month View</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical:10}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Scoreboard')}}>
                        <Text>Season View</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical:10}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Scoreboard')}}>
                        <Text>International Calender</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

export default LiveScoreMenuContent;