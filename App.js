import React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {StatusBar} from 'react-native'

import Fire from './Fire'

import HomeScreen from './src/screens/HomeScreen'
import ListDetailsScreen from './src/screens/ListDetailsScreen'
import TaskDetailsScreen from './src/screens/TaskDetailsScreen'

global.Fire = new Fire


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


window.uuidv4 = function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}