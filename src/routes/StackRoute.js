import React from 'react';
import {View,Text} from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Cricket from '../views/Cricket';
import Football from '../views/Football';
import Tennis from '../views/Tennis';

import CricketMenu from '../views/cricket/Menu';
import Scoreboard from '../views/cricket/Scoreboard';
import ScoreboardDetail from '../views/cricket/ScoreCardDetail';
import FScoreboardDetail from '../views/football/FScoredetails';

import Blogdetail from '../views/cricket/Blogdetail';
import Login from '../views/Login';
import Signup from '../views/Signup';
import Stream from '../views/Stream';
import StreamVideo from '../views/StreamVideo';






import SplashScreen from '../views/Splash';
import Header from '../views/common/Header';
const CricketStacks = createStackNavigator();
const FootballStacks = createStackNavigator();
const TenisStacks = createStackNavigator();

const MoreCricketStacks = createStackNavigator();

const HomeStacks = createStackNavigator();




const HomeStack = () =>{
    return(
        <HomeStacks.Navigator >
            <HomeStacks.Screen name="Home" component={Home} options={{ headerTitle: props => <Header {...props} /> }}/>
            <HomeStacks.Screen name="ScoreboardDetail" component={ScoreboardDetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>
            <HomeStacks.Screen name="Blogdetail" component={Blogdetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>

            <HomeStacks.Screen  name="Stream" component={Stream} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null  }}/>
            <HomeStacks.Screen  name="StreamVideo" component={StreamVideo} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null  }}/>
            <HomeStacks.Screen  name="Login" component={Login} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null  }}/>
            <HomeStacks.Screen name="Signup" component={Signup} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null  }}/> 
            
        </HomeStacks.Navigator>
    );

}

const CricketStack = () =>{
    return(
        <CricketStacks.Navigator>
            <CricketStacks.Screen name="Cricket" component={Cricket} options={{ headerTitle: props => <Header {...props} /> }}/>
            <CricketStacks.Screen name="ScoreboardDetail" component={ScoreboardDetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>
            <CricketStacks.Screen name="Blogdetail" component={Blogdetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>

        </CricketStacks.Navigator>
    );
}

const FootballStack = () =>{
    return(
        <FootballStacks.Navigator>
            <FootballStacks.Screen name="Football" component={Football} options={{ headerTitle: props => <Header {...props} /> }}/>
            <HomeStacks.Screen name="FScoreboardDetail" component={FScoreboardDetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>
            <FootballStacks.Screen name="Blogdetail" component={Blogdetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>
        </FootballStacks.Navigator>
    );
}

const TennisStack = () =>{
    return(
        <TenisStacks.Navigator>
            <TenisStacks.Screen name="Tennis" component={Tennis} options={{ headerTitle: props => <Header {...props} /> }}/>
            <TenisStacks.Screen name="Blogdetail" component={Blogdetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>

        </TenisStacks.Navigator>
    );
}

const MoreCricketStack = () =>{
    return(
        <MoreCricketStacks.Navigator headerMode="float" animation="fade"  screenOptions={{
            gestureDirection:'horizontal',
            gestureEnabled:true,
            cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
        }}>
            <MoreCricketStacks.Screen name="Menu" component={CricketMenu} options={{ headerTitle: props => <Header {...props} /> }}/>
            <MoreCricketStacks.Screen name="Scoreboard" component={Scoreboard} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>
            <MoreCricketStacks.Screen name="ScoreboardDetail" component={ScoreboardDetail} options={{ headerTitle: props => <Header {...props} />,headerLeft: (props) => null }}/>

        </MoreCricketStacks.Navigator>
    );
}



// const MainStack = () =>{
//     return(
//         <MainStack.Navigator>
//             <HomeStack />
//         </MainStack.Navigator>
//     );

// }

export  {HomeStack,CricketStack,MoreCricketStack,FootballStack,TennisStack};


