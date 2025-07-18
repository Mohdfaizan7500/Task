import { Alert, DeviceEventEmitter, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ColorPatel } from '../assets/ColorPatel'
import { s, vs } from 'react-native-size-matters'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import EditIcon from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListSkeleton from '../components/ListSkeleton';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../App';
import ModalView from '../components/Modal';


const List = ({ sendData }) => {



    const { dataArray, deleteitem, handleDone, UpdateItem, OldDataArray } = useContext(AppContext)
    // const [isChecked, setisChecked] = useState(false)
    const [Task, setTask] = useState([]);
    const [OldTask, setOldTask] = useState([]);
    const [uid, setuid] = useState('')
    const [loading, setLoading] = useState(true);
    const [visibal, setvisibal] = useState(false)
    const [Updateid, setUpdateid] = useState('')


    const navigation = useNavigation();


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
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)

        }, 3000);
    }, [])


    const Update = (item) => {
        // console.log(item)
        DeviceEventEmitter.emit("UpdateItem", item)
        navigation.navigate('Screen2')



    }



    const leftSwift = (id) => {
        return (
            <TouchableOpacity onPress={() => { Update(id) }}
                style={styles.leftSwift}>
                <EditIcon name="edit" size={24} color="#fff" />
            </TouchableOpacity>
        )
    }

    const RightSwift = (id) => {
        return (
            <TouchableOpacity onPress={() => deleteitem(id)}
                style={[styles.leftSwift, { backgroundColor: "red" }]}>
                <DeleteIcon name="delete" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }
    return (

        <View style={styles.container}>

            {
                loading ?<ListSkeleton />: 
                <GestureHandlerRootView>
                            <FlatList
                                data={dataArray}
                                keyExtractor={(item, index) => item.id.toString()}

                                renderItem={({ item, index }) => (
                                    <Swipeable
                                        key={item.id.toString()}

                                        renderLeftActions={() => leftSwift(item)} renderRightActions={() => RightSwift(item.id)}>

                                        <View
                                            style={styles.taskContainer}>
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
                                                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Description}>{item.description}</Text>
                                            </View>
                                            <View style={[styles.priorty, { backgroundColor: ChooseColor(item.priority) }]}>
                                                <Text style={styles.ProrityText}>{item.priority}</Text>
                                            </View>

                                        </View>
                                    </Swipeable>
                                )}
                            />
                        </GestureHandlerRootView>

            }
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
        marginRight: s(30),
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