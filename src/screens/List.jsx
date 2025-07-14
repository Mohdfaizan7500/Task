import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ColorPatel } from '../assets/ColorPatel'
import { s, vs } from 'react-native-size-matters'
import Item from '../components/Item';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import EditIcon from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import Navigation from './Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';


const List = ({ sendData }) => {
    // const [isChecked, setisChecked] = useState(false)
    const [Task, setTask] = useState([]);
    const [OldTask, setOldTask] = useState([]);
    const [uid, setuid] = useState('')
    


    const ChooseColor = (priorty) => {
        if (priorty == 'Low') {
            return "#e74343ff"
        }
        else if (priorty == 'Medium') {
            return 'rgba(190, 221, 76, 1)'
        }
        else {
            return "#777becff"
        }
    }

    const handleDone = (id) => {

        const newTask = Task.map((item) => {
            if (item.id === id) {
                item.isDone = !item.isDone;
            }
            return item;

        })
        setTask(newTask)
    }

    const deletehandle = async (id) => {

        console.log("Delete id:", id)
        try {
            const newtodo = Task.filter((todos) => todos.id !== id)
            uid = await AsyncStorage.getItem("UID");
            firestore().collection("user").doc(uid).delete().then((res) => {
                setTask(newtodo);
                setOldTask(newtodo);

            }).catch((e) => {
                console.log(e)
            })




        }
        catch (error) {

            console.log(error)
            Alert.alert(error)

        }
    }

    const EditHandle = (id) => {
        console.log("Edit id", id)
        sendData(id)

    }
    const FatchData = async () => {
        console.log("start fatching")
        const temp = [];

        firestore().collection(`${uid}`).get().then(res => {
            if (res.docs != null) {
                res.docs.map(item => {
                    temp.push(item.data())
                })
                setTask(temp)
                setOldTask(temp)
            }
            else {
                Alert.alert("Create Task First ")
            }
        }).catch(error => {
            console.log(error)
            Alert.alert("Technical Error")
        })
    }
    const fatchUid = async () => {
        console.log("start uid")
        // setloading(true)
        const uid = await AsyncStorage.getItem("UID")
        console.log("uid:", uid)
        setuid(uid)

        // setloading(false)
        // FatchData()



    }
    useEffect(() => {

        // fatchUid();
        console.log("Mount")
        // FatchData();
        setTask(data)
        // setOldTask(data)


    }, [])

    const data = [
        {
            id: 1,
            title: 'FAizam',
            Description: "ggdueyduydwt uywtuyw  etwyteuw gduyedg yiereeretreterttertetgrdgeuy yduwedwuye wheiu",
             priorty: "High",
            isDone: true
        },
        {
            id: 2,
            title: 'Amaan',
            Description: "ggdueue ufheiu",
            isDone: true,
            priorty: "Medium"

        },
        {
            id: 3,
            title: 'sakib',
            Description: "ggdueue ufheiu",
            isDone: false,
            priorty: "High"

        },
        {
            id: 4,
            title: 'Ayal',
            Description: "ggdueue ufheiu",
            isDone: true,
            priorty: "Low"

        },
        {
            id: 5,
            title: 'Rehan',
            Description: "ggdueue ufheiu",
            isDone: true,
            priorty: "Low"

        },
        {
            id: 6,
            title: 'Ragib',
            Description: "ggdueue ufheiu",
            isDone: false,
            priorty: "Low"

        },
        {
            id: 7,
            title: 'sakib',
            Description: "ggdueue ufheiu",
            isDone: true,
            priorty: "Low"

        },
        {
            id: 8,
            title: 'Ayal',
            Description: "ggdueue ufheiu",
            isDone: true,
            priorty: "Low"

        },
        {
            id: 9,
            title: 'Rehan',
            Description: "ggdueue ufheiu",
            isDone: false,
            priorty: "Low"
        },
        {
            id: 10,
            title: 'Ragib',
            Description: "ggdueue ufheiu",
            isDone: true,
            priorty: "Low"
        }
    ]

    const leftSwift = (id) => {
        return (
            <TouchableOpacity onPress={() => { EditHandle(id) }}
                style={styles.leftSwift}>
                <EditIcon name="edit" size={24} color="#fff" />
            </TouchableOpacity>
        )
    }

    const RightSwift = (id) => {
        return (
            <TouchableOpacity onPress={() => deletehandle(id)}
                style={[styles.leftSwift, { backgroundColor: "red" }]}>
                <DeleteIcon name="delete" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }
    return (
        
        <View style={styles.container}>
            <GestureHandlerRootView>
                <FlatList
                    data={Task}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item, index }) => (
                        <Swipeable renderLeftActions={() => leftSwift(item.id)} renderRightActions={() => RightSwift(item.id)}>

                            <View style={styles.taskContainer}>
                                <View style={styles.ChecBoxView}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={ColorPatel.AppColor}
                                        unFillColor="#FFFFFF"
                                        iconStyle={{ borderColor: ColorPatel.AppColor }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        onPress={() => { handleDone(item.id) }}
                                    />
                                </View>
                                <View style={styles.TextContainer}>
                                    <Text style={[styles.Teitle, item.isDone && { textDecorationLine: "line-through" }]}>{item.title}</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Description}>{item. Description}</Text>
                                </View>
                                <View style={[styles.priorty, { backgroundColor: ChooseColor(item.priorty) }]}>
                                    <Text style={styles.ProrityText}>{item.priorty}</Text>
                                </View>

                            </View>
                        </Swipeable>
                    )}
                />
            </GestureHandlerRootView>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingTop: vs(10)
    },
    taskContainer: {
        backgroundColor: ColorPatel.Bacground,
        height: vs(70),
        borderRadius: s(10),
        marginBottom: vs(10),
        elevation: 6,
        width: "95%",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    ChecBoxView: {
        paddingStart: s(12),
        // backgroundColor:"blue",
        width: s(50),
        height: vs(70),
        justifyContent: "center",
        alignItems: "center"

    },
    priorty: {
        backgroundColor: "green",
        paddingHorizontal: s(13),
        paddingVertical: vs(5),
        borderRadius: s(20),
        marginRight: s(10)
    },
    ProrityText: {
        fontSize: s(8),
        color: "#fff",
        fontWeight: "800"
    },
    TextContainer: {
        marginRight:s(30),
        flex: 1,
        height: vs(70),

    },
    Teitle: {
        fontSize: s(14),
        color: "#000",
        fontWeight: "600",
        marginTop: vs(5)
    },
    Description: {
        fontSize: s(10),
        color: "gray",
    },
    leftSwift: {
        backgroundColor: "#32cd32",
        height: vs(70),
        width: s(70),
        justifyContent: "center",
        alignItems: "center"

    },
})