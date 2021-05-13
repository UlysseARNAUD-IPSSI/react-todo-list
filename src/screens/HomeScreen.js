import {StyleSheet, Text, View, FlatList, SectionList, SafeAreaView, ScrollView, RefreshControl} from "react-native"
import React, {useState, useEffect} from 'react'

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
        paddingHorizontal: 8,
        paddingVertical: 8,
        color: colors.text,
    },
    item: {
        backgroundColor: colors.primary,
        color: colors.text,
        padding: 20,
        marginHorizontal: 8
    },
    listTitle: {
        fontSize: 24,
    },
    itemCardText: {
        fontSize: 16,
        color: colors.text,
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center'
    }
})


export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false)
    const [lists, setLists] = useState([])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)

        // Do things .... ?

        setRefreshing(false)
    }, [])

    useEffect(() => {

        const firebase = Fire
            .setRefName('lists')
            .setCallback(error => {
                if (error) return alert('Une erreur est survenue');

                firebase.get(lists => {
                    setLists(lists);
                    setRefreshing(false);
                })

                return function unsubscribe() {
                    firebase.detach();
                }
            })

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                vertical
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}>


                {/* Section 'vos listes' */}
                <SectionList
                    vertical
                    stickySectionHeadersEnabled={false}
                    sections={[
                        {
                            title: "Liste 1",
                            total: 92,
                            completed: 1,
                            data: []
                        },
                        {
                            title: "Liste 2",
                            total: 92,
                            completed: 1,
                            data: []
                        },
                        {
                            title: "Liste 3",
                            total: 92,
                            completed: 1,
                            data: []
                        },
                        {
                            title: "Liste 4",
                            total: 92,
                            completed: 1,
                            data: []
                        }
                    ]}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, section}) => {
                        return null;
                    }}
                    renderSectionHeader={({section: {title,total,completed}}) => (
                        <>
                            <Text style={styles.listTitle}>{title}</Text>
                            <FlatList
                                horizontal
                                data={[
                                    {
                                        slug: 'total',
                                        text: 'Tâches (total)',
                                        value: total
                                    },
                                    {
                                        slug: 'completed',
                                        text: 'Tâches accomplies',
                                        value: completed,
                                    },
                                    {
                                        slug: 'remaining',
                                        text: 'Tâches restantes',
                                        value: parseInt(total) - parseInt(completed)
                                    }
                                ]}
                                renderItem={({item: {value,text}}) => <>
                                    <View style={styles.item}>
                                        <Text style={styles.itemCardText}>{value}{"\n"}{text}</Text>
                                    </View>
                                </>}
                                showsHorizontalScrollIndicator={false}
                            />
                        </>
                    )}
                />


            </ScrollView>
        </SafeAreaView>
    );
}