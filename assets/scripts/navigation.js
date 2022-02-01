import React from 'react';
import Main from './page/Main.js';
import Table from './page/Table.js';
import Settings from './page/Settings.js';


import MainLanguages from './MainLanguages.js';

import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LogoTitle() {
  return (
    <Image
      style={{ width: 125, height: 60, padding: 10}}
      source={require('../logo.png')}
    />
  );
}

const Stack = createStackNavigator();

function navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Введіть дані"
          // {MainLanguages.getMainHeader()+''}
          component={Main}
          options={{ headerRight: props => <LogoTitle {...props} /> }}
        />
        <Stack.Screen
          name="Результат"
          component={Table}
          options={{ headerRight: props => <LogoTitle {...props} /> }}
        /> 
        <Stack.Screen
          name="Налаштування"
          component={Settings}
          options={{ headerRight: props => <LogoTitle {...props} /> }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default navigation;







