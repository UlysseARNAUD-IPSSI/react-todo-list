import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SectionList,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    Pressable,
    TextInput,
    Modal,
    Alert
} from "react-native"
import React, {useState, useEffect} from 'react'
import ColorPicker from 'react-native-material-color-picker'

const colors = {
    darkPrimary: '#303F9F',
    lightPrimary: '#C5CAE9',
    primary: '#3F51B5',
    text: '#FFFFFF',
    accent: '#536DFE',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textDivider: '#BDBDBD',
    success: '#00E676',
    darkSuccess: '#00C853'
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        color: colors.text,
        flex: 1
    },
    item: {
        backgroundColor: colors.primary,
        color: colors.text,
        padding: 20,
        marginRight: 8
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
    },
    list: {
        marginBottom: 16,
        flex: 1
    },
    button: {
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: colors.primary
    },
    buttonClose: {
        backgroundColor: colors.darkPrimary
    },
    buttonConfirm: {
        backgroundColor: colors.darkSuccess
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flex: 1,
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 23,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: 300,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalTitle: {
        fontSize: 20
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    input: {
        height: 38,
        lineHeight: 22,
        fontSize: 18,
        borderWidth: 1,
        padding: 4,
        width: '100%',
        marginBottom: 8
    },
})


export default function HomeScreen() {

    const [refreshing, setRefreshing] = useState(false)
    const [listName, setListName] = useState('Liste')
    const [listColor, setListColor] = useState('#000')
    const [lists, setLists] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

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

    const onPressAddList = () => {
        setModalVisible(true)
    }

    const onPressHideModal = () => {
        setModalVisible(false)
    }

    const onPressConfirmModal = () => {
        setModalVisible(false)
        Fire.setRefName('lists')
            .setCallback(error => {
                if (error) return alert('Une erreur est survenue');

                Fire.get(lists => {
                    setLists(lists);
                    setRefreshing(false);
                })

                return function unsubscribe() {
                    Fire.detach();
                }
            })
            .add({
                name: listName,
                total: 0,
                tasks: []
            })
    }

    const renderArrayLists = function () {
        return Fire
            .setRefName('lists')
            .setCallback(async error => {
                if (error) return Alert.alert('Oups', 'Une erreur est survenue')
                if (!listName) return Alert.alert('Erreur', 'Vous devez insérer un nom')
                if (!listColor) return Alert.alert('Erreur', 'Vous devez insérer une couleur')

                const list = {name: listName, color: listColor}

                await Fire.add(list)

                setListName(null)
                setListColor(null)

                return function unsubscribe() {
                    Fire.detach()
                }
            })
            .get(lists => lists.map(list => {
                const data = list.data()
                alert(data)
            }))
    }

    return (
        <SafeAreaView style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={[styles.modalText, styles.modalTitle]}>Ajout d'une liste</Text>

                        <Text style={[styles.modalText, styles.inputLabel]}>Nom de la liste</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={setListName}
                            value={listName}
                        />

                        <ColorPicker
                            styles={{ margin: 0 }}
                            oldColor={listColor}
                            onColorChange={setListColor}/>

                        <SafeAreaView style={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-end'}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose, {marginRight: 8}]}
                                onPress={onPressHideModal}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonConfirm]}
                                onPress={onPressConfirmModal}
                            >
                                <Text style={styles.textStyle}>Create</Text>
                            </Pressable>
                        </SafeAreaView>

                    </View>
                </View>
            </Modal>

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


                <Pressable
                    onPress={onPressAddList}
                    style={[styles.button, styles.buttonOpen]}
                    accessibilityLabel="Add a list of tasks">
                    <Text style={styles.textStyle}>Add a list</Text>
                </Pressable>


                {/* Section 'vos listes' */}
                <SectionList
                    vertical
                    style={{marginTop: 12}}
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
                    renderSectionHeader={({section: {title, total, completed}}) => (
                        <SafeAreaView style={styles.list}>
                            <Text style={styles.listTitle}>{title}</Text>
                            <FlatList
                                horizontal
                                data={[
                                    {
                                        key: 'total',
                                        text: 'Tâches (total)',
                                        value: total
                                    },
                                    {
                                        key: 'completed',
                                        text: 'Tâches accomplies',
                                        value: completed,
                                    },
                                    {
                                        key: 'remaining',
                                        text: 'Tâches restantes',
                                        value: parseInt(total) - parseInt(completed)
                                    }
                                ]}
                                renderItem={({item: {value, text}}) => <>
                                    <View style={styles.item}>
                                        <Text style={styles.itemCardText}>{value}{"\n"}{text}</Text>
                                    </View>
                                </>}
                                showsHorizontalScrollIndicator={false}/>
                        </SafeAreaView>
                    )}
                />


            </ScrollView>
        </SafeAreaView>
    );
}