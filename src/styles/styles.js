import React from 'react';
import {StyleSheet } from 'react-native';
import {primaryColor,secondaryColor,borderSpacing,verticalSpacing} from './theme';

const styles = StyleSheet.create({
    mainLayout:{
        backgroundColor:'#eeeeee',
        flex:1
    },
    layoutSpacing:{
        marginHorizontal:borderSpacing,
    },
    flex1:{
        flex:1
    },
    flex2:{
        flex:2
    },
    flex3:{
        flex:3
    },
    flex4:{
        flex:4
    },
    flex5:{
        flex:5
    },
    flex6:{
        flex:6
    },
    flexRow:{
        flexDirection:'row'
    },
    card:{
        width:320,
        backgroundColor:'#fff',
        flex:1,
        height:140,
        marginHorizontal:6,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#efefef'
    },
    cardSingle:{
        width:'100%',
        height:200,
    },
    cardSingleDetail:{
        width:'100%',
        height:'100%',
    },
    cardSingleContainer:{
        alignSelf:'stretch',
        flex:1,
        justifyContent:'flex-end',
        padding:10,
        marginBottom:10
    },
    cardSingleContainerMainHeading:{color:'#fff',fontSize:16,fontWeight:'bold'},
    cardSingleContainerMainSmallHeading:{color:'#fff',fontSize:14,fontWeight:'bold'},

    cardSingleContainerSubHeading:{color:'#fff',fontSize:12},
    primaryBackground:{
        backgroundColor:primaryColor
    },
    stadium:{
        flexDirection:'column',
        justifyContent:'center'
    },
    cardSliderContent:{
        padding:8
    }, 
    matchSliderStatus:{
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        paddingHorizontal:8,
        paddingVertical:4
    },
    matchIndicator:{
       color:primaryColor,
       fontWeight:'bold',
       fontSize:14, 
    },
    matchSliderStatusText:{
       fontWeight:'bold',
       color:"#fff",
       fontSize:13

    },
    matchScoreText:{
        fontWeight:'bold',
        color:"#000", 
        fontSize:13
    },
    stadiumText:{
        color:'#626467',
        fontSize:12,
        fontWeight:'bold'
    },
    footbalteamname:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:24,
        textTransform:'uppercase'
    },
    smallHeadingCaption:{fontSize:13,fontWeight:'bold'},
    smallHeadingCaptionDesc:{fontSize:13,color:'#626467'},
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        transform: [{ rotate: "-90deg" }],
      },
      primaryColor:{
          color:primaryColor
      },
      tabs:{backgroundColor:'#fff',paddingTop:10,borderRadius:25,flex:1,elevation:1},
      tabdetail:{backgroundColor:'#fff',paddingTop:10,flex:1},
      scorecardheading:{fontSize:13,fontWeight:'bold',textTransform:'uppercase'},
      scorecarddesc:{fontSize:12},
      notesdesc:{color:'#373737'}

})
export default styles;