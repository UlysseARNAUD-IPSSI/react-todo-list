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
    },
    header: {
        display: 'flex',
        backgroundColor: colors.darkPrimary,
        color: colors.text,
        height: 48,
        paddingHorizontal: 32,
        paddingVertical: 32
    },
    addButton: {
        backgroundColor: colors.textSecondary,
        color: colors.text,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    textAddButton: {
        color: colors.text,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontSize: 18
    },
    textHeader: {
        color: colors.text,
        fontSize: 24
    },
    lists: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 16
    },
    textListCategory: {
        color: colors.textPrimary,
        fontSize: 24
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    task: {
        display: 'flex',
        backgroundColor: 'gainsboro',
        // width: 'clamp(7rem, 10rem, 12rem)',
        // height: 'clamp(12rem, 14rem, 16rem)',
        padding: 16,
        marginRight: 8
    },
    textTask: {
        position: 'relative'
    }
})


export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false)
    const [lists, setLists] = useState(false)

    const defaultLists = [
        new List(), new List(), new List()
    ]

    setLists(defaultLists)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)

        fetch('#')
            .then(response => {
                setLists(defaultLists.map(entry => entry.get()))
            })
            .catch(reason => {
            })
            .finally(() => {
                setRefreshing(false)
            })

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
                contentContainerStyle={styles.container}>

                {/* Ajouter une liste */}
                <View style={styles.addButton}>
                    <Text style={styles.textAddButton}>
                        Ajouter une liste
                    </Text>
                </View>
                {/* Fin Ajouter une liste */}

                {/* Début des listes */}
                <View style={styles.lists}>

                    {/* Container pour une liste */}
                    <View style={styles.listContainer}>

                        {/* Nom de la liste */}
                        <Text style={styles.textListCategory}>
                            Catégorie
                        </Text>
                        {/* Fin du nom de la liste */}

                        {/* Liste des tâches */}
                        <View style={styles.list}>

                            {/* Tâche */}
                            <View style={styles.task}>
                                <Text style={styles.textTask}>Une tâche</Text>
                            </View>
                            {/* Fin Tâche */}

                            {/* Tâche */}
                            <View style={styles.task}>
                                <Text>Une tâche</Text>
                            </View>
                            {/* Fin Tâche */}

                            {/* Tâche */}
                            <View style={styles.task}>
                                <Text>Une tâche</Text>
                            </View>
                            {/* Fin Tâche */}

                            {/* Tâche */}
                            <View style={styles.task}>
                                <Text>Une tâche</Text>
                            </View>
                            {/* Fin Tâche */}

                            {/* Tâche */}
                            <View style={styles.task}>
                                <Text>Une tâche</Text>
                            </View>
                            {/* Fin Tâche */}

                            {/* Tâche */}
                            <View style={styles.task}>
                                <Text>Une tâche</Text>
                            </View>
                            {/* Fin Tâche */}

                        </View>
                        {/* Fin liste */}

                    </View>
                    {/* List container */}

                    <SectionList
                        sections={lists}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item}</Text>
                            </View>
                        )}
                        renderSectionHeader={({section: {name}}) => (
                            <Text>{name}</Text>
                        )}>

                    </SectionList>

                </View>
                {/* Listes */}

            </ScrollView>
            {/* Fin Container */}
        </SafeAreaView>
    );
}