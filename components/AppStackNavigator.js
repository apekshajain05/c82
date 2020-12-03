import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import ReceiverDetailScreen from '../screens/ReceiverDetailScreen';



export const AppStackNavigator = createStackNavigator({
  BookDonate : {
    screen: BookDonateScreen,
    navigationOptions :{
     headerShown:false,
    }
  },
  ReceiverDetail: {
    screen: ReceiverDetailScreen,
    navigationOptions :{
      headerShown:false
    }
  }
},
{initialRouteName:'BookDonate'}
);
