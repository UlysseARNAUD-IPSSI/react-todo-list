import {StatusBar} from 'expo-status-bar';
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default function App() {
    return (
        <>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.textHeader}>React todo list</Text>
            </View>
            {/* Fin Header */}

            {/* Container */}
            <View style={styles.container}>

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

                </View>
                {/* Listes */}

            </View>
            {/* Fin Container */}
        </>
    )
}

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
        paddingHorizontal: 32,
        paddingVertical: 32,
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





window.uuidv4 = function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}