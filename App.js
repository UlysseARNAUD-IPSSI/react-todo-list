import React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {StatusBar} from 'react-native'

import Fire from './Fire'

import HomeScreen from './src/screens/HomeScreen'
import ListDetailsScreen from './src/screens/ListDetailsScreen'
import TaskDetailsScreen from './src/screens/TaskDetailsScreen'

import uuidv4 from './src/utils/uuidv4'


global.Fire = new Fire
global.uuidv4 = uuidv4


const Stack = createStackNavigator()

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">

                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}/>

                    <Stack.Screen
                        name="ListDetails"
                        component={ListDetailsScreen}/>

                    <Stack.Screen
                        name="TaskDetails"
                        component={TaskDetailsScreen}/>

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}