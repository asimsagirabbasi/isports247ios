import React,{useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles';

const NewsMenuContent = React.memo(() =>{
    return (
        <View style={{marginHorizontal:25,marginVertical:20}}>
            <View>
                <Text style={{fontWeight:'bold',fontSize:16,textTransform:'uppercase'}}>News</Text>
            </View>

            <View style={{marginTop:10}}>
                <Text style={{fontWeight:'bold',fontSize:14}}></Text>
            </View>
        </View>
    );
})

export default NewsMenuContent;