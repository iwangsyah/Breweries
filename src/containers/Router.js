import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Screen from '../screens';
import {SECONDARY, TERITARY} from '../styles/Colors';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BreweriesList"
            component={Screen.BreweriesList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BreweriesDetail"
            component={Screen.BreweriesDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BookmarkList"
            component={Screen.BookmarkList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WebScreen"
            component={Screen.WebScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
