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

    const ListItem = ({item: {completed, total}}) => (
        <View style={styles.item}>
            <Text style={styles.itemCardText}>92 {"\n"} Tâches accomplies</Text>
        </View>
    )

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
                            title: "Main dishes",
                            data: [
                                {
                                    key: '1',
                                    completed: 0,
                                    total: 92
                                },
                                {
                                    key: '2',
                                    completed: 0,
                                    total: 92
                                }
                            ]
                        },
                        {
                            title: "Sides",
                            data: [
                                {
                                    key: '1',
                                    completed: 0,
                                    total: 92
                                },
                                {
                                    key: '2',
                                    completed: 0,
                                    total: 92
                                }
                            ]
                        },
                        {
                            title: "Drinks",
                            data: [
                                {
                                    key: '1',
                                    completed: 0,
                                    total: 92
                                },
                                {
                                    key: '2',
                                    completed: 0,
                                    total: 92
                                }
                            ]
                        },
                        {
                            title: "Desserts",
                            data: [
                                {
                                    key: '1',
                                    completed: 0,
                                    total: 92
                                },
                                {
                                    key: '2',
                                    completed: 0,
                                    total: 92
                                }
                            ]
                        }
                    ]}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, section}) => {
                        return null;
                    }}
                    renderSectionHeader={({section: {title,data}}) => (
                        <>
                            <Text style={styles.listTitle}>{title}</Text>
                            <FlatList
                                horizontal
                                data={[
                                    {
                                        text: 'Tâches accomplies',
                                        value: 0
                                    },
                                    {
                                        text: 'Tâches restantes',
                                        value: 0,
                                    },
                                    {
                                        text: 'Tâches restantes',
                                        value: 0
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