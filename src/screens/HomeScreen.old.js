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
    Alert,
    TouchableOpacity
} from "react-native"
import React, {useState, useEffect} from 'react'
import ColorPicker from 'react-native-material-color-picker'
import List from '../models/List'
import getContrast from "../utils/get-contrast"
import dictionary from "../utils/point-godwin-dictionary"

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
    darkSuccess: '#00C853',
    danger: '#f44336'
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        color: colors.text,
        flex: 1
    },
    item: {
        padding: 20,
        marginRight: 8
    },
    listTitle: {
        fontSize: 24,
    },
    itemCardText: {
        fontSize: 16,
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
    buttonDanger: {
        backgroundColor: colors.danger
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


export default function HomeScreen({navigation}) {

    const [refreshing, setRefreshing] = useState(false)
    const [listName, setListName] = useState(null)
    const [listColor, setListColor] = useState('#000')
    const [lists, setLists] = useState([])
    const [modalAddListVisible, setModalAddVisible] = useState(false)
    const [modalRemoveListVisible, setModalRemoveVisible] = useState(false)
    const [selectedListToRemove, setSelectedListToRemove] = useState(null)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)

        setLists(localLists)

        setRefreshing(false)
    }, [])

    useEffect(() => {

        /*const firebase = new Fire(async error => {
            if (error) return alert('Une erreur est survenue');

            await firebase.getLists(lists => {
                setLists(lists);
                setRefreshing(false);
            })

            return function unsubscribe() {
                firebase.detach();
            }
        })*/

    })

    const onPressList = (list) => {
        selectedList = list
        navigation.navigate('ListDetails', {list})
    }

    const onLongPressList = (list) => {
        setSelectedListToRemove(list)
        setModalRemoveVisible(true)
    }

    const onPressAddList = () => {
        setModalAddVisible(true)
    }

    const onPressHideModal = () => {
        setModalAddVisible(false)
    }

    const onPressConfirmModalAddList = () => {
        /*(await new Fire(async error => {
            if (error) return alert('Une erreur est survenue');

            await this.addList({
                name: listName,
                color: listColor,
                tasks: []
            })

            setModalVisible(false)
            setListColor('#000')
            setListName(null)

            return function unsubscribe() {
                this.detach();
            }
        }))*/

        if (!listName) {
            Alert.alert('Error', 'Name must be not empty') || alert('Name must be not empty')
            return
        }

        // On parcourt les différents mots du dictionnaire
        const words = dictionary
        for (let word of words) {
            if (new RegExp(word.toLowerCase()).test(listName.toLowerCase())) {
                Alert.alert('Congratulation !', 'You won 1 point Godwin !') || alert('Congratulation ! You won 1 point Godwin !')
                // pointsGodwin = pointsGodwin + 1
                break
            }
        }

        localLists.push(new List({
            name: listName,
            color: listColor
        }))

        setLists(localLists)

        setModalAddVisible(false)
        setListColor('#000')
        setListName(null)
    }


    return (
        <SafeAreaView style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalRemoveListVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalRemoveVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <ScrollView
                            vertical
                            style={{flex: 1, width: '100%'}}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            bounces={false}>

                            <Text style={[styles.modalText, styles.modalTitle]}>Supprimer la liste ?</Text>

                            <SafeAreaView
                                style={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-end', marginTop: 8}}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose, {marginRight: 8}]}
                                    onPress={() => {
                                        setModalRemoveVisible(false)
                                    }}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonDanger]}
                                    onPress={() => {
                                        setModalRemoveVisible(false)
                                    }}>
                                    <Text style={styles.textStyle}>Confirm</Text>
                                </Pressable>
                            </SafeAreaView>

                        </ScrollView>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddListVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalAddVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <ScrollView
                            vertical
                            style={{flex: 1, width: '100%'}}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            bounces={false}>

                            <Text style={[styles.modalText, styles.modalTitle]}>Ajout d'une liste</Text>

                            <Text style={[styles.modalText, styles.inputLabel]}>Nom de la liste</Text>

                            <TextInput
                                style={styles.input}
                                onChangeText={setListName}
                                value={listName}
                            />

                            <ColorPicker
                                styles={{flex: 1}}
                                oldColor={listColor}
                                onColorChange={setListColor}/>

                            <SafeAreaView
                                style={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-end', marginTop: 8}}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose, {marginRight: 8}]}
                                    onPress={onPressHideModal}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonConfirm]}
                                    onPress={onPressConfirmModalAddList}
                                >
                                    <Text style={styles.textStyle}>Create</Text>
                                </Pressable>
                            </SafeAreaView>

                        </ScrollView>

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
                    style={{marginTop: 12}}
                    stickySectionHeadersEnabled={false}
                    sections={localLists.map(list => (
                        {
                            title: list.name,
                            total: list.tasks.length,
                            completed: list.tasks.filter(list => !!list.completed).length,
                            color: list.color,
                            data: []
                        }
                    ))}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, section}) => {
                        return null;
                    }}
                    renderSectionHeader={({section}) => (
                        <SafeAreaView style={styles.list}>
                            <TouchableOpacity
                                onLongPress={onLongPressList(section)}
                                onPress={onPressList(section)}
                                delayLongPress={1000}
                                activeOpacity={0.6}
                                style={styles.buttonStyle}>
                                <Text style={styles.listTitle}>{section.title}</Text>
                                <FlatList
                                    horizontal
                                    data={[
                                        {
                                            key: 'total',
                                            text: 'Tâches (total)',
                                            value: section.total
                                        },
                                        {
                                            key: 'completed',
                                            text: 'Tâches accomplies',
                                            value: section.completed,
                                        },
                                        {
                                            key: 'remaining',
                                            text: 'Tâches restantes',
                                            value: parseInt(section.total) - parseInt(section.completed)
                                        }
                                    ]}
                                    renderItem={({item: {value, text}}) => <>
                                        <View
                                            style={[styles.item, {backgroundColor: section.color}]}>
                                            <Text
                                                style={[styles.itemCardText, {color: getContrast(section.color)}]}>{value}{"\n"}{text}</Text>
                                        </View>
                                    </>}
                                    showsHorizontalScrollIndicator={false}/>
                            </TouchableOpacity>
                        </SafeAreaView>
                    )}
                />


            </ScrollView>
        </SafeAreaView>
    );
}