import {StyleSheet, Text, View, SectionList, SafeAreaView, ScrollView, RefreshControl} from "react-native";
import React, {useState} from 'react'
import List from '../models/List'

const colors = {
    darkPrimary: '#303F9F',
    lightPrimary: '#C5CAE9',
    primary: '#3F51B5',
    text: '#FFFFFF',
    accent: '#536DFE',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textDivider: '#BDBDBD'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
        color: colors.textPrimary,
    }
})


export default function ListDetailsScreens({list}) {

    const [refreshing, setRefreshing] = useState(false)
    const [currentList, setCurrentList] = useState(list)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)

        // Do thing ....

        setRefreshing(false)
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            {/* Container */}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>

                <Text>Coucou</Text>

            </ScrollView>
            {/* Fin Container */}
        </SafeAreaView>
    );
}