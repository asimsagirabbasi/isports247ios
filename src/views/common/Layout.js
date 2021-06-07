import * as React from 'react';
import { View, Text , SafeAreaView} from 'react-native';
import Header from "./Header";
import styles from '../../styles/styles';

const Layout = (props) => {
    
    return (
        <SafeAreaView  style={[styles.mainLayout,{marginTop:props.marginTop}]}>
          
            <View style={[styles.layoutSpacing,{flex:1}]}>
                {props.children}
            </View>
        </SafeAreaView>    
    )
}

export default Layout;