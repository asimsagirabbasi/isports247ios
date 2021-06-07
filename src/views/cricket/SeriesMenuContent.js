import React,{useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles';

const SeriesMenuContent = () =>{
    return (
        <View style={{marginHorizontal:25,marginVertical:20}}>
            <View>
                <Text style={{fontWeight:'bold',fontSize:16,textTransform:'uppercase'}}>Series</Text>
            </View>


            <View style={{marginTop:10}}>
                <View style={{marginVertical:10}}>
                    <TouchableOpacity>
                        <Text>All Series</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default SeriesMenuContent;